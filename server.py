#!/usr/bin/env python3
"""
Meta AI Triage Tool - Python Backend Server
Serves the triage tool and handles API requests
"""

import http.server
import socketserver
import json
import urllib.request
import urllib.parse
import re
import os
from http import HTTPStatus

PORT = 3000

# Store auth cookie
auth_cookie = os.environ.get('META_AUTH_COOKIE', '')

# =============================================================================
# TRIAGE LOGIC
# =============================================================================

SURFACE_PATTERNS = {
    'C50': {
        'keywords': ['c50', 'meta ai app', 'standalone app', 'metaai app', 'stellafori', 'fban/stellafori'],
        'user_agent_patterns': ['StellaForiOS', 'StellaForAndroid', 'FBAN/Stella'],
        'tags': ['c50-ios', 'c50-android', 'c50-'],
        'title_prefix': 'c50',
        'oncalls': {'ios': 'silverstone_ios', 'android': 'silverstone_android'}
    },
    'Ecto (meta.ai)': {
        'keywords': ['meta.ai', 'ecto', 'website'],
        'tags': ['Ecto-', 'meta.ai'],
        'title_prefix': 'Ecto',
        'oncalls': {'web': 'metaai_web'}
    },
    'FoA (Facebook)': {
        'keywords': ['facebook app'],
        'user_agent_patterns': ['FBAN/FB'],
        'tags': ['facebook', 'fb-'],
        'title_prefix': 'FoA-FB',
        'oncalls': {'ios': 'fb_ios_ai', 'android': 'fb_android_ai'}
    },
    'FoA (Instagram)': {
        'keywords': ['instagram app'],
        'user_agent_patterns': ['FBAN/Instagram'],
        'tags': ['instagram', 'ig-'],
        'title_prefix': 'FoA-IG',
        'oncalls': {'ios': 'ig_ios_ai', 'android': 'ig_android_ai'}
    },
    'FoA (WhatsApp)': {
        'keywords': ['whatsapp'],
        'tags': ['whatsapp', 'wa-'],
        'title_prefix': 'FoA-WA',
        'oncalls': {'all': 'whatsapp_ai'}
    },
    'FoA (Messenger)': {
        'keywords': ['messenger', 'msgr'],
        'user_agent_patterns': ['FBAN/Messenger', 'FBAN/Orca'],
        'tags': ['messenger', 'msgr-'],
        'title_prefix': 'FoA-Msgr',
        'oncalls': {'ios': 'messenger_ios_ai', 'android': 'messenger_android_ai'}
    },
    'Vibes App': {
        'keywords': ['vibes', 'vibes app'],
        'tags': ['vibes_app'],
        'title_prefix': 'Vibes',
        'oncalls': {'all': 'vibes_app_oncall'}
    },
    'Hatch': {
        'keywords': ['hatch'],
        'tags': ['hatch-'],
        'title_prefix': 'Hatch',
        'oncalls': {'all': 'hatch_oncall'}
    }
}

FEATURE_ROUTING = {
    'AI Search': {
        'keywords': ['search', 'web search', 'citation', 'sources', 'results', '1p citation', '3p'],
        'tags': ['MetaAI_Search'],
        'oncall': 'metaai_search_oncall'
    },
    'Personalization': {
        'keywords': ['memory', 'personalization', 'remember', 'preferences'],
        'tags': ['meta_ai_p13n'],
        'oncall': 'meta_ai_p13n_oncall'
    },
    'Characters / AI Studio': {
        'keywords': ['character', 'ai studio', 'custom ai', 'persona'],
        'tags': ['aistudio'],
        'oncall': 'ai_studio_oncall'
    },
    'Media Generation': {
        'keywords': ['imagine', 'image generation', 'generate image', 'media gen', 'reimagine', 'animate', 'remix'],
        'tags': ['MetaAI_MediaGen'],
        'oncall': 'media_gen_oncall'
    },
    'Voice': {
        'keywords': ['voice', 'speech', 'audio', 'microphone', 'liveai', 'immersive'],
        'tags': ['meta_ai_voice'],
        'oncall': 'meta_ai_voice_backend'
    },
    'Growth/Sharing/Ranking': {
        'keywords': ['share', 'sharing', 'growth', 'ranking', 'feed', 'notification'],
        'tags': ['meta_ai_growth'],
        'oncall': 'meta_ai_growth_oncall'
    }
}

