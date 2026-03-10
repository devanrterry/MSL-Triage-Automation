/**
 * Meta AI Triage Tool - Backend Server
 * Express API that fetches task data from Meta's internal systems and applies triage logic
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const https = require('https');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Store auth cookie from user
let authCookie = process.env.META_AUTH_COOKIE || '';

// Serve the main triage tool page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'triage-tool.html'));
});

/**
 * Set auth cookie endpoint
 * POST /api/auth
 * Body: { cookie: "your_auth_cookie_value" }
 */
app.post('/api/auth', (req, res) => {
  const { cookie } = req.body;
  if (cookie) {
    authCookie = cookie;
    console.log('[AUTH] Cookie updated');
    res.json({ success: true, message: 'Auth cookie saved' });
  } else {
    res.status(400).json({ error: 'Cookie value required' });
  }
});

/**
 * API endpoint to fetch and triage a task
 * POST /api/triage
 * Body: { taskId: "T123456789" }
 */
app.post('/api/triage', async (req, res) => {
  try {
    const { taskId } = req.body;

    if (!taskId) {
      return res.status(400).json({
        error: 'Task ID is required',
        message: 'Please provide a valid task ID'
      });
    }

    // Clean the task ID
    const cleanId = taskId.replace(/^T/i, '');
    const formattedId = `T${cleanId}`;

    console.log(`[${new Date().toISOString()}] Fetching task: ${formattedId}`);

    // Fetch task data from Meta's internal API
    const taskData = await fetchTaskData(formattedId, cleanId);

    if (!taskData) {
      return res.status(404).json({
        error: 'Task not found',
        message: `Could not fetch data for task ${formattedId}. Make sure you've set up authentication.`
      });
    }

    // Apply triage logic
    const triageResult = triageTaskData(taskData);

    console.log(`[${new Date().toISOString()}] Triage complete for: ${formattedId}`);

    res.json({
      success: true,
      data: triageResult
    });

  } catch (error) {
    console.error('Triage error:', error);
    res.status(500).json({
      error: 'Triage failed',
      message: error.message
    });
  }
});

/**
 * Fetch task data from Meta's internal Task API
 * Uses the GraphQL endpoint that powers the Tasks UI
 */
async function fetchTaskData(taskId, numericId) {
  return new Promise((resolve, reject) => {
    // Meta's internal task data endpoint
    const options = {
      hostname: 'www.internalfb.com',
      path: `/intern/tasks/api/task/${numericId}`,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Cookie': authCookie
      }
    };

    console.log(`[FETCH] Attempting to fetch task ${taskId}...`);

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            resolve(transformTaskData(taskId, json));
          } catch (e) {
            console.error('[PARSE ERROR]', e.message);
            // Try to extract data from HTML response
            resolve(extractFromHtml(taskId, data));
          }
        } else if (res.statusCode === 302 || res.statusCode === 301) {
          console.log('[AUTH] Redirect detected - authentication may be required');
          resolve(null);
        } else {
          console.log(`[FETCH] Status ${res.statusCode}`);
          resolve(null);
        }
      });
    });

    req.on('error', (error) => {
      console.error('[FETCH ERROR]', error.message);
      resolve(null);
    });

    req.end();
  });
}

/**
 * Transform API response to our expected format
 */
function transformTaskData(taskId, apiData) {
  return {
    taskId: taskId,
    title: apiData.title || apiData.name || '',
    description: apiData.description || apiData.body || apiData.content || '',
    tags: apiData.tags || apiData.projects || apiData.labels || [],
    priority: apiData.priority || 'unknown',
    status: apiData.status || 'open',
    author: apiData.author || apiData.creator || apiData.reporter || '',
    assignee: apiData.assignee || apiData.owner || '',
    createdAt: apiData.created_time || apiData.createdAt || apiData.dateCreated,
    updatedAt: apiData.updated_time || apiData.updatedAt || apiData.dateModified,
    userAgent: extractUserAgent(apiData.description || apiData.body || ''),
    appVersion: extractAppVersion(apiData.description || apiData.body || '')
  };
}

