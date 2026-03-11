# Voice Model Quality Triage Guide

> **Document POMs**: Chelsea Zeng
> **Product Area**: Voice Model Quality
> **Last Updated**: January 7, 2026

---

## Overview

This document covers the triage processes for issues related to the quality of Meta AI's voice responses (i.e., if the user reports an issue with how Meta AI responds to a user prompt).

---

## Model vs Product Issue

### Is this a Model Quality Issue?

| Answer | Description | Template |
|--------|-------------|----------|
| **Yes - Text** | Relates to text model quality (AI's text response) | Model Quality Template |
| **Yes - Voice** | Relates to voice model quality (AI's audio quality in voice response) | Model Quality Template |
| **No** | Does not relate to model quality | Route to appropriate surface guide |

---

## Surfaces Covered

Voice Model Quality issues can be found in the following surfaces:
- **Meta AI App (C50)**
- **meta.ai website (Ecto)**
- **FoA** - Facebook, Instagram, Messenger, WhatsApp, etc.

---

## Voice Issue Types

This guide covers the following types of voice model issues:
- Audio Quality
- Response Quality
- Content Quality
- Voice Expressivity, Steerability, Tone Quality
- Search / Tool Use
- Safety

---

## Bug Triage Process

### Step 1: Initial Identification & Triage

1. **Identify Surface**: Determine the surface the issue was reported on (Meta AI App, meta.ai website, or FoA)

2. **Identify Issue Type**: An issue is a voice quality issue if the user is reporting an issue with:
   - **Audio quality** (static, glitches, pops, etc.)
   - **Content of the response** Meta AI provided

3. **Voice Tags**: All voice bugs will have the following tags:
   | Tag Type | Tag |
   |----------|-----|
   | All Voice Bugs | `MetaAI_Voice` |
   | Audio Bug | `MetaAI_Audio` |
   | Model Bug | `MetaAI_Model` |

   > **Note**: These tags are added by the TS in Steps 2-3

4. **KP Search**: TS should **NOT** conduct a full KP search for model quality tasks. They should **ONLY** merge issues that have the **EXACT SAME prompt, response, and reporter**. Otherwise, each task is to be triaged individually. Do NOT attempt KP search for Response Quality and Response Audio issues—they should be triaged separately. Do NOT merge voice modality tasks with text modality tasks—they should be triaged separately.

5. **Repro Attempt**: TS should **NOT** try to repro model quality issues (use "Skip" option in UDT)

6. **Task Template**: Input the Model Quality task template and fill out the requested details

### Task Title Format

```
[feature][Voice][App/Website][Platform] Summary of the issue
```

- **Feature (based on model type)**: Gemini, Paricado, YonderTTS, Feed AI, Characters
- **App/Website**: C50, Ecto, FB, MSGR, IG, WA, etc.
- **Platform**: Android, iOS, Web

**Examples:**
- `[YonderTTS][Voice][C50][iOS] Voice sounds robotic during response`
- `[Gemini][Voice][Ecto][Web] ASR misunderstands user with accent`
- `[Feed AI][Voice][FB][Android] Context extraction fails on Reels`

---

## Step 2: Identify the Voice Model

### Using CallDive and Pariscope

1. **Bunnylol CallDive**: Search for the reporter's name → Look at the timestamp of when the bug was reported → Click on the closest call identifier link to copy

2. **Pariscope for Voice** (MUST bunnylol `vdbg`): Clear the preset filter → Search for session ID → Drop in the copied link into the value section → Add filter

3. Click into the session and under "response model" you will find which voice model was used

### Voice Models

| Model | Details | Tag(s) Added | Oncall |
|-------|---------|--------------|--------|
| **YonderTTS (1.0 Voice)** | Named as: `yonder-17b-voice-latest`, `Llama4v-17b-voice_finetuned`. This is the old model. | `MetaAI_Voice`, `llama4_voice_yonder` | Dependent on issue; see below |
| **MetaAI 2.0 Voice** | Two models: **Gemini** is the "Vertex_ai" model, **Paricado** is the alternative | `MetaAI2.0-Voice`, `Voice_gemini` OR `Voice_paricado` | Dependent on issue; see below |
| **Feed AI (fka VIF)** | Only available on FB. Applicable to characters in feed. Technically a feature, using one of the 1.0 or 2.0 voice models as base. | `MetaAI_Voice`, `vif` | Dependent on issue; see below |
| **Character Voice** | Reference AI Studio: character voice (in chat) | Use Character Voice flow | - |

---

## Step 3: Identify Type of Voice Quality Issue

Triage will be asked (via UDT flow) to identify the most relevant type of voice model quality issue based on the model.

### YonderTTS / MetaAI 2.0 Voice Issues

| Issue Type | Explanation | Tag(s) Added | Oncall |
|------------|-------------|--------------|--------|
| **ASR: Speech Recognition (input)** | Issues related to AI's ability to understand what the user is saying. Examples: Trouble understanding user with accent, misunderstood user's prompt | `tts_asr` | `speech_model_infra` |
| **Response Quality (content)** | Issues related to the model's ability to generate quality responses. Includes language fluency, grammar, coherence, relevance, factual accuracy. Examples: Grammatically incorrect sentences, irrelevant responses, repetition, hallucinations, poor idiom handling, poor instruction following | `MetaAI_Model`, `meta_ai_response_quality_voice` | Shun Zhang |
| **Response Audio Issues (output)** | Audio issues when producing voice output. Examples: Model silence, frequent interruptions/cut off, noise bursts, audio glitches | `MetaAI_Audio`, `tts_output_issues` | `speech_tts` |
| **Expressivity** | Issues related to tone, emotions, naturalness of voice output. Examples: Sad topic but voice sounds happy, constant same tone regardless of topic, monotone, too formal/casual, inappropriate humor | `tts_expressivity` | Shun Zhang |
| **Safety** | Issues with model generating harmful, biased, offensive content. Examples: Hate speech, harmful content, privacy violations, unsafe behaviors, false refusals | `MetaAI_Model`, `MetaAI_safety` | `meta_ai_voice_backend` |
| **Personalization** | Issues related to Personalization, TOMM, etc. | `MetaAI_Model`, `voice_p13n` | Ref. Personalization Flow |
| **I18n** | Issues related to translation/pronunciation/interpretation with voice using another language | `MetaAI_Model`, `tts_i18n` | `meta_ai_voice_backend` |
| **Search / Tool Use** | Issues with triggering search | `MetaAI_search` | Ref. Search Flow |

### Feed AI Issues

| Issue Type | Explanation | Tag(s) Added | Oncall |
|------------|-------------|--------------|--------|
| **Context Extraction** | Issues related to AI's ability to extract proper content from the feed/post/reels | `vif_context_understanding` | `realtime_ai_vif` |
| **Model Response Quality (content)** | All issues related to model's ability to generate quality responses. Includes language fluency, grammar, coherence, relevance, factual accuracy. Examples: Grammatically incorrect sentences, too formal/casual, inappropriate humor, irrelevant responses, repetition, hallucinations, poor idiom handling, poor instruction following | `MetaAI_Model`, `vif_response_quality` | Determined at sub-issue level below |
| **False Refusals** | Issues with model incorrectly refusing to respond to a safe or appropriate user request | `vif_refusal` | `realtime_ai_vif` |
| **Safety/Integrity** | Issues with model generating harmful, biased, offensive content. Examples: Hate speech, harmful content, privacy violations, unsafe behaviors, failing to refuse unsafe requests | `vif_safety` | `realtime_ai_vif` |
| **Other** | Catch-all category for issues that don't fit above categories | N/A | `realtime_ai_vif` |

---

## Step 4: Identify Sub-Issue

Triage will be asked (via UDT flow) to identify the most relevant sub-issue where applicable.

### YonderTTS / 2.0 Voice: Response Quality Sub-Issues

| Sub-Issue | Explanation | Tag(s) Added | Oncall |
|-----------|-------------|--------------|--------|
| **Factuality** | Model's ability to generate accurate, truthful information. Avoiding hallucinations and misinformation. Examples: Incorrect dates/names/statistics, inventing facts, misrepresenting information, confusing similar entities, providing outdated information | `meta_ai_text_factuality` | Shun Zhang |
| **Instruction Following** | How well the model understands and executes user commands. Examples: Ignoring parts of instructions, performing different tasks, overly literal/broad interpretations, failing to adapt style, misunderstanding complex instructions | `meta_ai_text_instruction_following` | Shun Zhang |

### YonderTTS / 2.0 Voice: Safety Sub-Issues

| Sub-Issue | Explanation | Tag(s) Added | Oncall |
|-----------|-------------|--------------|--------|
| **Text Response Safety** | Avoiding harmful, offensive, or inappropriate content. Examples: Racist/sexist language, violent descriptions, offensive slurs, endorsing harmful behaviors, sharing misinformation | `meta_ai_text_safety_violation` | `meta_ai_voice_backend` |
| **Safety False Refusal** | Model incorrectly refuses safe or appropriate requests. Examples: Refusing benign questions, declining safe factual information, rejecting harmless creative content, overblocking, generic refusals | `meta_ai_text_false_refusal` | `meta_ai_voice_backend` |

### Feed AI: Response Quality Sub-Issues

| Sub-Issue | Explanation | Tag(s) Added | Oncall |
|-----------|-------------|--------------|--------|
| **Factuality** | Model's ability to generate accurate, truthful information. Examples: Incorrect dates/names/statistics, inventing facts, misrepresenting information, confusing similar entities, outdated information | `vif_factuality` | `realtime_ai_vif` |
| **Loss of Previous Context** | AI does not remember information or conversation history from previous context | `vif_loss_context` | `realtime_ai_vif` |
| **Verbose** | Responses that are excessively long, detailed, or complex. Examples: Unnecessary background, excessive detail, repetitive information, continues elongated responses when asked to be concise | `vif_verbosity` | `realtime_ai_vif` |
| **Other** | Catch-all category for issues that don't fit above categories | N/A | `realtime_ai_vif` |

---

## Step 5: Complete Triage

Triage will be expected to complete remaining triage steps (attempt repro, tag, prioritize, and assign owner). The above actions should be automated via submission of the UDT form.

---

## Issue Type Summary Tables

### YonderTTS / 2.0 Voice Tags & Routing

| Issue Type | Tag(s) | Oncall |
|------------|--------|--------|
| ASR: Speech Recognition | `tts_asr` | speech_model_infra |
| Response Quality | `MetaAI_Model`, `meta_ai_response_quality_voice` | Shun Zhang |
| Response Audio Issues | `MetaAI_Audio`, `tts_output_issues` | speech_tts |
| Expressivity | `tts_expressivity` | Shun Zhang |
| Safety | `MetaAI_Model`, `MetaAI_safety` | meta_ai_voice_backend |
| Personalization | `MetaAI_Model`, `voice_p13n` | Personalization Flow |
| I18n | `MetaAI_Model`, `tts_i18n` | meta_ai_voice_backend |
| Search / Tool Use | `MetaAI_search` | Search Flow |

### Feed AI Tags & Routing

| Issue Type | Tag(s) | Oncall |
|------------|--------|--------|
| Context Extraction | `vif_context_understanding` | realtime_ai_vif |
| Model Response Quality | `MetaAI_Model`, `vif_response_quality` | Sub-issue dependent |
| False Refusals | `vif_refusal` | realtime_ai_vif |
| Safety/Integrity | `vif_safety` | realtime_ai_vif |
| Other | N/A | realtime_ai_vif |

---

## Key Contacts

| Role | Contact |
|------|---------|
| Document POM | Chelsea Zeng |
| Voice Backend Oncall | @meta_ai_voice_backend |
| Speech Model Infra | @speech_model_infra |
| Speech TTS | @speech_tts |
| Feed AI/VIF | @realtime_ai_vif |
| Response Quality | Shun Zhang |

---

## Resources

- CallDive (bunnylol `calldive`): [Internal Link]
- Pariscope for Voice (bunnylol `vdbg`): [Internal Link]
- Model Quality Task Template: [Internal Link]
- UDT Flow Documentation: [Internal Link]

---

*This guide is part of the Meta AI Triage System. For surface-specific triage, see the respective surface guides (C50, Ecto, FoA). For text model quality issues, see the Text Model Quality Guide.*
