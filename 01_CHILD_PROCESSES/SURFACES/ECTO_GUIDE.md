# Ecto Meta.ai Bug Triage Operations Guide

> **Your mission**: Efficiently triage bugs, gather context for Engineering, and enable rapid fixes for the Meta AI website (Ecto).
> **Last Updated**: Dec 10, 2025
> **Document POC**: Sargam Tahiliani
> **Audience**: Triage Specialists

---

## Quick Reference

| Resource | Link/Command | Purpose |
|----------|-------------|---------|
| **Meta.ai** | [meta.ai](https://meta.ai) | Repro environment |
| **Sentry** | ⚠️ TBD | Error tracking & traces |
| **UDT Flow** | TBD | Automated triage routing |
| **Triage Skill** | `.llms/skills/triage/ECTO_SKILL.md` | Automated triage workflow |

---

## Product Overview

**Ecto** is the Meta AI website experience at [meta.ai](https://meta.ai).

### Surface

| Surface | Description | Platform |
|---------|-------------|----------|
| **Ecto** | Meta AI website | Web (Desktop & Mobile browsers) |

---

## Triage Categories & Features

### Feature Routing Matrix

> **Note**: Features marked "Upforgrabs" are unowned and should be picked up by available engineers.

| Feature | Tag | Owner | Description |
|---------|-----|-------|-------------|
| **MediaGen** | `MetaAI_Ecto_MediaGen` | *See Media Guide* | Generate and share media content (images, videos, music), including Remix flow |
| **Personalization** | `MetaAI_Ecto_Personalization` | *See Personalization Guide* | Tailor content and recommendations to user preferences |
| **Growth (QP, Upsells)** | `MetaAI_Ecto_Growth` | *See Growth Guide* | User engagement and retention through promotions |
| **Sharing (Share to FoA)** | `MetaAI_Ecto_Sharing` | *See Growth Guide* | Share content across platforms and apps |
| **AI Search** | `MetaAI_Ecto_Search` | *See Search Guide* | AI-powered search results |
| **Immersive Feed** | `MetaAI_Ecto_immersivefeed` | Upforgrabs | Issues arising from the new revamped Feed showing video only posts |
| **Video Controls** | `MetaAI_Ecto_videocontrols` | Upforgrabs | Issues when users try to like, limit/allow all comments, share, remix videos of the feed |
| **Assistant UI (Minus Feed)** | `MetaAI_Ecto_AssistantUI` | Upforgrabs | Issues related to the user interface of the Assistant feature, excluding the feed component |
| **Profile** | `MetaAI_Ecto_Profile` | Upforgrabs | Problems with the profile section, including issues with editing or viewing personal information |
| **Video Public Post Lightbox** | `MetaAI_Ecto_videoLightbox` | Upforgrabs | Bugs or usability issues with the video public post lightbox feature |
| **Video Comments** | `MetaAI_Ecto_videocomments` | Upforgrabs | Issues with leaving, viewing or sorting comments on video posts |
| **Post Video to Feed** | `MetaAI_Ecto_postVideotofeed` | Upforgrabs | Problems with sharing videos directly to the user's feed |
| **Navigation** | `MetaAI_Ecto_navigation` | Upforgrabs | Issues with the overall navigation system, including problems with menus, buttons, or other interactive elements |
| **Login** | `MetaAI_Ecto_login` | Upforgrabs | Problems with logging into the platform, including issues with credentials or authentication |
| **Logged-Out Flow** | `MetaAI_Ecto_loggedoutflow` | Upforgrabs | Issues with using the platform while logged out, including limitations or restrictions |
| **Composer** | `MetaAI_Ecto_composer` | Upforgrabs | Bugs or usability issues with the composer tool, including problems with creating new content |
| **Notifications** | `MetaAI_Ecto_notifications` | Upforgrabs | Issues with alerts or messages that inform users of important events or updates within the platform |
| **Voice** | `MetaAI_Ecto_voice` | Upforgrabs | Problems with using voice commands or dictation to interact with the platform |
| **Auth (Auth.meta.com)** | `c50-access-Ecto` | Upforgrabs | Issues with the authentication system used to verify user identities and grant access to the platform |
| **Accessibility** | `MetaAI_Ecto_accessibility` | Upforgrabs | Problems with features or settings designed to make the platform more usable for people with disabilities |
| **Settings** | `MetaAI_Ecto_settings` | Upforgrabs | Issues with options or preferences that allow users to customize their experience on the platform |
| **Personalized Proactive Feed** | `MetaAI_Ecto_personalizedfeed` | Upforgrabs | Issues relating to the users personalized proactive feed |
| **Something Went Wrong** | `MetaAI_Ecto_something_went_wrong` | Upforgrabs | When the user experiences the "Something went wrong" error message |
| **Private Link Sharing** | `MetaAI_Ecto_private_link_sharing` | Upforgrabs | Sharing private links from Ecto that could contain non-public media, conversations |
| **Conversation Starters** | `MetaAI_Ecto_conversation_starters` | Upforgrabs | Prompt suggestions displayed on the Meta AI homepage that help users quickly engage with the AI assistant |
| **Latency** | `MetaAI2.0-Latency` | Upforgrabs | The delay between when a user submits a prompt and when the response (text or media) begins to appear on their screen, with high latency negatively impacting user experience |
| **Projects** | `MetaAI2.0-Projects`, `MetaAI_Ecto_Projects` | metaai_project_developers | Projects lets you group related chats, files, and custom instructions in one place. Whether you're managing ongoing work like tracking health results or planning a trip, Projects keeps everything tidy and easily accessible |
| **History** | `MetaAI_Ecto_Conversation_History` | Upforgrabs | The sidebar is where users can revisit their previous exchanges with Meta AI, pin important conversations, etc |
| **Other** | `MetaAI_Ecto_other` | Upforgrabs | A catch-all category for issues that don't fit into any of the above categories |

> **Additional Note**: For all Meta.ai tasks, the mention of "Build" in the Task template should be removed before completing triage.

### Key Contacts Quick Reference

| Name | Role | Area |
|------|------|------|
| **Sargam Tahiliani** | Document POC | Triage Guide Owner |
| **TBD** | MediaGen Lead | Media Generation |
| **TBD** | Search Lead | AI Search |
| **TBD** | Voice Lead | Voice Features |
| **TBD** | Auth Lead | Authentication |
| **TBD** | Feed Lead | Immersive Feed |

---

## Priority Definitions

| Priority | Criteria | Examples |
|----------|----------|----------|
| **High** | Experience completely or significantly broken. User cannot complete flow/chat, or significantly degraded core feature. Reliability/Infrastructure issues. Logging issues. Access issues. UI/UX bugs impacting retention/engagement. Has reproducibility indication. | Site down, login broken, core chat broken, high latency |
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
         ├─── Is it related to Characters, Media, Personalization, or Search?
         │    └── YES → Switch to specific feature guide:
         │         ├── Characters → Characters Triage Guide
         │         ├── Media → Media Generation Triage Guide
         │         ├── Personalization → Personalization Triage Guide
         │         └── Search → Meta AI Search Triage Guide
         │
         ├─── For ECTO product issues, continue below:
         │
         ├─── Can you reproduce on meta.ai?
         │    ├── YES → Document repro steps
         │    └── NO → Mark as "Does Not Repro"
         │
         ├─── Identify the FEATURE (see Feature Routing Matrix):
         │
         ├─── Is it a "Something Went Wrong" error?
         │    └── YES → Capture the error ID after the message
         │         └── Only merge if error IDs match
         │         └── Tag: MetaAI_Ecto_something_went_wrong
         │
         ├─── Is it Authentication related (login, auth.meta.com)?
         │    └── YES → Tag: c50-access-Ecto (auth) or MetaAI_Ecto_login
         │
         ├─── Is it Voice related?
         │    └── YES → Tag: MetaAI_Ecto_voice
         │
         ├─── Is it Feed/Video related?
         │    └── YES → Determine specific feature:
         │         ├── Immersive Feed → MetaAI_Ecto_immersivefeed
         │         ├── Video Controls → MetaAI_Ecto_videocontrols
         │         ├── Video Comments → MetaAI_Ecto_videocomments
         │         └── Post Video → MetaAI_Ecto_postVideotofeed
         │
         ├─── Is it UI/Navigation related?
         │    └── YES → Tag: MetaAI_Ecto_AssistantUI or MetaAI_Ecto_navigation
         │
         ├─── Is it Latency/Performance related?
         │    └── YES → Tag: MetaAI2.0-Latency
         │
         ├─── Is it Projects related?
         │    └── YES → Tag: MetaAI2.0-Projects, MetaAI_Ecto_Projects
         │         └── Owner: metaai_project_developers
         │
         └─── Default: MetaAI_Ecto_other (add tags and routing manually)
```

---

## Escalation Path

```
┌─────────────────────────────────────────────────────────────────┐
│  L1: Triage Specialist                                          │
│  • Initial triage & categorization                              │
│  • Feature identification via UDT                               │
│  • Repro attempt on meta.ai                                     │
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

### Step 2: Repro Attempt

**Attempt to reproduce on [meta.ai](https://meta.ai)**

- [ ] Can you reproduce the issue?
- [ ] What browser/device was used?
- [ ] What are the exact steps?
- [ ] Is it consistent or intermittent?

### Step 3: Identify the Feature

Use the Feature Routing Matrix above to identify which feature is affected.

**Task Title Format:**
```
[Ecto][Feature] Summary of the issue
```

> **Note**: No need to include Build information for Ecto tasks.

Examples:
```
[Ecto][Voice] Voice input not responding after first prompt
[Ecto][Immersive Feed] Videos not loading in feed
[Ecto][Projects] Cannot create new project folder
```

### Step 4: Complete Triage via UDT

1. **Tag** - Apply appropriate feature tag
2. **Prioritize** - Use priority schema (High/Medium/Low/Wishlist)
3. **Assign Owner** - Route to feature owner

### Step 5: KP Merge Process

> ⚠️ **Important**: Only merge bugs if the issue reported is the SAME.

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

| Priority | Tag | Owner | Surface |
|:--------:|:---:|:-----:|:-------:|
| **[High/Med/Low]** | `Ecto_[Feature]` | @Name | Ecto (Web) |

**Issue**: [1-sentence description]

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
| **Tag** | `Ecto_[Feature]` |
| **Owner** | @Name |
| **Surface** | Ecto (Web) |
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

1. Go to [meta.ai](https://meta.ai)
2. [Step 2]
3. [Step 3]
4. **Expected**: [What should happen]
5. **Actual**: [What actually happens]

───────────────────────────────────────────────────

### Environment

| Field | Value |
|-------|-------|
| **Browser** | [Chrome/Safari/Firefox/Edge] |
| **Device** | [Desktop/Mobile] |
| **OS** | [Windows/macOS/iOS/Android] |
| **Logged In** | Yes / No |

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

### Authentication Issues (Login, Auth)

**Symptoms**: Login failures, "Session expired", auth errors, redirect loops

**Investigation**:
1. Check if user is using auth.meta.com or direct login
2. Verify browser cookies/storage
3. Check for OAuth/SSO issues
4. Test across different browsers

**Tags**: `Ecto_Login`, `Ecto_Auth`

### Voice Issues

**Symptoms**: Voice input not working, speech recognition fails, no audio output

**Investigation**:
1. Check microphone permissions in browser
2. Test voice pipeline
3. Check for browser-specific issues (Chrome vs Safari)
4. Verify user's device has microphone access

**Tag**: `Ecto_Voice`

### "Something Went Wrong" Errors

**Symptoms**: User sees generic "Something went wrong" error

**Investigation**:
1. **Capture the error ID** displayed after the message
2. Check for patterns (specific actions, times, user types)
3. Look for related Sentry errors

**Important**: Only merge bugs with **identical error IDs**

**Tag**: `Ecto_SWW`

### Feed/Video Issues

**Symptoms**: Video not playing, feed not loading, video controls broken

**Investigation**:
1. Identify which video feature is affected
2. Check browser video codec support
3. Test on different network conditions
4. Verify user permissions for video features

**Tags**: `Ecto_Immersive_Feed`, `Ecto_Video_Controls`, `Ecto_Video_Comments`, `Ecto_Post_Video`

### Latency Issues

**Symptoms**: Slow responses, delayed text/media generation

**Investigation**:
1. Check user's network conditions
2. Verify if it's text latency vs media latency
3. Check for server-side performance issues
4. Compare against expected response times

**Tag**: `Ecto_Latency`

### Composer Issues

**Symptoms**: Cannot create content, composer not responding, input issues

**Investigation**:
1. Check browser console for JS errors
2. Test with different input methods
3. Verify clipboard/paste functionality
4. Check for character limit issues

**Tag**: `Ecto_Composer`

### Projects/History Issues

**Symptoms**: Projects not saving, history missing, conversations not accessible

**Investigation**:
1. Verify user is logged in
2. Check if issue is with creation vs retrieval
3. Test project/history syncing
4. Look for storage/persistence issues

**Tags**: `Ecto_Projects`, `Ecto_History`

---

## Related Triage Guides

| Guide | When to Use |
|-------|-------------|
| **Model Quality Guide** | AI response issues, hallucinations, wrong answers |
| **Media Generation Guide** | MediaGen, Remix, image/video generation |
| **Personalization Guide** | User preference, recommendation issues |
| **Meta AI Search Guide** | AI Search functionality |
| **Characters Guide** | Character-related issues |
| **Growth & Sharing Guide** | QP, Upsells, Share to FoA |

---

## Configuration Checklist

- [ ] Clone relevant codebase
- [ ] Owner routing matrix filled in
- [ ] UDT flow configured
- [ ] Sentry configured and integrated
- [ ] Triage skill created (`.llms/skills/triage/ECTO_SKILL.md`)
- [ ] Test with 10+ real bugs

---

## Communication Templates

### For Reporters

```
Thanks for reporting this! I've triaged the bug with the following details:

🏷️ **Feature**: [Feature]
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

The fix is now live. Please verify the issue is resolved on your end.
```

---

*Last updated: Dec 10, 2025*
*Document POC: Sargam Tahiliani*

---

*This guide is part of the Meta AI Triage System.*
