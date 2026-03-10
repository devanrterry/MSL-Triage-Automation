# C50 Meta AI App Bug Triage Operations Guide

> **Your mission**: Efficiently triage bugs, gather context for Engineering, and enable rapid fixes for the Meta AI App (C50).

---

## Quick Reference

| Resource | Link/Command | Purpose |
|----------|-------------|---------|
| **Meta AI App** | iOS App Store / Google Play | Repro environment |
| **iOS Codebase** | `fbsource/fbobjc/Libraries/FWA/Features/Silverstone/` | iOS source code |
| **Android Codebase** | `fbsource/fbandroid/java/com/facebook/wearable/companion/silverstone/` | Android source code |
| **Sentry** | ⚠️ TBD | Error tracking & traces |
| **UDT Flow** | TBD | Automated triage routing |
| **Triage Skill** | `.llms/skills/triage/C50_SKILL.md` | Automated triage workflow |

---

## Product Overview

**C50** is the Meta AI standalone mobile application available on iOS and Android.

### Surface

| Surface | Description | Platform |
|---------|-------------|----------|
| **C50** | Meta AI standalone app | iOS & Android |

---

## Triage Categories & Features

### Feature Routing Matrix

> **Note**: Features marked with `silverstone_ios + silverstone_Android` are assigned to the Silverstone team.

| Feature | Tag(s) | Owner | Description |
|---------|--------|-------|-------------|
| **Sidebar** | `c50-sidebar` | silverstone_ios + silverstone_Android | Primary navigation to all app destinations (Media, Notifications, History, Settings, Profile) |
| **App Navigation (Production)** | `c50-AppNavigation` | silverstone_ios + silverstone_Android | Sliding panel for quick access to Home, Explore, Library via hamburger icon or swipe |
| **App Navigation 2.0** | `MetaAI2.0-NavIA`, `c50-NavIA2.0`, `MetaAI2.0` | silverstone_ios + silverstone_Android | New Navigation menu for MetaAI 2.0 |
| **Convo Starters** | `c50-convostarters` | silverstone_ios + silverstone_Android | Starter prompts shown when opening a MetaAI chat thread |
| **Settings** | `c50-settings` | silverstone_ios + silverstone_Android | Controls for app, Meta AI, and individual devices |
| **Account** | `c50-account` | silverstone_ios + silverstone_Android | Personal information, settings, and preferences management |
| **Integrity** | `c50-integrity` | silverstone_ios + silverstone_Android | Content moderation tools (block, report, flag content) |
| **Composer** | `c50-composer`, `MetaAI2.0` | silverstone_ios + silverstone_Android | Prompt box - primary interface for interacting with Meta AI |
| **Notification** | `c50-notifications` | silverstone_ios + silverstone_Android | Device notifications, notifications tab UI, push notifications |
| **History** | `c50-history` | silverstone_ios + silverstone_Android | Previous exchanges with Meta AI, pin important conversations |
| **People Search** | `c50-peoplesearch` | silverstone_ios + silverstone_Android | Find and connect with others within the app |
| **Login** | `c50-login` | silverstone_ios + silverstone_Android | Login process via Instagram/Facebook through Account Center |
| **NUX** | `c50-nux` | silverstone_ios + silverstone_Android | New User Experience - welcome & migration screens |
| **Growth (QP, Upsells)** | `c50-growth` | *See Growth Guide* | User acquisition, engagement, retention, Quick Promotions |
| **FOA Sharing** | `c50-foa-sharing` | *See Growth Guide* | Share content within and beyond Meta ecosystem |
| **Read Aloud** | `c50-read-aloud` | silverstone_ios + silverstone_Android | Text-to-speech for AI-generated content |
| **Multi Image/Video Upload** | `c50-multi-image-video-upload`, `MetaAI2.0` | silverstone_ios + silverstone_Android | Upload multiple images/videos at once |
| **File Upload** | `c50-file-upload`, `MetaAI2.0` | silverstone_ios + silverstone_Android | Upload files to the app |
| **1P Citations** | `c50-1p-citations`, `MetaAI2.0` | silverstone_ios + silverstone_Android | Citations of 1st party content in Zeitgeist responses |
| **Text Select/Copy** | `c50-text-select-copy`, `MetaAI2.0` | silverstone_ios + silverstone_Android | Select and copy written text |
| **Incognito Mode** | `c50-incognito-mode`, `MetaAI2.0` | silverstone_ios + silverstone_Android | Incognito chats that won't appear in memory |
| **Dictation** | `c50-dictation` | silverstone_ios + silverstone_Android | Speak prompts to Meta AI, transcribed to text |
| **Something Went Wrong** | `c50-something-went-wrong` | silverstone_ios + silverstone_Android | "Something went wrong" error messages (red text) |
| **Response UX - Formatting** | `c50-core-ux-formatting`, `MetaAI2.0` | silverstone_ios + silverstone_Android | UX issues from model's response formatting |
| **Mode - Fast** | `c50-mode-fast`, `MetaAI2.0` | silverstone_ios + silverstone_Android | Fast model option for quick responses |
| **Mode - Thinking** | `c50-mode-thinking`, `MetaAI2.0` | silverstone_ios + silverstone_Android | Thinking model option for better answers |
| **Global Search** | `c50-global-search`, `MetaAI2.0` | silverstone_ios + silverstone_Android | Search through previous conversations and topics |
| **Stop Generation** | `c50-stop-generation`, `MetaAI2.0` | silverstone_ios + silverstone_Android | Stop generation process via square icon |
| **Basic Regenerate** | `c50-basic-regenerate`, `MetaAI2.0` | silverstone_ios + silverstone_Android | Regenerate the response |
| **Partial Reply** | `c50-partial-reply`, `MetaAI2.0` | silverstone_ios + silverstone_Android | Select part of response for follow-up prompts |
| **Chain of Thought** | `c50-chain-of-thought`, `MetaAI2.0` | silverstone_ios + silverstone_Android | Pop-up showing reasoning process |
| **Latency** | `MetaAI2.0-Latency` | silverstone_ios + silverstone_Android | Response delay issues |
| **Projects** | `MetaAI2.0-Projects` | metaai_project_developers | Group related chats, files, custom instructions |
| **Other** | `c50-other`, `MetaAI2.0` | silverstone_ios + silverstone_Android | Issues not fitting other categories |

