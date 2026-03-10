# Text Model Quality Triage Guide

> **Product Area**: Text Model Quality
> **Last Updated**: March 2026
> **Child Process Owner**: Meta AI Model Quality Team

---

## Overview

Text Model Quality covers issues related to the underlying LLM (Large Language Model) that powers Meta AI text responses. This includes response accuracy, coherence, factual correctness, instruction following, and overall text generation quality.

---

## Scope Definition

### In Scope
- Response quality issues (incoherent, incorrect, off-topic)
- Factual accuracy and hallucinations
- Instruction following failures
- Response formatting issues (not UI-related)
- Tone and style inconsistencies
- Context retention/memory issues
- Multi-turn conversation quality
- Language support and translation accuracy
- Response length issues (too short/long)
- Model capability gaps

### Out of Scope
- Voice/audio quality issues (→ Voice Model Quality)
- UI rendering of text (→ Surface guides)
- Media generation quality (→ Media Generation)
- Character personality issues (→ Characters)
- Search result quality (→ Search)
- Response ranking/ordering (→ Ranking)

---

## Quality Dimensions

### 1. Accuracy & Factuality

| Issue Type | Description | Priority |
|------------|-------------|----------|
| Hallucinations | Model generates false/fabricated information | High |
| Factual Errors | Incorrect factual claims | High |
| Outdated Info | Information no longer current | Medium |
| Citation Issues | Incorrect or missing attributions | Medium |

### 2. Coherence & Fluency

| Issue Type | Description | Priority |
|------------|-------------|----------|
| Incoherent Responses | Response doesn't make logical sense | High |
| Repetition | Model repeats itself unnecessarily | Medium |
| Incomplete Responses | Response cuts off mid-thought | Medium |
| Grammar/Spelling | Language errors | Low |

### 3. Instruction Following

| Issue Type | Description | Priority |
|------------|-------------|----------|
| Ignores Instructions | Model doesn't follow explicit requests | High |
| Partial Compliance | Only partially follows instructions | Medium |
| Format Violations | Doesn't follow requested format | Medium |
| Overrides | Model overrides user preferences | Medium |

### 4. Safety & Alignment

| Issue Type | Description | Priority |
|------------|-------------|----------|
| Harmful Content | Generates dangerous/harmful text | Critical |
| Policy Violations | Violates content policies | Critical |
| Bias Issues | Exhibits problematic bias | High |
| Sensitive Handling | Mishandles sensitive topics | High |

---

## Tags & Routing

| Category | Tag | Owner/Oncall |
|----------|-----|--------------|
| Factuality | `metaai_text_quality_factual` | metaai_llm_quality_oncall |
| Coherence | `metaai_text_quality_coherence` | metaai_llm_quality_oncall |
| Instructions | `metaai_text_quality_instructions` | metaai_llm_quality_oncall |
| Safety | `metaai_text_quality_safety` | metaai_integrity_oncall |
| Multilingual | `metaai_text_quality_i18n` | metaai_i18n_oncall |
| Context/Memory | `metaai_text_quality_context` | metaai_llm_quality_oncall |
| Reasoning | `metaai_text_quality_reasoning` | metaai_llm_quality_oncall |
| Code Generation | `metaai_text_quality_code` | metaai_llm_quality_oncall |
| Creative Writing | `metaai_text_quality_creative` | metaai_llm_quality_oncall |

---

## Triage Process

### Step 1: Validate the Issue

1. **Reproduce the issue**: Try the same prompt multiple times
2. **Check model version**: Note which model version produced the response
3. **Confirm scope**: Ensure it's a model issue, not UI/surface issue

### Step 2: Categorize by Quality Dimension

| Symptoms | Category |
|----------|----------|
| "The AI made up facts" | Factuality |
| "Response makes no sense" | Coherence |
| "It didn't do what I asked" | Instruction Following |
| "The AI said something harmful" | Safety |
| "Wrong language/translation" | Multilingual |
| "It forgot what I said earlier" | Context/Memory |

### Step 3: Apply Tags

**Task Title Format:**
```
[Meta AI][Text Quality][Category][Surface]
```

**Example Titles:**
- `[Meta AI][Text Quality][Factual][Ecto] AI claims incorrect historical date`
- `[Meta AI][Text Quality][Instructions][C50] Model ignores formatting request`
- `[Meta AI][Text Quality][Coherence][FoA] Response ends mid-sentence`

---

## Priority Definitions

| Priority | Criteria | Response Time |
|----------|----------|---------------|
| **Critical** | Safety violations, harmful content generation | Immediate |
| **High** | Consistent factual errors, widespread instruction failures | < 4 hours |
| **Medium** | Occasional quality issues, specific prompt failures | < 24 hours |
| **Low** | Edge cases, minor coherence issues | < 1 week |
| **Wishlist** | Quality improvements, capability requests | Backlog |

---

