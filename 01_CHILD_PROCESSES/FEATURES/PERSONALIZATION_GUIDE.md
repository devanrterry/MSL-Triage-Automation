# Personalization Triage Guide

> **Feature**: Meta AI Personalization
> **Last Updated**: Jan 30, 2026
> **Document POC**: Henry Ngo | Mark Nettles
> **Audience**: Triage Specialists

---

## Overview

This document covers triage processes for issues related to the quality of Meta AI's Personalization Feature (i.e. if the user reports issues with how Meta AI personalization responds to a user prompt).

The **Model Quality Task Template** should be used for all these issues. Within the template, please include:
- Pariscope link
- Bot Request ID

---

## Applicable Surfaces

| Surface | Platform | Description |
|---------|----------|-------------|
| **C50** | iOS, Android | Meta AI App |
| **Ecto** | Web | meta.ai website |
| **FoA** | FB, IG, WA, MSGR | Family of Apps |

---

## Bug Triage Process

### Step 1: Initial Identification & Triage

1. **Identify Surface**: Meta AI App, meta.ai website, or FoA
2. **Task Title Template**: Select "Personalization" from "[GenAI] Title Template" butterfly button

**Task Title Format:**
```
[MetaAI][P13n][Platform][App/Website][App Version] Summary of the issue
```
> Note: Remove `[App Version]` if reported on Ecto

3. **KP Search**: Do NOT conduct full KP search. ONLY merge issues with EXACT SAME prompt and response
4. **Repro Attempt**: Do NOT try to repro model quality issues (use "Skip" option in UDT)

---

### Step 2: Identify Type of Personalization Product

| Type | Explanation | Tags | Oncall |
|------|-------------|------|--------|
| **2.1 Personalization (p13n)** | Surface level signals - tailoring content based on explicit/implicit signals (likes, clicks, searches, demographics, recent activity). P13n matches content to user profiles for relevance. | `MetaAI_P13n_Social-Recall`, `meta_ai_p13n` | See sub-issues |
| **2.2 Theory of Mind Model (ToMM)** | Next-gen personalization engine. Deep, continuously-updated understanding of each user—who they are, what they care about, preferences—by synthesizing signals across Meta apps. Enables truly personal, natural, contextually relevant responses. | `MetaAI2.0-TOMM` | Mahsan Rofouei |
| **2.3 (Unified) Memory & 1P Signal** | **Memory**: Stores essential facts and preferences. **1P Signals**: Real-time data (recent activity, interactions, context). Together they provide relevant, timely, personalized responses. | `MetaAI_P13n_1P` | meta_ai_personalization |
| **2.4 Calendar/Email Integration (3P)** | Users link Google/Outlook calendar and email to Meta AI for personalized, context-aware responses. Retrieve/summarize events, emails, tailor recommendations. | `MetaAI2.0-EmailCalendar`, `MetaAI_P13n_3P` | meta_ai_extensions |
| **2.5 Proactive Cards** | Proactive Cards 2.0 delivers personalized daily cards anticipating user needs. Refreshed daily in "For you" tab (C50) and FB app. Tailored using activity, interests, social signals. | `Proactivecard2.0` | See sub-issues |

### Key Difference: P13n vs ToMM

| Model | Key Distinctions | Example |
|-------|------------------|---------|
| **Personalization (p13n)** | Surface level signals (interests, recent activity). Reactive, sometimes shallow. Personalizes based on what you've done recently. | "What should I do this weekend?" → "There's a tennis match nearby, since you've liked tennis posts recently." |
| **Theory of Mind Model (ToMM)** | Deep, holistic understanding including goals, context, history across Meta platforms. Infers motivations, emotional state. Proactive, emotionally intelligent. | "What should I do this weekend?" → "Last week you mentioned feeling stressed about your presentation. Maybe quiet time or a walk would help. Also, there's a photography workshop nearby since you've been interested in that." |

---

### Step 3: Identify Sub-Issues

#### Personalization (p13n) Sub-Issues

| # | Issue Type | Explanation | Tags | Oncall |
|---|------------|-------------|------|--------|
| 3.1 | **Social Retrieval** | Failure to correctly access, identify, or retrieve relevant user social data. Examples: No results for valid queries, missed tagged content, incorrect context returned, missing friends/locations | `Meta_P13n_retrieval`, `MetaAI_System` | Adam Radziwonczyk-Syta |
| 3.2 | **Response Quality** | Flaws in AI-generated responses when synthesizing p13n content. Examples: Hallucinated personalization, incorrect group content, incomplete recall, omission of details, inappropriate tone | `Meta_P13n_response-quality`, `MetaAI_System` | Xiaochen Wang |
| 3.3 | **UX** | UI rendering or behavior bugs impacting social recall. Examples: UI elements not loading, missing action buttons, thumbnail problems, broken icons, layout issues | `Meta_P13n_UX`, `MetaAI_System` | Matthew Ouellette |
| 3.4 | **Rendering/UI on iOS** | iOS-specific crashes, display issues, or technical failures | `Meta_P13n_iOS-UI`, `MetaAI_System` | Nicholas-Dante Bellisario |
| 3.5 | **Rendering/UI on Android** | Android-specific crashes, display issues, or technical failures | `Meta_P13n_Android-UI`, `MetaAI_System` | Nygel Kyle Lopez |
| 3.6 | **Other/General** | Product feedback, policy questions, design suggestions, privacy concerns. Examples: Irrelevant recommendations, over-personalization, missed opportunities, policy questions | `Meta_P13n_Other`, `MetaAI_System` | meta_ai_personalization |

#### Theory of Mind Model (ToMM) Sub-Issues