### Voice Features

| Feature | Tag(s) | Owner | Description |
|---------|--------|-------|-------------|
| **LiveAI** | `voice-liveai-c50` | meta_ai_voice_backend | Real-time Meta AI voice session (live, streaming conversation) |
| **ImmersiveUX** | `voice-immersiveUX` | meta_ai_voice_backend | Full-screen immersive voice "call" UI experience |
| **Other Voice** | `c50-voice` | meta_ai_voice_backend | Other voice-related issues |

> **Voice Model Issues**: Tag with `AI-Model-Umbrella`, `MetaAI_Model`, `MetaAI_Voice`
> **Voice Product Issues**: Tag with `AI-Model-Umbrella`, `MetaAI_Voice`, `MetaAI_Product`, `c50-voice`

### Key Contacts Quick Reference

| Name | Role | Area |
|------|------|------|
| **Sargam Tahiliani** | Document POM | Triage Guide Owner |
| **TBD** | Silverstone iOS Lead | iOS Features |
| **TBD** | Silverstone Android Lead | Android Features |
| **TBD** | Voice Lead | Voice Features |
| **TBD** | Projects Lead | Projects |

---

## Priority Definitions

| Priority | Criteria | Examples |
|----------|----------|----------|
| **High** | Experience completely or significantly broken. User cannot complete flow/chat, or significantly degraded core feature. Reliability/Infrastructure issues. Logging issues. Access issues. UI/UX bugs impacting retention/engagement. Has reproducibility indication. | App crash, login broken, core chat broken, high latency |
| **Medium** | Bugs making flow inconvenient but not blocking. UI/UX optimizations. Accessibility features. Blocking but cannot repro and no multiple reports. | Minor UI glitches, accessibility improvements |
| **Low** | Bugs with temporary workaround not impacting end-user goals. Suggestions, polish, improvements that are nice to have. | Minor improvements, polish |
| **Wishlist** | Feedback not immediately actionable, nice to have, ideas for next iteration. | Feature requests, future ideas |

