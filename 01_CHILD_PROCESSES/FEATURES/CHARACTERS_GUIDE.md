# Meta AI Studio (Characters) Triage Guide

> **Feature**: Meta AI Studio & Characters
> **Last Updated**: Dec 8, 2025
> **Document POCs**: Devan Terry | Christian Brondon
> **Audience**: Triage Specialists

---

## Overview

This document covers triage processes for issues related to the quality of Meta AI Studio and Character products across the Family of Apps (Facebook, Messenger, Instagram, C50, and WhatsApp). These issues are inclusive of all Meta AI Studio related issues.

### What is AI Studio

AI Studio is a product designed to facilitate the creation, engagement, and sharing of AI characters. It makes the process intuitive, creative, and fun.

**Key Features:**
- Accessible across multiple platforms: Web, Instagram, Messenger, WhatsApp, Facebook, and Meta AI App (C50)
- Enables creating, engaging with, and managing user-generated AI characters

---

## Applicable Surfaces

| Surface | Platform | Description |
|---------|----------|-------------|
| **C50** | iOS, Android | Characters in Meta AI App |
| **Ecto** | Web | Characters on meta.ai |
| **FoA** | FB, IG, WA, MSGR | Characters in Family of Apps |

---

## Bug Triage Process

### Step 1: Initial Identification & Triage

1. **Identify Surface**: Where was the issue reported?
2. **Identify Issue**: What is the most relevant issue on that surface?
3. **Repro Attempt**: After identifying the issue, attempt repro on appropriate app/version (TS should NOT try to repro model quality issues - use "Skip" option in UDT)

**Task Title Format:**
```
[Product Area][Web, iOS or Android][App Version Mobile Only] Brief Issue Description
```

**Examples:**
- `[Core Experiences][iOS][302.0.0.1] Character creation flow fails at voice selection`
- `[Embodiment & Destination][Android][300.0.0.1] Avatar not matching personality`
- `[Foundations][Web] Safety block on character creation`

---

### Step 2: Identify Product Area

| Product Area | Explanation | Tag |
|--------------|-------------|-----|
| **Core Experiences** | Empowering users to create, interact with, and personalize AI characters. Includes intuitive creation tools, immersive activities enabling dynamic interactions, and flexible customization options to fine-tune AI behavior and tone. | `ai-character-core-exp` |
| **Embodiment & Destination** | Making AI agents visually expressive and emotionally intelligent. Includes facial expressions, body/hand motions. Optimizing destinations where users engage with AI (thread views, voice panels, search results). Demo AIs included. | `ai-embodiment-destination` |
| **Foundations** | Ensures Meta AI delivers safe, capable, and personalized experiences. Addresses safety, multimodal capabilities (image gen, content retrieval, proactive messaging), personalization/memory, and RAG for enhanced conversations. | `ai-foundations` |

---

### Step 3: Identify Feature and Sub-Issues

#### Core Experiences Features

| Feature | Definition | Tag |
|---------|------------|-----|
| **Creation** | End-to-end process of designing AI characters through immersive, guided flow. Users define personality, voice, image, and context. Available on IG, Messenger, etc. | `ai-character-creation` |
| **Activities / Scenes** | Interactive environments and scenarios for engaging with AI characters in dynamic ways. Enables richer, context-driven conversations bringing AI personas to life. | `ai-character-activities` |
| **Customization** | Fine-tuning AI behavior and tone through customizable modes (flirty, serious, etc.). Allows users to tailor AI interactions to specific preferences. | `ai-character-customization` |
| **AI Character Content** | Issues with updating settings during AI Studio Creation (or after) to enable profile, posts for character on IG or FB. Feedback on generated content for AI Character Profiles. | `ai-character-content` |

#### Embodiment & Destination Features

| Feature | Definition | Tag |
|---------|------------|-----|
| **Embodiment** | Character's physical appearance, movements, animation. Includes facial expressions, body/hand motions, emotional intelligence for natural, immersive interactions. | `ai-embodiment` |
| **Character Voice (via chat)** | Issues with AI character's spoken output: unnatural voice, inconsistent voice, voice doesn't match persona (tone, gender, age, accent), incorrect language, audio issues (no sound when character appears talking). | `ai-character-voice` |
| **Character Conversation Quality** | Conversational output issues: response accuracy, relevance, flow, grammar/spelling errors, memory errors, inappropriate/aggressive/suggestive responses. | `ai-character-conversation` |
| **In-Thread UX** | Non-Embodiment and Non-Voice Chat UI issues: text not readable/poorly formatted, incorrect colors, messages not sent, AI not responding, Share/Copy/Like/Dislike buttons not working. | `ai-character-thread-ux` |
| **Destination** | Locations/surfaces where users find and discover AI Characters. Includes AI home, discover characters tabs. | `ai-character-destination` |

