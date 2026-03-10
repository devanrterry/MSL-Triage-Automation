# Meta AI Unified Triage Skill

> **Unified quick-reference for all Meta AI triage operations**
> **Source**: [GenAI ProdOps - UDT Mapping 2026](https://docs.google.com/spreadsheets/d/1iuXdqr5ZtbhPqFnTmHUkQDnzLai-I4ZCCTJrddD5SDo/edit)
> **Last Updated**: March 2026

---

## Quick Surface Identification

| Surface | Identifier Keywords | Base Tag |
|---------|---------------------|----------|
| **Meta AI App (C50)** | c50, Case50, MetaAI App, Meta AI app | `c50` |
| **Vibes App** | Vibes, vibes app | `vibes_app` |
| **Ecto (meta.ai)** | ecto, meta.ai, metaai website | `Ecto` |
| **Hatch** | hatch | `c50-hatch` or `Ecto-hatch` |
| **FoA** | WhatsApp, Messenger, Instagram, Facebook, FB, IG, WA, MSGR | `MetaAI-Umbrella` |

---

## Platform Tags

| Platform | Tag |
|----------|-----|
| iOS | `ios` |
| Android | `android` |
| Web | `www` |

---

## Input Modality Tags

| Modality | Tag |
|----------|-----|
| Text | `input-modality-ai-text` |
| Voice | `input-modality-ai-voice` |
| Media | `input-modality-ai-media` |

---

## Text Model Tags

| Model | Tag |
|-------|-----|
| ThinkHard | `metaai_model_thinkhard` |
| ThinkFast | `metaai_model_thinkfast` |
| Avocado | `metaai_model_avocado` |
| Other | `metaai_model_other` |

---

# SURFACE: META AI APP (C50)

## C50 Product Areas

| Product Area | Tags | Owner |
|--------------|------|-------|
| C50 Specific (Surface UI) | `MetaAI_Product, MetaAI2.0` | → Route to C50 Features |
| Hatch | `c50-hatch` | hatch_oncall |
| Media Generation | `c50-media-concord, MetaAI2.0-creativetools` | → MediaGen Flow |
| AI Search | `c50-aisearch, MetaAI_Search` | → Search Flow |
| Characters | `c50-characters` | → Characters Flow |
| Personalization | `c50-p13n, meta_ai_p13n` | → P13n Flow |
| Growth (QP, upsells) | `ai-growth-share-connect, ai-growth-connect25` | ai_products_growth |
| FOA Sharing | `ai-growth-share-connect, ai-share-connect25` | ai_products_sharing |
| Ranking | `ai-ranking` | silverstone_ranking |
| Voice | `AI-Model-Umbrella, MetaAI_Model, MetaAI_Voice` | → Voice Flow |
| Text Model Quality | `AI-Model-Umbrella, MetaAI_Model, Model_Failure_Mode` | → Model Flow |

## C50 Features → Tag → Owner

| Feature | Tags | Assignment |
|---------|------|------------|
| Sidebar | `c50-sidebar` | silverstone_ios + silverstone_android |
| App Navigation | `c50-AppNavigation` | silverstone_ios + silverstone_android |
| App Navigation 2.0 | `MetaAI2.0-NavIA, c50-NavIA2.0, MetaAI2.0` | silverstone_ios + silverstone_android |
| Convo Starters | `c50-convostarters` | silverstone_ios + silverstone_android |
| Settings | `c50-settings` | silverstone_ios + silverstone_android |
| Account | `c50-account` | silverstone_ios + silverstone_android |
| Integrity | `c50-integrity` | silverstone_ios + silverstone_android |
| Composer | `c50-composer, MetaAI2.0` | silverstone_ios + silverstone_android |
| Notifications | `c50-notifications` | silverstone_ios + silverstone_android |
| History | `c50-history` | silverstone_ios + silverstone_android |
| People Search | `c50-peoplesearch` | silverstone_ios + silverstone_android |
| Login | `c50-login` | silverstone_ios + silverstone_android |
| NUX | `c50-nux` | silverstone_ios + silverstone_android |
| Read Aloud | `c50-read-aloud` | silverstone_ios + silverstone_android |
| Multi Image/Video Upload | `c50-multi-image-video-upload, MetaAI2.0` | silverstone_ios + silverstone_android |
| File Upload | `c50-file-upload, MetaAI2.0` | silverstone_ios + silverstone_android |
| 1P Citations | `c50-1p-citations, MetaAI2.0` | silverstone_ios + silverstone_android |
| Text Select/Copy | `c50-text-select-copy, MetaAI2.0` | silverstone_ios + silverstone_android |
| Incognito Mode | `c50-incognito-mode, MetaAI2.0` | silverstone_ios + silverstone_android |
| Dictation | `c50-dictation` | silverstone_ios + silverstone_android |
| Something went wrong | `c50-something-went-wrong` | silverstone_ios + silverstone_android |
| Response UX | `c50-core-ux-formatting, MetaAI2.0` | silverstone_ios + silverstone_android |
| Mode - Fast | `c50-mode-fast, MetaAI2.0` | silverstone_ios + silverstone_android |
| Mode - Thinking | `c50-mode-thinking, MetaAI2.0` | silverstone_ios + silverstone_android |
| Global Search | `c50-global-search, MetaAI2.0` | silverstone_ios + silverstone_android |
| Stop Generation | `c50-stop-generation, MetaAI2.0` | silverstone_ios + silverstone_android |
| Basic Regenerate | `c50-basic-regenerate, MetaAI2.0` | silverstone_ios + silverstone_android |
| Partial Reply | `c50-partial-reply, MetaAI2.0` | silverstone_ios + silverstone_android |
| Chain of Thought | `c50-chain-of-thought, MetaAI2.0` | silverstone_ios + silverstone_android |
| Latency | `MetaAI2.0-Latency` | silverstone_ios + silverstone_android |
| Projects | `MetaAI2.0-Projects` | metaai_project_developers |
| Other | `c50-other, MetaAI2.0` | silverstone_ios + silverstone_android |

## C50 Voice Issues

| Voice Issue Type | Tags | Assignment |
|------------------|------|------------|
| Model & Backend | `AI-Model-Umbrella, MetaAI_Model, MetaAI_Voice` | meta_ai_voice_backend |
| Product (UI/UX) | `AI-Model-Umbrella, MetaAI_Voice, MetaAI_Product, c50-voice` | → Voice Product Flow |
| LiveAI | `voice-liveai-c50` | meta_ai_voice_backend |
| ImmersiveUX | `voice-immersiveUX` | meta_ai_voice_backend |
| Other Voice | `c50-voice` | silverstone_ios + silverstone_android |

---

# SURFACE: ECTO (META.AI)

## Ecto Product Areas

| Product Area | Tags | Owner |
|--------------|------|-------|
| Ecto Specific (Surface UI) | `MetaAI_Product, MetaAI2.0` | → Route to Ecto Features |
| Hatch | `Ecto-hatch` | hatch_oncall |
| MediaGen | `Ecto-media-Concord, MetaAI2.0-creativetools` | → MediaGen Flow |
| Personalization | `MetaAI_Ecto_p13n, meta_ai_p13n` | → P13n Flow |
| Growth (QP, Upsells) | `aip-growth-sharing-ranking` | ai_products_growth |
| Sharing (Share to FoA) | `aip-growth-sharing-ranking` | ai_products_sharing |
| Ranking | `aip-growth-sharing-ranking` | silverstone_ranking |
| AI Search | `MetaAI_Ecto-ai-search, MetaAI_Search` | → Search Flow |
| Text Model Quality | `AI-Model-Umbrella, MetaAI_Model, Model_Failure_Mode` | → Model Flow |
| Voice Quality | `AI-Model-Umbrella, MetaAI_Model, metaai_voice` | → Voice Flow |
| Immersive Feed (Model) | `AI-Model-Umbrella, MetaAI_Model` | → Model Flow |

## Ecto Features → Tag → Owner

| Feature | Tags | Assignment |
|---------|------|------------|
| Immersive Feed (UI/UX) | `MetaAI_Ecto_immersivefeed, ProdOps - Drop Rate Exempt` | Upforgrabs |
| Video Controls | `MetaAI_Ecto_videocontrols, ProdOps - Drop Rate Exempt` | Upforgrabs |
| Assistant UI | `MetaAI_Ecto_AssistantUI, ProdOps - Drop Rate Exempt` | Upforgrabs |
| Profile | `MetaAI_Ecto_Profile, ProdOps - Drop Rate Exempt` | Upforgrabs |
| Video Lightbox | `MetaAI_Ecto_videoLightbox, ProdOps - Drop Rate Exempt` | Upforgrabs |
| Video Comments | `MetaAI_Ecto_videocomments, ProdOps - Drop Rate Exempt` | Upforgrabs |
| Post Video to Feed | `MetaAI_Ecto_postVideotofeed, ProdOps - Drop Rate Exempt` | Upforgrabs |
| Navigation | `MetaAI_Ecto_navigation, ProdOps - Drop Rate Exempt` | Upforgrabs |
| Login | `MetaAI_Ecto_login, ProdOps - Drop Rate Exempt` | Upforgrabs |
| Logged-Out Flow | `MetaAI_Ecto_loggedoutflow, ProdOps - Drop Rate Exempt` | Upforgrabs |
| Composer | `MetaAI_Ecto_composer, ProdOps - Drop Rate Exempt` | Upforgrabs |
| Notifications | `MetaAI_Ecto_notifications, ProdOps - Drop Rate Exempt` | Upforgrabs |
| Voice | `MetaAI_Ecto_voice, ProdOps - Drop Rate Exempt` | Upforgrabs |
| Auth (Auth.meta.com) | `c50-access-Ecto, ProdOps - Drop Rate Exempt` | Upforgrabs |
| Accessibility | `MetaAI_Ecto_accessibility, ProdOps - Drop Rate Exempt` | Upforgrabs |
| Settings | `MetaAI_Ecto_settings, ProdOps - Drop Rate Exempt` | Upforgrabs |
| Something went wrong | `MetaAI_Ecto_something_went_wrong, ProdOps - Drop Rate Exempt` | Upforgrabs |
| Private Link Sharing | `MetaAI_Ecto_private_link_sharing, ProdOps - Drop Rate Exempt` | Upforgrabs |
| Conversation Starters | `MetaAI_Ecto_coversation_starters, ProdOps - Drop Rate Exempt` | Upforgrabs |
| Latency | `MetaAI2.0-Latency, ProdOps - Drop Rate Exempt` | Upforgrabs |
| Projects | `MetaAI2.0-Projects, MetaAI_Ecto_Projects` | metaai_project_developers |
| History | `MetaAI_Ecto_Conversation_History, ProdOps - Drop Rate Exempt` | Upforgrabs |
| Other | `MetaAI_Ecto_other, ProdOps - Drop Rate Exempt` | Upforgrabs |

---

# SURFACE: FOA (FB/IG/WA/MSGR)

## FoA App Tags

| App | Tags |
|-----|------|
| WhatsApp | `whatsapp, MetaAI-Umbrella` |
| Messenger | `Messenger, MetaAI-Umbrella` |
| Instagram Direct | `instagram-direct, MetaAI-Umbrella` |
| Instagram | `instagram, MetaAI-Umbrella` |
| Facebook | `facebook, MetaAI-Umbrella` |
| FBM | `fbm, MetaAI-Umbrella` |
| Threads | `Barcelona, MetaAI-Umbrella` |

## FoA Features

| Feature | Tags | Owner |
|---------|------|-------|
| Clippy | `MetaAI2.0, MetaAI_FOA` | → Clippy Flow |
| Group Chats | `MetaAI_GroupChats, MetaAI_Product, MetaAI_FOA` | → Group Chats Flow |
| Growth, Sharing, Ranking | - | → GSR Flow |

## FoA Clippy Issues

| Issue Type | Tags | Assignment |
|------------|------|------------|
| Prod Infra | `prod_infra_bug` | meta_ai_core_ux |
| Tools & Modeling | `model_tooling_bug` | → Tools & Modeling Flow |

## FoA Group Chats

| Issue Type | Tags | Assignment |
|------------|------|------------|
| Client | `client_bug` | → Client Flow |
| Prod Infra & Model Infra | `prod_infra_bug` | → Prod Infra Flow |
| Modeling | `model_tooling_bug, kai_model` | → Modeling Flow |
| All Others | - | meta_ai_group_chats |
| WA Group Agent | `gc_group_agent, wa-ai-in-groups` | msl_group_chats_bug_triage |
| Messenger Group Chats | - | msl_group_chats_bug_triage |

---

# FEATURE: AI SEARCH

| Surface | Tags | Assignment |
|---------|------|------------|
| C50 | `c50-aisearch, MetaAI_Search` | → Search Flow |
| Ecto | `MetaAI_Ecto-ai-search, MetaAI_Search` | → Search Flow |

## Search Sub-Features

| Feature | Tags | Assignment |
|---------|------|------------|
| Deep Search | `metaai_search_deepsearch, MetaAI_Search` | metaai_search_oncall |
| 1P Citations | `metaai_1p_citations, MetaAI_Search` | metaai_search_oncall |
| 2P Citations (News) | `metaai_search_2p_news, MetaAI_Search` | metaai_search_oncall |
| 3P Citations | `metaai_search_3p, MetaAI_Search` | metaai_search_oncall |
| Search Quality | `MetaAI_Search` | metaai_search_oncall |

---

# FEATURE: PERSONALIZATION

| Surface | Tags | Assignment |
|---------|------|------------|
| C50 | `c50-p13n, meta_ai_p13n` | meta_ai_personalization |
| Ecto | `MetaAI_Ecto_p13n, meta_ai_p13n` | meta_ai_personalization |

## Personalization Sub-Features

| Feature | Tags | Assignment |
|---------|------|------------|
| Memory | `meta_ai_p13n, p13n_memory` | meta_ai_personalization |
| Preferences | `meta_ai_p13n, p13n_preferences` | meta_ai_personalization |
| VIF | `meta_ai_p13n, VIF` | meta_ai_personalization |
| Recommendations | `meta_ai_p13n, p13n_recommendations` | meta_ai_personalization |

---

# FEATURE: CHARACTERS

| Surface | Tags | Assignment |
|---------|------|------------|
| C50 | `c50-characters` | → Characters Flow |
| General | `aistudio` | aistudio_oncall |

## Characters Sub-Features

| Feature | Tags | Assignment |
|---------|------|------------|
| Character Creation | `aistudio, character_creation` | aistudio_oncall |
| Character Conversations | `aistudio, character_conversations` | aistudio_oncall |
| Character Discovery | `aistudio, character_discovery` | aistudio_oncall |
| Character Profiles | `aistudio, character_profiles` | aistudio_oncall |

---

# FEATURE: MEDIA GENERATION

| Surface | Tags | Assignment |
|---------|------|------------|
| C50 | `c50-media-concord, MetaAI2.0-creativetools` | → MediaGen Flow |
| Ecto | `Ecto-media-Concord, MetaAI2.0-creativetools` | → MediaGen Flow |

## MediaGen Sub-Features

| Feature | Tags | Assignment |
|---------|------|------------|
| Image Generation | `MetaAI_MediaGen_Image` | mediagen_oncall |
| Video Generation | `MetaAI_MediaGen_Video` | mediagen_oncall |
| Music Generation | `MetaAI_MediaGen_Music` | mediagen_oncall |
| Animate | `MetaAI_MediaGen_Animate` | mediagen_oncall |
| Reimagine | `MetaAI_MediaGen_Reimagine` | mediagen_oncall |
| Safety/Policy | `MetaAI_MediaGen_Safety` | mediagen_integrity |

---

# FEATURE: GROWTH, SHARING & RANKING

## Growth Tags

| Surface | Tags | Assignment |
|---------|------|------------|
| C50 | `ai-growth-share-connect, ai-growth-connect25` | ai_products_growth |
| Ecto | `aip-growth-sharing-ranking` | ai_products_growth |

## Sharing Tags

| Surface | Tags | Assignment |
|---------|------|------------|
| C50 | `ai-growth-share-connect, ai-share-connect25` | ai_products_sharing |
| Ecto | `aip-growth-sharing-ranking` | ai_products_sharing |

## Ranking Tags

| Surface | Tags | Assignment |
|---------|------|------------|
| C50 | `ai-ranking` | silverstone_ranking |
| Ecto | `aip-growth-sharing-ranking` | silverstone_ranking |

---

# MODEL: TEXT MODEL QUALITY

| Tags | Assignment |
|------|------------|
| `AI-Model-Umbrella, MetaAI_Model, Model_Failure_Mode` | model_quality_oncall |

## Text Model Issue Types

| Issue Type | Additional Tags | Assignment |
|------------|-----------------|------------|
| Hallucination | `Model_Failure_Mode, hallucination` | model_quality_oncall |
| Factual Error | `Model_Failure_Mode, factual_error` | model_quality_oncall |
| Instruction Following | `Model_Failure_Mode, instruction_following` | model_quality_oncall |
| Coherence | `Model_Failure_Mode, coherence` | model_quality_oncall |
| Safety/Harmful | `Model_Failure_Mode, safety` | model_integrity_oncall |

---

# MODEL: VOICE QUALITY

| Tags | Assignment |
|------|------------|
| `AI-Model-Umbrella, MetaAI_Model, MetaAI_Voice` | meta_ai_voice_backend |

## Voice Issue Types

| Issue Type | Additional Tags | Assignment |
|------------|-----------------|------------|
| STT (Transcription) | `MetaAI_Voice, stt` | meta_ai_voice_backend |
| TTS (Text-to-Speech) | `MetaAI_Voice, tts` | meta_ai_voice_backend |
| Voice Commands | `MetaAI_Voice, voice_commands` | meta_ai_voice_backend |
| Audio Quality | `MetaAI_Voice, audio_quality` | meta_ai_voice_backend |
| Latency | `MetaAI_Voice, voice_latency` | meta_ai_voice_backend |

---

# PRIORITY DEFINITIONS

| Priority | Tag | Criteria |
|----------|-----|----------|
| **High** | `High` | Crashes, outages, blocking issues |
| **Medium** | `Medium` | Degraded functionality, intermittent issues |
| **Low** | `Low` | Minor bugs, cosmetic issues |
| **Wishlist** | `Wishlist` | Feature requests, nice-to-haves |

---

# TRIAGE OUTCOME TAGS

| Outcome | Tag |
|---------|-----|
| Reproduced | `ProdOps - Repro` |
| Occasional Repro | `ProdOps - Occasional Repro` |
| Does Not Repro | `ProdOps - Does Not Repro` |
| No Device Access | `ProdOps - Repro N/A - No Device Access, ProdOps - Repro N/A` |
| No Feature Access | `ProdOps - Repro N/A - No Feature Access, ProdOps - Repro N/A` |
| Repro Complexity | `ProdOps - Repro N/A - Repro Complexity, ProdOps - Repro N/A` |
| User Specific | `ProdOps - Repro N/A - User Specific, ProdOps - Repro N/A` |
| External Resource Required | `ProdOps - Repro N/A - External Resource Required, ProdOps - Repro N/A` |
| Other N/A | `ProdOps - Repro N/A - Other, ProdOps - Repro N/A` |

---

# NON-BUG OUTCOMES

| Outcome | Tag | Action |
|---------|-----|--------|
| Product Feedback | `ProdOps - Product Feedback` | Remove `bug, bugs` tags |
| Feature Request | `ProdOps - Feature Request` | Remove `bug, bugs` tags |
| Intended Functionality | `ProdOps - Intended Functionality` | Remove `bug, bugs` tags |
| General Question | `ProdOps - Question` | Remove `bug, bugs` tags |
| Test Task | `ProdOps - Test Task` | Remove `bug, bugs` tags |
| Media Partner / Sales | `ProdOps - Media and Sales` | Remove `bug, bugs` tags |
| Oops | `ProdOps - Oops` | Remove `bug, bugs` tags |
| Other Non Bug | `ProdOps - Other Non Bug` | Remove `bug, bugs` tags |

---

# QUICK TRIAGE DECISION TREE

```
1. IDENTIFY SURFACE
   ├── Meta AI App / C50 / Case50 → C50 Flow
   ├── Vibes / vibes app → vibes_app
   ├── meta.ai / Ecto → Ecto Flow
   ├── Hatch → c50-hatch or Ecto-hatch
   └── WhatsApp/Messenger/IG/FB → FoA Flow

2. IDENTIFY PRODUCT AREA (within surface)
   ├── Surface-specific UI issue → Surface feature tags
   ├── Media Generation → MediaGen tags
   ├── AI Search → Search tags
   ├── Characters → aistudio tags
   ├── Personalization → meta_ai_p13n tags
   ├── Growth/Sharing/Ranking → GSR tags
   ├── Voice issues → Voice tags
   └── Model quality → Model tags

3. ADD PLATFORM TAG
   ├── iOS → ios
   ├── Android → android
   └── Web → www

4. ADD INPUT MODALITY TAG
   ├── Text → input-modality-ai-text
   ├── Voice → input-modality-ai-voice
   └── Media → input-modality-ai-media

5. SET PRIORITY
   └── High / Medium / Low / Wishlist

6. SET TRIAGE OUTCOME
   └── Repro / Does Not Repro / N/A variants

7. ASSIGN TO OWNER
   └── Based on tags applied
```

---

*This skill file is part of the Meta AI Triage System.*
*Source: GenAI ProdOps - UDT Mapping 2026*
