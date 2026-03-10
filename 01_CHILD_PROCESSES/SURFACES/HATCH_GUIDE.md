# Surface: Hatch Triage Guide

> **Surface**: Hatch
> **Last Updated**: March 2026
> **Child Process Owner**: Meta AI Triage Team
> **WP Group**: https://fb.workplace.com/groups/1235253001912535

---

## Overview

This document is intended to cover the triage processes for issues related to issues reported on Hatch.
The standard text expander should be used for all of these issues.

---

## Scope Definition

### In Scope
- Hatch-specific UI and UX issues
- Hatch platform functionality
- Account and authentication on Hatch
- Hatch-specific features and flows
- Hatch integrations
- VM connection and instance issues
- Third-party skills and integrations

### Out of Scope
- Cross-surface AI features (→ Feature guides)
- Text/Voice model quality (→ Model guides)
- Issues on other surfaces (→ respective surface guides)

---

## Platform Support

| Platform | Supported | Notes |
|----------|-----------|-------|
| Web | Yes | Desktop and mobile browsers |
| iOS | Yes | Mobile app |
| Android | Yes | Mobile app |

---

## Task Title Format

```
[Surface][Hatch][Feature][Platform] Summary of the issue
```

**Surface Options:** `c50` or `Ecto`

**Examples:**
- `[c50][Hatch][Client Issues][iOS] UI rendering problem in editor`
- `[Ecto][Hatch][VM Connection Failure][Web] Pre-warmed instance unavailable`
- `[c50][Hatch][3P Skills][Android] Google Docs integration failing`

> **NOTE:** If there is a bug in the Hatch queue that is not Hatch but rather a normal C50 or Ecto bug, then when a TS moves the bug to the correct queue, they should also make sure to remove the tag `c50-Hatch` or `Ecto-Hatch` from the task.

---

## Triage Process

### Step 1: Initial Identification & Triage

| Action | Details |
|--------|---------|
| **Repro Attempt** | No repro needed for Hatch bugs |
| **Task Template** | TS should input the standard task template and fill out the requested details |
| **Task Title** | Follow the format: `[Surface][Hatch][Feature][Platform] Summary` |

---

### Step 2: Identify Feature

Triage will then be asked (via UDT flow) to identify the feature the bug was reported for.

| Feature | Definition | Tag |
|---------|------------|-----|
| **Client Issues** | Issues related to the Hatch interface, including UI rendering problems, visual preview failures, point-and-click editing malfunctions, or general client-side errors. These issues affect the user's ability to interact with the Hatch interface. | `hatch-client` |
| **Auth and Login** | Issues related to authentication and authorization within Hatch, including CAT-based authentication failures, login/logout problems, session management issues, or permission errors. These typically prevent users from accessing or publishing their Hatch apps. | `hatch-auth` |
| **Response Quality** | Issues related to the quality of AI-generated responses from the Hatch agent, including inaccurate code generation, poor UI component suggestions, hallucinated features, or responses that don't match the user's prompt intent. This covers the AI model's understanding and output quality. | `hatch-response-quality` |
| **VM Connection Failure** | Issues related to connection failures with virtual machine instances, including pre-warmed instance unavailability, On-Demand (OD) fallback failures, timeout errors, or capacity-related connection problems. These prevent users from building or previewing their apps. | `hatch-vm` |
| **3P Skills** | Issues related to third-party integrations and skills, including Google Docs/Slides integration, Calendar access, Workplace connectivity, Tasks integration, MetaMate connections, or InternGraph API access problems. These affect the app's ability to connect to external data sources. | `hatch-3p-skills` |
| **Voice** | Issues related to voice input functionality within Hatch apps, including speech-to-text conversion problems, voice command interpretation errors, or audio processing failures. This covers any voice-based interaction capabilities built into Hatch apps. | `hatch-voice` |
| **Subagents** | Issues related to subagent orchestration within Hatch, including agent coordination failures, multi-agent workflow problems, or issues with how Hatch delegates tasks to specialized AI agents (such as Confucius or Claude). These affect complex app generation workflows. | `hatch-subagents` |
| **Media** | Issues related to the media generation function within the chat interface. | `hatch-media` |
| **Channels** | Issues related to Channel orchestration, particularly connections to WhatsApp and Telegram. | `hatch-channels` |

---

### Step 3: Known Problems (KP) | Identify Known Problems

- **Error IDs**: Before merging tasks with error messages, make sure the Error ID is exactly the same as well
- Follow the KP process outlined in the Triaging Parent Process

---

### Step 4: Complete Triage

Triage will then be expected to complete remaining triage steps (tag, prioritize, and assign owner).

The above actions should be automated via submission of the UDT form.

---

## Priority Definitions

| Priority | Product Bugs - Functionality / Usability |
|----------|------------------------------------------|
| **High** | High priority bugs are those that block core product functionality, cause major regressions, or significantly degrade the user experience. These require immediate attention and must be fixed as soon as possible. |
| | • Crash & App Stall |
| | • Any broken functionality - can't complete or can't load items |
| | • Security, privacy, Account or compliance issues |
| | • Bugs that block launches or releases (launch-blockers) |
| | • Login/logout issues |
| | • Load times above 10s |
| | • UI issues that affect functionality (missing buttons, can't click etc) |
| | • Missing critical logging or data for essential features |
| | • Content and spelling issues with relation to legal/privacy |
| | • Accessibility issues that prevent use for supported groups |
| | • Safety and Integrity issues |
| **Medium** | Medium priority bugs are important to fix but do not block core functionality or launches. They may cause inconvenience, degrade performance, or impact secondary features, but users can still complete essential tasks. |
| | • UI does not match designs for a majority of users, but does not block usage |
| | • Performance slowdowns or functional issues with moderate reproducibility |
| | • Bugs affecting non-key, less-frequently-used functionality |
| | • Issues with straightforward workarounds |
| | • Moderate number of user reports |
| | • UI Misalignments, minor overlaps |
| | • Content and spelling issues (non privacy/legal) |
| | • Missing Error/empty state UI |
| **Low** | Bugs with temporary workaround that will not impact end-user goals, but require more sustainable solution. Suggestions, polish, and improvements that are nice to have but not urgent to be fixed. |
| **Wishlist** | Feedback about the experience that is not immediately actionable, nice to have, ideas for next iteration. |

---

## Data Collection Requirements

| Data Point | Required | Description |
|------------|----------|-------------|
| Browser/App | Yes | Browser name and version |
| Platform | Yes | Desktop/Mobile, OS |
| URL | Yes | Page where issue occurred |
| Reproduction Steps | Yes | How to reproduce |
| Screenshots/Video | If applicable | Visual evidence |
| Console Errors | If applicable | Browser console logs |
| Error ID | If applicable | Exact error ID for matching |

---

## TOT Considerations

### Transfer TO Hatch
- Issues filed on wrong surface that belong to Hatch

### Transfer FROM Hatch
- **To Feature Guides**: If issue is cross-surface feature (Media Gen, Characters, etc.)
- **To Model Guides**: If issue is AI response/generation quality
- **To Other Surfaces**: If issue is on different platform (C50, Ecto, FoA)

---

## Key Contacts

| Role | Contact |
|------|---------|
| Hatch Oncall | hatch_oncall |
| WP Group | https://fb.workplace.com/groups/1235253001912535 |

---

*This guide is part of the Meta AI Triage System.*
