/**
 * Meta AI Triage Logic
 * Contains all routing rules, tag mappings, and triage decision logic
 * Based on the Unified Triage Skill and UDT mapping document
 */

// Surface identification patterns
const SURFACE_PATTERNS = {
  'C50': {
    keywords: ['c50', 'meta ai app', 'standalone app', 'metaai app'],
    tags: ['c50-ios', 'c50-android', 'c50-'],
    oncalls: {
      ios: 'silverstone_ios',
      android: 'silverstone_android'
    }
  },
  'Ecto (meta.ai)': {
    keywords: ['meta.ai', 'ecto', 'web', 'browser', 'website'],
    tags: ['Ecto-', 'meta.ai'],
    oncalls: {
      web: 'metaai_web'
    }
  },
  'FoA (Facebook)': {
    keywords: ['facebook', 'fb', 'facebook app'],
    tags: ['facebook', 'fb-'],
    oncalls: {
      ios: 'fb_ios_ai',
      android: 'fb_android_ai'
    }
  },
  'FoA (Instagram)': {
    keywords: ['instagram', 'ig', 'insta'],
    tags: ['instagram', 'ig-'],
    oncalls: {
      ios: 'ig_ios_ai',
      android: 'ig_android_ai'
    }
  },
  'FoA (WhatsApp)': {
    keywords: ['whatsapp', 'wa'],
    tags: ['whatsapp', 'wa-'],
    oncalls: {
      all: 'whatsapp_ai'
    }
  },
  'FoA (Messenger)': {
    keywords: ['messenger', 'msgr', 'fb messenger'],
    tags: ['messenger', 'msgr-'],
    oncalls: {
      ios: 'messenger_ios_ai',
      android: 'messenger_android_ai'
    }
  },
  'Vibes App': {
    keywords: ['vibes', 'vibes app'],
    tags: ['vibes_app'],
    oncalls: {
      all: 'vibes_app_oncall'
    }
  },
  'Hatch': {
    keywords: ['hatch', 'hatch app'],
    tags: ['hatch-'],
    oncalls: {
      all: 'hatch_oncall'
    }
  }
};

// Feature routing based on UDT mapping
const FEATURE_ROUTING = {
  'AI Search': {
    keywords: ['search', 'web search', 'citation', 'sources', 'results', 'google', 'bing'],
    tags: ['MetaAI_Search'],
    oncall: 'metaai_search_oncall',
    subfeatures: {
      '1P Citations': { tag: 'MetaAI_Search_1P_Citations' },
      '3P Web Search': { tag: 'MetaAI_Search_3P_Web_Search' },
      'Search Quality': { tag: 'MetaAI_Search_Quality' },
      'Sports': { tag: 'MetaAI_Search_Sports' },
      'Finance': { tag: 'MetaAI_Search_Finance' },
      'Weather': { tag: 'MetaAI_Search_Weather' },
      'Local': { tag: 'MetaAI_Search_Local' }
    }
  },
  'Personalization': {
    keywords: ['memory', 'personalization', 'remember', 'preferences', 'my info', 'personal'],
    tags: ['meta_ai_p13n'],
    oncall: 'meta_ai_p13n_oncall',
    subfeatures: {
      'Memory': { tag: 'meta_ai_p13n_memory' },
      'Preferences': { tag: 'meta_ai_p13n_preferences' }
    }
  },
  'Characters / AI Studio': {
    keywords: ['character', 'ai studio', 'custom ai', 'persona', 'roleplay'],
    tags: ['aistudio'],
    oncall: 'ai_studio_oncall'
  },
  'Media Generation': {
    keywords: ['imagine', 'image generation', 'generate image', 'create image', 'ai image', 'media gen'],
    tags: ['MetaAI_MediaGen'],
    oncall: 'media_gen_oncall',
    subfeatures: {
      'Imagine (Image Gen)': { tag: 'MetaAI_MediaGen_Imagine', oncall: 'imagine_oncall' },
      'Reimagine': { tag: 'MetaAI_MediaGen_Reimagine' },
      'Animate': { tag: 'MetaAI_MediaGen_Animate' },
      'Edit': { tag: 'MetaAI_MediaGen_Edit' },
      'Remix': { tag: 'MetaAI_MediaGen_Remix' }
    }
  },
  'Voice': {
    keywords: ['voice', 'speech', 'audio', 'speak', 'listen', 'microphone', 'voice input', 'voice output'],
    tags: ['meta_ai_voice'],
    oncall: 'meta_ai_voice_backend',
    subfeatures: {
      'Voice Input (ASR)': { tag: 'meta_ai_voice_input', oncall: 'meta_ai_voice_backend' },
      'Voice Output (TTS)': { tag: 'meta_ai_voice_output', oncall: 'meta_ai_voice_backend' },
      'Voice Quality': { tag: 'meta_ai_voice_quality' }
    }
  },
  'Growth/Sharing/Ranking': {
    keywords: ['share', 'sharing', 'growth', 'ranking', 'discovery', 'feed', 'notification'],
    tags: ['meta_ai_growth'],
    oncall: 'meta_ai_growth_oncall'
  }
};