C50_FEATURES = {
    'sidebar': {'tag': 'c50-sidebar', 'name': 'Sidebar'},
    'navigation': {'tag': 'c50-AppNavigation', 'name': 'Navigation'},
    'composer': {'tag': 'c50-composer', 'name': 'Composer'},
    'voice': {'tag': 'c50-voice', 'name': 'Voice'},
    'liveai': {'tag': 'voice-liveai-c50', 'name': 'LiveAI'},
    'history': {'tag': 'c50-history', 'name': 'History'},
    'settings': {'tag': 'c50-settings', 'name': 'Settings'},
    'login': {'tag': 'c50-login', 'name': 'Login'},
    'notifications': {'tag': 'c50-notifications', 'name': 'Notification'},
    'dictation': {'tag': 'c50-dictation', 'name': 'Dictation'},
    'projects': {'tag': 'MetaAI2.0-Projects', 'name': 'Projects'},
    'latency': {'tag': 'MetaAI2.0-Latency', 'name': 'Latency'},
    'read aloud': {'tag': 'c50-read-aloud', 'name': 'ReadAloud'},
    'incognito': {'tag': 'c50-incognito-mode', 'name': 'Incognito'},
    'something went wrong': {'tag': 'c50-something-went-wrong', 'name': 'SWW'},
    'video': {'tag': 'c50-other', 'name': 'Other'},
    'lightbox': {'tag': 'c50-other', 'name': 'Other'}
}

PRIORITY_KEYWORDS = {
    'High': ['crash', 'broken', 'cannot use', 'blocking', 'urgent', 'security', 'data loss'],
    'Medium': ['bug', 'issue', 'problem', 'not working', 'error', 'failed'],
    'Low': ['minor', 'cosmetic', 'ui', 'visual', 'typo', 'polish', 'flash', 'flicker'],
    'Wishlist': ['feature request', 'suggestion', 'enhancement', 'idea']
}


def detect_surface(text, user_agent, existing_tags):
    tag_string = ' '.join(existing_tags).lower()
    combined = f"{text} {user_agent}".lower()

    for name, config in SURFACE_PATTERNS.items():
        # Check user agent patterns first
        if 'user_agent_patterns' in config:
            for pattern in config['user_agent_patterns']:
                if pattern.lower() in user_agent.lower():
                    return {'name': name, **config}
        # Check existing tags
        for tag_pattern in config['tags']:
            if tag_pattern.lower() in tag_string:
                return {'name': name, **config}
        # Check keywords
        for keyword in config['keywords']:
            if keyword.lower() in combined:
                return {'name': name, **config}

    return {'name': 'Unknown Surface', 'title_prefix': 'Unknown', 'oncalls': {}}


def detect_platform(text, user_agent, existing_tags):
    combined = f"{text} {user_agent} {' '.join(existing_tags)}".lower()

    if any(x in combined for x in ['ios', 'iphone', 'ipad', 'fbsn/ios']):
        return 'iOS'
    if any(x in combined for x in ['android', 'pixel', 'samsung']):
        return 'Android'
    if any(x in combined for x in ['web', 'browser', 'chrome']):
        return 'Web'
    return 'Unknown'


def detect_product_area(text, existing_tags):
    for name, config in FEATURE_ROUTING.items():
        for keyword in config['keywords']:
            if keyword.lower() in text.lower():
                return {'name': name, **config}
    return {'name': 'General', 'oncall': None, 'tags': []}


def detect_c50_feature(text):
    for keyword, config in C50_FEATURES.items():
        if keyword in text.lower():
            return config
    return {'tag': 'c50-other', 'name': 'Other'}


def detect_modality(text):
    if any(x in text.lower() for x in ['voice', 'speech', 'audio']):
        return 'Voice'
    if any(x in text.lower() for x in ['image', 'photo', 'camera']):
        return 'Media'
    return 'Text'


