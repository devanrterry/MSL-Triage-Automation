# FoA (Feed & Messaging Assistant) Bug Triage Operations Guide

> **Your mission**: Efficiently triage bugs, gather context for Engineering, and enable rapid fixes for Meta AI on Facebook, Instagram, WhatsApp, and Messenger.

---

## Quick Reference

| Resource | Link/Command | Purpose |
|----------|-------------|---------|
| **Facebook** | [facebook.com](https://facebook.com) | Repro environment (FB) |
| **Instagram** | [instagram.com](https://instagram.com) | Repro environment (IG) |
| **WhatsApp** | WhatsApp App | Repro environment (WA) |
| **Messenger** | Messenger App | Repro environment (MSGR) |
| **Sentry** | ⚠️ TBD | Error tracking & traces |
| **UDT Flow** | [UDT Form](https://www.internalfb.com/butterfly/form/749148824511801) | Automated triage routing |

---

## Product Overview

**FoA (Feed & Messaging Assistant)** refers to Meta AI integrated within the Family of Apps - Facebook, Instagram, WhatsApp, and Messenger.

### Surfaces

| Surface | Description | Platform |
|---------|-------------|----------|
| **FB** | Meta AI on Facebook | iOS, Android, Web |
| **IG** | Meta AI on Instagram | iOS, Android, Web |
| **WA** | Meta AI on WhatsApp | iOS, Android |
| **MSGR** | Meta AI on Messenger | iOS, Android, Web |

---

## Triage Categories & Features

### Feature Routing Matrix

| Feature | Tag | Owner | Description |
|---------|-----|-------|-------------|
| **Characters** | `MetaAI_Characters` | *See Characters Guide* | AI-generated characters, immersive experiences |
| **Media Generation** | `MetaAI_MediaGen` | *See Media Guide* | Generate and share media content |
| **Personalization** | `MetaAI_Personalization` | *See Personalization Guide* | Tailor content to user preferences |
| **Search** | `MetaAI_Search` | *See Search Guide* | AI-powered search results |
| **Growth** | `MetaAI_Growth` | *See Growth/Sharing/Ranking Guide* | User engagement and retention |
| **Sharing** | `MetaAI_Sharing` | *See Growth/Sharing/Ranking Guide* | Share content across platforms |
| **Other** | `MetaAI_FoA_Other` | FoA Oncall | Issues not fitting other categories |

### Key Contacts Quick Reference

| Name | Role | Area |
|------|------|------|
| **Rishi Shah** | POM | FoA Triage Guide |
| **TBD** | FB Lead | Facebook Meta AI |
| **TBD** | IG Lead | Instagram Meta AI |
| **TBD** | WA Lead | WhatsApp Meta AI |
| **TBD** | MSGR Lead | Messenger Meta AI |

---

## Priority Definitions

| Priority | Criteria | Examples |
|----------|----------|----------|
| **High** | Experience completely or significantly broken. User cannot complete flow/chat, or significantly degraded core feature. Reliability/Infrastructure issues. Logging issues. Access issues. UI/UX bugs impacting retention/engagement. Has reproducibility indication. | App crash, core chat broken, high latency |
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
         ├─── For FoA product issues, continue below:
         │
         ├─── Identify the APP (FB, IG, WA, MSGR)
         │
         ├─── Can you reproduce on the app?
         │    ├── YES → Document repro steps (include platform & app version)
         │    └── NO → Mark as "Does Not Repro"
         │
         ├─── Identify the FEATURE (see Feature Routing Matrix)
         │
         ├─── Is it a UI/UX issue specific to the app?
         │    └── YES → May need TOT to app-specific pod (WhatsApp, etc.)
         │
         └─── Complete triage via UDT
              └── Tag, prioritize, assign owner
```

---

## Escalation Path

```
┌─────────────────────────────────────────────────────────────────┐
│  L1: Triage Specialist                                          │
│  • Initial triage & categorization                              │
│  • Feature identification via UDT                               │
│  • Repro attempt on FB/IG/WA/MSGR                               │
│  • Documentation & routing                                      │
└─────────────────────┬───────────────────────────────────────────┘
                      │ Escalate when:
                      │ • Technical investigation needed
                      │ • Code fix required
                      │ • High priority severity
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│  L2: Feature Owner / App Team                                   │
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

**Attempt to reproduce on the appropriate app**

- [ ] Which app? (FB / IG / WA / MSGR)
- [ ] Can you reproduce the issue?
- [ ] What platform? (iOS / Android / Web)
- [ ] What app version?
- [ ] What are the exact steps?
- [ ] Is it consistent or intermittent?

### Step 3: Identify the Feature

Use the Feature Routing Matrix above to identify which feature is affected.

**Task Title Format:**
```
[App][Platform][Feature][App Version] Summary of the issue
```

Examples:
```
[IG][iOS][Characters][v302.0.0.1] Character responses not loading
[FB][Android][MediaGen][v450.0.0.1] Image generation fails with error
[WA][iOS][Search][v25.10.1] Search results not displaying
```

**Note**: For Web platform, omit the app version section to avoid redundancy.

### Step 4: Complete Triage via UDT

1. **Tag** - Apply appropriate feature tag(s)
2. **Prioritize** - Use priority schema (High/Medium/Low/Wishlist)
3. **Assign Owner** - Route to feature owner or app-specific oncall

### Step 5: KP Merge Process

> ⚠️ **Important**: Only merge bugs if the issue reported is the SAME.

**Critical Merge Rules:**
- **Model Quality Tasks**: Do NOT merge unless prompt AND response are exactly the same
- **Error IDs**: Before merging tasks with error messages, ensure Error ID is exactly the same

---

## Triage Output Template

### Quick Triage (Most Bugs)

```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## T[ID] · [Short Title]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

| Priority | Tag | Owner | Surface | Platform |
|:--------:|:---:|:-----:|:-------:|:--------:|
| **[High/Med/Low]** | `MetaAI_[Feature]` | @Oncall | FoA ([App]) | iOS/Android/Web |

**Issue**: [1-sentence description]

**App Version**: [e.g., v302.0.0.1]

**Repro**: ✅ Reproduced / ❌ Could Not Repro / 🔄 Intermittent

**Duplicate**: ✅ No / 🔴 Yes → T[ID]

**Action**: [Single clear next step]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## TOT (Triage Ownership Transfer) Notes

FoA bugs may need to be transferred to app-specific pods:

| App | TOT Destination | When to TOT |
|-----|-----------------|-------------|
| **WhatsApp** | WhatsApp Pod | UI/UX bugs specific to WA |
| **Messenger** | Messenger Pod | UI/UX bugs specific to MSGR |
| **Instagram** | Instagram Pod | UI/UX bugs specific to IG |
| **Facebook** | Facebook Pod | UI/UX bugs specific to FB |

> Follow the TOT process outlined in the [GenAI TOT Guide](../02_TOT_GUIDE/TOT_GUIDE.md)

---

## Related Triage Guides

| Guide | When to Use |
|-------|-------------|
| **Model Quality Guide** | AI response issues, hallucinations, wrong answers |
| **Media Generation Guide** | MediaGen, Remix, image/video generation |
| **Personalization Guide** | User preference, recommendation issues |
| **Meta AI Search Guide** | AI Search functionality |
| **Characters Guide** | Character-related issues |
| **Growth/Sharing/Ranking Guide** | QP, Upsells, Sharing, Ranking |
| **C50 Guide** | Meta AI App issues |
| **Ecto Guide** | Meta AI Website issues |

---

## Communication Templates

### For Reporters

```
Thanks for reporting this! I've triaged the bug with the following details:

🏷️ **Feature**: [Feature]
📱 **App**: [FB/IG/WA/MSGR]
📱 **Platform**: [iOS/Android/Web]
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
**App**: [FB/IG/WA/MSGR]
**Platform**: [iOS/Android/Web]
**App Version**: [Version]
**Impact**: [X users affected / feature blocked]

**Quick Links**:
- Task: [link]
- Sentry: [link if available]

Please advise on fix approach.
```

---

*Last updated: March 2026*
*Document POM: Rishi Shah*
