# Surface: Vibes App Triage Guide

> **Surface**: Vibes App
> **Last Updated**: March 2026
> **Child Process Owner**: Meta AI Triage Team

---

## Overview

Vibes App is a Meta AI-powered mobile application focused on social and creative experiences. This guide covers triage operations for bugs and issues reported on the Vibes App surface.

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

## Feature Areas

| Feature | Description | Tag | Owner/Oncall |
|---------|-------------|-----|--------------|
| Core Experience | Main Vibes interactions | `vibes-core` | vibes_oncall |
| Social Features | Social interactions and sharing | `vibes-social` | vibes_oncall |
| Creative Tools | Content creation tools | `vibes-creative` | vibes_oncall |
| Notifications | Push and in-app notifications | `vibes-notifications` | vibes_oncall |
| Settings | App settings and preferences | `vibes-settings` | vibes_oncall |
| Onboarding | New user onboarding | `vibes-onboarding` | vibes_oncall |

---

## Triage Process

### Step 1: Identify Issue Type

| Issue Type | Description | Priority Guidance |
|------------|-------------|-------------------|
| Crash | App crashes or force closes | High |
| Functional Bug | Feature not working as expected | Medium-High |
| Performance | Slow/laggy experience | Medium |
| UI/UX | Visual or interaction issues | Medium-Low |
| Enhancement | Feature requests | Wishlist |

### Step 2: Apply Tags

**Task Title Format:**
```
[Vibes][Feature][Platform][App Version] Brief description
```

**Example Titles:**
- `[Vibes][Creative][iOS][2.1.0] Filter not applying to photos`
- `[Vibes][Social][Android][2.0.5] Unable to share content with friends`

### Step 3: Route to Owner

Primary oncall: `vibes_oncall`

---

## Priority Definitions

| Priority | Criteria | Response Time |
|----------|----------|---------------|
| **High** | App crashes, login failures, data loss | < 4 hours |
| **Medium** | Feature degradation, performance issues | < 24 hours |
| **Low** | Minor bugs, cosmetic issues | < 1 week |
| **Wishlist** | Feature requests, improvements | Backlog |

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
