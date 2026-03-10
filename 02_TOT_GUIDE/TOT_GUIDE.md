# Triage Ownership Transfer (TOT) Guide

> **Last Updated**: March 2026
> **Owner**: Meta AI Triage Team

---

## Overview

Triage Ownership Transfer (TOT) is the process of reassigning a bug/task from one product area or team to another when the initial triage determines the issue belongs to a different owner. Proper TOT ensures issues are routed to the correct team efficiently while maintaining context and accountability.

---

## TOT Principles

### 1. **Transfer, Don't Abandon**
- Always transfer with context; never just remove your ownership
- Ensure the receiving team has all information needed to act

### 2. **Transfer Once**
- Aim to transfer only once to the correct destination
- Avoid ping-ponging tasks between teams

### 3. **Transfer Early**
- If an issue isn't yours, transfer it promptly
- Don't let tasks sit in the wrong queue

### 4. **Transfer with Context**
- Add a comment explaining why you're transferring
- Include any investigation you've already done

---

## When to TOT

### Transfer TO Another Team When:

| Scenario | Action |
|----------|--------|
| Issue is clearly outside your scope | TOT to appropriate team |
| Root cause is in another system | TOT to owning team |
| Fix requires another team's code | TOT with context |
| Cross-functional issue | TOT to lead team, CC others |
| Uncertain ownership | Discuss in #meta-ai-triage first |

### Do NOT TOT When:

| Scenario | Action |
|----------|--------|
| Issue touches your area even partially | Keep and fix your part |
| You're just unsure how to fix | Escalate within team, don't TOT |
| Issue is inconvenient but yours | Keep it |
| You've already started investigation | Complete investigation first |

---

## TOT Process

### Step 1: Validate the Transfer

Before transferring, confirm:

- [ ] Issue is reproducible
- [ ] Issue is NOT in your product area's scope
- [ ] You've identified the correct destination team
- [ ] You have sufficient context to transfer

### Step 2: Add TOT Comment

Add a comment to the task explaining:

```
**TOT to [Team Name]**

**Reason:** [Why this belongs to them]
**Investigation Done:** [What you've already checked]
**Recommended Next Steps:** [Suggestions for receiving team]

Transferring ownership from [Your Product Area] to [Destination Product Area].
```

**Example:**
```
**TOT to Voice Model Quality**

**Reason:** User reports voice sounds robotic - this is a TTS quality issue, not a C50 surface bug.
**Investigation Done:** Confirmed not a UI playback issue. Audio plays correctly but voice quality is degraded.
**Recommended Next Steps:** Check TTS model parameters for this user's locale (es-ES).

Transferring ownership from C50 Surface to Voice Model Quality.
```

### Step 3: Update Task Metadata

1. **Update Tags:**
   - Remove your product area's tags
   - Add the destination team's tags

2. **Update Assignee/Subscribers:**
   - Add the destination team's oncall or queue
   - Keep yourself subscribed for visibility (optional)

3. **Update Priority:**
   - Maintain appropriate priority based on impact
   - Don't downgrade just because you're transferring

### Step 4: Notify Receiving Team

For urgent issues:
- Message the team's oncall directly
- Post in the team's Workplace group
- Use appropriate escalation channels

---

## TOT Routing Matrix

Use this matrix to identify the correct destination for common issue types:

### Surface Issues

| If Issue Is... | Transfer To | Tags to Add |
|----------------|-------------|-------------|
| C50 mobile app UI | C50_GUIDE | `c50-*` |
| meta.ai website | ECTO_GUIDE | `ecto-*` |
| FB/IG/WA/MSGR AI | FOA_GUIDE | `foa-*` |

### Feature Issues

| If Issue Is... | Transfer To | Tags to Add |
|----------------|-------------|-------------|
| Character behavior/personality | CHARACTERS_GUIDE | `metaai_characters_*` |
| Image/video/music generation | MEDIA_GENERATION_GUIDE | `MetaAI_MediaGen_*` |
| Search results/citations | SEARCH_GUIDE | `metaai_search_*` |
| Memory/preferences | PERSONALIZATION_GUIDE | `metaai_personalization_*` |
| Growth/sharing/ranking | GROWTH_SHARING_RANKING_GUIDE | `metaai_growth_*`, `metaai_sharing_*`, `metaai_ranking_*` |

### Model Issues

| If Issue Is... | Transfer To | Tags to Add |
|----------------|-------------|-------------|
| Text response quality | TEXT_MODEL_QUALITY_GUIDE | `metaai_text_quality_*` |
| Voice/audio quality | VOICE_MODEL_QUALITY_GUIDE | `metaai_voice_*` |

