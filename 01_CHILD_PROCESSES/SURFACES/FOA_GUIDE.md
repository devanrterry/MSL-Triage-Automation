# Meta AI Family of Apps (FoA) Child Process

> **Surface**: FoA (Facebook, Messenger, Instagram, Instagram Direct, WhatsApp)
> **Last Updated**: Feb 24, 2026
> **POM**: Helen Lu
> **Audience**: Triage Specialists

---

## Key Resources

- [Group Chats FOA Quality Canonical](https://fb.workplace.com/groups/groupchats_foa_quality)
- [Meta AI 2.0 FOA Quality Canonical](https://fb.workplace.com/groups/metaai_foa_quality)

---

## Overview

This document is intended to cover the triage processes for issues related to the quality of Meta AI's products across the Family of Apps (Facebook, Messenger, Instagram, Instagram Direct, WhatsApp) only.

The **Model Quality Task Template** should be used for all of these issues regardless of issue type. TS should NOT try to repro model quality issues (use "Skip" option in UDT).

---

## Feature Types

| Feature Type | Description | How to Identify |
|--------------|-------------|-----------------|
| **Clippy (Meta AI 2.0)** | New backend powering Meta AI 2.0, delivering faster, richer, and more secure AI experiences with unified response formatting, advanced tools, and personalized memory/context management | User prompt shows up in Pariscope. Follow "Pari + task number" guidance |
| **Group Chats** | Messages to Meta AI within a Group Chat. Includes Kai (LLM for realistic social dynamics) and Sidechats | Task is related to Group Chats. Note: Clippy is not available within Group Chats |
| **AI You** | Users create Interactive AI Profile by choosing interests, personality traits, and privacy preferences. Users interact with AI Profiles by watching recorded AI videos or starting chats | AI task reported on FB & IG Feed |
| **Other** | Anything else not related to any of the above. Please limit use of this category | User prompt does not show up in Pariscope |

---

## Surfaces

| Surface | Description | Platform |
|---------|-------------|----------|
| **FB** | Meta AI on Facebook | iOS, Android, Web |
| **IG** | Meta AI on Instagram | iOS, Android, Web |
| **IGD** | Meta AI on Instagram Direct | iOS, Android |
| **WA** | Meta AI on WhatsApp | iOS, Android |
| **MSGR** | Meta AI on Messenger | iOS, Android, Web |

---

## Bug Triage Process - Clippy (Meta AI 2.0)

### Step 1: Initial Identification - Who should own the issue?

| Owned by | Explanation |
|----------|-------------|
| **Client** | **UI Bugs**: Buttons not responding or misaligned, text overlapping or unreadable, incorrect icons or missing elements, issues with NUX/tooltips or Welcome Messages. **Performance Issues**: App crashes, slow loading times. **Feature Functionality**: Typing indicator issues, group chat creation not working, unable to add/remove members, composer not typing/sending, missing entry points, untranslated things outside response bubble, thread header/details, voice issues |
| **Product Infra** | **Anything inside the Meta AI response bubble**. Formatting: LaTeX rendering, tables, code blocks, header/alt text sizes (H1-H6), markdown (i.e. "###"), in-line citations. **Message Response Issues**: Duplicate messages, multi-message issues, latency, model orchestration, streaming (response starts late, pauses, stops mid-way), search delays, message scheduling/delivery, understanding chat context |
| **Tools & Modeling** | Proactivity (model chimes in at wrong moment), factuality issues, tone and style problems, incorrect refusals, inaccurately explains how it works. **Safety and moderation**: Fails to detect harmful content, overzealous moderation. **Media**: Animate, Imagine Me, Edit, Video gen. **Search tooling**: No results, error messages |

### Step 2: Identify Triage Guide/Process

| Issue Type | Triage Guide / Process |
|------------|------------------------|
| **Clippy Client** | TOT to: MSGR: Client, Instagram: Client, or WhatsApp: Client |
| **Clippy Prod Infra** | Proceed to Step 3 in this guide |
| **Clippy Tools & Modeling** | Switch to relevant feature guides (Characters, Media, Personalization, Search, Text/Voice Model Quality) |

### Step 3: Identify the App (Prod Infra)

| App | Oncall Assigned | Tag(s) |
|-----|-----------------|--------|
| MSGR, IGD, WA | meta_ai_core_ux | `prod_infra_bug` |

### Step 4: Task Title

**Clippy Prod Infra Format:**
```
[App][Clippy][Platform][App Version] Summary of the issue
```

Examples:
- `[MSGR][Clippy][iOS][302.0.0.1] LaTeX not rendering in response bubble`
- `[WA][Clippy][Android][25.10.1] Duplicate messages being delivered`

### Clippy Priority Definitions

| Priority | Criteria |
|----------|----------|
| **High** | Experience completely broken. Formatting issues breaking core readability (LaTeX, tables, code blocks, headers, markdown, citations). Duplicate/multi-message issues. Latency in response generation. Model stops mid-chat. Not understanding chat context |
| **Medium** | Flow inconvenient but not blocked. Minor formatting inconsistencies. Minor delays or occasional duplicates. Latency spikes that degrade but don't block |
| **Low** | Bugs with temporary workaround. Polish and improvements |
| **Wishlist** | Feedback not immediately actionable, ideas for next iteration |

---

## Bug Triage Process - Group Chats

### Step 1: Initial Identification - Who should own the issue?

| Owned by | Explanation |
|----------|-------------|
| **Client** | **UI Bugs**: Buttons not responding/misaligned, text overlapping/unreadable, incorrect/missing icons, NUX/tooltips issues. **Performance**: App crashes, slow loading. **Feature Functionality**: Typing indicator, group creation, add/remove members |
| **Product Infra & Model Infra** | **Anything inside response bubble**. Formatting: LaTeX, tables, code blocks, headers, markdown, citations. **Message Issues**: Duplicates, multi-message, latency, streaming, search delays, message scheduling, chat context |
| **Tools & Modeling** | Proactivity, factuality, tone/style, incorrect refusals, safety/moderation, media (Animate, Imagine Me, Edit, Video gen), search tooling |

### Step 2: Identify Triage Guide/Process

| Issue Type | App | Sub-Issue | Triage Guide |
|------------|-----|-----------|--------------|
| **Group Chats Client** | Messenger | Sidechats (Kai, Invocation, Sticky Kai) | Proceed in this guide |
| **Group Chats Client** | All else | All else | TOT to: MSGR/IG/WA Client |
| **Group Chats Prod Infra** | WhatsApp | Group Agents (TEE) | TOT to WhatsApp: Prod Infra |
| **Group Chats Prod Infra** | All else | Sidechats, All else | Proceed in this guide |
| **Group Chats Modeling** | WhatsApp | Group Agents (TEE) | TOT to WhatsApp: Model Response Quality |
| **Group Chats Modeling** | All else | Sidechats, All else | Proceed in this guide |

### Step 3: Identify App & Sub-issue

**Client - Messenger:**
| Sub-issue | Oncall | Tags |
|-----------|--------|------|
| Sidechats (Kai, Invocation, Sticky Kai) | meta_ai_group_chats | `gc_sidechats` |

**Prod Infra & Model Infra:**
| App | Sub-issue | Oncall | Tags |
|-----|-----------|--------|------|
| WhatsApp | Group Agent (Open) | msl_group_chats_bug_triage | `gc_group_agent`, `wa-ai-in-groups` |
| Messenger | N/A | msl_group_chats_bug_triage | |
| Instagram Direct | N/A | msl_group_chats_bug_triage | |

**Modeling:**
| App | Sub-issue | Oncall | Tags |
|-----|-----------|--------|------|
| WhatsApp | Group Agent (Open) | msl_group_chats_bug_triage | `gc_group_agent`, `wa-ai-in-groups` |
| Messenger | N/A | msl_group_chats_bug_triage | |
| Instagram Direct | N/A | msl_group_chats_bug_triage | |

**All Others:**
| App | Oncall | Tags |
|-----|--------|------|
| MSGR, IGD, WA | meta_ai_group_chats | |

### Step 4: Task Title

**Group Chats Format:**
```
[App][Group Chats][Platform][App Version] Summary of the issue
```

Examples:
- `[MSGR][Group Chats][iOS][302.0.0.1] Kai not responding in group sidechat`
- `[WA][Group Chats][Android][25.10.1] Group agent delivering duplicate responses`

### Group Chats Priority Definitions

| Priority | Criteria |
|----------|----------|
| **High** | Experience completely broken. Formatting issues breaking readability. Duplicate/multi-message issues. Latency. Model stops mid-chat. Not understanding context |
| **Medium** | Flow inconvenient but not blocked. Minor formatting inconsistencies. Minor delays. Latency spikes that don't block |
| **Low** | Bugs with temporary workaround. Polish and improvements |
| **Wishlist** | Feedback not immediately actionable, ideas for next iteration |

---

## Bug Triage Process - AI You

### Step 1: Initial Identification & Triage

| Action | Details |
|--------|---------|
| **Repro Attempt** | After identifying the right app experience, TS should attempt repro (model quality excepted) |
| **Task Template** | Standard text expander for product issues; model quality text expander for model issues |
| **Task Title Format** | `[App][AI You][Platform][App Version] Summary of the issue` |

**Examples:**
- `[IG][AI You][iOS][302.0.0.1] AI video not loading in feed`
- `[FB][AI You][Android][450.0.0.1] Cannot start chat with AI profile`

### Step 2: Identify Feature

| Feature | Definition |
|---------|------------|
| **Voice Quality (audio)** | How well the AI captures and understands user's speech, how natural the spoken output sounds. Issues with realism/likeness, tone, pacing, expressivity, latency, audio glitches (dropouts, pops, stutters) |
| **Model Response Quality (content)** | Quality of what the AI says—accuracy, relevance, coherence across turns, prompt following. Flag hallucinations, contradictions, missing details, awkward flow |
| **Safety** | Harmful, inappropriate, or policy-violating behavior in speech or content. Harassment, sexual/violent content, self-harm, illegal guidance, deception, privacy/data leaks. Refusals and safety boundaries |
| **Embodiment** | AI video, lip-sync accuracy, facial expressions matching voice and intent. Flag uncanny visuals, desync, jitter/artifacts, unnatural transitions |

### AI You KP/Merge Rules

- **Model Quality Tasks**: Do NOT merge unless prompt and response are exactly the same
- **Error IDs**: Ensure Error ID is exactly the same before merging

### AI You Priority Definitions

| Priority | Criteria |
|----------|----------|
| **High** | Experience completely broken. Reliability/Infrastructure issues. Logging/Access issues. UI/UX bugs impacting retention. Has reproducibility indication |
| **Medium** | Flow inconvenient but not blocked. UI/UX optimizations. Accessibility. Blocking but cannot repro |
| **Low** | Bugs with temporary workaround. Polish and improvements |
| **Wishlist** | Feedback not immediately actionable |

---

## Bug Triage Process - Other

### Step 1: Initial Identification

| Owned by | Explanation |
|----------|-------------|
| **Tools & Modeling** | Proactivity, factuality issues, tone/style problems, incorrect refusals, inaccurately explains how it works. **Safety**: Fails to detect harmful content, overzealous moderation |
| **Growth, Sharing, and Ranking** | Any Growth, Sharing, or Ranking bugs → route to GSR child process flow |

### Step 2: Identify Triage Guide/Process

| Issue Type | Routing |
|------------|---------|
| Feed AI w/ Characters model quality | → Voice Model Quality Guide |
| FDD Model Response | → Text Model Quality Guide |
| Meta AI Character in feed | → Characters (Embodiment & Destination) Guide |
| Growth, Sharing, Ranking | → Growth, Sharing, and Ranking Guide |
| Other Tools & Modeling | → Relevant feature guides (Characters, Media, Personalization, Search, Text/Voice Model Quality) |

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

*Last updated: Feb 24, 2026*
*Document POM: Helen Lu*

---

*This guide is part of the Meta AI Triage System.*
