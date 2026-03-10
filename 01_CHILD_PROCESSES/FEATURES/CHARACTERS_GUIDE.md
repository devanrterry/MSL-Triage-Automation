# Characters Bug Triage Operations Guide

> **Your mission**: Efficiently triage bugs related to AI-generated characters and immersive character experiences across all Meta AI surfaces.

---

## Quick Reference

| Resource | Link/Command | Purpose |
|----------|-------------|---------|
| **Meta AI App** | iOS App Store / Google Play | Repro environment (C50) |
| **Meta.ai** | [meta.ai](https://meta.ai) | Repro environment (Ecto) |
| **FoA Apps** | FB, IG, WA, MSGR | Repro environment (FoA) |
| **UDT Flow** | [UDT Form](https://www.internalfb.com/butterfly/form/749148824511801) | Automated triage routing |

---

## Product Overview

**Characters** refers to AI-generated characters within Meta AI, enabling immersive conversational experiences with unique personas.

### Applicable Surfaces

| Surface | Platform | Description |
|---------|----------|-------------|
| **C50** | iOS, Android | Characters in Meta AI App |
| **Ecto** | Web | Characters on meta.ai |
| **FoA** | FB, IG, WA, MSGR | Characters in Family of Apps |

---

## Feature Categories

### Character Feature Matrix

| Feature | Tag | Owner | Description |
|---------|-----|-------|-------------|
| **Character Creation** | `MetaAI_Characters_Creation` | Characters Oncall | Creating new AI characters |
| **Character Conversations** | `MetaAI_Characters_Chat` | Characters Oncall | Chatting with AI characters |
| **Character Discovery** | `MetaAI_Characters_Discovery` | Characters Oncall | Finding and browsing characters |
| **Character Profiles** | `MetaAI_Characters_Profiles` | Characters Oncall | Character profile pages and info |
| **Character Customization** | `MetaAI_Characters_Custom` | ai_studio_creation_mobile | Custom character settings |
| **Other** | `MetaAI_Characters_Other` | Characters Oncall | Issues not fitting other categories |

### Key Contacts

| Name | Role | Area |
|------|------|------|
| **TBD** | POM | Characters Triage Guide |
| **TBD** | Characters Lead | Character Features |

---

## Priority Definitions

| Priority | Criteria | Examples |
|----------|----------|----------|
| **High** | Character functionality completely broken. Cannot create/chat with characters. Core experience significantly degraded. | Character creation fails, chat broken, characters not loading |
| **Medium** | Character experience inconvenient but not blocking. UI/UX issues. | Minor display issues, slow loading |
| **Low** | Minor issues with workarounds. Polish and improvements. | Visual polish, minor UX improvements |
| **Wishlist** | Feature requests and suggestions. | New character features |

---

## Triage Decision Tree

```
START: Character-related bug received
         │
         ├─── Is it a MODEL QUALITY issue (character responses)?
         │    └── YES → Switch to Text Model Quality Guide
         │
         ├─── Identify the SURFACE:
         │    ├── Meta AI App → Use C50 title format
         │    ├── meta.ai → Use Ecto title format
         │    └── FB/IG/WA/MSGR → Use FoA title format
         │
         ├─── Identify the CHARACTER FEATURE:
         │    ├── Creation → MetaAI_Characters_Creation
         │    ├── Conversations/Chat → MetaAI_Characters_Chat
         │    ├── Discovery/Browse → MetaAI_Characters_Discovery
         │    ├── Profiles → MetaAI_Characters_Profiles
         │    └── Customization → MetaAI_Characters_Custom
         │
         ├─── Can you reproduce?
         │    ├── YES → Document repro steps
         │    └── NO → Mark as "Does Not Repro"
         │
         └─── Complete triage via UDT
              └── Tag, prioritize, assign owner
```

---

## Practical Triage Workflow

### Step 1: Initial Identification

1. **Check if Model Quality Issue**
   - If the issue is about character *responses* (what the character says) → Text Model Quality Guide
   - If the issue is about character *functionality* (UI, creation, loading) → Continue with this guide

2. **Identify the Surface**
   - C50 (Meta AI App)
   - Ecto (meta.ai)
   - FoA (FB/IG/WA/MSGR)

### Step 2: Repro Attempt

- [ ] Which surface and platform?
- [ ] Can you reproduce the issue?
- [ ] What are the exact steps?
- [ ] Which character(s) affected (if specific)?

### Step 3: Identify the Feature

**Task Title Format:**

For C50:
```
[c50][Characters][Platform][App Version] Summary of the issue
```

For Ecto:
```
[Ecto][Characters] Summary of the issue
```

For FoA:
```
[App][Platform][Characters][App Version] Summary of the issue
```

### Step 4: Complete Triage via UDT

1. **Tag** - Apply `MetaAI_Characters` + specific feature tag
2. **Prioritize** - Use priority schema
3. **Assign Owner** - Route to Characters oncall

---

## KP Merge Rules

- Only merge if the character issue is **exactly the same**
- Different characters = Different bugs (unless it's a systemic issue affecting all characters)
- Check if the issue is specific to one character or affects multiple

---

## Related Triage Guides

| Guide | When to Use |
|-------|-------------|
| **Text Model Quality Guide** | Character response quality issues |
| **C50 Guide** | Meta AI App UI/UX issues |
| **Ecto Guide** | Meta AI Website UI/UX issues |
| **FoA Guide** | Family of Apps UI/UX issues |

---

*Last updated: March 2026*
*Document POM: TBD*
