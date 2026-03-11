# Surface: Vibes App Triage Guide

> **Surface**: Vibes App
> **Last Updated**: Jan 15, 2026
> **POM**: Rishi Shah
> **Audience**: Triage Specialists

---

## Key Resources

- [Vibes App Triage Documentation](https://www.internalfb.com/intern/wiki/Vibes_App_Triage/)
- WP Group: [Join for Dogfooding](https://fb.workplace.com/groups/vibes_app)

---

## Overview

This document is intended to cover the triage processes for issues related to issues reported on the Vibes App.

The standard text expander should be used for all of these issues, unless the issue is identified to be a text or voice model quality issue, then model quality text expander should be used.

### Instructions for Dogfooding
1. Join the WP Group (link above)
2. Download the Vibes app from Mobile Home (the app image is a "Play" icon with a circle around it)

---

## Scope Definition

### In Scope
- Vibes App-specific UI and UX issues
- App crashes and performance issues
- Account and authentication on Vibes
- Vibes-specific features and flows
- App-specific integrations

### Out of Scope
- Cross-surface AI features (→ Feature guides)
- Text/Voice model quality (→ Model guides)
- Issues on other surfaces (→ respective surface guides)

---

## Platform Support

| Platform | Supported | Notes |
|----------|-----------|-------|
| iOS | Yes | iPhone and iPad |
| Android | Yes | Android 10+ |
| Web | No | Mobile app only |

---

## Step 2: Identify Feature

| Feature | Definition | Tag |
|---------|------------|-----|
| **Feed** | Any issue on the Feed page which is the "Home" icon on the bottom left | `vibes-feed` |
| **Creation** | Generate new videos using AI-powered tools, prompts, and visual or audio customization options by tapping the "Plus" icon in the middle | `vibes-creation` |
| **Lightbox** | Lightbox is the UI when clicking on an image/video | `vibes-lightbox` |
| **Convo Starters** | Pre-written suggestions shown on the creation tab, seen on top of the screen | `vibes-convostarters` |
| **Media Gallery** | Access and manage all your created, remixed, and saved videos in one organized location by tapping the "Portrait" icon second from the left | `vibes-gallery` |
| **Text Overlay** | Allows users to add, edit, or display text directly on top of images or videos | `vibes-textoverlay` |
| **Swap** | Easily swap yourself or friends into videos, changing the starring role or visual elements with a single tap | `vibes-swap` |
| **Swap Onboarding** | Guided introduction to the Swap feature, helping users understand how to add themselves or others to videos | `vibes-swap-onboarding` |
| **Profile** | Showcase your creations, remixes, and personal information, and manage your public presence in the app | `vibes-profile` |
| **Music** | Add, edit, or remix music tracks in your videos, including voice recording and lip sync features | `vibes-music` |
| **Activity Tab** | Track your recent interactions, video views, likes, comments, notifications and engagement history | `vibes-activity` |
| **Remix** | Edit and personalize existing videos by changing visuals, music, dialogue, or starring roles | `vibes-remix` |
| **Notifications** | Receive alerts about new content, collaborations, mentions, and activity related to your account | `vibes-notifications` |
| **Sharing** | Distribute your videos to the Vibes feed, send via DM, or cross-post to Facebook and Instagram Stories/Reels | `vibes-sharing` |
| **Account** | Manage your login credentials, linked social profiles, and account security settings | `vibes-account` |
| **Settings** | Customize app preferences, privacy controls, notification options | `vibes-settings` |
| **Safety** | Any issues focused on preventing physical, psychological, or social harm. Examples include hate speech, violence, self-harm, etc. | `vibes-safety` |
| **Integrity** | Focus on the trustworthiness, accuracy, and reliability of content. Examples include account consent (youth) or blocking an account doesn't work | `vibes-integrity` |
| **Characters** | AI-generated characters, with a focus on enabling immersive experiences | `vibes-characters` |
| **Spaces** | Closed groups on Vibes that users can create with their friends to collaborate and share media together in a private space | `vibes-spaces` |
| **Model Quality** | Any model quality related issues | `vibes-model-quality` |

---

## Step 3: Known Problems (KP) | Identify Known Problems

- **Error IDs**: Before merging tasks with error messages, make sure the Error ID is exactly the same as well
- Follow the KP process outlined in the Triaging Parent Process

---

## Step 4: Complete Triage

Triage will then be expected to complete remaining triage steps (tag, prioritize, and assign owner).

**Task Title Format:**
```
[Vibes App][Feature][Platform][App Version] Summary of the issue
```

**Examples:**
- `[Vibes App][Creation][iOS][2.1.0] Video generation fails after prompt submission`
- `[Vibes App][Swap][Android][2.0.5] Unable to swap face into video`
- `[Vibes App][Feed][iOS][2.1.0] Videos not loading in feed`

The above actions should be automated via submission of the UDT form.

---

## Priority Definitions

| Priority | Product Bugs - Functionality / Usability | Vibes App Model Quality |
|----------|------------------------------------------|-------------------------|
| **High** | High priority bugs that block core product functionality, cause major regressions, or significantly degrade the user experience: | Severe Safety and Integrity Issues - model generates content that poses significant risk: |
| | • Crash & App Stall | • Violence, hate speech, or discriminatory content |
| | • Any broken functionality - can't complete or can't load items | • Explicit or suggestive content |
| | • Creation, Posting, Remix, upload, edit, Delete | • Politically sensitive or biased content |
| | • Sharing, Like | • Content that promotes harm or danger |
| | • Feed - Broken/Can't load Tab | |
| | • Pagination (tail loads) don't work | |
| | • Navigation issues (unintended tab reset, scroll position reset) | |
| | • Issues with navigating to gallery after creation | |
| | • Same content after PTR or app restart (ranking issues) | |
| | • Midcards CTAs not working | |
| | • Search being broken | |
| | • Notification not rendering | |
| | • Broken push/jewel notif click experience | |
| | • Broken deeplinks | |
| | • Security, privacy, Account or compliance issues | |
| | • Login/logout issues | |
| | • Load times above 10s | |
| | • UI issues that affect functionality | |
| | • Safety and Integrity issues | |
| **Medium** | Medium priority bugs - important but don't block core functionality: | Noticeable Quality Issues - model generates images with flaws: |
| | • UI does not match designs but doesn't block usage | • Inconsistent or unrealistic image styles |
| | • Performance slowdowns with moderate reproducibility | • Incorrect or missing details (hands, fingers, facial features) |
| | • Bugs affecting non-key, less-frequently-used functionality | • Images not visually appealing or lacking coherence |
| | • Issues with straightforward workarounds | • Wrong number of hands/fingers, disembodied appendages |
| | • Moderate number of user reports | • Image quality, resolution, style issues |
| | • UI Misalignments, minor overlaps | |
| | • Content and spelling issues (non privacy/legal) | |
| | • Missing Error/empty state UI | |
| **Low** | Bugs with temporary workaround not impacting end-user goals. Suggestions, polish, and improvements that are nice to have but not urgent. | Not Applicable for MediaGen tasks |
| **Wishlist** | Feedback not immediately actionable, nice to have, ideas for next iteration | Feedback not immediately actionable, nice to have, ideas for next iteration |

---

## Common Issues & Playbooks

### App Crash
```
SYMPTOMS:
- App force closes
- Unexpected termination

INVESTIGATION:
1. Get crash logs from user
2. Check app version and OS version
3. Identify reproduction steps
4. Check for recent app updates

TAGS: vibes-crash
OWNER: vibes_oncall
```

### Performance Issues
```
SYMPTOMS:
- App running slowly
- UI lag or freezing
- High battery/memory usage

INVESTIGATION:
1. Get device info and app version
2. Check for device-specific patterns
3. Review memory/CPU metrics if available

TAGS: vibes-performance
OWNER: vibes_oncall
```

---

## Data Collection Requirements

| Data Point | Required | Description |
|------------|----------|-------------|
| App Version | Yes | Current Vibes app version |
| Platform/OS | Yes | iOS version or Android version |
| Device Model | Yes | Specific device model |
| Reproduction Steps | Yes | How to reproduce |
| Screenshots/Video | If applicable | Visual evidence |

---

## TOT Considerations

### Transfer TO Vibes App
- Issues filed on wrong surface that belong to Vibes

### Transfer FROM Vibes App
- **To Feature Guides**: If issue is cross-surface feature (Characters, Media Gen, etc.)
- **To Model Guides**: If issue is AI response quality
- **To Other Surfaces**: If issue is on different app

---

## Key Contacts

| Role | Contact |
|------|---------|
| Vibes Oncall | vibes_oncall |
| Vibes PM | TBD |
| Vibes Eng Lead | TBD |

---

*This guide is part of the Meta AI Triage System.*