// Model quality routing
const MODEL_QUALITY_ROUTING = {
  'Text Model Quality': {
    keywords: ['wrong answer', 'incorrect', 'hallucination', 'model quality', 'bad response',
               'inaccurate', 'llm', 'reasoning', 'knowledge cutoff', 'outdated info'],
    tags: ['meta_ai_text_model_quality'],
    oncall: 'llm_quality_oncall'
  },
  'Voice Model Quality': {
    keywords: ['voice quality', 'tts quality', 'asr quality', 'speech recognition',
               'voice not clear', 'wrong transcription'],
    tags: ['meta_ai_voice_model_quality'],
    oncall: 'meta_ai_voice_backend'
  }
};

// Platform detection
const PLATFORM_PATTERNS = {
  'iOS': ['ios', 'iphone', 'ipad', 'apple'],
  'Android': ['android', 'pixel', 'samsung', 'galaxy'],
  'Web': ['web', 'browser', 'chrome', 'safari', 'firefox', 'www']
};

// Input modality detection
const MODALITY_PATTERNS = {
  'Text': ['text', 'typed', 'typing', 'keyboard'],
  'Voice': ['voice', 'speech', 'spoken', 'microphone', 'audio input'],
  'Media': ['image', 'photo', 'picture', 'camera', 'upload']
};

// Priority determination
const PRIORITY_RULES = {
  HIGH: {
    keywords: ['crash', 'broken', 'cannot use', 'blocking', 'production down', 'outage',
               'security', 'data loss', 'privacy', 'urgent'],
    conditions: ['app crash', 'complete failure', 'security issue', 'data breach']
  },
  MEDIUM: {
    keywords: ['bug', 'issue', 'problem', 'not working', 'error', 'failed'],
    conditions: ['feature broken', 'inconsistent behavior', 'performance issue']
  },
  LOW: {
    keywords: ['minor', 'cosmetic', 'ui', 'visual', 'typo', 'polish'],
    conditions: ['visual glitch', 'minor inconvenience']
  },
  WISHLIST: {
    keywords: ['feature request', 'suggestion', 'would be nice', 'enhancement', 'idea'],
    conditions: ['new feature', 'improvement suggestion']
  }
};

// Issue type classification
const ISSUE_TYPES = {
  'Bug': ['bug', 'broken', 'not working', 'error', 'crash', 'issue', 'problem'],
  'Feature Request': ['feature request', 'suggestion', 'enhancement', 'would like', 'please add'],
  'Question': ['how to', 'how do i', 'question', 'help with', 'what is'],
  'Model Quality': ['wrong answer', 'incorrect', 'hallucination', 'bad response', 'inaccurate']
};

/**
 * Main triage function
 * @param {Object} taskData - Task data from the API
 * @returns {Object} - Triage result
 */