### External Teams

| If Issue Is... | Transfer To | Notes |
|----------------|-------------|-------|
| Integrity/safety | Integrity Team | Immediate escalation for harmful content |
| Infrastructure | Infra Team | Service outages, latency |
| Payments | Payments Team | Subscription/billing issues |
| Ads | Ads Team | Ad-related functionality |
| Legal/Privacy | Legal Team | Compliance concerns |

---

## Common TOT Scenarios

### Scenario 1: Surface Bug vs Model Bug

**Symptom:** "The response is wrong"

**Triage Questions:**
1. Is the response displayed correctly but the content is wrong? → **Text Model Quality**
2. Is the response correct but displayed incorrectly? → **Surface Guide (C50/Ecto/FoA)**

### Scenario 2: Voice vs Text

**Symptom:** "AI didn't understand me"

**Triage Questions:**
1. Was this voice input? → Check if STT transcription was wrong → **Voice Model Quality**
2. Was transcription correct but response wrong? → **Text Model Quality**
3. Was audio playback broken? → **Surface Guide**

### Scenario 3: Feature vs Surface

**Symptom:** "Image generation failed"

**Triage Questions:**
1. Did generation fail completely? → **Media Generation**
2. Did image generate but not display? → **Surface Guide**
3. Was the generated image wrong/poor quality? → **Media Generation**

### Scenario 4: Cross-Functional Issues

**Symptom:** Issue spans multiple areas

**Guidance:**
- Identify the PRIMARY owner (where root cause likely is)
- Transfer to primary owner
- CC or subscribe secondary teams
- Note cross-functional nature in comment

---

## TOT Anti-Patterns

### ❌ Avoid These:

| Anti-Pattern | Why It's Bad | What To Do Instead |
|--------------|--------------|---------------------|
| **TOT without comment** | Receiving team has no context | Always add TOT comment |
| **TOT before investigating** | May not belong to them either | Do basic triage first |
| **Repeated TOT (ping-pong)** | Wastes everyone's time | Discuss ownership in Workplace |
| **TOT to avoid work** | Unethical, delays resolution | Keep issues in your scope |
| **TOT and forget** | Issue may fall through cracks | Follow up on critical issues |
| **Downgrading priority on TOT** | Masks impact | Maintain appropriate priority |

---

## Handling Incoming TOT

When you receive a transferred task:

### 1. Acknowledge Receipt
- Comment that you've received the transfer
- Confirm it's in your scope (or re-TOT if not)

### 2. Validate the Transfer
- Review the TOT comment
- Confirm the issue is in your product area
- If incorrect, discuss with original team before re-transferring

### 3. Continue Investigation
- Build on investigation already done
- Don't restart from scratch

### 4. Update Stakeholders
- Keep the reporter informed
- Update the task with progress

---

## TOT Dispute Resolution

When there's disagreement about ownership:

### Step 1: Direct Discussion
- Reach out to the other team's oncall directly
- Discuss the specific issue and investigate together

### Step 2: Escalate to Leads
- If unresolved, involve both team leads
- Frame as "we need to clarify ownership" not "they won't take it"

### Step 3: Document Decision
- Once resolved, document the decision
- Update relevant triage guides to prevent future disputes

### Step 4: Update Guides
- If this reveals a gap in documentation
- Update the TOT Guide or relevant child process guides

---

## TOT Metrics & Health

### Healthy TOT Indicators:
- Low TOT rate (most issues correctly routed initially)
- Single transfer (not ping-ponging)
- Fast TOT (within hours, not days)
- Context-rich transfers

### Warning Signs:
- High volume of incoming TOTs (routing problem)
- High volume of outgoing re-TOTs (scope unclear)
- TOTs sitting without acknowledgment
- Repeated disputes about same issue types

---

## Quick Reference: TOT Checklist

Before transferring:
- [ ] Confirmed issue is NOT in my scope
- [ ] Identified correct destination team
- [ ] Added detailed TOT comment
- [ ] Updated tags appropriately
- [ ] Assigned to correct queue/oncall
- [ ] Notified receiving team (if urgent)

---

## Resources

- Meta AI Triage Workplace Group: [Link]
- Child Process Guides: See `/01_CHILD_PROCESSES/` directory
- Team Contact Directory: See `/03_RESOURCES/KEY_CONTACTS.md`
- UDT Flow Reference: See `/03_RESOURCES/UDT_FLOW_REFERENCE.md`

---

*This guide is part of the Meta AI Triage System. For product-area-specific triage guidance, see the individual child process guides.*
