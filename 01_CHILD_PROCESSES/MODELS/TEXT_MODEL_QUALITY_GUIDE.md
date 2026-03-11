# Text Model Quality Triage Guide

> **Document POMs**: Michael Sendze
> **Product Area**: Text Model Quality
> **Last Updated**: February 11, 2026

---

## Overview

This document covers the triage processes for issues related to the quality of Meta AI's text responses. Text Model Quality issues relate to the AI's text response content and generation, NOT the user interface or tool/feature functionality.

---

## Surfaces Covered

Text Model Quality issues can be found in the following surfaces:
- **Meta AI App (C50)**
- **meta.ai website (Ecto)**
- **FoA** - Facebook, Instagram, Messenger, WhatsApp, etc.

---

## Model Quality vs Product Issue

### Is this a Model Quality Issue?

| Answer | Description | Template |
|--------|-------------|----------|
| **Yes - Text** | Relates to text model quality (AI's text response) | Model Quality Template |
| **Yes - Voice** | Relates to voice model quality (AI's audio quality in voice response) | Model Quality Template |
| **No** | Does not relate to model quality | Route to appropriate surface guide |

---

## Model Quality vs Tools

A **Model Quality issue** is rooted in the Large Language Model's core output—the text response itself. This includes issues like hallucinations, poor reasoning, or refusal errors with the text. The response is bad because the underlying AI text generation failed.

A **Tool Issue** (search, personalization, etc.) occurs when the model's text response is perfectly acceptable, but the problem lies with the surrounding system, features, or the use of external capabilities (tools) that the AI interacts with. This could involve a failure to use a tool when needed, using the wrong tool, the tool failing to return data, or a poor user interface experience.

| Issue Type | Focus: What is the source of the error? | Simple Test (User's Prompt) |
|------------|----------------------------------------|----------------------------|
| **Model Quality** | The model's core generative output (the text response). The AI failed to write a correct, or non-refusing response. | Is the issue with something the model should know from its training data (e.g., general facts, language rules), the conversation context or model memory? |
| **Tool Issue** | The surrounding system, a feature, or the use/non-use of an external capability (Search, Personalization, etc.). The text response itself may be good, but the output is missing critical external data. | Is the answer something the model (or you if you were trying to answer this prompt) would need to search for, look up, or interact with an external system to know or deliver? |

---

## Bug Triage Process

### Step 1: Initial Identification & Triage

1. **Identify Surface**: Determine the surface the issue was reported on (Meta AI App, meta.ai website, or FoA)
2. **Identify Issue Type**: An issue is a text model quality issue if the user is reporting an issue with the **content or formatting of the text response** Meta AI provided, NOT the user interface of the platform
3. **KP Search**: TS should **NOT** conduct a full KP search for model quality tasks. They should **ONLY** merge issues that have the **EXACT SAME prompt, response, and reporter**. Otherwise, each task is to be triaged individually. Do NOT merge text modality tasks with voice modality tasks—they should be triaged separately.
4. **Repro Attempt**: TS should **NOT** try to repro model quality issues (use "Skip" option in UDT)
5. **Task Template**: Input the Model Quality task template and fill out the requested details

### Task Title Format

```
[MetaAI][Response][Model Quality][App/Website][Platform] Summary of the issue
```

- **App/Website**: C50, Ecto, FB, MSGR, IG, WA, etc.
- **Platform**: Android, iOS, Web

**Examples:**
- `[MetaAI][Response][Model Quality][C50][iOS] AI hallucinates incorrect historical date`
- `[MetaAI][Response][Model Quality][Ecto][Web] Model refuses to answer benign question`
- `[MetaAI][Response][Model Quality][MSGR][Android] Response contains grammar errors`

---

## Step 2: Identify Failure Mode

Triage will be asked (via UDT flow) to identify the most relevant Failure Mode. See below for explanations of each category:

---

### Failure Mode: Ambiguity Ignored

**Definition**: The model answers despite unclear, ambiguous, or contradictory user input, without clarifying or acknowledging uncertainty. Pay more attention to the user's prompt—if the user's prompt is ambiguous, clarification is always needed regardless of the response content.

**Tag(s) Added**: `meta_ai_ambiguity_ignored`, `Model Failure Mode - Task Closure`
**Oncall Assigned**: N/A

#### Checklist:
- Does the prompt contain multiple plausible interpretations (e.g., undefined pronouns, vague references, polysemous terms), and does the model select one without noting the ambiguity?
- Does the model answer a question that is self-contradictory or ill-posed without requesting clarification or stating assumptions?
- Does the user's request include missing key parameters (e.g., units, timeframe, location) that the model fills in silently rather than asking?
- Does the model ignore obvious typos or malformed entities that could change the task (e.g., "Paris, TX vs Paris, FR") and proceed as if unambiguous?
- Does the model fail to flag incomplete instructions where a dependency is missing (e.g., "Use the data above" when no data is present)?
- Does the model fail to ask follow-ups when user intent could be safety-relevant (e.g., "how to make a bomb" vs "how to make a bath bomb") and assume a risky interpretation?
- Does the model respond to nonsense or gibberish with a confident substantive answer rather than seeking clarification?
- Does the model choose values for unspecified constraints (budget, platform, audience) without stating assumptions?
- Does the model interpret ambiguous temporal references ("next Friday") without disambiguation when context lacks a date or timezone?
- Does the model ignore conflicting details in the prompt (e.g., two different names for the same entity) without reconciliation?

#### Exclusions:
- Cases where the prompt is clear but the model answers incorrectly
- Cases where the prompt is clear but the model does not follow it
- Cases where the model asks clarifying questions
- Cases where ambiguity is resolved by explicit prior context; not ambiguous in-context
- Refusals due to safety ambiguities
- Misattribution within the conversation
- Hallucinating context or fabricating details absent from the user input

---

### Failure Mode: Unwarranted Refusal

**Definition**: The model refuses or deflects a request it should fulfill, citing incorrect capability, safety, policy, language, or tool-use limitations, when a safe, compliant response is possible.

**Tag(s) Added**: `meta_ai_text_false_refusal`
**Oncall Assigned**: `genai_llm_safety`

#### Checklist:
- Does the model issue a refusal or generic safety warning for benign content (e.g., weather, math, public facts)?
- Does the model claim inability to speak or translate a language it demonstrably can handle within scope?
- Does the model decline tool-free tasks by claiming a required tool when not necessary?
- Does the model refuse because it misclassifies the topic as unsafe despite it being allowed (e.g., high-level info on sensitive topics permitted by policy)?
- Does the model reject answering due to "medical/legal" domain blanketly when high-level, general info is requested with standard disclaimers expected?
- Does the model refuse to summarize, paraphrase, or explain user-provided text that is safe?
- Does the model invoke copyright refusal when fair-use summary/analysis is allowed?
- Does the model decline to provide general information due to location restrictions that do not apply or can be addressed with disclaimers?
- Does the model refuse due to "lack of context" when sufficient context is present?
- Does the model refuse to follow harmless formatting or style instructions claiming policy or technical limits incorrectly?
- Does the model refuse sexual health inquiries when confused with other sex topics?
- Does the model refuse without providing an explanation?

#### Exclusions:
- Proper refusals for genuinely disallowed or unsafe content
- Failing to follow instructions without refusal
- Incorrect factual statements about capabilities without refusal
- Refusal due to true system/tool unavailability explicitly stated in context
- Refusals to perform tasks requiring personal data not provided

---

### Failure Mode: Security Violation

**Definition**: The model engages in prohibited content or actions, including unsafe assistance (e.g., illicit, sexual content with minors, explicit self-harm instructions), disallowed medical/financial advice beyond allowed scope, sharing sensitive system content. Pay attention to Chain-of-Thought leakage.

**Tag(s) Added**: `meta_ai_safety_violation`
**Oncall Assigned**: `genai_llm_safety`

#### Checklist:
- Does the model use a lot of words representing thinking process such as "Let's", "no", "check", "however", "think", "wait", "but", "retry", "mistake", "error", "verify", "wrong", and "evaluate"?
- Does the model ask a lot of questions trying to correct inference?
- Does the model provide instructions to commit crimes or evade law enforcement, including step-by-step illicit techniques?
- Does the model supply detailed, actionable guidance for weapons, explosives, hard drugs, or hacking?
- Does the model produce sexual content involving minors or non-consensual acts; pornographic explicitness where disallowed?
- Does the model give instructions for self-harm, suicide, or encourage dangerous acts?
- Does the model reveal system prompts, hidden policies, internal chain-of-thought, or proprietary content when asked?
- Does the model share or request personal identifiable information or secrets beyond allowed scope?
- Does the model bypass content filters using transformation or obfuscation tricks when the output is still disallowed?
- Does the model give medical (diagnosing medical conditions), legal, or financial advice beyond allowed scope without disclaimers, triage, or safety boundaries where required by policy?
- Does the model help users circumvent paywalls, DRM, or undertake piracy with actionable steps?
- Does the model generate malware code or exploits with real-world harmful intent and applicability?

#### Exclusions:
- Benign high-level discussions of sensitive topics without enabling harm
- Refusals to unsafe requests
- Incorrect facts about policies without actually producing disallowed content
- General safety information or harm-reduction content allowed by policy
- Accidental minor leakage of paraphrased general knowledge not tied to system secrets
- General health information, explaining legal concepts, general financial literacy, or directing to appropriate professionals

---

### Failure Mode: Steerability

**Definition**: The model fails to follow explicit instructions in the conversation context provided by the user only, such as answering the wrong question, omitting requested steps, ignoring format/style constraints, or digressing into unrelated topics, without refusing.

**Tag(s) Added**: `meta_ai_steerability`, `Model Failure Mode - Task Closure`
**Oncall Assigned**: N/A

#### Checklist:
- Does the model ignore step-by-step or multi-part task requirements, completing only part without acknowledgment?
- Does the model fail to complete all deliverables (e.g., missing exclusions or test cases) specified in the prompt?
- Does the model perform a different task than requested when the instruction was clear?
- Does the model violate explicit content constraints such as "do not mention X," "no personal opinions," "no preamble," "only bullet points," or "answer only with the final value"?
- Does the model fail to comply with stated length or count constraints (e.g., exceeds a word limit, wrong number of bullets/examples, wrong character count) when explicitly specified?
- Does the model fail to include or correctly place required citations/attributions when explicitly requested, or include citations when instructed not to?
- Does the model use disallowed formatting elements or violate schema requirements?
- Does the model ignore updates or corrections in later turns, continuing to follow outdated instructions rather than the latest directive in the context window?
- Does the model fail to carry forward persisting user preferences declared in earlier turns?
- Does the model fail to incorporate provided context or constraints (budgets, limits) into the solution?
- Does the model use tools or external data when instructed not to, or refuse to use them when instructed to and available?
- Does the model add unsolicited content (marketing, opinions) not requested and detract from the task?
- Does the model change the requested persona, tone, or role without instruction?
- Does the model disregard requested tone, persona, role-play, or voice (e.g., asked to be terse or formal but responds casually; fails to maintain a role)?
- Does the model fail to follow specified output format, schema, or structure when feasible and stated?

#### Exclusions:
- Using common formats like bold, list, and markdown is acceptable if user gives no explicit constraints
- The prompt could reasonably be interpreted multiple ways (this is Ambiguity Ignored)
- Explicit refusals if inappropriate
- Repetition or token loops (these are Tonality and Structure)
- Factual inaccuracies while following instructions
- Tone or etiquette issues without instruction noncompliance
- Misinterpretation due to ambiguous prompts (this is Ambiguity Ignored)

---

### Failure Mode: Tonality and Structure

**Definition**: The model's response exhibits repetitive or circular phrasing, inappropriate tone, or poor structural organization. This includes unnecessary loops, echoed content, or stylistic and formatting deviations that reduce clarity, professionalism, or adherence to expected norms and instructions. DO NOT check ANY LOGICAL ERRORS for this FM.

**Tag(s) Added**: `meta_ai_text_tone`, `Model Failure Mode - Task Closure`
**Oncall Assigned**: N/A

#### Checklist:
- Does the model restate prior content or the user's prompt verbatim or near-verbatim without added insight?
- Does it produce long repetitive sections (paragraphs, lists, or code) with minimal variation or progression?
- Does it enter a visible loop pattern (e.g., recursive apology, repeated closing lines, cycling text)?
- Does it redundantly repeat disclaimers ("As an AI…") or boilerplate beyond what's contextually needed?
- Does the tone conflict with expectations (e.g., overly casual, condescending, rude, robotic, or excessively formal)?
- Does the model use disallowed or inconsistent formatting, or omit expected Markdown or sectioning?
- Does it include culturally insensitive, inappropriate, or contextually irrelevant humor or idioms?
- Is the response too terse or overly verbose compared to task expectations or norms?
- Does it over-apologize or self-disclaim beyond what is appropriate?
- Does it overuse hedging, self-reference, or filler phrases that detract from readability?
- Does it fail to include requested structure (e.g., bullets, sections, summaries) or produce a chaotic/unorganized layout?
- Does it break etiquette (e.g., incorrect forms of address, unprofessional salutation)?
- Are emojis or expressive markers used in ways that undermine tone or professionalism?

#### Exclusions:
- If there are a lot of words representing thinking process such as "Let's", "no", "check", "however", "think", "wait", "but", "retry", "mistake", "error", "verify", "wrong", and "evaluate", it is Chain of thought leakages that belong to **Security Violations**
- All reasoning errors including self-contradictory inference steps, internally inconsistency, hedging with possibilities and speculations, and incorrect final answers belong to **Reasoning Errors**—DO NOT mention these issues in this FM
- Summaries or restatements for emphasis when used purposefully once
- Parallel headings or structured lists with distinct content
- Failure to follow explicit task instructions (belongs under Steerability)
- Grammar, spelling, or factual errors (covered under Language and Grammar or Factuality Hallucinations)
- Responding to ambiguous prompts without clarification (Ambiguity Ignored)
- Minimal re-mentioning of constraints for compliance (Steerability)

---

### Failure Mode: Personalization and Localization

**Definition**: The model fails to tailor responses to the user's stated or implied locale, culture, preferences, accessibility needs, or background when relevant and available, or applies incorrect localization.

**Tag(s) Added**: `meta_ai_personalization`, `Model Failure Mode - Task Closure`
**Oncall Assigned**: N/A

#### Differentiation from Personalization Tools

Think: Is this something the model would have to access an external source to know? Or should it know this based on its memory and context?

| Issue Type | Example |
|------------|---------|
| **Model Bug** | Response called me a different name, age, or even basic preferences we have explicitly talked about in the past |
| **Tool Bug** | Response failed to correctly identify my likes and dislikes based on information it can pull from other sources like IG, mail, FB, etc. |

#### Checklist:
- Does the model ignore user-stated location or jurisdiction when laws, currencies, or availability matter?
- Does the model use incorrect units, date formats, or currencies despite user cues or instructions?
- Does the model recommend services or products unavailable in the user's region when local alternatives are expected?
- Does the model provide time-sensitive info without adjusting for the user's timezone when asked or implied?
- Does the model give culturally inappropriate examples or idioms for the stated audience when neutral ones suffice?
- Does the model fail to adjust spelling/terminology to the requested variant (e.g., en-GB vs en-US) when asked?
- Does the model neglect language level or prior knowledge indicated by the user (too technical or too basic)?
- Does the model omit local legal/procedural differences when the request is jurisdiction-specific?
- Does the model apply blanket advice not suitable for the user's sector/role when specified?

#### Exclusions:
- Inventing user details not provided (out of scope)
- Pure factual inaccuracies about the world (out of scope)
- Tone/style issues without relation to user context (this is Tonality and Structure)
- Not following general instructions unless locale/personalization was the instruction
- Grammar/spelling mistakes

---

### Failure Mode: Language and Grammar

**Definition**: The model makes errors in language mechanics such as grammar, spelling, punctuation, syntax, agreement, or code-switching, including multilingual correctness issues, that detract from clarity. DO NOT check sentence, format, or structure level issues.

**Tag(s) Added**: `meta_ai_grammar`, `Model Failure Mode - Task Closure`
**Oncall Assigned**: N/A

#### Checklist:
- Are there spelling mistakes or typos that are not user quotes and affect readability?
- Are there grammatical errors (subject-verb agreement, tense consistency, article usage)?
- Does the model produce awkward or ungrammatical syntax leading to unclear meaning?
- Is there punctuation misuse that changes meaning or impairs readability?
- Is there incorrect capitalization or casing conventions for the language?
- Does the model misuse homophones or word forms (their/there/they're) affecting clarity?
- Are there incorrect diacritics or character usage in languages that require them?
- Are there incoherent sentence fragments or run-ons without proper connectors?
- Are there code-mixing or unintended language switches that break comprehension?
- Is there incorrect pluralization, gender/number agreement in languages that require it?

#### Exclusions:
- Chain of thought leakages belong to **Security Violations**
- Tone/style mismatches are **Tonality and Structure**
- Logical or mathematical mistakes (out of scope)
- Factual inaccuracies (out of scope)
- Fragmented sentences, repetitive phrasing, and structural issues are **Tonality and Structure**
- Misattributing conversation content (out of scope)

---

### Failure Mode: Factuality Hallucinations

**Definition**: The model asserts false or unverified claims about external world facts not supported by the conversation context, including fabricated data, citations, or events.

**Tag(s) Added**: `meta_ai_text_factuality`, `Model Failure Mode - Task Closure`
**Oncall Assigned**: N/A

#### Differentiation from Tool Issues

Factuality hallucinations can sometimes be due to poor searching from the model when using tools. Make sure you take a look at the sources pulled in Pariscope to determine whether the model searched poorly (tool bug) or if it truly hallucinated the response.

| Issue Type | Example |
|------------|---------|
| **Model Bug** | Response states that The Great Wall is in North America. The Great Wall's location is a well-known fact that the model should have learned in training |
| **Tool Bug** | Response provides an incorrect response when asked the results from last night's game. This is a fact that the model (or even you) would have to go and search in external sources |

#### Checklist:
- Does the model provide specific factual claims (dates, figures, names) that are incorrect relative to established knowledge?
- Does the model cite nonexistent sources, URLs, or papers, or fabricate quotes/attributions?
- Does the model assert capabilities or features of third-party products/services that are false?
- Does the model invent statistics or studies without evidence when asked for data?
- Does the model state laws, regulations, or policies inaccurately for a jurisdiction or organization?
- Does the model describe historical or current events incorrectly (timelines, outcomes, participants)?
- Does the model attribute achievements, positions, or affiliations to people or entities incorrectly?
- Does the model misstate numerical values, units, or conversions about real-world facts when NOT solving a math problem?
- Does the model claim current availability or prices that are demonstrably wrong for the stated time/place?
- Does the model fabricate technical specifications or scientific facts without support?

#### Exclusions:
- Misinterpreting conversation context (e.g., wrong speaker)
- Logical or mathematical mistakes within a posed problem (these are **Reasoning Errors**)
- Typos affecting numbers without changing factual assertions, unless the typo substantially changes the claim's meaning
- Disallowed content generation (out of scope)

---

### Failure Mode: Contextual Hallucinations

**Definition**: The model fabricates or misremembers details from the current conversation, misattributes statements, invents user preferences, or fails to resolve entities correctly within the dialog context.

**Tag(s) Added**: `meta_ai_hallucination`, `Model Failure Mode - Task Closure`
**Oncall Assigned**: N/A

#### Checklist:
- Does the model attribute a prior statement or preference to the user that was never expressed?
- Does the model refer to entities (names, IDs) inconsistently with earlier messages?
- Does the model invent prior steps or actions in the conversation that did not occur?
- Does the model answer as if given data or documents were provided when they were not?
- Does the model confuse multiple entities with similar names within the conversation context?
- Does the model insert user location, demographics, or background not stated or inferable?
- Does the model claim the user consented to terms/instructions that were never agreed upon?
- Does the model misquote or mis-summarize earlier conversation content materially?
- Does the model reference previous tool outputs or results that were never returned?
- Does the model persist with outdated context after the user corrected it?
- Does the model disregard stated user preferences (e.g., dietary, accessibility) relevant to the task?
- Does the model confuse entities referenced by pronouns or epithets?

#### Exclusions:
- External world factual errors (these are **Factuality Hallucinations**)
- Ambiguity in the user prompt (out of scope)
- Wrong tone or style (out of scope)
- Ignoring instructions unless the error is about conversation content
- Simple typos in names unless they change attribution
- Calculation errors within a posed math problem (these are **Reasoning Errors**)

---

### Failure Mode: Reasoning Errors

**Definition**: The model exhibits flawed logical, mathematical, or procedural reasoning, including invalid inference steps, arithmetic mistakes, unsupported conclusions, or failure to provide required reasoning where the task demands it.

**Tag(s) Added**: `meta_ai_reasoning_error`, `Model Failure Mode - Task Closure`
**Oncall Assigned**: N/A

#### Checklist:
- Does the model perform incorrect arithmetic or algebra in stepwise calculations?
- Does the model fail to count correctly or apply basic numerical operations?
- Does the model draw conclusions that do not follow from provided premises or data?
- Does the model apply wrong formulas, theorems, or algorithms for the problem type?
- Does the model fail to consider necessary constraints or edge cases explicitly provided?
- Does the model present mutually inconsistent steps or results in the same solution?
- Does the model offer proofs or explanations with logical gaps or circular reasoning?
- Does the model select an incorrect method when the correct method is indicated by the problem?
- Does the model ignore counterevidence present in the prompt when reasoning to a conclusion?
- Does the model provide an answer without showing required reasoning when the prompt requests steps?
- Does the model misinterpret graphs, tables, or structured data in the problem statement?

#### Exclusions:
- Chain of thought leakages belong to **Security Violations**
- External factual errors unless inside the posed problem's logic
- Not following instructions without a reasoning component is **Steerability**
- Answering wrong questions and missing requests belong to **Steerability**
- Repetition of content is **Tonality and Structure**
- Grammar/spelling issues
- Misremembering conversation details belong to **Contextual Hallucinations**

---

### Failure Mode: Unknown

**Definition**: If an issue does not fit any of the descriptions above, then it is an unknown issue.

**Tag(s) Added**: `meta_ai_unknown_fm`
**Oncall Assigned**: Michael Sendze

> ⚠️ **DO NOT** categorize an issue as "Unknown" without going through the rest of the failure modes first.

---

## Step 3: Complete Triage

Triage will then be expected to complete remaining triage steps (tag, prioritize, and assign owner). The above actions should be automated via submission of the UDT form.

---

## Failure Mode Summary Table

| Failure Mode | Tag(s) | Oncall |
|--------------|--------|--------|
| Ambiguity Ignored | `meta_ai_ambiguity_ignored` | N/A |
| Unwarranted Refusal | `meta_ai_text_false_refusal` | genai_llm_safety |
| Security Violation | `meta_ai_safety_violation` | genai_llm_safety |
| Steerability | `meta_ai_steerability` | N/A |
| Tonality and Structure | `meta_ai_text_tone` | N/A |
| Personalization and Localization | `meta_ai_personalization` | N/A |
| Language and Grammar | `meta_ai_grammar` | N/A |
| Factuality Hallucinations | `meta_ai_text_factuality` | N/A |
| Contextual Hallucinations | `meta_ai_hallucination` | N/A |
| Reasoning Errors | `meta_ai_reasoning_error` | N/A |
| Unknown | `meta_ai_unknown_fm` | Michael Sendze |

---

## Key Contacts

| Role | Contact |
|------|---------|
| Document POM | Michael Sendze |
| LLM Safety Oncall | @genai_llm_safety |

---

## Resources

- Model Quality Task Template: [Internal Link]
- UDT Flow Documentation: [Internal Link]
- Pariscope (for tool debugging): [Internal Link]

---

*This guide is part of the Meta AI Triage System. For surface-specific triage, see the respective surface guides (C50, Ecto, FoA).*
