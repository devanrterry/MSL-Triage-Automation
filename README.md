# Meta AI Triage System

> **Unified triage operations for all Meta AI product surfaces**
>
> Based on: [GenAI/MSL Consolidated Child Process](https://docs.google.com/document/d/19QvGLPyI7H3mh7ysgfxUFOahZ1DZ9Fc1fPs5WHASRDM/edit)

---

## Directory Structure

```
Meta AI Triage System/
├── README.md                              # This file - Master index
├── UNIFIED_TRIAGE_SKILL.md                # Quick-reference skill for fast triage
│
├── 01_CHILD_PROCESSES/                    # Child Process Guides
│   │
│   ├── SURFACES/                          # Surface-specific triage guides
│   │   ├── META_AI_APP_GUIDE.md           # Surface: Meta AI App (C50)
│   │   ├── VIBES_APP_GUIDE.md             # Surface: Vibes App
│   │   ├── ECTO_GUIDE.md                  # Surface: Meta.AI website (Ecto)
│   │   ├── HATCH_GUIDE.md                 # Surface: Hatch
│   │   └── FOA_GUIDE.md                   # Surface: Meta AI FoA
│   │
│   ├── FEATURES/                          # Cross-surface feature guides
│   │   ├── SEARCH_GUIDE.md                # Feature: Meta AI Search
│   │   ├── PERSONALIZATION_GUIDE.md       # Feature: Personalization
│   │   ├── CHARACTERS_GUIDE.md            # Feature: Characters
│   │   ├── MEDIA_GENERATION_GUIDE.md      # Feature: Media Generation
│   │   └── GROWTH_SHARING_RANKING_GUIDE.md # Feature: Growth Sharing & Ranking
│   │
│   └── MODELS/                            # Model quality guides
│       ├── TEXT_MODEL_QUALITY_GUIDE.md    # Model: Text Model Quality
│       └── VOICE_MODEL_QUALITY_GUIDE.md   # Model: Voice Quality
│
└── 02_TOT_GUIDE/                          # TOT Guide
    └── TOT_GUIDE.md                       # Triage Ownership Transfer Guide
```

---

## Child Processes

### Surfaces

| Surface | Product | Guide |
|---------|---------|-------|
| **Meta AI App** | C50 Mobile App (iOS/Android) | [META_AI_APP_GUIDE.md](01_CHILD_PROCESSES/SURFACES/C50_GUIDE.md) |
| **Vibes App** | Vibes Mobile App | [VIBES_APP_GUIDE.md](01_CHILD_PROCESSES/SURFACES/VIBES_APP_GUIDE.md) |
| **Meta.AI website (Ecto)** | meta.ai Website | [ECTO_GUIDE.md](01_CHILD_PROCESSES/SURFACES/ECTO_GUIDE.md) |
| **Hatch** | Hatch Platform | [HATCH_GUIDE.md](01_CHILD_PROCESSES/SURFACES/HATCH_GUIDE.md) |
| **Meta AI FoA** | FB, IG, WhatsApp, Messenger | [FOA_GUIDE.md](01_CHILD_PROCESSES/SURFACES/FOA_GUIDE.md) |

### Features

| Feature | Description | Guide |
|---------|-------------|-------|
| **Meta AI Search** | AI-powered search functionality | [SEARCH_GUIDE.md](01_CHILD_PROCESSES/FEATURES/SEARCH_GUIDE.md) |
| **Personalization** | Memory, preferences, recommendations | [PERSONALIZATION_GUIDE.md](01_CHILD_PROCESSES/FEATURES/PERSONALIZATION_GUIDE.md) |
| **Characters** | AI Characters and personas | [CHARACTERS_GUIDE.md](01_CHILD_PROCESSES/FEATURES/CHARACTERS_GUIDE.md) |
| **Media Generation** | Image, video, music generation | [MEDIA_GENERATION_GUIDE.md](01_CHILD_PROCESSES/FEATURES/MEDIA_GENERATION_GUIDE.md) |
| **Growth Sharing & Ranking** | Growth, sharing, and ranking features | [GROWTH_SHARING_RANKING_GUIDE.md](01_CHILD_PROCESSES/FEATURES/GROWTH_SHARING_RANKING_GUIDE.md) |

### Models

| Model | Description | Guide |
|-------|-------------|-------|
| **Text Model Quality** | LLM response quality issues | [TEXT_MODEL_QUALITY_GUIDE.md](01_CHILD_PROCESSES/MODELS/TEXT_MODEL_QUALITY_GUIDE.md) |
| **Voice Quality** | Voice/audio quality issues | [VOICE_MODEL_QUALITY_GUIDE.md](01_CHILD_PROCESSES/MODELS/VOICE_MODEL_QUALITY_GUIDE.md) |

---

## Triage Workflow Overview

```
START: New bug report received
         │
         ├─── 1. IDENTIFY SURFACE
         │    └── Which product was the bug filed on?
         │         ├── Meta AI App → Meta AI App Guide
         │         ├── Vibes App → Vibes App Guide
         │         ├── Meta.AI Website → Ecto Guide
         │         ├── Hatch → Hatch Guide
         │         └── FB/IG/WA/MSGR → FoA Guide
         │
         ├─── 2. CHECK FOR MODEL QUALITY
         │    └── Is it a model/AI response issue?
         │         ├── Text responses → Text Model Quality Guide
         │         └── Voice/Audio → Voice Quality Guide
         │
         ├─── 3. CHECK FOR CROSS-SURFACE FEATURES
         │    └── Is it related to:
         │         ├── Search → Search Guide
         │         ├── Personalization → Personalization Guide
         │         ├── Characters → Characters Guide
         │         ├── Media Generation → Media Generation Guide
         │         └── Growth/Sharing/Ranking → Growth Sharing & Ranking Guide
         │
         └─── 4. COMPLETE TRIAGE
              └── Tag, prioritize, assign owner
```

---

## TOT Guide

For Triage Ownership Transfer guidance, see: [TOT_GUIDE.md](02_TOT_GUIDE/TOT_GUIDE.md)

---

## Status

| Category | Child Process | Status |
|----------|---------------|--------|
| **Surface** | Meta AI App (C50) | ✅ Complete |
| **Surface** | Vibes App | ✅ Complete |
| **Surface** | Meta.AI website (Ecto) | ✅ Complete |
| **Surface** | Hatch | ✅ Complete |
| **Surface** | Meta AI FoA | ✅ Complete |
| **Feature** | Meta AI Search | ✅ Complete |
| **Feature** | Personalization | ✅ Complete |
| **Feature** | Characters | ✅ Complete |
| **Feature** | Media Generation | ✅ Complete |
| **Feature** | Growth Sharing & Ranking | ✅ Complete |
| **Model** | Text Model Quality | ✅ Complete |
| **Model** | Voice Quality | ✅ Complete |
| **TOT** | TOT Guide | ✅ Complete |

---

*System Owner: Devan Terry*
*Last updated: March 2026*
