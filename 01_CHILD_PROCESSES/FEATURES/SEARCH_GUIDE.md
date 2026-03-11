# MetaAI Search Triage Guide

> **Feature**: Meta AI Search
> **Last Updated**: March 2026
> **Document POC**: Henry Ngo | Mark Nettles
> **Audience**: Triage Specialists

---

## Overview

This document covers the triage processes for issues related to the quality of Meta AI's Search Feature (i.e., if the user reports issues with how Meta AI responds to a user prompt).

> **Note**: For UI/UX related issues, follow the app (e.g., C50/Ecto) triage guide.

### Applicable Surfaces

| Surface | Description |
|---------|-------------|
| **C50** | Meta AI App (iOS/Android) |
| **Ecto** | meta.ai website |
| **FoA** | Facebook, Instagram, Messenger, WhatsApp (when specifically invoked) |

### Issue Types Covered

This guide covers:
1. **Search Triggering** - Problems with when/whether search is initiated
2. **Response Quality** - Problems with accuracy, completeness, or format of results

---

## Search Tools Reference

| Tool | Definition | Example Use Cases |
|------|------------|-------------------|
| **MetaSearch (1P)** | Meta AI's unified search for first-party content (posts, reels, stories from FB, IG, Threads). With Zeitgeist integration for real-time cultural trends. | Trending topics, community insights, live reactions, event coverage |
| **WebSearch (2P/3P)** | Retrieves information from contracted partners (2P: Reuters, AP) and general web (3P). | Fact-checking, current news, product reviews, reference information |
| **Shopping Search** | Product-related information, reviews, and shopping opportunities from Meta platforms and external sources. | Product lookup, comparisons, pricing, reviews, recommendations |

---

## Bug Triage Process

### Step 1: Initial Identification & Triage

1. **Identify Surface**: Meta AI App, meta.ai website, or FoA
2. **Task Title Template**: Select "Meta AI Search" from "[GenAI] Title Template" butterfly button
3. **Task Title Format**:

```
[MetaAI][Search][Platform][App/Website][App Version] Summary of the issue
```

> **Note**: Remove `[App Version]` if the bug is reported on Ecto

**Examples:**
- `[MetaAI][Search][iOS][C50][261.0.0.0.38] AI shows last night's games instead of tonight's schedule`
- `[MetaAI][Search][Web][Ecto] Search returns results in wrong language`

4. **Task Template**: Select model quality task template and include:
   - Pariscope link
   - Bot Request ID
   - Search Inspector Request Link (C50 only)
   - Search Engine #

5. **KP Search**: Do NOT conduct full KP search. ONLY merge issues with EXACT SAME prompt and response.
6. **Repro Attempt**: Do NOT try to repro model quality issues (use "Skip" option in UDT).

---

### Step 2: Identify Issue Type

## 1.0 Search Triggering Issues

Search Triggering refers to problems with Meta AI's decision-making about when to initiate search queries and which sources to access.

### 1.1 MetaSearch (1P) Triggering

| Issue Type | Description | Tags | Owner |
|------------|-------------|------|-------|
| **No Trigger** | MetaSearch was not called when 1P content was expected | `MetaAI2.0-Clippy`, `Meta_ai-triggering` | Jack Wu |
| **Triggered, No Response** | MetaSearch was called but no 1P content returned | `MetaAI2.0-Metasearch`, `Meta_ai-triggering` | Priya Gupta |
| **Under-triggering** | MetaSearch retrieves less content than expected | `MetaAI2.0-Metasearch`, `Meta_ai-triggering` | Vivek Narayanan |
| **Over-triggering** | MetaSearch surfaces content for queries that don't need it (e.g., "what's 2+2?") | `MetaAI2.0-Metasearch`, `Meta_ai-triggering` | Jagadeesan Sundaresan |
| **Multi-Turn Triggering** | System fails to recognize context from previous queries | `MetaAI2.0-Metasearch`, `Meta_ai-triggering` | Jagadeesan Sundaresan |
| **Mismatched Retrieval** | Wrong type of content retrieved (e.g., FB instead of IG when IG requested) | `MetaAI2.0-Metasearch`, `Meta_ai-triggering` | Jagadeesan Sundaresan |

### 1.2 WebSearch (2P/3P) Triggering