---

## Triage Decision Tree

```
START: New bug report received
         │
         ├─── Is it a MODEL QUALITY issue?
         │    └── YES → Switch to Model Quality Guide & Text Expander
         │
         ├─── Is it related to Characters, Media, Personalization, Search, or Zeitgeist?
         │    └── YES → Switch to specific feature guide:
         │         ├── Characters → Characters Triage Guide
         │         ├── Media → Media Generation Triage Guide
         │         ├── Personalization → Personalization Triage Guide
         │         ├── Search → Meta AI Search Triage Guide
         │         └── Zeitgeist → Zeitgeist Triage Guide
         │
         ├─── For C50 product issues, continue below:
         │
         ├─── Can you reproduce on Meta AI App?
         │    ├── YES → Document repro steps (include platform & app version)
         │    └── NO → Mark as "Does Not Repro"
         │
         ├─── Identify the FEATURE (see Feature Routing Matrix):
         │
         ├─── Is it a VOICE issue?
         │    └── YES → Determine voice type:
         │         ├── Model/Backend Issue → AI-Model-Umbrella, MetaAI_Model, MetaAI_Voice
         │         └── Product/UI Issue → Identify specific feature:
         │              ├── LiveAI → voice-liveai-c50
         │              ├── ImmersiveUX → voice-immersiveUX
         │              └── Other → c50-voice
         │
         ├─── Is it a "Something Went Wrong" error (red text)?
         │    └── YES → Capture the error ID after the message
         │         └── Only merge if error IDs match
         │         └── Tag: c50-something-went-wrong
         │
         ├─── Is it Login/Authentication related?
         │    └── YES → Tag: c50-login
         │
         ├─── Is it Navigation related?
         │    └── YES → Determine specific feature:
         │         ├── Sidebar → c50-sidebar
         │         ├── Production Navigation → c50-AppNavigation
         │         └── Navigation 2.0 → MetaAI2.0-NavIA, c50-NavIA2.0
         │
         ├─── Is it Composer/Input related?
         │    └── YES → Determine specific feature:
         │         ├── Composer → c50-composer
         │         ├── Dictation → c50-dictation
         │         └── File/Media Upload → c50-file-upload or c50-multi-image-video-upload
         │
         ├─── Is it Response/Output related?
         │    └── YES → Determine specific feature:
         │         ├── Formatting → c50-core-ux-formatting
         │         ├── Read Aloud → c50-read-aloud
         │         ├── Text Select/Copy → c50-text-select-copy
         │         ├── Stop Generation → c50-stop-generation
         │         ├── Regenerate → c50-basic-regenerate
         │         └── Partial Reply → c50-partial-reply
         │
         ├─── Is it Mode Selection related?
         │    └── YES → Determine specific mode:
         │         ├── Fast Mode → c50-mode-fast
         │         ├── Thinking Mode → c50-mode-thinking
         │         └── Chain of Thought → c50-chain-of-thought
         │
         ├─── Is it Latency/Performance related?
         │    └── YES → Tag: MetaAI2.0-Latency
         │
         ├─── Is it Projects related?
         │    └── YES → Tag: MetaAI2.0-Projects
         │         └── Owner: metaai_project_developers
         │
         └─── Default: c50-other, MetaAI2.0 (add tags and routing manually)
```

---

## Escalation Path

