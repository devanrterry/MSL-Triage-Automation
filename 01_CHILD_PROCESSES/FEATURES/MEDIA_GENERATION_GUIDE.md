# Media Generation Triage Guide

> **Feature**: Media Generation (Images & Videos)
> **Last Updated**: Jan 7, 2025
> **Document POC**: Rishi Shah
> **Audience**: Triage Specialists

---

## Overview

This document covers triage processes for issues related to any generation, editing, or animation of media, which includes both images and videos.

These issues can be found in the following surfaces:
- **C50** - Meta AI App (iOS/Android)
- **Ecto** - meta.ai website
- **FoA** - IG, FB, MSGR, WA

> **Note**: For Vibes App issues, please refer to the specific Vibes App Triage Guide

---

## Bug Triage Process

### Step 1: Task Titling

**C50 Task Titling:**
```
[C50 Media][Feature][Platform][App Version] Summary of the issue
```

**Ecto Task Titling:**
```
[Website][Feature] Summary of the issue
```

**FoA Task Titling:**
```
[App][Platform][Feature][App Version] Summary of the issue
```
> Note: If it's web, remove the app version section

---

### Step 2: Task Template

TS should input the task template and fill out the requested details.

**For Model Quality/Safety issues**: Use the model template
- Model media issues relate to accuracy and safety of the media requested
- Examples: Images/videos irrelevant to what user wanted, media being inappropriate or inaccurate

**For Other Issues**: Use the non-model quality template
- Includes UI/UX issues, image/video resolution, interface issues
- Examples: Unclear visual cues, UI components not working, confusing layouts

**Repro Attempt**: After identifying the right app experience, TS should attempt repro on the correct App. TS should NOT try to repro model quality issues (use "Skip" option in UDT).

---

### Step 3: Identify the Specific Product Area within Media

#### FoA Media Features
> Visual Guide: FOA Media Feature Visual Guide

| Product/Feature | Description | Tags |
|-----------------|-------------|------|
| **Image Generation** | Generating images, usually via the "Imagine" prompt word | `imagine-intents` |
| **Image Animation** | Animating images either uploaded or created | `imagine-animate` |
| **MEmu (Imagine Me)** | Creating images of yourself prompted by "Imagine me…" | |
| **WEmu (Imagine Us)** | Creating images of others prompted by "Imagine Us…" | |
| **Image Editing** | Editing images that have been uploaded or created | `imagine-editing` |
| **Video Editing** | Uploading a video and editing via filters for subject or background | `movieGen` |

#### Ecto Media Features
> Visual Guide: Web Media Visual Guide

| Product/Feature | Description | Tags |
|-----------------|-------------|------|
| **Swap Me** | Swap yourself into videos | `concord-swapme` |
| **Text to Image Creation** | Generate images from text | `ecto-media-T2I` |
| **Editing** | Edit images/videos | `ecto-media-editing` |
| **Extend** | Extend images/videos | `ecto-media-extend` |
| **Text to Video** | Generate videos from text | `ecto-media-T2V` |
| **Video to Video** | Transform videos | `ecto-media-V2V` |
| **I2V (Animation)** | Image to video animation | `ecto-media-I2V` |
| **Lipsync** | Lip sync features | `ecto-media-lipsync` |
| **Feed** | Media feed issues | `ecto-media-feed` |
| **Comment Bottom Sheet** | Comment UI | `ecto-media-comment-bottom-sheet` |
| **Posting Video to Feed** | Video posting | `ecto-media-posting-videos` |
| **Lightbox** | Lightbox viewer | `ecto-media-lightbox` |
| **Media Gallery** | Gallery management | `ecto-media-media-gallery` |
| **Text Overlay** | Text on media | `ecto-media-text-overlay` |
| **Music** | Music features | `ecto-media-music` |
| **Notifications** | Media notifications | `ecto-media-notifications` |
| **Restyle** | Restyle media | `ecto-media-restyle` |
| **Voiceover** | Voice overlay | `ecto-media-voiceover` |
| **Model Quality** | Model accuracy, reliability, performance issues | `AI-Model-Umbrella`, `MetaAI_Model` |
| **Model Safety** | Harmful, biased, or unsafe outputs | `AI-Model-Umbrella`, `MetaAI_Model` |

#### C50 Media Features (iOS and Android)
> Visual Guide: Media C50 Visual Guide App

