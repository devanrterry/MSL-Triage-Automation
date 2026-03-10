# Media Generation Bug Triage Operations Guide

> **Your mission**: Efficiently triage bugs related to AI-generated media (images, videos, music) across all Meta AI surfaces.

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

**Media Generation** encompasses all AI-generated media content including images, videos, and music within Meta AI.

### Applicable Surfaces

| Surface | Platform | Description |
|---------|----------|-------------|
| **C50** | iOS, Android | Media Gen in Meta AI App |
| **Ecto** | Web | Media Gen on meta.ai |
| **FoA** | FB, IG, WA, MSGR | Media Gen in Family of Apps |

---

## Feature Categories

### Media Generation Feature Matrix

| Feature | Tag | Owner | Description |
|---------|-----|-------|-------------|
| **Image Generation** | `MetaAI_MediaGen_Image` | Media Oncall | AI-generated images (Imagine) |
| **Video Generation** | `MetaAI_MediaGen_Video` | Media Oncall | AI-generated videos |
| **Music Generation** | `MetaAI_MediaGen_Music` | Media Oncall | AI-generated music/audio |
| **Remix** | `MetaAI_MediaGen_Remix` | Media Oncall | Remixing existing content |
| **Media Sharing** | `MetaAI_MediaGen_Share` | Media Oncall | Sharing generated media |
| **Media Safety** | `MetaAI_MediaGen_Safety` | Media Safety Team | Safety/policy issues with generated content |
| **Other** | `MetaAI_MediaGen_Other` | Media Oncall | Issues not fitting other categories |

### Key Contacts

| Name | Role | Area |
|------|------|------|
| **Mark Nettles** | POM | Media Generation Guide |
| **TBD** | Media Lead | Media Generation Features |

---

## Priority Definitions

| Priority | Criteria | Examples |
|----------|----------|----------|
| **High** | Media generation completely broken. Safety issues (generating harmful content). Core functionality blocked. | Cannot generate images, safety bypass, generation crashes |
| **Medium** | Generation works but with issues. Quality degradation. UI/UX problems. | Slow generation, quality issues, minor UI bugs |
| **Low** | Minor issues with workarounds. Polish and improvements. | Visual polish, minor quality improvements |
| **Wishlist** | Feature requests and suggestions. | New media generation capabilities |

---

## Triage Decision Tree

```
START: Media Generation bug received
         │
         ├─── Is it a MODEL SAFETY issue?
         │    └── YES → Tag: MetaAI_MediaGen_Safety
         │         └── Route to Media Safety Team
         │
         ├─── Is it a TEXT MODEL QUALITY issue (prompt understanding)?
         │    └── YES → Switch to Text Model Quality Guide
         │
         ├─── Identify the SURFACE:
         │    ├── Meta AI App → Use C50 title format
         │    ├── meta.ai → Use Ecto title format
         │    └── FB/IG/WA/MSGR → Use FoA title format
         │
         ├─── Identify the MEDIA TYPE:
         │    ├── Image Generation → MetaAI_MediaGen_Image
         │    ├── Video Generation → MetaAI_MediaGen_Video
         │    ├── Music Generation → MetaAI_MediaGen_Music
         │    ├── Remix → MetaAI_MediaGen_Remix
         │    └── Sharing → MetaAI_MediaGen_Share
         │
         ├─── Can you reproduce?
         │    ├── YES → Document repro steps + prompt used
         │    └── NO → Mark as "Does Not Repro"
         │
         └─── Complete triage via UDT
              └── Tag, prioritize, assign owner
```

---

## Issue Types

### 3.1 Image Generation Issues

| Issue Type | Description | Tag |
|------------|-------------|-----|
| **Failed Generation** | Image fails to generate | `MetaAI_MediaGen_Image` |
| **Quality Issues** | Generated image quality problems | `MetaAI_MediaGen_Image` |
| **Wrong Output** | Image doesn't match prompt | `MetaAI_MediaGen_Image` |
| **Safety Bypass** | Generated harmful/inappropriate content | `MetaAI_MediaGen_Safety` |

### 3.2 Video Generation Issues

| Issue Type | Description | Tag |
|------------|-------------|-----|
| **Failed Generation** | Video fails to generate | `MetaAI_MediaGen_Video` |
| **Playback Issues** | Video won't play | `MetaAI_MediaGen_Video` |
| **Quality Issues** | Video quality problems | `MetaAI_MediaGen_Video` |

### 3.3 Music Generation Issues

| Issue Type | Description | Tag |
|------------|-------------|-----|
| **Failed Generation** | Music fails to generate | `MetaAI_MediaGen_Music` |
| **Playback Issues** | Audio won't play | `MetaAI_MediaGen_Music` |
| **Quality Issues** | Audio quality problems | `MetaAI_MediaGen_Music` |

---

## Practical Triage Workflow

### Step 1: Initial Identification

1. **Check if Safety Issue**
   - If user generated harmful/inappropriate content → Media Safety Team
   - Route with `MetaAI_MediaGen_Safety` tag

2. **Check if Model Quality Issue**
   - If the issue is about prompt understanding → Text Model Quality Guide
   - If the issue is about generation quality/functionality → Continue with this guide

### Step 2: Repro Attempt

- [ ] Which surface and platform?
- [ ] Which media type? (Image/Video/Music)
- [ ] What prompt was used?
- [ ] Can you reproduce the issue?
- [ ] What are the exact steps?

### Step 3: Identify the Feature

**Task Title Format:**

For C50:
```
[c50][MediaGen][Platform][App Version] Summary of the issue
```

For Ecto:
```
[Ecto][MediaGen] Summary of the issue
```

For FoA:
```
[App][Platform][MediaGen][App Version] Summary of the issue
```

### Step 4: Complete Triage via UDT

1. **Tag** - Apply `MetaAI_MediaGen` + specific media type tag
2. **Prioritize** - Use priority schema (Safety issues = High)
3. **Assign Owner** - Route to Media oncall (or Safety team)

---

## Media Safety Guidelines

### When to Route to Safety Team

- User was able to generate violent/harmful imagery
- Generated content violates Meta policies
- Safety filters failed to block inappropriate requests
- Privacy concerns with generated content

### Safety Tags
- `MetaAI_MediaGen_Safety` - General safety issues
- Tag with appropriate policy violation type

---

## KP Merge Rules

- Only merge if the media generation issue is **exactly the same**
- Different prompts = Different bugs (unless systemic)
- Different media types (image vs video) = Different bugs
- Safety issues should NOT be merged

---

## Related Triage Guides

| Guide | When to Use |
|-------|-------------|
| **Text Model Quality Guide** | Prompt understanding issues |
| **C50 Guide** | Meta AI App UI/UX issues |
| **Ecto Guide** | Meta AI Website UI/UX issues |
| **FoA Guide** | Family of Apps UI/UX issues |

---

*Last updated: March 2026*
*Document POM: Mark Nettles*