```
┌─────────────────────────────────────────────────────────────────┐
│  L1: Triage Specialist                                          │
│  • Initial triage & categorization                              │
│  • Feature identification via UDT                               │
│  • Repro attempt on Meta AI App (iOS & Android)                 │
│  • Documentation & routing                                      │
└─────────────────────┬───────────────────────────────────────────┘
                      │ Escalate when:
                      │ • Technical investigation needed
                      │ • Code fix required
                      │ • High priority severity
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│  L2: Feature Owner (see Feature Routing Matrix)                 │
│  • Technical investigation                                      │
│  • Code fixes                                                   │
│  • Root cause analysis                                          │
│  • Silverstone (iOS/Android) or specific feature team           │
└─────────────────────┬───────────────────────────────────────────┘
                      │ Escalate when:
                      │ • Cross-team coordination needed
                      │ • Major architectural decisions
                      │ • External dependencies blocked
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│  L3: Engineering Leads                                          │
│  • Strategic decisions & resource allocation                    │
│  • TBD                                                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Practical Triage Workflow

### Step 1: Initial Identification

When a bug is received:

1. **Check if Model Quality Issue**
   - If YES → Use Model Quality Guide and Text Expander
   - If NO → Continue with this guide

2. **Check if related to specific features**
   - Characters → Characters Triage Guide
   - Media → Media Generation Triage Guide
   - Personalization → Personalization Triage Guide
   - Search → Meta AI Search Triage Guide
   - Zeitgeist → Zeitgeist Triage Guide

### Step 2: Repro Attempt

**Attempt to reproduce on Meta AI App**

- [ ] Can you reproduce the issue?
- [ ] What platform? (iOS / Android)
- [ ] What app version? (e.g., 235.0.0.0.163)
- [ ] What device model?
- [ ] What are the exact steps?
- [ ] Is it consistent or intermittent?

### Step 3: Identify the Feature

Use the Feature Routing Matrix above to identify which feature is affected.

**Task Title Format:**
```
[c50][Feature][Platform][App Version] Summary of the issue
```

Examples:
```
[c50][Voice][iOS][235.0.0.0.163] LiveAI session disconnects after 30 seconds
[c50][Composer][Android][235.0.0.0.160] Dictation not transcribing voice input
[c50][History][iOS][235.0.0.0.163] Pinned conversations disappear after app restart
```

### Step 4: Complete Triage via UDT

1. **Tag** - Apply appropriate feature tag(s)
2. **Prioritize** - Use priority schema (High/Medium/Low/Wishlist)
3. **Assign Owner** - Route to feature owner (usually silverstone_ios + silverstone_Android)

### Step 5: KP Merge Process

> ⚠️ **Important**: Only merge bugs if the issue reported is the SAME.

**Critical Merge Rules:**
- **Model Quality Tasks**: Do NOT merge unless prompt AND response are exactly the same
- **Do NOT merge** Concord app type into old app version (C50)
- **Error IDs**: Before merging tasks with error messages, ensure Error ID is exactly the same

For "Something Went Wrong" errors:
- Only merge if the **error ID** after the message is identical
- Different error IDs = Different bugs

---

## Triage Output Template

### Quick Triage (Most Bugs)

```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## T[ID] · [Short Title]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

| Priority | Tag | Owner | Surface | Platform |
|:--------:|:---:|:-----:|:-------:|:--------:|
| **[High/Med/Low]** | `c50-[Feature]` | @silverstone | C50 | iOS/Android |

**Issue**: [1-sentence description]

**App Version**: [e.g., 235.0.0.0.163]

**Repro**: ✅ Reproduced / ❌ Could Not Repro / 🔄 Intermittent

**Duplicate**: ✅ No / 🔴 Yes → T[ID]

**Action**: [Single clear next step]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Full Triage (High Priority or Complex Bugs)