## Investigation Playbooks

### Factual Error Investigation
```
SYMPTOMS:
- AI provides incorrect facts
- User reports wrong information
- Verifiable claims are false

INVESTIGATION:
1. Reproduce with same prompt
2. Verify the correct information
3. Check if this is a known limitation
4. Document the specific claim and correction
5. Check model version and surface

COLLECT:
- Exact prompt used
- Full AI response
- Correct information with source
- Model version (if available)
- Surface (C50/Ecto/FoA)
- Timestamp

TAGS: metaai_text_quality_factual
OWNER: metaai_llm_quality_oncall
```

### Instruction Following Failure
```
SYMPTOMS:
- Model ignores explicit instructions
- Format requests not honored
- Style/tone not as requested

INVESTIGATION:
1. Reproduce with same prompt
2. Simplify instructions to test
3. Check if instruction conflicts with safety
4. Document expected vs actual behavior

COLLECT:
- Exact prompt with instructions
- Full AI response
- Expected behavior description
- Number of reproduction attempts
- Surface and model version

TAGS: metaai_text_quality_instructions
OWNER: metaai_llm_quality_oncall
```

### Coherence Issues
```
SYMPTOMS:
- Response doesn't make sense
- Contradicts itself
- Incomplete or cut off
- Repetitive content

INVESTIGATION:
1. Reproduce the issue
2. Try with simpler prompts
3. Check conversation history impact
4. Document the incoherent portions

COLLECT:
- Full conversation history
- Specific incoherent sections
- Reproduction rate
- Surface and context

TAGS: metaai_text_quality_coherence
OWNER: metaai_llm_quality_oncall
```

### Safety/Alignment Issues
```
SYMPTOMS:
- Harmful content generated
- Policy-violating responses
- Bias exhibited
- Sensitive topic mishandling

INVESTIGATION:
1. Document the exact prompt and response
2. Do NOT attempt to reproduce
3. Escalate immediately
4. Flag for integrity review

TAGS: metaai_text_quality_safety
OWNER: metaai_integrity_oncall
ESCALATION: Immediate escalation required
```

---

## Data Collection Requirements

For all text quality issues, collect:

| Data Point | Required | Description |
|------------|----------|-------------|
| Exact Prompt | Yes | Copy/paste the exact prompt used |
| Full Response | Yes | Complete AI response text |
| Surface | Yes | C50/Ecto/FoA/Other |
| Model Version | If available | Model identifier |
| Conversation History | If multi-turn | Prior messages in conversation |
| Timestamp | Yes | When the issue occurred |
| User Region | If relevant | For locale-specific issues |
| Reproduction Steps | Yes | How to reproduce the issue |
| Expected Behavior | Yes | What should have happened |

---

## Quality Evaluation Criteria

When assessing text quality issues, consider:

### 1. Severity Assessment
- **How wrong is the response?** (Minor inaccuracy vs major error)
- **What is the potential harm?** (Misinformation risk)
- **How many users affected?** (Single prompt vs widespread)

### 2. Reproducibility
- **Consistent issue**: Same prompt always produces bad response
- **Intermittent**: Sometimes good, sometimes bad
- **One-off**: Cannot reproduce

### 3. Scope Impact
- **Model-wide**: Affects all users/surfaces
- **Surface-specific**: Only affects one surface
- **Context-specific**: Only in certain conversation contexts

---

## TOT Considerations

### Transfer TO Text Model Quality
- Issues initially filed as surface bugs that are model quality issues
- Response content problems (not rendering problems)
- "AI said wrong thing" type issues

### Transfer FROM Text Model Quality
- **To Surface Guides**: If issue is UI/rendering (text correct but displayed wrong)
- **To Search**: If issue is search result quality
- **To Characters**: If issue is character personality/behavior
- **To Voice Quality**: If issue is audio/voice related
- **To Integrity**: If immediate safety escalation needed

---

## Key Contacts

| Role | Workplace Handle |
|------|------------------|
| LLM Quality Oncall | @metaai_llm_quality_oncall |
| Integrity Oncall | @metaai_integrity_oncall |
| I18n Oncall | @metaai_i18n_oncall |
| Model Quality PM | TBD |
| Safety PM | TBD |

---

## Model Versions & Capabilities

| Model | Capabilities | Known Limitations |
|-------|--------------|-------------------|
| Llama 3 | General purpose, code, reasoning | [Check internal docs] |
| [Other Models] | [Capabilities] | [Limitations] |

*Refer to internal model documentation for current capabilities and known issues.*

---

## Resources

- Model Quality Dashboard: [Internal Link]
- Known Issues Tracker: [Internal Link]
- Eval Metrics Documentation: [Internal Link]
- LLM Quality Workplace Group: [Workplace Group]

---

*This guide is part of the Meta AI Triage System. For surface-specific triage, see the respective surface guides (C50, Ecto, FoA).*