function triageTask(taskData) {
  const title = (taskData.title || '').toLowerCase();
  const description = (taskData.description || '').toLowerCase();
  const existingTags = taskData.tags || [];
  const fullText = `${title} ${description}`;

  // Detect surface
  const surface = detectSurface(fullText, existingTags);

  // Detect platform
  const platform = detectPlatform(fullText, existingTags);

  // Detect feature/product area
  const productArea = detectProductArea(fullText, existingTags);

  // Detect input modality
  const modality = detectModality(fullText);

  // Determine priority
  const priority = determinePriority(fullText, existingTags);

  // Determine issue type
  const issueType = determineIssueType(fullText);

  // Determine assignment (oncall)
  const assignment = determineAssignment(surface, platform, productArea);

  // Generate tags to add
  const tagsToAdd = generateTags(surface, platform, productArea, modality, existingTags);

  // Generate analysis
  const analysis = generateAnalysis(surface, platform, productArea, modality, issueType);

  // Generate recommended title
  const newTitle = generateTitle(taskData.title, surface, platform, productArea);

  // Generate triage comment
  const comment = generateComment(surface, platform, productArea, assignment, analysis);

  // Generate action items
  const actions = generateActions(surface, platform, productArea, assignment, tagsToAdd);

  return {
    taskId: taskData.taskId,
    title: taskData.title,
    surface: surface.name,
    platform: platform,
    productArea: productArea.name,
    modality: modality,
    priority: priority,
    issueType: issueType,
    assignment: assignment,
    tags: tagsToAdd,
    analysis: analysis,
    newTitle: newTitle,
    comment: comment,
    actions: actions
  };
}

function detectSurface(text, existingTags) {
  const tagString = existingTags.join(' ').toLowerCase();

  for (const [name, config] of Object.entries(SURFACE_PATTERNS)) {
    // Check existing tags first
    for (const tagPattern of config.tags) {
      if (tagString.includes(tagPattern.toLowerCase())) {
        return { name, ...config };
      }
    }
    // Check keywords in text
    for (const keyword of config.keywords) {
      if (text.includes(keyword)) {
        return { name, ...config };
      }
    }
  }

  return { name: 'Unknown Surface', oncalls: {} };
}

function detectPlatform(text, existingTags) {
  const tagString = existingTags.join(' ').toLowerCase();
  const combined = `${text} ${tagString}`;

  for (const [platform, keywords] of Object.entries(PLATFORM_PATTERNS)) {
    for (const keyword of keywords) {
      if (combined.includes(keyword)) {
        return platform;
      }
    }
  }

  return 'Unknown';
}

function detectProductArea(text, existingTags) {
  const tagString = existingTags.join(' ').toLowerCase();

  // Check feature routing
  for (const [name, config] of Object.entries(FEATURE_ROUTING)) {
    for (const tagPattern of config.tags) {
      if (tagString.includes(tagPattern.toLowerCase())) {
        return { name, ...config };
      }
    }
    for (const keyword of config.keywords) {
      if (text.includes(keyword)) {
        return { name, ...config };
      }
    }
  }

  // Check model quality routing
  for (const [name, config] of Object.entries(MODEL_QUALITY_ROUTING)) {
    for (const keyword of config.keywords) {
      if (text.includes(keyword)) {
        return { name, ...config, isModelQuality: true };
      }
    }
  }

  return { name: 'General', oncall: null };
}

function detectModality(text) {
  for (const [modality, keywords] of Object.entries(MODALITY_PATTERNS)) {
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        return modality;
      }
    }
  }
  return 'Text';
}

function determinePriority(text, existingTags) {
  for (const [priority, config] of Object.entries(PRIORITY_RULES)) {
    for (const keyword of config.keywords) {
      if (text.includes(keyword)) {
        return priority;
      }
    }
  }
  return 'MEDIUM';
}

function determineIssueType(text) {
  for (const [type, keywords] of Object.entries(ISSUE_TYPES)) {
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        return type;
      }
    }
  }
  return 'Bug';
}

function determineAssignment(surface, platform, productArea) {
  // Product area oncall takes precedence
  if (productArea.oncall) {
    return productArea.oncall;
  }

  // Fall back to surface oncall
  if (surface.oncalls) {
    const platformKey = platform.toLowerCase();
    if (surface.oncalls[platformKey]) {
      return surface.oncalls[platformKey];
    }
    if (surface.oncalls.all) {
      return surface.oncalls.all;
    }
    // Return first available oncall
    const oncalls = Object.values(surface.oncalls);
    if (oncalls.length > 0) {
      return oncalls[0];
    }
  }

  return 'meta_ai_triage';
}