```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## T[ID] · [Short Title]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Overview

| Field | Value |
|-------|-------|
| **Priority** | [High/Med/Low] - [brief reason] |
| **Tag** | `c50-[Feature]` |
| **Owner** | @silverstone_ios / @silverstone_Android |
| **Surface** | C50 (Meta AI App) |
| **Platform** | iOS / Android |
| **App Version** | [e.g., 235.0.0.0.163] |
| **Status** | 🔴 Active / 🟡 Fix Pending / ✅ Resolved |

───────────────────────────────────────────────────

### 🔗 Quick Links

| Resource | Link |
|----------|------|
| **Task** | [T{id}](https://www.internalfb.com/T{id}) |
| **Bug** | [{bug_id}](https://www.internalfb.com/intern/bug/{bug_id}/) |
| **Sentry** | [Link if available] / ⚠️ N/A |

───────────────────────────────────────────────────

### Issue

[2-3 sentence description of the problem]

───────────────────────────────────────────────────

### Repro Steps

1. Open Meta AI App on [iOS/Android]
2. App Version: [version]
3. [Step 2]
4. [Step 3]
5. **Expected**: [What should happen]
6. **Actual**: [What actually happens]

───────────────────────────────────────────────────

### Environment

| Field | Value |
|-------|-------|
| **Platform** | iOS / Android |
| **App Version** | [e.g., 235.0.0.0.163] |
| **Device** | [iPhone 15 Pro / Samsung Galaxy S24] |
| **OS Version** | [iOS 17.2 / Android 14] |
| **Logged In** | Yes / No |
| **Account Type** | FB / IG |

───────────────────────────────────────────────────

### Root Cause (If Known)

| Component | Detail |
|-----------|--------|
| **Location** | [File path or "Unknown"] |
| **Cause** | [Brief technical explanation] |
| **Evidence** | [Error message, logs, or commit] |

───────────────────────────────────────────────────

### Recommended Action

> @Owner - [Single clear action with specific guidance]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Feature Playbooks

### Voice Issues

**Symptoms**: Voice input not working, LiveAI disconnects, ImmersiveUX issues, speech recognition fails

**First, determine if Model/Backend or Product issue:**

| Type | Tags | Routing |
|------|------|---------|
| Model/Backend | `AI-Model-Umbrella`, `MetaAI_Model`, `MetaAI_Voice` | Voice Model Team |
| Product/UI | `AI-Model-Umbrella`, `MetaAI_Voice`, `MetaAI_Product`, `c50-voice` | meta_ai_voice_backend |

**Investigation**:
1. Check microphone permissions on device
2. Identify specific voice feature (LiveAI, ImmersiveUX, Dictation)
3. Test on both iOS and Android
4. Check network connectivity
5. Verify app version

**Voice Feature Tags**:
- LiveAI → `voice-liveai-c50`
- ImmersiveUX → `voice-immersiveUX`
- Other → `c50-voice`

### Login/Authentication Issues

**Symptoms**: Login failures, "Session expired", authentication errors, Account Center issues

**Investigation**:
1. Check if user is logging via Instagram or Facebook
2. Verify Account Center connection
3. Test across iOS and Android
4. Check for app version-specific issues
5. Verify network connectivity

**Tag**: `c50-login`

### "Something Went Wrong" Errors (Red Text)

**Symptoms**: User sees generic "Something went wrong" error message

**Investigation**:
1. **Capture the error ID** displayed after the message
2. Check for patterns (specific actions, times, user types)
3. Look for related Sentry errors
4. Test on both platforms

**Important**: Only merge bugs with **identical error IDs**

**Tag**: `c50-something-went-wrong`

### Navigation Issues

**Symptoms**: Sidebar not opening, navigation drawer issues, menu problems

**Investigation**:
1. Identify if Production or 2.0 Navigation
2. Test hamburger icon tap and edge swipe
3. Check on both iOS and Android
4. Verify specific destination accessibility

**Tags**:
- Sidebar → `c50-sidebar`
- Production Navigation → `c50-AppNavigation`
- Navigation 2.0 → `MetaAI2.0-NavIA`, `c50-NavIA2.0`

### Composer/Input Issues

**Symptoms**: Cannot type, prompt box issues, input not registering, dictation problems

**Investigation**:
1. Check keyboard functionality
2. Test dictation separately
3. Verify file/image upload if relevant
4. Check for character limit issues
5. Test on both platforms

**Tags**:
- Composer → `c50-composer`
- Dictation → `c50-dictation`
- File Upload → `c50-file-upload`
- Multi Image/Video → `c50-multi-image-video-upload`

### Response/Output Issues

**Symptoms**: Formatting issues, read aloud not working, can't copy text, generation problems

**Investigation**:
1. Identify specific response feature affected
2. Check if issue is with specific content types
3. Test stop/regenerate functionality
4. Verify text selection behavior

**Tags**:
- Formatting → `c50-core-ux-formatting`
- Read Aloud → `c50-read-aloud`
- Text Select/Copy → `c50-text-select-copy`
- Stop Generation → `c50-stop-generation`
- Regenerate → `c50-basic-regenerate`
- Partial Reply → `c50-partial-reply`

### Mode Selection Issues

**Symptoms**: Fast/Thinking mode not working, Chain of Thought display issues

**Investigation**:
1. Identify which mode is affected
2. Check mode switching functionality
3. Verify Chain of Thought popup behavior
4. Compare response quality between modes

**Tags**:
- Fast Mode → `c50-mode-fast`
- Thinking Mode → `c50-mode-thinking`
- Chain of Thought → `c50-chain-of-thought`

### Latency Issues

**Symptoms**: Slow responses, delayed text/media generation, long wait times

**Investigation**:
1. Check user's network conditions
2. Verify if it's text latency vs media latency
3. Compare against expected response times
4. Check for server-side performance issues
5. Test on both platforms

**Tag**: `MetaAI2.0-Latency`

### Projects Issues

**Symptoms**: Projects not saving, can't create projects, files not uploading to projects

**Investigation**:
1. Verify user is logged in
2. Check if issue is with creation vs retrieval
3. Test project/conversation syncing
4. Look for storage/persistence issues

**Tag**: `MetaAI2.0-Projects`
**Owner**: metaai_project_developers

### History Issues

**Symptoms**: History missing, conversations not accessible, pinning not working

**Investigation**:
1. Verify user is logged in
2. Check sync status
3. Test pin/unpin functionality
4. Look for display vs storage issues

**Tag**: `c50-history`

### Incognito Mode Issues

**Symptoms**: Incognito not activating, chats appearing in history, mode indicator missing

**Investigation**:
1. Verify incognito mode toggle
2. Check if chats are properly excluded from history
3. Test mode switching

**Tag**: `c50-incognito-mode`

---

## Related Triage Guides

| Guide | When to Use |
|-------|-------------|
| **Model Quality Guide** | AI response issues, hallucinations, wrong answers |
| **Media Generation Guide** | MediaGen, Remix, image/video generation |
| **Personalization Guide** | User preference, recommendation issues |
| **Meta AI Search Guide** | AI Search functionality |
| **Characters Guide** | Character-related issues |
| **Zeitgeist Guide** | Zeitgeist-related issues |
| **Growth & Sharing Guide** | QP, Upsells, FOA Sharing |
| **Ecto Guide** | Meta AI Website issues |
| **FoA Guide** | Feed and Messaging Assistant issues |

---

## Configuration Checklist

- [ ] Clone relevant codebase
- [ ] Owner routing matrix filled in
- [ ] UDT flow configured
- [ ] Sentry configured and integrated
- [ ] Triage skill created (`.llms/skills/triage/C50_SKILL.md`)
- [ ] Test with 10+ real bugs

---

## Communication Templates

### For Reporters

```
Thanks for reporting this! I've triaged the bug with the following details:

🏷️ **Feature**: [Feature]
📱 **Platform**: [iOS/Android]
📦 **App Version**: [Version]
👤 **Owner**: @[Name]
⏱️ **Priority**: [High/Med/Low]

We'll keep you posted on progress.
```

### For Owner Escalation

```
🚨 **Bug Escalation**

**Task**: T[ID] - [brief description]
**Severity**: [High/Med/Low]
**Feature**: [Feature name]
**Platform**: [iOS/Android]
**App Version**: [Version]
**Impact**: [X users affected / feature blocked]

**Quick Links**:
- Task: [link]
- Sentry: [link if available]

Please advise on fix approach.
```

### For Resolution

```
✅ **Bug Resolved**

**Task**: T[ID]
**Fix**: [Diff/PR link]
**Deployed**: [timestamp]
**App Version**: [Version with fix]

The fix is now live. Please update to the latest app version and verify the issue is resolved.
```

---

*Last updated: March 2026*
*Document POM: Sargam Tahiliani*