| Product/Feature | Description | Tags |
|-----------------|-------------|------|
| **I2V (Animate)** | Image to video animation | `c50-media-I2V-animate` |
| **V2V (Video to Video)** | Video transformation/restyle | `c50-media-I2I-V2V-restyle` |
| **Create/Edit** | Create and edit media | `c50-media-create/edit` |
| **Remix** | Remix content | `c50-media-remix` |
| **Text Overlay** | Text on media | `c50-media-text-overlay` |
| **Extend** | Extend media | `c50-media-extend` |
| **Lipsync** | Lip sync features | `c50-media-lipsync` |
| **T2V** | Text to video | `c50-media-t2v` |
| **Swap Me** | Swap yourself into videos | `concord-swapme` |
| **SAM3/Effects** | SAM3 effects | `c50-sam3` |
| **Video Controls** | Video player controls | `c50-videocontrols` |
| **AI Profiles** | AI profile features | `c50-ai-profiles` |
| **Immersive Feed/New Discover Feed** | Feed experience | `c50-immersivefeed` |
| **Comment Bottom Sheet** | Comment UI | `c50-comment-bottomsheet` |
| **Posting Video to Feed** | Video posting | `c50-post-video-to-feed` |
| **Lightbox** | Lightbox viewer | `c50-media-lightbox` |
| **Media Gallery** | Gallery management | `c50-media-media-gallery` |
| **Music** | Music features | `c50-media-music` |
| **Notifications** | Media notifications | `c50-media-notifications` |
| **Restyle** | Restyle media | `c50-media-i2i-v2v-restyle` |
| **Voiceover** | Voice overlay | `c50-media-voiceover` |
| **Model Quality** | Model accuracy, reliability, performance issues | `AI-Model-Umbrella`, `MetaAI_Model` |
| **Model Safety** | Harmful, biased, or unsafe outputs | `AI-Model-Umbrella`, `MetaAI_Model` |

---

### Step 4: Determine Priority and Complete Triage

> **⚠️ Always High Priority Features:** Swap Me, Voiceover, TTS, Lipsync

For any bugs not related to Swap Me, Voiceover, TTS, or Lipsync, use the prioritization framework below:

| Priority | Functionality / Usability | MediaGen Model Quality, Safety, Integrity |
|----------|---------------------------|-------------------------------------------|
| **High** | **Critical Functionality Breakage**: Model output significantly impacts usability. Consistent failure to generate images. Images severely distorted, corrupted, or extremely poor quality. Inability to generate images meeting basic requirements (aspect ratio, resolution). | **Severe Safety and Integrity Issues**: Violence, hate speech, discriminatory content. Explicit or suggestive content. Politically sensitive or biased content. Content promoting harm or danger. |
| **Medium** | **Usability Concerns**: Slow generation times. Difficulty understanding/interpreting generated images. Inconsistencies in formatting or layout. | **Noticeable Quality Issues**: Inconsistent or unrealistic styles. Incorrect/missing details (hands, fingers, facial features). Images not visually appealing or lacking coherence. Wrong number of hands/fingers, disembodied appendages. |
| **Low** | Not Applicable for MediaGen tasks | Not Applicable for MediaGen tasks |
| **Wishlist** | Feedback not immediately actionable. Ideas for next iteration. | |

---

### Step 5 (FoA Only): Identify Specific Issue Type

> Skip for C50/Ecto issues

| Issue Type | Description |
|------------|-------------|
| **(UI/UX) Product Issue** | Issues with product behavior, how product works, latency, etc. |
| **(UI/UX) Interface** | Issue with user flows and user interface. Example: "I don't like the imagine entrypoint being here in the app" |
| **Multimodal Routing** | User requests to edit image/video BUT response given in text format instead of media. Example: Prompt "Create an image of a cat" → Response "A furry orange animal sitting on the couch" (text format) |
| **Intent Detection / Prompt Rewriting** | Imagine edit request → incorrect image generating response. Example: "Change color of hat to red" → generates new image of red hat instead of editing existing one |
| **Media Model Quality** | Image/video response did not accurately depict user's prompt. Example: Prompt "Imagine an apple" → Image of apple with two stems, OR image of orange |
| **Media Model Safety (General)** | AI bot generates images/videos that violate integrity and safety policies (inappropriate, dangerous, etc.) |
| **Media Model Safety (False Refusal)** | AI bot says it cannot generate image/video when it should have with no problem |
| **Wishlist Task** | Feature request or general feedback, NOT a bug |

---

## Related Triage Guides

| Guide | When to Use |
|-------|-------------|
| **Text Model Quality Guide** | Prompt understanding issues |
| **Voice Model Quality Guide** | Voice/audio issues |
| **C50 Guide** | Meta AI App UI/UX issues |
| **Ecto Guide** | Meta AI Website UI/UX issues |
| **FoA Guide** | Family of Apps UI/UX issues |
| **Vibes App Guide** | Vibes-specific media issues |

---

*Last updated: Jan 7, 2025*
*Document POC: Rishi Shah*

---

*This guide is part of the Meta AI Triage System.*
