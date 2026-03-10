# Growth, Sharing, and Ranking Triage Guide

> **Product Area**: Growth, Sharing, and Ranking
> **Last Updated**: March 2026
> **Child Process Owner**: Meta AI Triage Team

---

## Overview

Growth, Sharing, and Ranking encompasses features related to user acquisition, engagement, content sharing mechanisms, and algorithmic ranking of Meta AI responses and content. This is a unified product area covering three interconnected domains.

---

## Scope Definition

### In Scope
- User growth and acquisition flows
- Sharing functionality across surfaces
- Response ranking and quality signals
- Viral loops and referral mechanisms
- Onboarding optimization
- Engagement metrics and triggers
- Content distribution algorithms
- Share previews and link generation

### Out of Scope
- Core AI model quality (→ Text/Voice Model Quality)
- Surface-specific UI bugs (→ C50/Ecto/FoA guides)
- Character-specific features (→ Characters Guide)
- Media generation issues (→ Media Generation Guide)

---

## Feature Categories

### 1. Growth Features

| Feature | Description | Tag | Owner/Oncall |
|---------|-------------|-----|--------------|
| Onboarding | New user onboarding flows | `metaai_growth_onboarding` | metaai_growth_oncall |
| Acquisition | User acquisition funnels | `metaai_growth_acquisition` | metaai_growth_oncall |
| Activation | First-time user activation | `metaai_growth_activation` | metaai_growth_oncall |
| Retention | User retention mechanisms | `metaai_growth_retention` | metaai_growth_oncall |
| Reactivation | Lapsed user re-engagement | `metaai_growth_reactivation` | metaai_growth_oncall |
| Notifications | Growth-related notifications | `metaai_growth_notifications` | metaai_growth_oncall |
| Entry Points | Discovery entry points | `metaai_growth_entrypoints` | metaai_growth_oncall |

### 2. Sharing Features

| Feature | Description | Tag | Owner/Oncall |
|---------|-------------|-----|--------------|
| Share to Chat | Share AI responses to chat | `metaai_sharing_chat` | metaai_sharing_oncall |
| Share to Feed | Share to FB/IG feeds | `metaai_sharing_feed` | metaai_sharing_oncall |
| Share to Story | Share to Stories | `metaai_sharing_story` | metaai_sharing_oncall |
| Link Sharing | Shareable link generation | `metaai_sharing_links` | metaai_sharing_oncall |
| Share Previews | OG previews for shared content | `metaai_sharing_previews` | metaai_sharing_oncall |
| Cross-App Sharing | Share across Meta apps | `metaai_sharing_crossapp` | metaai_sharing_oncall |
| External Sharing | Share outside Meta apps | `metaai_sharing_external` | metaai_sharing_oncall |

### 3. Ranking Features

| Feature | Description | Tag | Owner/Oncall |
|---------|-------------|-----|--------------|
| Response Ranking | AI response quality ranking | `metaai_ranking_response` | metaai_ranking_oncall |
| Content Ranking | Content prioritization | `metaai_ranking_content` | metaai_ranking_oncall |
| Suggestion Ranking | Prompt/suggestion ordering | `metaai_ranking_suggestions` | metaai_ranking_oncall |
| Personalized Ranking | User-specific ranking | `metaai_ranking_personalized` | metaai_ranking_oncall |
| Quality Signals | Ranking quality indicators | `metaai_ranking_signals` | metaai_ranking_oncall |
| Feedback Loops | User feedback integration | `metaai_ranking_feedback` | metaai_ranking_oncall |

---

## Triage Process

### Step 1: Identify Sub-Domain

Determine which of the three sub-domains the issue belongs to:

| Keywords/Signals | Sub-Domain |
|------------------|------------|
| onboarding, new user, first time, tutorial, signup | Growth |
| share, post, send, link, preview | Sharing |
| order, priority, relevance, quality, ranking | Ranking |

### Step 2: Categorize Issue Type

| Issue Type | Description | Priority Guidance |
|------------|-------------|-------------------|
| Broken Functionality | Feature not working as expected | High |
| Performance | Slow sharing/loading times | Medium-High |
| UX/UI | User experience issues | Medium |
| Analytics | Tracking/metrics issues | Medium |
| Enhancement | Feature requests | Low-Wishlist |

### Step 3: Apply Tags

**Task Title Format:**
```
[Meta AI][Growth/Sharing/Ranking][Feature][Surface]
```