function generateTags(surface, platform, productArea, modality, existingTags) {
  const tags = [];
  const existingLower = existingTags.map(t => t.toLowerCase());

  // Add surface tag
  if (surface.name === 'C50') {
    const platformTag = platform === 'iOS' ? 'c50-ios' : 'c50-android';
    if (!existingLower.includes(platformTag.toLowerCase())) {
      tags.push(platformTag);
    }
  } else if (surface.name === 'Vibes App') {
    if (!existingLower.includes('vibes_app')) {
      tags.push('vibes_app');
    }
  }

  // Add platform tag
  const platformTag = platform.toLowerCase();
  if (!existingLower.includes(platformTag) && platform !== 'Unknown') {
    tags.push(platformTag);
  }

  // Add product area tags
  if (productArea.tags) {
    for (const tag of productArea.tags) {
      if (!existingLower.includes(tag.toLowerCase())) {
        tags.push(tag);
      }
    }
  }

  // Add modality tag
  const modalityTag = `input-modality-ai-${modality.toLowerCase()}`;
  if (!existingLower.includes(modalityTag)) {
    tags.push(modalityTag);
  }

  // Add triage outcome tag
  if (!existingLower.some(t => t.includes('prodops'))) {
    tags.push('ProdOps - Repro');
  }

  return tags;
}

function generateAnalysis(surface, platform, productArea, modality, issueType) {
  let analysis = `This is a ${issueType} reported on ${surface.name}`;

  if (platform !== 'Unknown') {
    analysis += ` (${platform})`;
  }

  analysis += `.`;

  if (productArea.name !== 'General') {
    analysis += ` The issue is related to the ${productArea.name} feature.`;
  }

  if (modality !== 'Text') {
    analysis += ` The user is using ${modality} input modality.`;
  }

  return analysis;
}

function generateTitle(originalTitle, surface, platform, productArea) {
  // Clean up and standardize title
  let newTitle = originalTitle;

  // Add surface prefix if not present
  const surfacePrefix = `[${surface.name}]`;
  if (!newTitle.includes('[') && surface.name !== 'Unknown Surface') {
    newTitle = `${surfacePrefix} ${newTitle}`;
  }

  // Add platform if relevant
  if (platform !== 'Unknown' && !newTitle.toLowerCase().includes(platform.toLowerCase())) {
    newTitle = newTitle.replace(surfacePrefix, `${surfacePrefix} [${platform}]`);
  }

  return newTitle;
}

function generateComment(surface, platform, productArea, assignment, analysis) {
  let comment = `## Triage Assessment\n\n`;
  comment += `**Surface:** ${surface.name}\n`;
  comment += `**Platform:** ${platform}\n`;
  comment += `**Product Area:** ${productArea.name}\n`;
  comment += `**Routing:** ${assignment}\n\n`;
  comment += `### Analysis\n${analysis}\n\n`;
  comment += `### Next Steps\n`;
  comment += `- Assigning to ${assignment} for investigation\n`;
  comment += `- Please review and update priority as needed\n`;

  return comment;
}

function generateActions(surface, platform, productArea, assignment, tagsToAdd) {
  const actions = [];

  actions.push({
    text: 'Update task title',
    value: 'See recommended title above'
  });

  actions.push({
    text: 'Add tags',
    value: tagsToAdd.join(', ')
  });

  actions.push({
    text: 'Set assignment',
    value: assignment
  });

  actions.push({
    text: 'Add triage comment',
    value: 'Copy comment above'
  });

  actions.push({
    text: 'Verify priority level',
    value: 'Review and adjust if needed'
  });

  return actions;
}

module.exports = {
  triageTask,
  detectSurface,
  detectPlatform,
  detectProductArea,
  SURFACE_PATTERNS,
  FEATURE_ROUTING,
  MODEL_QUALITY_ROUTING
};