/**
 * Extract task info from HTML if JSON parse fails
 */
function extractFromHtml(taskId, html) {
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const descMatch = html.match(/description['"]\s*:\s*['"]([^'"]+)['"]/i);

  return {
    taskId: taskId,
    title: titleMatch ? titleMatch[1].replace(' | Tasks', '') : '',
    description: descMatch ? descMatch[1] : '',
    tags: [],
    priority: 'unknown',
    status: 'unknown'
  };
}

/**
 * Extract user agent from description
 */
function extractUserAgent(description) {
  const match = description.match(/UserAgent:\s*([^\n]+)/i);
  return match ? match[1].trim() : '';
}

/**
 * Extract app version from description or user agent
 */
function extractAppVersion(description) {
  const versionMatch = description.match(/FBAV\/([0-9.]+)/);
  return versionMatch ? versionMatch[1] : '';
}

/**
 * Apply triage logic to task data
 */
function triageTaskData(taskData) {
  const title = (taskData.title || '').toLowerCase();
  const description = (taskData.description || '').toLowerCase();
  const fullText = `${title} ${description}`;
  const existingTags = taskData.tags || [];
  const userAgent = taskData.userAgent || '';
  const appVersion = taskData.appVersion || '';

  // Detect surface
  const surface = detectSurface(fullText, userAgent, existingTags);

  // Detect platform
  const platform = detectPlatform(fullText, userAgent, existingTags);

  // Detect feature/product area
  const productArea = detectProductArea(fullText, existingTags);

  // Detect C50 feature if applicable
  const c50Feature = surface.name === 'C50' ? detectC50Feature(fullText) : null;

  // Determine priority
  const priority = determinePriority(fullText);

  // Determine issue type
  const issueType = determineIssueType(fullText);

  // Determine modality
  const modality = detectModality(fullText);

  // Determine assignment
  const assignment = determineAssignment(surface, platform, productArea);

  // Generate tags
  const tagsToAdd = generateTags(surface, platform, productArea, modality, existingTags);

  // Generate title
  const newTitle = generateTitle(taskData.title, surface, platform, c50Feature, appVersion);

  // Generate analysis
  const analysis = generateAnalysis(surface, platform, productArea, modality, issueType, appVersion);

  // Generate comment
  const comment = generateComment(taskData.taskId, surface, platform, productArea, assignment, analysis, appVersion, priority);

  return {
    taskId: taskData.taskId,
    originalTitle: taskData.title,
    surface: surface.name,
    platform: platform,
    productArea: productArea.name,
    issueType: issueType,
    modality: modality,
    priority: priority,
    assignment: assignment,
    tags: tagsToAdd,
    newTitle: newTitle,
    analysis: analysis,
    comment: comment,
    appVersion: appVersion,
    actions: [
      { text: 'Update task title', value: newTitle ? 'See above' : 'N/A' },
      { text: 'Add tags', value: tagsToAdd.join(', ') },
      { text: 'Set assignment', value: assignment },
      { text: 'Add triage comment', value: 'Copy from above' },
      { text: 'Verify priority', value: 'Review impact' }
    ]
  };
}

// ============================================================
// TRIAGE DETECTION FUNCTIONS
// ============================================================

const SURFACE_PATTERNS = {
  'C50': {
    keywords: ['c50', 'meta ai app', 'standalone app', 'metaai app', 'stellafori', 'fban/stellafori'],
    userAgentPatterns: ['StellaForiOS', 'StellaForAndroid', 'FBAN/Stella'],
    tags: ['c50-ios', 'c50-android', 'c50-'],
    titlePrefix: 'c50',
    oncalls: { ios: 'silverstone_ios', android: 'silverstone_android' }
  },
  'Ecto (meta.ai)': {
    keywords: ['meta.ai', 'ecto', 'website'],
    tags: ['Ecto-', 'meta.ai'],
    titlePrefix: 'Ecto',
    oncalls: { web: 'metaai_web' }
  },
  'FoA (Facebook)': {
    keywords: ['facebook app'],
    userAgentPatterns: ['FBAN/FB'],
    tags: ['facebook', 'fb-'],
    titlePrefix: 'FoA-FB',
    oncalls: { ios: 'fb_ios_ai', android: 'fb_android_ai' }
  },
  'FoA (Instagram)': {
    keywords: ['instagram app'],
    userAgentPatterns: ['FBAN/Instagram'],
    tags: ['instagram', 'ig-'],
    titlePrefix: 'FoA-IG',
    oncalls: { ios: 'ig_ios_ai', android: 'ig_android_ai' }
  },
  'FoA (WhatsApp)': {
    keywords: ['whatsapp'],
    tags: ['whatsapp', 'wa-'],
    titlePrefix: 'FoA-WA',
    oncalls: { all: 'whatsapp_ai' }
  },
  'FoA (Messenger)': {
    keywords: ['messenger', 'msgr'],
    userAgentPatterns: ['FBAN/Messenger', 'FBAN/Orca'],
    tags: ['messenger', 'msgr-'],
    titlePrefix: 'FoA-Msgr',
    oncalls: { ios: 'messenger_ios_ai', android: 'messenger_android_ai' }
  },
  'Vibes App': {
    keywords: ['vibes', 'vibes app'],
    tags: ['vibes_app'],
    titlePrefix: 'Vibes',
    oncalls: { all: 'vibes_app_oncall' }
  },
  'Hatch': {
    keywords: ['hatch'],
    tags: ['hatch-'],
    titlePrefix: 'Hatch',
    oncalls: { all: 'hatch_oncall' }
  }
};

const FEATURE_ROUTING = {
  'AI Search': {
    keywords: ['search', 'web search', 'citation', 'sources', 'results', '1p citation', '3p'],
    tags: ['MetaAI_Search'],
    oncall: 'metaai_search_oncall'
  },
  'Personalization': {
    keywords: ['memory', 'personalization', 'remember', 'preferences'],
    tags: ['meta_ai_p13n'],
    oncall: 'meta_ai_p13n_oncall'
  },
  'Characters / AI Studio': {
    keywords: ['character', 'ai studio', 'custom ai', 'persona'],
    tags: ['aistudio'],
    oncall: 'ai_studio_oncall'
  },
  'Media Generation': {
    keywords: ['imagine', 'image generation', 'generate image', 'media gen', 'reimagine', 'animate', 'remix'],
    tags: ['MetaAI_MediaGen'],
    oncall: 'media_gen_oncall'
  },
  'Voice': {
    keywords: ['voice', 'speech', 'audio', 'microphone', 'liveai', 'immersive'],
    tags: ['meta_ai_voice'],
    oncall: 'meta_ai_voice_backend'
  },
  'Growth/Sharing/Ranking': {
    keywords: ['share', 'sharing', 'growth', 'ranking', 'feed', 'notification'],
    tags: ['meta_ai_growth'],
    oncall: 'meta_ai_growth_oncall'
  }
};

const C50_FEATURES = {
  'sidebar': { tag: 'c50-sidebar', name: 'Sidebar' },
  'navigation': { tag: 'c50-AppNavigation', name: 'Navigation' },
  'composer': { tag: 'c50-composer', name: 'Composer' },
  'voice': { tag: 'c50-voice', name: 'Voice' },
  'liveai': { tag: 'voice-liveai-c50', name: 'LiveAI' },
  'history': { tag: 'c50-history', name: 'History' },
  'settings': { tag: 'c50-settings', name: 'Settings' },
  'login': { tag: 'c50-login', name: 'Login' },
  'notifications': { tag: 'c50-notifications', name: 'Notification' },
  'dictation': { tag: 'c50-dictation', name: 'Dictation' },
  'projects': { tag: 'MetaAI2.0-Projects', name: 'Projects' },
  'latency': { tag: 'MetaAI2.0-Latency', name: 'Latency' },
  'read aloud': { tag: 'c50-read-aloud', name: 'ReadAloud' },
  'incognito': { tag: 'c50-incognito-mode', name: 'Incognito' },
  'something went wrong': { tag: 'c50-something-went-wrong', name: 'SWW' },
  'video': { tag: 'c50-other', name: 'Other' },
  'lightbox': { tag: 'c50-other', name: 'Other' }
};

function detectSurface(text, userAgent, existingTags) {
  const tagString = existingTags.join(' ').toLowerCase();
  const combined = `${text} ${userAgent}`.toLowerCase();

  for (const [name, config] of Object.entries(SURFACE_PATTERNS)) {
    // Check user agent patterns first (most reliable)
    if (config.userAgentPatterns) {
      for (const pattern of config.userAgentPatterns) {
        if (userAgent.toLowerCase().includes(pattern.toLowerCase())) {
          return { name, ...config };
        }
      }
    }
    // Check existing tags
    for (const tagPattern of config.tags) {
      if (tagString.includes(tagPattern.toLowerCase())) {
        return { name, ...config };
      }
    }
    // Check keywords
    for (const keyword of config.keywords) {
      if (combined.includes(keyword.toLowerCase())) {
        return { name, ...config };
      }
    }
  }

  return { name: 'Unknown Surface', titlePrefix: 'Unknown', oncalls: {} };
}

function detectPlatform(text, userAgent, existingTags) {
  const combined = `${text} ${userAgent} ${existingTags.join(' ')}`.toLowerCase();

  if (combined.includes('ios') || combined.includes('iphone') || combined.includes('ipad') || combined.includes('fbsn/ios')) {
    return 'iOS';
  }
  if (combined.includes('android') || combined.includes('pixel') || combined.includes('samsung')) {
    return 'Android';
  }
  if (combined.includes('web') || combined.includes('browser') || combined.includes('chrome')) {
    return 'Web';
  }

  return 'Unknown';
}

function detectProductArea(text, existingTags) {
  const tagString = existingTags.join(' ').toLowerCase();

  for (const [name, config] of Object.entries(FEATURE_ROUTING)) {
    for (const keyword of config.keywords) {
      if (text.includes(keyword.toLowerCase())) {
        return { name, ...config };
      }
    }
  }

  return { name: 'General', oncall: null, tags: [] };
}

function detectC50Feature(text) {
  for (const [keyword, config] of Object.entries(C50_FEATURES)) {
    if (text.includes(keyword)) {
      return config;
    }
  }
  return { tag: 'c50-other', name: 'Other' };
}

function detectModality(text) {
  if (text.includes('voice') || text.includes('speech') || text.includes('audio')) return 'Voice';
  if (text.includes('image') || text.includes('photo') || text.includes('camera')) return 'Media';
  return 'Text';
}

function determinePriority(text) {
  const priorities = {
    'High': ['crash', 'broken', 'cannot use', 'blocking', 'urgent', 'security', 'data loss'],
    'Medium': ['bug', 'issue', 'problem', 'not working', 'error', 'failed'],
    'Low': ['minor', 'cosmetic', 'ui', 'visual', 'typo', 'polish', 'flash', 'flicker'],
    'Wishlist': ['feature request', 'suggestion', 'enhancement', 'idea']
  };

  for (const [priority, keywords] of Object.entries(priorities)) {
    for (const keyword of keywords) {
      if (text.includes(keyword.toLowerCase())) {
        return priority;
      }
    }
  }
  return 'Medium';
}

function determineIssueType(text) {
  if (text.includes('feature request') || text.includes('suggestion')) return 'Feature Request';
  if (text.includes('how to') || text.includes('question')) return 'Question';
  if (text.includes('wrong answer') || text.includes('hallucination')) return 'Model Quality';
  return 'Bug';
}

function determineAssignment(surface, platform, productArea) {
  if (productArea.oncall) return productArea.oncall;

  if (surface.oncalls) {
    const platformKey = platform.toLowerCase();
    if (surface.oncalls[platformKey]) return surface.oncalls[platformKey];
    if (surface.oncalls.all) return surface.oncalls.all;
    const oncalls = Object.values(surface.oncalls);
    if (oncalls.length > 0) return oncalls[0];
  }

  return 'meta_ai_triage';
}

function generateTags(surface, platform, productArea, modality, existingTags) {
  const tags = [];
  const existingLower = existingTags.map(t => t.toLowerCase());

  if (surface.name === 'C50') {
    const platformTag = platform === 'iOS' ? 'c50-ios' : (platform === 'Android' ? 'c50-android' : 'c50-other');
    if (!existingLower.includes(platformTag)) tags.push(platformTag);
  } else if (surface.name === 'Vibes App') {
    if (!existingLower.includes('vibes_app')) tags.push('vibes_app');
  }

  if (platform !== 'Unknown' && !existingLower.includes(platform.toLowerCase())) {
    tags.push(platform.toLowerCase());
  }

  if (productArea.tags) {
    for (const tag of productArea.tags) {
      if (!existingLower.includes(tag.toLowerCase())) tags.push(tag);
    }
  }

  if (!existingLower.some(t => t.includes('prodops'))) {
    tags.push('ProdOps - Repro');
  }

  return tags;
}

function generateTitle(originalTitle, surface, platform, c50Feature, appVersion) {
  if (!originalTitle) return '';

  if (surface.name === 'C50') {
    const featureName = c50Feature ? c50Feature.name : 'Other';
    const platformPart = platform !== 'Unknown' ? `[${platform}]` : '';
    const versionPart = appVersion ? `[${appVersion}]` : '';
    return `[c50][${featureName}]${platformPart}${versionPart} ${originalTitle}`;
  }

  const prefix = surface.titlePrefix || surface.name;
  const platformPart = platform !== 'Unknown' ? ` [${platform}]` : '';
  return `[${prefix}]${platformPart} ${originalTitle}`;
}

function generateAnalysis(surface, platform, productArea, modality, issueType, appVersion) {
  let analysis = `This is a **${issueType}** reported on **${surface.name}**`;
  if (platform !== 'Unknown') analysis += ` (${platform})`;
  analysis += '.';

  if (appVersion) analysis += ` App version: ${appVersion}.`;
  if (productArea.name !== 'General') analysis += ` The issue is related to the **${productArea.name}** feature.`;
  if (modality !== 'Text') analysis += ` Input modality: ${modality}.`;

  return analysis;
}

function generateComment(taskId, surface, platform, productArea, assignment, analysis, appVersion, priority) {
  return `## Triage Assessment

**Surface:** ${surface.name}
**Platform:** ${platform}
**App Version:** ${appVersion || 'Not specified'}
**Product Area:** ${productArea.name}
**Issue Type:** Bug

### Analysis
${analysis}

### Routing
Assigning to **${assignment}** for investigation.

### Priority
${priority} - Review and adjust as needed based on impact assessment.`;
}

/**
 * Direct triage endpoint (when task data is already available)
 */
app.post('/api/triage/direct', (req, res) => {
  try {
    const taskData = req.body;

    if (!taskData.taskId) {
      return res.status(400).json({
        error: 'Task data incomplete',
        message: 'taskId is required'
      });
    }

    const triageResult = triageTaskData(taskData);

    res.json({
      success: true,
      data: triageResult
    });

  } catch (error) {
    console.error('Direct triage error:', error);
    res.status(500).json({
      error: 'Triage failed',
      message: error.message
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    authConfigured: !!authCookie
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🔍 Meta AI Triage Tool Server                               ║
║                                                               ║
║   Server running at: http://localhost:${PORT}                   ║
║   API endpoint: http://localhost:${PORT}/api/triage             ║
║                                                               ║
║   Open http://localhost:${PORT} in your browser to start       ║
║                                                               ║
║   To authenticate, either:                                    ║
║   1. Set META_AUTH_COOKIE environment variable, or            ║
║   2. POST to /api/auth with { "cookie": "your_cookie" }       ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
