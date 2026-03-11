# Growth, Sharing, and Ranking Triage Guide

> **Document POC**: Devan Terry
> **Product Area**: Growth, Sharing, and Ranking
> **Last Updated**: January 7, 2026

---

## Overview

Growth, Sharing, and Ranking encompasses features related to user acquisition, engagement, content sharing mechanisms, and ranking feedback for Meta AI C50 responses and content. This guide covers C50-specific Growth, Sharing, and Ranking features.

---

## Task Title Format

```
[App/Website][feature][platform][App Version] Summary of the issue
```

**Examples:**
- `[c50][Growth][iOS][4.6.0] FB Bookmark QP not appearing after install`
- `[c50][Sharing][Android][4.5.2] Sharesheet fails to open when tapping share button`
- `[c50][Ranking][iOS][4.6.0] Thumbs down feedback not registering`

---

## C50 Growth Features

| Feature | Definition |
|---------|------------|
| **Upsell Cross-Post** | Promoting cross-posting of Meta AI content to other Meta platforms |
| **Attribution Bottom Sheet** | Bottom sheet displaying attribution information for shared content |
| **FB/IG in-feed QP** | Quick Promotion units appearing in Facebook/Instagram feeds to drive C50 adoption |
| **One-click install** | Streamlined installation flow reducing friction for new users |
| **Promotional message** | System-generated promotional messages encouraging C50 usage |
| **Friend joined Notification** | Push notification when a friend joins/installs Meta AI C50 |
| **FB Bookmark QP** | Quick Promotion in Facebook bookmarks section |
| **General Notification** | General push notifications for growth/engagement |
| **Thread Banner QP** | Quick Promotion banner appearing within conversation threads |
| **Imagine Intent Sheet** | Intent sheet promoting Imagine features |
| **Contextual upsell** | Context-aware upsells appearing based on user behavior |

### Growth Tags and Routing

| Feature Type | Tag | Oncall |
|--------------|-----|--------|
| Upsell Cross-Post | `metaai_growth_crosspost` | metaai_growth_oncall |
| Attribution | `metaai_growth_attribution` | metaai_growth_oncall |
| QP (Quick Promotions) | `metaai_growth_qp` | metaai_growth_oncall |
| Install Flow | `metaai_growth_install` | metaai_growth_oncall |
| Notifications | `metaai_growth_notifications` | metaai_growth_oncall |

---

## C50 Sharing Features

| Feature | Definition |
|---------|------------|
| **Post Reshare** | Resharing Meta AI posts to other platforms or within Meta |
| **Direct Media Share** | Sharing media directly to contacts or chats |
| **Media Link Share** | Sharing media via generated links |
| **Conversation Link Share** | Sharing conversation threads via links |
| **Post Link Share** | Sharing individual posts via links |
| **Profile Link Share** | Sharing user/AI profile links |
| **Sharesheet** | Native system share sheet integration |
| **Share entrypoint** | Entry points for initiating share actions |
| **Share attribution** | Attribution display for shared content origin |

### Sharing Tags and Routing

| Feature Type | Tag | Oncall |
|--------------|-----|--------|
| Post Sharing | `metaai_sharing_post` | metaai_sharing_oncall |
| Media Sharing | `metaai_sharing_media` | metaai_sharing_oncall |
| Link Sharing | `metaai_sharing_links` | metaai_sharing_oncall |
| Sharesheet | `metaai_sharing_sheet` | metaai_sharing_oncall |
| Attribution | `metaai_sharing_attribution` | metaai_sharing_oncall |

---

## C50 Ranking Guidance

### Ranking vs Integrity Feedback

It's important to distinguish between **Ranking feedback** and **Integrity feedback** when triaging:

| Feedback Type | Description | Routing |
|---------------|-------------|---------|
| **Ranking Feedback** | User feedback on response quality, relevance, helpfulness (thumbs up/down, ratings) | Ranking Oncall |
| **Integrity Feedback** | Reports of policy violations, harmful content, safety issues | Integrity Oncall |

### Ranking Feedback Criteria

Ranking feedback includes:
- Thumbs up/down on AI responses
- Response quality ratings
- "Not helpful" feedback
- "Wrong answer" reports
- Personalization preference feedback

### Integrity Feedback Criteria

Route to Integrity if:
- Report contains policy violation claim
- Content is flagged as harmful/offensive
- User reports safety concern
- Content violates community standards

### Ranking Tags and Routing

| Feature Type | Tag | Oncall |
|--------------|-----|--------|
| Response Feedback | `metaai_ranking_feedback` | metaai_ranking_oncall |
| Quality Signals | `metaai_ranking_quality` | metaai_ranking_oncall |
| Personalization | `metaai_ranking_p13n` | metaai_ranking_oncall |
| Integrity Reports | `metaai_integrity` | metaai_integrity_oncall |