| Issue Type | Description | Tags | Owner |
|------------|-------------|------|-------|
| **No Trigger** | WebSearch was not called when 2P/3P content was expected | `MetaAI2.0-Clippy`, `Meta_ai-triggering` | Jack Wu |
| **Triggered, No Response** | WebSearch called but no partner/web content returned | `MetaAI2.0-Websearch`, `Meta_ai-triggering` | Giovanni Iachello |
| **Under-triggering** | WebSearch retrieves less content than expected | `MetaAI2.0-Websearch`, `Meta_ai-triggering` | Giovanni Iachello |
| **Over-triggering** | WebSearch surfaces content for queries that don't need it | `MetaAI2.0-Websearch`, `Meta_ai-triggering` | Giovanni Iachello |
| **Multi-Turn Triggering** | System fails to leverage prior conversation context | `MetaAI2.0-Websearch`, `Meta_ai-triggering` | Giovanni Iachello |
| **Mismatched Retrieval** | Wrong type of content retrieved | `MetaAI2.0-Websearch`, `Meta_ai-triggering` | Giovanni Iachello |

### 1.3 Meta AI 1.0 Triggering

| Issue Type | Description | Tags | Owner |
|------------|-------------|------|-------|
| **1.0 Triggering** | Triggering issues on Meta AI 1.0 (request_id not found in Pariscope) | `MetaAI1.0-Websearch`, `Meta_ai-triggering` | Kecheng Hao |

### 1.4 Shopping Catalog Triggering

| Issue Type | Description | Tags | Owner |
|------------|-------------|------|-------|
| **No Trigger** | Catalog Search not called for shopping query | `MetaAI2.0-Clippy`, `Meta_ai-triggering` | Jack Wu |
| **Triggered, No Response** | Catalog Search called but no products returned | `MetaAI2.0-Shopping`, `Meta_ai-triggering` | Lars Hamre |
| **Under-triggering** | Fewer products returned than expected | `MetaAI2.0-Shopping`, `Meta_ai-triggering` | Lars Hamre |
| **Over-triggering** | Products shown for non-shopping queries | `MetaAI2.0-Shopping`, `Meta_ai-triggering` | Lars Hamre |
| **Multi-Turn Triggering** | System fails to refine products based on follow-up | `MetaAI2.0-Shopping`, `Meta_ai-triggering` | Lars Hamre |

---

## 2.0 Response Quality Issues

Response Quality refers to issues with the accuracy, completeness, format, or appropriateness of Meta AI's response after search has been triggered.

### MetaSearch (1P) Response Quality

| # | Issue Type | Description | Tags | Owner |
|---|------------|-------------|------|-------|
| 2.1 | **Irrelevant (Retrieval Failure)** | Content fails to address user's query - off-topic, wrong domain, unrelated | `MetaAI2.0-Metasearch`, `Meta_ai-search_relevancy` | Priya Gupta |
| 2.2 | **Intent Misalignment** | Topically related but misses key details (language, location, entities, requirements) | `MetaAI2.0-Metasearch`, `Meta_ai-search_intent` | Jagadeesan Sundaresan |
| 2.3 | **1P Freshness/Recency** | Outdated 1P content when current information expected (stale results, old events) | `MetaAI2.0-Metasearch`, `MetaAISearch_1PFreshness`, `MetaAISearch_System` | Jagadeesan Sundaresan |
| 2.4 | **Authority Issues** | Responses lack credibility - flagged sources, overt promotion, bias, missing authoritative sources | `MetaAI2.0-Metasearch`, `Meta_ai-search_authority` | Jagadeesan Sundaresan |
| 2.5 | **Slow Response/Latency** | Delays in displaying responses (10+ sec load, UI hangs, crashes) | `MetaAI2.0-Metasearch`, `Meta_ai-search_latency` | Priya Gupta |
| 2.6 | **Query Rewrite** | Poor reformulation loses context (removing temporal context, over-generalizing) | `MetaAI2.0-MetaSearch`, `MetaAISearch_QueryRewrite`, `MetaAISearch_Model` | Priya Gupta |
| 2.7 | **Repetitive/Lack of Diversity** | Overly similar content, duplicates, single-source dominance, lack of variety | `MetaAI2.0-MetaSearch`, `Meta_ai_repetitive_diversity` | Jagadeesan Sundaresan |
| 2.8 | **Citation/Source Link Quality** | Missing, unrendered, incorrect, irrelevant, broken, or misleading source links | `MetaAI2.0-MetaSearch`, `MetaAISearch_BrokenLink` | Jagadeesan Sundaresan |
| 2.9 | **Hallucination** | Fabricated information during summarization despite correct sources | `MetaAI2.0-MetaSearch`, `MetaAISearch_Hallucination` | Jagadeesan Sundaresan |
| 2.10 | **Partial Response** | Incomplete answers - only addresses part of multi-part question | `MetaAI2.0-MetaSearch`, `MetaAISearch_PartResponse` | Jagadeesan Sundaresan |
| 2.11 | **Time & Date** | Temporal interpretation failures - wrong timezone, date reference errors, parsing issues | `MetaAI2.0-MetaSearch`, `MetaAISearch_TimezoneIssues` | Jagadeesan Sundaresan |

