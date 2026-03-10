# Surface: Hatch Triage Guide

> **Surface**: Hatch
> **Last Updated**: March 2026
> **Child Process Owner**: Meta AI Triage Team

---

## Overview

Hatch is a Meta AI surface for creative and generative experiences. This guide covers triage operations for bugs and issues reported on the Hatch surface.

---

## Scope Definition

### In Scope
- Hatch-specific UI and UX issues
- Hatch platform functionality
- Account and authentication on Hatch
- Hatch-specific features and flows
- Hatch integrations

### Out of Scope
- Cross-surface AI features (→ Feature guides)
- Text/Voice model quality (→ Model guides)
- Issues on other surfaces (→ respective surface guides)

---

## Platform Support

| Platform | Supported | Notes |
|----------|-----------|-------|
| Web | Yes | Desktop and mobile browsers |
| iOS | TBD | Check current support |
| Android | TBD | Check current support |

---

## Feature Areas

| Feature | Description | Tag | Owner/Oncall |
|---------|-------------|-----|--------------|
| Core Experience | Main Hatch interactions | `hatch-core` | hatch_oncall |
| Creation Tools | Content creation features | `hatch-creation` | hatch_oncall |
| Gallery | Content viewing and discovery | `hatch-gallery` | hatch_oncall |
| Sharing | Share and export functionality | `hatch-sharing` | hatch_oncall |
| Settings | User settings and preferences | `hatch-settings` | hatch_oncall |
| Onboarding | New user onboarding | `hatch-onboarding` | hatch_oncall |

---

## Triage Process

### Step 1: Identify Issue Type

| Issue Type | Description | Priority Guidance |
|------------|-------------|-------------------|
| Outage | Service unavailable | Critical |
| Functional Bug | Feature not working as expected | Medium-High |
| Performance | Slow/laggy experience | Medium |
| UI/UX | Visual or interaction issues | Medium-Low |
| Enhancement | Feature requests | Wishlist |

### Step 2: Apply Tags

**Task Title Format:**
```
[Hatch][Feature][Platform] Brief description
```

**Example Titles:**
- `[Hatch][Creation][Web] Unable to save generated content`
- `[Hatch][Gallery][Mobile Web] Images not loading in gallery view`

### Step 3: Route to Owner

Primary oncall: `hatch_oncall`

---

## Priority Definitions

| Priority | Criteria | Response Time |
|----------|----------|---------------|
| **Critical** | Service outage, widespread failures | Immediate |
| **High** | Core functionality broken, login failures | < 4 hours |
| **Medium** | Feature degradation, performance issues | < 24 hours |
| **Low** | Minor bugs, cosmetic issues | < 1 week |
| **Wishlist** | Feature requests, improvements | Backlog |

---

## Common Issues & Playbooks

### Creation Failures
```
SYMPTOMS:
- Unable to create/generate content
- Generation hangs or times out
- Error messages during creation

INVESTIGATION:
1. Check if issue is Hatch-specific or model-related
2. Get browser/device info
3. Check for recent deployments
4. Verify reproduction steps

TAGS: hatch-creation
OWNER: hatch_oncall
```

### Loading/Performance Issues
```
SYMPTOMS:
- Page loads slowly
- Content doesn't load
- Timeouts or errors

INVESTIGATION:
1. Check user's network/location
2. Verify across different browsers
3. Check backend service health

TAGS: hatch-performance
OWNER: hatch_oncall
```

---

## Data Collection Requirements

| Data Point | Required | Description |
|------------|----------|-------------|
| Browser/App | Yes | Browser name and version |
| Platform | Yes | Desktop/Mobile, OS |
| URL | Yes | Page where issue occurred |
| Reproduction Steps | Yes | How to reproduce |
| Screenshots/Video | If applicable | Visual evidence |
| Console Errors | If applicable | Browser console logs |

---

## TOT Considerations

### Transfer TO Hatch
- Issues filed on wrong surface that belong to Hatch

### Transfer FROM Hatch
- **To Feature Guides**: If issue is cross-surface feature (Media Gen, Characters, etc.)
- **To Model Guides**: If issue is AI response/generation quality
- **To Other Surfaces**: If issue is on different platform

---

## Key Contacts

| Role | Contact |
|------|---------|
| Hatch Oncall | hatch_oncall |
| Hatch PM | TBD |
| Hatch Eng Lead | TBD |

---

*This guide is part of the Meta AI Triage System.*
