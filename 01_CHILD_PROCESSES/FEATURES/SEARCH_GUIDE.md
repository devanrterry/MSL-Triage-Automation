# Search Bug Triage Operations Guide

> **Your mission**: Efficiently triage bugs related to AI Search functionality across all Meta AI surfaces.

---

## Quick Reference

| Resource | Link/Command | Purpose |
|----------|-------------|---------|
| **Meta AI App** | iOS App Store / Google Play | Repro environment (C50) |
| **Meta.ai** | [meta.ai](https://meta.ai) | Repro environment (Ecto) |
| **FoA Apps** | FB, IG, WA, MSGR | Repro environment (FoA) |
| **Meta Search Inspector** | `https://www.internalfb.com/mase/debug?request_id=[REQUEST_ID]` | Debug tool |
| **UDT Flow** | [UDT Form](https://www.internalfb.com/butterfly/form/749148824511801) | Automated triage routing |

---

## Product Overview

**Meta AI Search** provides AI-powered search results and information retrieval within Meta AI conversations.

### Applicable Surfaces

| Surface | Platform | Description |
|---------|----------|-------------|
| **C50** | iOS, Android | Search in Meta AI App |
| **Ecto** | Web | Search on meta.ai |
| **FoA** | FB, IG, WA, MSGR | Search in Family of Apps |

---

## Feature Categories

### Search Feature Matrix

| Feature | Tag | Owner | Description |
|---------|-----|-------|-------------|
| **Text Search Response** | `meta_ai_text_search_response` | Search Oncall | Text-based search results |
| **Deep Search** | `meta_ai_deep_search` | Search Oncall | In-depth search queries |
| **1P Citations** | `MetaAI_Search_1P` | Search Oncall | First-party content citations |
| **2P News** | `MetaAI_Search_2P_News` | Search Oncall | Second-party news results |
| **1P Reels** | `MetaAI_Search_1P_Reels` | Search Oncall | First-party Reels results |
| **Language Mismatch** | `MetaAI_Search_Language` | Search Oncall | Responses in wrong language |
| **Other** | `MetaAI_Search_Other` | Search Oncall | Issues not fitting other categories |

### Key Contacts

| Name | Role | Area |
|------|------|------|
| **Helen Lu** | POM | Search Triage Guide |
| **Devan Terry** | POM | Search Features |
| **TBD** | Search Lead | Search Features |

---

## Priority Definitions

| Priority | Criteria | Examples |
|----------|----------|----------|
| **High** | Search completely broken. No results returned. Incorrect/harmful information. | Search fails, wrong answers, factual errors |
| **Medium** | Search works but with issues. Partial results. Language issues. | Incomplete results, slow search, language mismatch |
| **Low** | Minor issues with workarounds. Quality improvements. | Citation formatting, minor relevance issues |
| **Wishlist** | Feature requests and suggestions. | New search capabilities |

---

## Triage Decision Tree

```
START: Search-related bug received
         │
         ├─── Is it a TEXT MODEL QUALITY issue?
         │    └── Check: Is the issue about search results or general AI response?
         │         ├── Search results → Continue with this guide
         │         └── General AI response → Text Model Quality Guide
         │
         ├─── Is it a LANGUAGE MISMATCH issue?
         │    └── YES → Tag: MetaAI_Search_Language
         │
         ├─── Identify the SURFACE:
         │    ├── Meta AI App → Use C50 title format
         │    ├── meta.ai → Use Ecto title format
         │    └── FB/IG/WA/MSGR → Use FoA title format
         │
         ├─── Identify the SEARCH FEATURE:
         │    ├── Text Search → meta_ai_text_search_response
         │    ├── Deep Search → meta_ai_deep_search
         │    ├── 1P Citations → MetaAI_Search_1P
         │    ├── 2P News → MetaAI_Search_2P_News
         │    └── 1P Reels → MetaAI_Search_1P_Reels
         │
         ├─── Can you reproduce?
         │    ├── YES → Document repro steps + search query
         │    └── NO → Mark as "Does Not Repro"
         │
         └─── Complete triage via UDT
              └── Tag, prioritize, assign owner
```

---

## MetaAI 2.0 Search Features

For tasks related to MetaAI 2.0, use these feature definitions:

| Feature | Definition | Tag |
|---------|------------|-----|
| **Text Search Response** | Search results provided in text format | `meta_ai_text_search_response` |
| **Deep Search** | In-depth search requiring more processing | `meta_ai_deep_search` |
| **1P Citations** | Citations from first-party Meta content | `MetaAI_Search_1P` |
| **2P News** | News from second-party sources | `MetaAI_Search_2P_News` |
| **1P Reels** | Reels from first-party content | `MetaAI_Search_1P_Reels` |

---

## Practical Triage Workflow

### Step 1: Initial Identification

1. **Differentiate Search vs Model Quality**
   - If the issue is about *search results* (factual info, citations) → Continue with this guide
   - If the issue is about *general AI responses* → Text Model Quality Guide

2. **Check for Language Issues**
   - Language Mismatch = Response in different language than expected
   - Tag: `MetaAI_Search_Language`

### Step 2: Repro Attempt

- [ ] Which surface and platform?
- [ ] What search query was used?
- [ ] Can you reproduce the issue?
- [ ] What are the exact steps?

### Step 3: Use Debug Tools

**Meta Search Inspector**:
```
https://www.internalfb.com/mase/debug?request_id=[REQUEST_ID]
```

Replace `[REQUEST_ID]` with the bot request ID from the task.

### Step 4: Identify the Feature

**Task Title Format:**

For C50:
```
[c50][Search][Platform][App Version] Summary of the issue
```

For Ecto:
```
[Ecto][Search] Summary of the issue
```

For FoA:
```
[App][Platform][Search][App Version] Summary of the issue
```

### Step 5: Complete Triage via UDT

1. **Tag** - Apply appropriate search feature tag
2. **Prioritize** - Use priority schema
3. **Assign Owner** - Route to Search oncall

---

## KP Merge Rules

- Only merge if the search issue is **exactly the same query and result**
- Different queries = Different bugs
- Language mismatch issues can be grouped if same language pair

---

## Related Triage Guides

| Guide | When to Use |
|-------|-------------|
| **Text Model Quality Guide** | General AI response quality issues |
| **C50 Guide** | Meta AI App UI/UX issues |
| **Ecto Guide** | Meta AI Website UI/UX issues |
| **FoA Guide** | Family of Apps UI/UX issues |

---

## Revision History

| Date | Author | Section | Description |
|------|--------|---------|-------------|
| Jan 22, 2026 | Devan Terry | Step 2 | Added MetaAI 2.0 Search features to align with UDT flow |

---

*Last updated: March 2026*
*Document POM: Helen Lu*