### WebSearch (2P/3P) Response Quality

| # | Issue Type | Description | Tags | Owner |
|---|------------|-------------|------|-------|
| 2.11 | **Irrelevant** | Web content fails to address user's query | `MetaAI2.0-WebSearch`, `Meta_ai-search_relevancy` | Giovanni Iachello |
| 2.12 | **Intent Misalignment** | Topically related but misses key details (language, location, time constraints) | `MetaAI2.0-WebSearch`, `Meta_ai-search_intent` | Giovanni Iachello |
| 2.13 | **2P Freshness/Recency** | Outdated content from contracted sources (Reuters, AP, etc.) | `MetaAI2.0-Websearch`, `MetaAISearch_2PFreshness`, `MetaAISearch_System` | Giovanni Iachello |
| 2.14 | **3P Freshness/Recency** | Outdated content from general web sources | `MetaAI2.0-WebSearch`, `MetaAISearch_3PFreshness`, `MetaAISearch_System` | Giovanni Iachello |
| 2.15 | **Query Rewrite** | Poor reformulation loses context or specificity | `MetaAI2.0-WebSearch`, `MetaAISearch_QueryRewrite`, `MetaAISearch_Model` | Giovanni Iachello |
| 2.16 | **Parsing Issues** | Correct sources but fails to extract key details (tables, dates, prices) | `MetaAI2.0-WebSearch`, `MetaAISearch_QueryParsing`, `MetaAISearch_System` | Giovanni Iachello |
| 2.17 | **Repetitive/Lack of Diversity** | Duplicated articles, redundant URLs, single-format dominance | `MetaAI2.0-WebSearch`, `Meta_ai_repetitive_diversity` | Giovanni Iachello |
| 2.18 | **Widgets** | Issues with widget functionality (e.g., stocks widget) | `MetaAI2.0-WebSearch`, `MetaAI2.0-Websearch-widgets` | Jonny Glazier |
| 2.19 | **Citation/Source Link Quality** | Missing, incorrect, broken, or misleading web source links | `MetaAI2.0-WebSearch`, `MetaAISearch_BrokenLink` | Giovanni Iachello |
| 2.20 | **Hallucination** | Fabricated information during summarization despite correct web sources | `MetaAI2.0-WebSearch`, `MetaAISearch_Hallucination` | Giovanni Iachello |
| 2.21 | **Partial Response** | Incomplete answers from web search results | `MetaAI2.0-WebSearch`, `MetaAISearch_PartResponse` | Giovanni Iachello |
| 2.22 | **Time & Date** | Temporal interpretation failures - timezone errors, date reference errors | `MetaAI2.0-WebSearch`, `MetaAISearch_TimezoneIssues` | Giovanni Iachello |

### Shopping Response Quality

| # | Issue Type | Description | Tags | Owner |
|---|------------|-------------|------|-------|
| 2.22 | **Shopping Issues** | Irrelevant products, stale/out-of-stock, missing brands, broken links, checkout issues | `MetaAI2.0-Shopping` | Lars Hamre |

### General Text Model Quality (Post-Search)

| # | Issue Type | Description | Tags | Owner |
|---|------------|-------------|------|-------|
| 2.24 | **Data Structure Issues** | Cannot present info in requested format (tables, lists, rankings) | `MetaAI2.0-Clippy`, `MetaAISearch_DataStructure` | Jack Wu |

---

## Time & Date Issues - Detailed Breakdown

Time & Date issues refer to failures in how MetaAI interprets, converts, and presents temporal information.