| # | Issue Type | Explanation | Tags | Oncall |
|---|------------|-------------|------|--------|
| 3.7 | **ToMM Issues** | **Over-personalization**: Too much personal context, irrelevant personal tidbits. **Unnatural communication**: Forced, robotic, "in your face" presentation. **Generic responses**: Ignores available context. **Incorrect context**: Misinterprets signals, applies wrong/outdated information | `MetaAI2.0-TOMM` | Mahsan Rofouei |

#### (Unified) Memory & 1P Signals Sub-Issues

| # | Issue Type | Explanation | Tags | Oncall |
|---|------------|-------------|------|--------|
| 3.8 | **Extraction** | Identifying and importing memories from source apps. Examples: No memories extracted, partial extraction, missing app integrations, unrecognized source data | `Meta_P13n_unified_memory-extraction`, `MetaAI_System` | Quentin Chalvon Demersay |
| 3.9 | **Retrieval** | Surfacing, merging, filtering, ranking, presenting stored memories. Examples: Irrelevant memories surfaced, failure to present correct memories, incorrect ranking, filtering errors, cross-app merging problems | `Meta_P13n_unified_memory-retrieval`, `MetaAI_System` | Xiange Zhang |
| 3.10 | **Conflicting Memories/Duplicates** | Duplicate memories or contradictory information. Examples: Exact duplicates, contradictory information, multiple versions with variations, conflicting event details, failure to merge/deduplicate | `Meta_P13n_unified_memory-duplicates`, `MetaAI_System` | Patrick Liu |
| 3.11 | **Latency** | System performing slower than expected. Examples: Slow memory queries, high response times on specific surfaces, inconsistent performance, timeouts, performance degradation during peak usage | `Meta_P13n_latency` | meta_ai_personalization |
| 3.12 | **General/Other** | Unclassified issues, edge cases, feature feedback, privacy concerns, integration challenges | `Meta_P13n_Genother`, `MetaAI_System` | meta_ai_personalization |

#### Calendar/Email Integration Sub-Issues

| # | Issue Type | Explanation | Tags | Oncall |
|---|------------|-------------|------|--------|
| 3.13 | **Email/Calendar** | Account linking issues, permission/access errors, data retrieval & sync failures, timezone/formatting errors, action failures (create/update/delete), incomplete flows, privacy/security risks, backend/API outages, widget/UI failures | `MetaAI2.0-EmailCalendar` | meta_ai_extensions |

#### Proactive Cards Sub-Issues

| # | Issue Type | Explanation | Tags | Oncall |
|---|------------|-------------|------|--------|
| 3.14 | **Card Contents** | Content and context of individual cards. Examples: Irrelevant topics, stale content, lack of personalization, repetitive information | `proactive2.0_card_contents` | Steven Li |
| 3.15 | **Images** | Images on cards and in articles. Examples: Incorrect/low-quality images, images not matching topic, visual clarity issues | `proactive2.0_images` | Eric Filkins |
| 3.16 | **Facebook QP** | Quick Promotions on Facebook. Examples: QP not appearing, incorrect content, broken links, UI glitches | `proactive2.0_facebook_qp` | Gong Tang |
| 3.17 | **Instagram QP** | Quick Promotions on Instagram. Examples: QP not appearing, incorrect content, broken links, UI glitches | `proactive2.0_instagram_qp` | Sam Zhang |
| 3.18 | **Client side Android** | Android platform-specific issues. Examples: App crashes, rendering problems, performance issues, UI bugs | `proactive2.0_clientside_android` | Martin Purita |
| 3.19 | **Client side iOS** | iOS platform-specific issues. Examples: App crashes, rendering problems, performance issues, UI bugs | `proactive2.0_clientside_ios` | Lexy Li |
| 3.20 | **Other/General** | Catch-all for issues not in above categories. Examples: General feedback, cross-platform issues, integration problems | `proactive2.0_other` | Wenting Li (subscribe Yuliya Kaleda) |

---

### Step 4: Complete Triage

1. **Tag** - Apply appropriate tags from tables above
2. **Prioritize** - Use schema below
3. **Assign Owner** - Route to oncall from tables above
4. **KP Merge** - Only merge if EXACT SAME prompt and response

---

## Priority Definitions

| Priority | Product Bugs - Functionality / Usability | Model and System Bugs |
|----------|------------------------------------------|----------------------|
| **High** | Experience completely broken. User cannot complete flow/chat. Significantly degraded core feature. Reliability/Infrastructure issues. Logging/Access issues. UI/UX bugs impacting retention/engagement. Has reproducibility indication. | Stops user from achieving goal. Poses significant risk to user safety. Severe negative impact on brand reputation. |
| **Medium** | Flow inconvenient but not blocked. UI/UX optimizations. Accessibility. Blocking but cannot repro with no multiple reports. | Interrupts user's flow but doesn't stop them. Negatively impacts user perception. May have slight brand reputation impact. |
| **Low** | Bugs with temporary workaround not impacting goals. Polish and improvements. | Inconvenience that can be worked around. Some impact on user perception. Doesn't pose serious risk. |
| **Wishlist** | Feedback not immediately actionable. Ideas for next iteration. | Nice to have improvements. |

---

## Related Triage Guides

| Guide | When to Use |
|-------|-------------|
| **Text Model Quality Guide** | AI response quality issues |
| **C50 Guide** | Meta AI App UI/UX issues |
| **Ecto Guide** | Meta AI Website UI/UX issues |
| **FoA Guide** | Family of Apps UI/UX issues |
| **Characters Guide** | Character personalization issues |
| **Search Guide** | Search-related issues |
| **Media Generation Guide** | Media generation issues |

---

*Last updated: Jan 30, 2026*
*Document POC: Henry Ngo | Mark Nettles*

---

*This guide is part of the Meta AI Triage System.*
