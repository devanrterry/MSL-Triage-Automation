# Personalization Bug Triage Operations Guide

> **Your mission**: Efficiently triage bugs related to personalization features across all Meta AI surfaces.

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

**Personalization** refers to features that tailor the Meta AI experience to individual user preferences, history, and behavior.

### Applicable Surfaces

| Surface | Platform | Description |
|---------|----------|-------------|
| **C50** | iOS, Android | Personalization in Meta AI App |
| **Ecto** | Web | Personalization on meta.ai |
| **FoA** | FB, IG, WA, MSGR | Personalization in Family of Apps |

---

## Feature Categories

### Personalization Feature Matrix

| Feature | Tag | Owner | Description |
|---------|-----|-------|-------------|
| **User Preferences** | `MetaAI_Personalization_Prefs` | Personalization Oncall | User preference settings |
| **Memory** | `MetaAI_Personalization_Memory` | Personalization Oncall | AI remembering user context |
| **Recommendations** | `MetaAI_Personalization_Recs` | Personalization Oncall | Personalized recommendations |
| **Conversation Context** | `MetaAI_Personalization_Context` | Personalization Oncall | Context-aware responses |
| **VIF (Virtual Identity Framework)** | `meta_ai_customization` | ai_studio_creation_mobile | Virtual identity features |
| **Other** | `MetaAI_Personalization_Other` | Personalization Oncall | Issues not fitting other categories |

### Key Contacts

| Name | Role | Area |
|------|------|------|
| **TBD** | POM | Personalization Triage Guide |
| **TBD** | Personalization Lead | Personalization Features |

---

## Priority Definitions

| Priority | Criteria | Examples |
|----------|----------|----------|
| **High** | Personalization completely broken. Memory not working. Privacy concerns with stored data. | Memory fails to save, preferences not applied, privacy leaks |
| **Medium** | Personalization works but with issues. Recommendations not accurate. | Partial memory, inconsistent preferences |
| **Low** | Minor issues with workarounds. Quality improvements. | Minor recommendation issues |
| **Wishlist** | Feature requests and suggestions. | New personalization capabilities |

---

## Triage Decision Tree

```
START: Personalization-related bug received
         │
         ├─── Is it a PRIVACY/SECURITY issue?
         │    └── YES → Escalate to Privacy team immediately
         │
         ├─── Is it a MODEL QUALITY issue?
         │    └── YES → Text Model Quality Guide
         │
         ├─── Identify the SURFACE:
         │    ├── Meta AI App → Use C50 title format
         │    ├── meta.ai → Use Ecto title format
         │    └── FB/IG/WA/MSGR → Use FoA title format
         │
         ├─── Identify the PERSONALIZATION FEATURE:
         │    ├── User Preferences → MetaAI_Personalization_Prefs
         │    ├── Memory → MetaAI_Personalization_Memory
         │    ├── Recommendations → MetaAI_Personalization_Recs
         │    ├── Context → MetaAI_Personalization_Context
         │    └── VIF → meta_ai_customization
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

1. **Check for Privacy/Security Issues**
   - If user data is being exposed inappropriately → Escalate immediately
   - If memory is showing other users' data → High priority privacy issue

2. **Check if Model Quality Issue**
   - If the issue is about AI response quality → Text Model Quality Guide
   - If the issue is about personalization features → Continue with this guide

### Step 2: Repro Attempt

- [ ] Which surface and platform?
- [ ] Which personalization feature is affected?
- [ ] Does it require user account/history?
- [ ] Can you reproduce the issue?
- [ ] What are the exact steps?

### Step 3: Identify the Feature

**Task Title Format:**

For C50:
```
[c50][Personalization][Platform][App Version] Summary of the issue
```

For Ecto:
```
[Ecto][Personalization] Summary of the issue
```

For FoA:
```
[App][Platform][Personalization][App Version] Summary of the issue
```

### Step 4: Complete Triage via UDT

1. **Tag** - Apply `MetaAI_Personalization` + specific feature tag
2. **Prioritize** - Use priority schema (Privacy issues = High)
3. **Assign Owner** - Route to Personalization oncall

---

## Privacy Considerations

### When to Escalate

- User reports seeing another user's data
- Memory contains sensitive information being exposed
- Personalization data being shared inappropriately
- Any potential data breach or privacy violation

### Privacy-Related Tags
- Mark privacy issues with appropriate priority (High)
- Follow sensitive content processes as needed

---

## KP Merge Rules

- Only merge if the personalization issue is **exactly the same**
- User-specific issues should NOT be merged unless systemic
- Privacy issues should NOT be merged - each requires individual attention

---

## Related Triage Guides

| Guide | When to Use |
|-------|-------------|
| **Text Model Quality Guide** | AI response quality issues |
| **C50 Guide** | Meta AI App UI/UX issues |
| **Ecto Guide** | Meta AI Website UI/UX issues |
| **FoA Guide** | Family of Apps UI/UX issues |
| **Characters Guide** | Character personalization issues |

---

*Last updated: March 2026*
*Document POM: TBD*