---

## Priority Definitions

| Priority | Growth Criteria | Sharing Criteria | Ranking Criteria |
|----------|-----------------|------------------|------------------|
| **High** | Blocks user acquisition/install flows, widespread QP failures | Complete sharing failure, sharesheet broken | Feedback not being recorded, ranking producing harmful results |
| **Medium** | Degraded growth flows, notifications not firing, intermittent QP issues | Intermittent sharing failures, attribution missing | Suboptimal ranking, delayed feedback processing |
| **Low** | Minor UX issues in growth flows, edge case failures | Minor share preview issues, edge cases | Minor ranking discrepancies, cosmetic issues |
| **Wishlist** | Growth feature enhancements, new QP ideas | Sharing improvements, new share targets | Ranking refinements, new feedback types |

---

## Common Issues & Playbooks

### Growth Issues

#### QP Not Appearing
```
SYMPTOMS:
- Quick Promotion not showing in expected location
- QP shows for some users but not others

INVESTIGATION:
1. Check QP eligibility conditions
2. Verify user experiment allocation
3. Review QP targeting configs
4. Check frequency capping rules

TAGS: metaai_growth_qp
OWNER: metaai_growth_oncall
```

#### Notification Not Received
```
SYMPTOMS:
- Friend joined notification not received
- Growth notifications missing

INVESTIGATION:
1. Verify notification permissions enabled
2. Check notification targeting eligibility
3. Review push token validity
4. Check notification throttling

TAGS: metaai_growth_notifications
OWNER: metaai_growth_oncall
```

### Sharing Issues

#### Sharesheet Failure
```
SYMPTOMS:
- Sharesheet doesn't open when tapping share
- Share targets not appearing
- Share action hangs

INVESTIGATION:
1. Check share intent generation
2. Verify content serialization
3. Review system share sheet compatibility
4. Check permissions

TAGS: metaai_sharing_sheet
OWNER: metaai_sharing_oncall
```

#### Link Share Not Working
```
SYMPTOMS:
- Generated link is broken/404
- Link preview not rendering
- Link doesn't open correct content

INVESTIGATION:
1. Verify link generation service
2. Check deep link routing
3. Review OG meta tag generation
4. Verify content accessibility

TAGS: metaai_sharing_links
OWNER: metaai_sharing_oncall
```

### Ranking Issues

#### Feedback Not Registering
```
SYMPTOMS:
- Thumbs up/down doesn't stick
- Feedback UI shows success but not reflected
- Repeated feedback requests

INVESTIGATION:
1. Check feedback API response
2. Verify network connectivity
3. Review feedback persistence
4. Check rate limiting

TAGS: metaai_ranking_feedback
OWNER: metaai_ranking_oncall
```

---

## Cross-Functional Dependencies

| Dependency | When to Involve |
|------------|-----------------|
| **Integrity** | Reports containing policy violations or safety concerns |
| **C50 Surface** | Growth/Sharing issues specific to C50 app UI |
| **Infra** | Ranking service latency or availability issues |
| **Analytics** | Metric discrepancies or tracking gaps |
| **Push/Notifications** | Notification delivery infrastructure issues |

---

## TOT Considerations

### Transfer TO Growth/Sharing/Ranking
- Tasks initially filed as C50 bugs that are actually growth/sharing/ranking issues
- Generic "notification not working" that are growth notifications
- "Can't share" issues that are sharing feature bugs
- "Bad response" that is actually ranking feedback related

### Transfer FROM Growth/Sharing/Ranking
- **To C50 Guide**: If issue is C50 surface-specific UI (not growth/sharing/ranking logic)
- **To Model Quality**: If issue is response quality (not ranking feedback mechanism)
- **To Integrity**: If issue is policy/safety related content
- **To Personalization**: If issue is about P13n preferences (not ranking)

---

## Key Contacts

| Role | Contact |
|------|---------|
| Document POC | Devan Terry |
| Growth Oncall | @metaai_growth_oncall |
| Sharing Oncall | @metaai_sharing_oncall |
| Ranking Oncall | @metaai_ranking_oncall |

---

## Resources

- Growth Experiment Configs: [Internal Link]
- Sharing API Documentation: [Internal Link]
- Ranking Model Documentation: [Internal Link]
- Growth/Sharing/Ranking Task Queue: [Workplace Group]

---

*This guide is part of the Meta AI Triage System. For surface-specific triage, see the respective surface guides (C50, Ecto, FoA).*