def determine_priority(text):
    for priority, keywords in PRIORITY_KEYWORDS.items():
        for keyword in keywords:
            if keyword.lower() in text.lower():
                return priority
    return 'Medium'


def determine_issue_type(text):
    if 'feature request' in text.lower() or 'suggestion' in text.lower():
        return 'Feature Request'
    if 'how to' in text.lower() or 'question' in text.lower():
        return 'Question'
    if 'wrong answer' in text.lower() or 'hallucination' in text.lower():
        return 'Model Quality'
    return 'Bug'


def determine_assignment(surface, platform, product_area):
    if product_area.get('oncall'):
        return product_area['oncall']

    oncalls = surface.get('oncalls', {})
    if oncalls:
        platform_key = platform.lower()
        if platform_key in oncalls:
            return oncalls[platform_key]
        if 'all' in oncalls:
            return oncalls['all']
        return list(oncalls.values())[0] if oncalls else 'meta_ai_triage'

    return 'meta_ai_triage'


def generate_tags(surface, platform, product_area, modality, existing_tags):
    tags = []
    existing_lower = [t.lower() for t in existing_tags]

    if surface['name'] == 'C50':
        if platform == 'iOS':
            platform_tag = 'c50-ios'
        elif platform == 'Android':
            platform_tag = 'c50-android'
        else:
            platform_tag = 'c50-other'
        if platform_tag not in existing_lower:
            tags.append(platform_tag)
    elif surface['name'] == 'Vibes App':
        if 'vibes_app' not in existing_lower:
            tags.append('vibes_app')

    if platform != 'Unknown' and platform.lower() not in existing_lower:
        tags.append(platform.lower())

    if 'tags' in product_area:
        for tag in product_area['tags']:
            if tag.lower() not in existing_lower:
                tags.append(tag)

    if not any('prodops' in t for t in existing_lower):
        tags.append('ProdOps - Repro')

    return tags


def generate_title(original_title, surface, platform, c50_feature, app_version):
    if not original_title:
        return ''

    if surface['name'] == 'C50':
        feature_name = c50_feature['name'] if c50_feature else 'Other'
        platform_part = f'[{platform}]' if platform != 'Unknown' else ''
        version_part = f'[{app_version}]' if app_version else ''
        return f'[c50][{feature_name}]{platform_part}{version_part} {original_title}'

    prefix = surface.get('title_prefix', surface['name'])
    platform_part = f' [{platform}]' if platform != 'Unknown' else ''
    return f'[{prefix}]{platform_part} {original_title}'


def generate_analysis(surface, platform, product_area, modality, issue_type, app_version):
    analysis = f"This is a **{issue_type}** reported on **{surface['name']}**"
    if platform != 'Unknown':
        analysis += f" ({platform})"
    analysis += "."

    if app_version:
        analysis += f" App version: {app_version}."
    if product_area['name'] != 'General':
        analysis += f" The issue is related to the **{product_area['name']}** feature."
    if modality != 'Text':
        analysis += f" Input modality: {modality}."

    return analysis


def generate_comment(task_id, surface, platform, product_area, assignment, analysis, app_version, priority):
    return f"""## Triage Assessment

**Surface:** {surface['name']}
**Platform:** {platform}
**App Version:** {app_version or 'Not specified'}
**Product Area:** {product_area['name']}
**Issue Type:** Bug

### Analysis
{analysis}

### Routing
Assigning to **{assignment}** for investigation.

### Priority
{priority} - Review and adjust as needed based on impact assessment."""


def extract_user_agent(description):
    match = re.search(r'UserAgent:\s*([^\n]+)', description, re.IGNORECASE)
    return match.group(1).strip() if match else ''


def extract_app_version(description):
    match = re.search(r'FBAV/([0-9.]+)', description)
    return match.group(1) if match else ''