**Example Titles:**
- `[Meta AI][Growth][Onboarding][C50] Tutorial skips intro screen on iOS`
- `[Meta AI][Sharing][Feed][FoA] Share to Instagram fails with error`
- `[Meta AI][Ranking][Response][Ecto] Responses not personalized after feedback`

---

## Priority Definitions

| Priority | Criteria | Response Time |
|----------|----------|---------------|
| **High** | Blocks user acquisition/retention, widespread sharing failures, ranking producing harmful content | < 4 hours |
| **Medium** | Degraded growth flows, intermittent sharing issues, suboptimal ranking | < 24 hours |
| **Low** | Minor UX issues, edge cases, tracking gaps | < 1 week |
| **Wishlist** | Nice-to-have improvements, future considerations | Backlog |

---

## Common Issues & Playbooks

### Growth Issues

#### Onboarding Failures
```
SYMPTOMS:
- Users stuck on onboarding screens
- Tutorial not progressing
- Skip button not working

INVESTIGATION:
1. Check onboarding experiment configs
2. Verify user eligibility conditions
3. Review crash/error logs

TAGS: metaai_growth_onboarding
OWNER: metaai_growth_oncall
```

#### Entry Point Not Visible
```
SYMPTOMS:
- Meta AI entry point missing
- Discovery surfaces not showing AI option

INVESTIGATION:
1. Check feature gating conditions
2. Verify user country/locale eligibility
3. Review A/B experiment allocation

TAGS: metaai_growth_entrypoints
OWNER: metaai_growth_oncall
```

### Sharing Issues

#### Share to Feed Failure
```
SYMPTOMS:
- Share action fails with error
- Content not appearing on feed
- Preview not rendering correctly

INVESTIGATION:
1. Check sharing permissions
2. Verify content policy compliance
3. Review OG meta tag generation

TAGS: metaai_sharing_feed
OWNER: metaai_sharing_oncall
```

#### Link Preview Issues
```
SYMPTOMS:
- Wrong preview image
- Missing title/description
- Preview not loading

INVESTIGATION:
1. Check URL generation service
2. Verify OG scraper functionality
3. Review caching behavior

TAGS: metaai_sharing_previews
OWNER: metaai_sharing_oncall
```

### Ranking Issues

#### Poor Response Relevance
```
SYMPTOMS:
- Responses not matching user intent
- Personalization not applied
- Consistent low-quality suggestions

INVESTIGATION:
1. Check user preference signals
2. Verify ranking model version
3. Review feedback signal integration

TAGS: metaai_ranking_response
OWNER: metaai_ranking_oncall
```

---

## Cross-Functional Dependencies

| Dependency | When to Involve |
|------------|-----------------|
| **Integrity** | Sharing content flagged by policy |
| **Ads** | Growth experiments affecting ad surfaces |
| **Infra** | Ranking service latency issues |
| **Analytics** | Metric discrepancies or tracking gaps |
| **Legal** | Sharing consent or data issues |

---

## TOT Considerations

### Transfer TO Growth/Sharing/Ranking
- Tasks initially filed as surface bugs that are actually growth/sharing/ranking issues
- Generic "AI not showing" tasks that are entry point related
- "Content not appearing" that are sharing failures

### Transfer FROM Growth/Sharing/Ranking
- **To Surface Guides**: If issue is surface-specific UI (not growth/sharing/ranking logic)
- **To Model Quality**: If issue is response quality (not ranking)
- **To Integrity**: If issue is policy/safety related

---

## Key Contacts

| Role | Workplace Handle |
|------|------------------|
| Growth Oncall | @metaai_growth_oncall |
| Sharing Oncall | @metaai_sharing_oncall |
| Ranking Oncall | @metaai_ranking_oncall |
| PM - Growth | TBD |
| PM - Sharing | TBD |
| PM - Ranking | TBD |

---

## Metrics & Dashboards

| Metric | Description | Dashboard |
|--------|-------------|-----------|
| New User Activation | % of new users who complete first interaction | Growth Dashboard |
| Share Success Rate | % of share attempts that succeed | Sharing Dashboard |
| Ranking Satisfaction | User satisfaction with response relevance | Ranking Dashboard |
| Entry Point CTR | Click-through rate on discovery surfaces | Growth Dashboard |

---

## Resources

- Growth Experiment Configs: [Internal Link]
- Sharing API Documentation: [Internal Link]
- Ranking Model Documentation: [Internal Link]
- Growth/Sharing/Ranking Task Queue: [Workplace Group]

---

*This guide is part of the Meta AI Triage System. For surface-specific triage, see the respective surface guides (C50, Ecto, FoA).*