| Sub-Type | Description | Example |
|----------|-------------|---------|
| **Incorrect Time Conversion** | Event times shown in source timezone instead of user's local time | User in NYC sees event time in PST |
| **Date Reference Errors** | Temporal phrases misunderstood ("tonight" → "last night") | User asks "what's on tonight" but gets yesterday's games |
| **Date Parsing/Formatting** | Dates displayed incorrectly (MM/DD vs DD/MM) | Date shows as 03/11 when it should be 11/03 |
| **Missing/Incorrect Dates** | Time-sensitive info without correct date | News article shown without publication date |
| **DST Errors** | Daylight saving time not accounted for | Event time off by 1 hour |

---

## Step 3: Complete Triage

1. **Tag** - Apply appropriate tags from tables above
2. **Prioritize** - Use schema below
3. **Assign Owner** - Route to oncall from tables above
4. **KP Merge** - Only merge if EXACT SAME prompt and response (for "something went wrong" errors, error ID must match exactly)

---

## Priority Definitions

| Priority | Product Bugs | Model/System Bugs |
|----------|--------------|-------------------|
| **High** | Experience completely broken. User cannot complete flow. UI/UX bugs significantly impacting retention. | Reliability issues, logging issues, access issues. Stops user from achieving goal. Risk to safety. Brand reputation impact. |
| **Medium** | Flow inconvenient but not blocked. UI/UX optimizations. Accessibility. | Issue blocking but cannot repro. Interrupts flow but doesn't stop goal. |
| **Low** | Bugs with workaround. Polish and improvements. | Inconvenience that can be worked around. |
| **Wishlist** | Feedback not immediately actionable. Ideas for next iteration. | Nice to have improvements. |

---

## Quick Decision Tree

```
START: Search-related bug received
│
├─── Is search triggering the issue?
│    ├── MetaSearch (1P) not called → 1.1 Triggering
│    ├── WebSearch (2P/3P) not called → 1.2 Triggering
│    └── Shopping not called → 1.4 Triggering
│
├─── Is it a response quality issue?
│    │
│    ├─── TEMPORAL ISSUE?
│    │    └── "Tonight" shows "last night" → Time & Date
│    │
│    ├─── WRONG/IRRELEVANT RESULTS?
│    │    ├── Off-topic → Irrelevant
│    │    └── Right topic, wrong details → Intent Misalignment
│    │
│    ├─── OUTDATED RESULTS?
│    │    ├── Old 1P content → 1P Freshness
│    │    ├── Old partner content → 2P Freshness
│    │    └── Old web content → 3P Freshness
│    │
│    ├─── MADE-UP INFORMATION?
│    │    └── Facts not in sources → Hallucination
│    │
│    ├─── INCOMPLETE ANSWER?
│    │    └── Only partial response → Partial Response
│    │
│    ├─── BROKEN/MISSING LINKS?
│    │    └── Citation issues → Citation/Source Link Quality
│    │
│    └─── FORMAT ISSUES?
│         └── Can't make tables/lists → Data Structure Issues
│
└─── Complete triage via UDT
     └── Tag, prioritize, assign owner
```

---

## Key Contacts

| Name | Role | Area |
|------|------|------|
| Henry Ngo | Document POC | Search Triage Guide |
| Mark Nettles | Document POC | Search Triage Guide |
| Jack Wu | Oncall | Clippy/Triggering |
| Priya Gupta | Oncall | MetaSearch 1P |
| Giovanni Iachello | Oncall | WebSearch 2P/3P |
| Jagadeesan Sundaresan | Oncall | MetaSearch Response Quality |
| Lars Hamre | Oncall | Shopping |
| Jonny Glazier | Oncall | Widgets |
| Kecheng Hao | Oncall | Meta AI 1.0, 2P Freshness |

---

## Related Guides

| Guide | When to Use |
|-------|-------------|
| **Text Model Quality Guide** | General AI response quality (not search-specific) |
| **C50 Guide** | Meta AI App UI/UX issues |
| **Ecto Guide** | Meta AI Website UI/UX issues |
| **FoA Guide** | Family of Apps UI/UX issues |
| **[2026] Meta AI Search Triage Tooling** | Additional tooling and failure mode identification |

---

*This guide is part of the Meta AI Triage System.*
*Last updated: March 2026*