def triage_task_data(task_data):
    title = task_data.get('title', '') or ''
    description = task_data.get('description', '') or ''
    full_text = f"{title} {description}"
    existing_tags = task_data.get('tags', []) or []
    user_agent = task_data.get('userAgent', '') or extract_user_agent(description)
    app_version = task_data.get('appVersion', '') or extract_app_version(description)

    surface = detect_surface(full_text, user_agent, existing_tags)
    platform = detect_platform(full_text, user_agent, existing_tags)
    product_area = detect_product_area(full_text, existing_tags)
    c50_feature = detect_c50_feature(full_text) if surface['name'] == 'C50' else None
    priority = determine_priority(full_text)
    issue_type = determine_issue_type(full_text)
    modality = detect_modality(full_text)
    assignment = determine_assignment(surface, platform, product_area)

    tags_to_add = generate_tags(surface, platform, product_area, modality, existing_tags)
    new_title = generate_title(title, surface, platform, c50_feature, app_version)
    analysis = generate_analysis(surface, platform, product_area, modality, issue_type, app_version)
    comment = generate_comment(task_data.get('taskId', ''), surface, platform, product_area, assignment, analysis, app_version, priority)

    return {
        'taskId': task_data.get('taskId', ''),
        'originalTitle': title,
        'surface': surface['name'],
        'platform': platform,
        'productArea': product_area['name'],
        'issueType': issue_type,
        'modality': modality,
        'priority': priority,
        'assignment': assignment,
        'tags': tags_to_add,
        'newTitle': new_title,
        'analysis': analysis,
        'comment': comment,
        'appVersion': app_version,
        'actions': [
            {'text': 'Update task title', 'value': 'See above' if new_title else 'N/A'},
            {'text': 'Add tags', 'value': ', '.join(tags_to_add)},
            {'text': 'Set assignment', 'value': assignment},
            {'text': 'Add triage comment', 'value': 'Copy from above'},
            {'text': 'Verify priority', 'value': 'Review impact'}
        ]
    }


# =============================================================================
# HTTP SERVER
# =============================================================================

class TriageHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.dirname(os.path.abspath(__file__)), **kwargs)

    def do_GET(self):
        if self.path == '/':
            self.path = '/triage-tool.html'
        elif self.path == '/api/health':
            self.send_json_response({'status': 'ok', 'authConfigured': bool(auth_cookie)})
            return
        return super().do_GET()

    def do_POST(self):
        global auth_cookie
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)

        try:
            data = json.loads(post_data) if post_data else {}
        except json.JSONDecodeError:
            data = {}

        if self.path == '/api/auth':
            cookie = data.get('cookie', '')
            if cookie:
                auth_cookie = cookie
                self.send_json_response({'success': True, 'message': 'Auth saved'})
            else:
                self.send_error_response(400, 'Cookie required')
            return

        elif self.path == '/api/triage':
            task_id = data.get('taskId', '')
            if not task_id:
                self.send_error_response(400, 'Task ID required')
                return

            clean_id = task_id.replace('T', '').replace('t', '')
            formatted_id = f'T{clean_id}'

            print(f"[TRIAGE] Fetching task {formatted_id}...")

            # For now, return a mock response since we can't easily fetch from Meta's API
            # In production, this would make an authenticated request to Meta's internal API
            task_data = {
                'taskId': formatted_id,
                'title': f'Task {formatted_id}',
                'description': 'Unable to fetch task data. Please use manual input mode or configure authentication.',
                'tags': []
            }

            result = triage_task_data(task_data)
            self.send_json_response({'success': True, 'data': result})
            return

        elif self.path == '/api/triage/direct':
            if not data.get('taskId'):
                self.send_error_response(400, 'Task data with taskId required')
                return

            result = triage_task_data(data)
            self.send_json_response({'success': True, 'data': result})
            return

        self.send_error_response(404, 'Not found')

    def send_json_response(self, data, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

    def send_error_response(self, status, message):
        self.send_json_response({'error': message}, status)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def log_message(self, format, *args):
        print(f"[{self.log_date_time_string()}] {args[0]}")


def main():
    with socketserver.TCPServer(("", PORT), TriageHandler) as httpd:
        print(f"""
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🔍 Meta AI Triage Tool Server (Python)                      ║
║                                                               ║
║   Server running at: http://localhost:{PORT}                   ║
║                                                               ║
║   Open http://localhost:{PORT} in your browser to start       ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
        """)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n[SERVER] Shutting down...")


if __name__ == '__main__':
    main()