#### Foundations Features

| Feature | Definition | Tag |
|---------|------------|-----|
| **Safety** | Safety-related issues: safety blocks on creation, AI repeating harmful content. | `ai-character-safety` |
| **Multimodal, Personalization & Memory** | AI capabilities: image generation, reels retrieval, proactive messaging. Personalization when AI refers to Long-Term Memory or User profile/interests in conversation. | `ai-character-multimodal` |
| **RAG & Web Search** | External sources for chat: web search, retrieval of previous chat context (RAG = Retrieval-Augmented Generation), leveraging external sources to enhance conversation. | `ai-character-rag` |

#### AI Character Consumption Features

| Feature | Definition | Tag |
|---------|------------|-----|
| **Profiles** | Issues related to user profile management: data accuracy, synchronization, visibility. | `ai-character-profiles` |
| **Content MGMT (AI Studio)** | Problems with content creation, editing, publishing, or organization within AI Studio platform. | `ai-character-content-mgmt` |
| **Relevance/Feed UI** | Issues affecting display, ranking, or relevance of content in feed, including algorithmic errors. | `ai-character-feed` |
| **Content Generation** | Problems with automated content creation: errors, inaccuracies in generated text, images, or other media. | `ai-character-content-gen` |

---

### Step 4: Complete Triage

## Priority Definitions

| Priority | Character Product Experience (UI/UX/Functionality) | Character Model Quality & Safety |
|----------|---------------------------------------------------|----------------------------------|
| **High** | Experience completely broken. User cannot complete flow/chat. Core feature significantly degraded. Reliability/Infrastructure/Logging/Access issues. Character creation/publishing completely fails. Cannot discover or chat with characters. UI/UX bugs impacting retention/engagement. | **Safety (all)**: Violence, political figures, racial/ethnic biases. **Character-specific**: Content that shouldn't be allowed (violence, sexual, political), offensive/racially stereotypical/dangerous content, impersonates real people, harmful advice. **Top failure modes**. |
| | | **OR**: Stops user from achieving goal (fails to generate responses, refuses without reason, output so incorrect user can't proceed, gets stuck in loop/crashes). Poses significant risk to user safety. Severe brand reputation impact. i18n issues (inconsistent language). |
| **Medium** | Flow inconvenient but not blocking. UI/UX optimizations. Accessibility features. Character customization partially broken. Discovery/search returns suboptimal results. | Personality inconsistency (breaks character, forgets traits). Incorrect answers on facts/math/content. Embodiment issues (avatar/voice doesn't match personality). Moderate safety concerns (borderline inappropriate). |
| | | **OR**: Interrupts flow but doesn't stop goal (partially relevant responses, needs rephrasing, noticeable delay/glitch, misinterprets part of prompt). Negatively impacts perception. Slight brand reputation impact. |
| **Low** | Bugs with temporary workaround not impacting goals. Polish and improvements. | Response quality issues (verbosity, formatting). Minor personality nuances. Avatar/voice quality could be improved. Activity/scene responses could be richer. |
| | | **OR**: Inconvenience that can be worked around. Some impact on perception. No serious safety risk. Requires attention to maintain quality. |
| **Wishlist** | Feedback not immediately actionable. Ideas for next iteration. | Nice to have improvements. |

Triage will then be expected to complete remaining triage steps (tag, prioritize, assign owner). The above actions should be automated via submission of the UDT form.

---

## Related Triage Guides

| Guide | When to Use |
|-------|-------------|
| **Text Model Quality Guide** | Character response quality issues |
| **Voice Model Quality Guide** | Character voice quality issues |
| **C50 Guide** | Meta AI App UI/UX issues |
| **Ecto Guide** | Meta AI Website UI/UX issues |
| **FoA Guide** | Family of Apps UI/UX issues |
| **Personalization Guide** | Personalization/memory issues |
| **Media Generation Guide** | Media generation issues |

---

*Last updated: Dec 8, 2025*
*Document POCs: Devan Terry | Christian Brondon*

---

*This guide is part of the Meta AI Triage System.*
