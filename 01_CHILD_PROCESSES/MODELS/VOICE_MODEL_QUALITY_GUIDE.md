# Voice Model Quality Triage Guide

> **Product Area**: Voice Model Quality
> **Last Updated**: March 2026
> **Child Process Owner**: Meta AI Voice Team

---

## Overview

Voice Model Quality covers issues related to Meta AI's voice/audio capabilities, including speech-to-text (STT), text-to-speech (TTS), voice recognition, audio quality, and real-time voice interactions. This guide addresses both input (user voice) and output (AI voice) quality issues.

---

## Scope Definition

### In Scope
- Text-to-Speech (TTS) quality issues
- Speech-to-Text (STT) transcription errors
- Voice recognition failures
- Audio quality (distortion, latency, artifacts)
- Voice persona/character voice issues
- Pronunciation errors
- Voice command failures
- Real-time voice conversation issues
- Audio streaming problems
- Voice-specific language support

### Out of Scope
- Text response quality (→ Text Model Quality)
- Media audio generation like music (→ Media Generation)
- UI audio playback bugs (→ Surface guides)
- Microphone hardware issues (→ Device support)
- Non-voice audio in videos (→ Media Generation)

---

## Voice Components

### 1. Speech-to-Text (STT) - User Voice Input

| Issue Type | Description | Priority |
|------------|-------------|----------|
| Transcription Errors | Incorrect text from speech | Medium-High |
| Language Detection | Wrong language detected | Medium |
| Accent Recognition | Poor handling of accents | Medium |
| Background Noise | Fails with ambient noise | Medium |
| Partial Transcription | Cuts off or misses words | High |
| Latency | Slow transcription speed | Medium |

### 2. Text-to-Speech (TTS) - AI Voice Output

| Issue Type | Description | Priority |
|------------|-------------|----------|
| Robotic/Unnatural | Voice sounds artificial | Medium |
| Pronunciation | Mispronounces words/names | Medium |
| Prosody Issues | Wrong emphasis/intonation | Low |
| Audio Artifacts | Clicks, pops, distortion | High |
| Voice Consistency | Voice changes unexpectedly | Medium |
| Speed Issues | Too fast or too slow | Low |
| Volume Problems | Too quiet or too loud | Low |

### 3. Voice Interaction

| Issue Type | Description | Priority |
|------------|-------------|----------|
| Wake Word Failure | "Hey Meta" not recognized | High |
| Command Recognition | Voice commands not understood | High |
| Turn-Taking | Interrupts or doesn't respond | Medium |
| Conversation Flow | Unnatural conversation pacing | Medium |
| End Detection | Doesn't know when user finished | Medium |

---

## Tags & Routing

| Category | Tag | Owner/Oncall |
|----------|-----|--------------|
| STT Issues | `metaai_voice_stt` | meta_ai_voice_backend |
| TTS Issues | `metaai_voice_tts` | meta_ai_voice_backend |
| Voice Commands | `metaai_voice_commands` | meta_ai_voice_backend |
| Audio Quality | `metaai_voice_audio_quality` | meta_ai_voice_backend |
| Voice Personas | `metaai_voice_personas` | meta_ai_voice_backend |
| Latency | `metaai_voice_latency` | meta_ai_voice_backend |
| Voice I18n | `metaai_voice_i18n` | metaai_i18n_oncall |
| Hands-Free | `metaai_voice_handsfree` | meta_ai_voice_backend |

---

## Triage Process

### Step 1: Identify Voice Component

Determine which component is affected:

| User Report | Component |
|-------------|-----------|
| "It didn't understand what I said" | STT |
| "The AI voice sounds weird" | TTS |
| "Hey Meta isn't working" | Voice Interaction |
| "Audio is choppy/distorted" | Audio Quality |
| "The voice persona sounds different" | Voice Personas |

### Step 2: Categorize Issue Type

| Symptoms | Category | Priority Guidance |
|----------|----------|-------------------|
| Complete failure to transcribe | STT - Critical | High |
| Occasional misheard words | STT - Minor | Medium |
| Voice output not playing | TTS - Critical | High |
| Voice sounds robotic | TTS - Quality | Medium |
| Wake word never works | Interaction - Critical | High |
| Latency > 3s | Latency | High |

### Step 3: Apply Tags

**Task Title Format:**
```
[Meta AI][Voice][Component][Surface][Platform]
```

**Example Titles:**
- `[Meta AI][Voice][STT][C50][iOS] Transcription fails with accent`
- `[Meta AI][Voice][TTS][Ecto] Voice output has audio artifacts`
- `[Meta AI][Voice][Commands][FoA][Android] Hey Meta not recognized`

---

## Priority Definitions

| Priority | Criteria | Response Time |
|----------|----------|---------------|
| **Critical** | Voice completely non-functional, widespread outage | Immediate |
| **High** | Consistent STT/TTS failures, >3s latency, wake word failures | < 4 hours |
| **Medium** | Occasional quality issues, specific language/accent problems | < 24 hours |
| **Low** | Minor quality issues, pronunciation edge cases | < 1 week |
| **Wishlist** | Voice quality improvements, new language requests | Backlog |

---

## Investigation Playbooks

### STT Transcription Errors
```
SYMPTOMS:
- User's speech not correctly transcribed
- Words misheard or missing
- Transcription incomplete

INVESTIGATION:
1. Collect audio sample if possible
2. Document exact words spoken vs transcribed
3. Note environmental conditions (noise, distance)
4. Check user's language/locale settings
5. Test with clear speech in quiet environment

COLLECT:
- Audio sample or detailed description
- Spoken words vs transcribed text
- Device type and OS version
- Surface (C50/Ecto/FoA)
- User language settings
- Environmental conditions

TAGS: metaai_voice_stt
OWNER: meta_ai_voice_backend
```

### TTS Audio Quality Issues
```
SYMPTOMS:
- Voice sounds robotic/unnatural
- Audio artifacts (clicks, pops)
- Distortion or clipping
- Inconsistent volume

INVESTIGATION:
1. Reproduce on same text
2. Test with different text lengths
3. Check device audio settings
4. Note specific problematic words/phrases
5. Test on different devices if possible

COLLECT:
- Text that produces issue
- Audio recording if possible
- Device and OS version
- Surface and app version
- Headphones/speaker used
- Voice persona selected

TAGS: metaai_voice_audio_quality, metaai_voice_tts
OWNER: meta_ai_voice_backend
```

### Wake Word / Voice Command Failures
```
SYMPTOMS:
- "Hey Meta" not recognized
- Voice commands ignored
- Delayed or no response to voice

INVESTIGATION:
1. Verify microphone permissions
2. Test in quiet environment
3. Check for competing audio
4. Verify voice features enabled
5. Test with different phrasings

COLLECT:
- Exact phrase used
- Number of attempts
- Environmental noise level
- Device and OS version
- Microphone permissions status
- Other apps using microphone

TAGS: metaai_voice_commands, metaai_voice_handsfree
OWNER: meta_ai_voice_backend
```

### Voice Latency Issues
```
SYMPTOMS:
- Long delay before voice response
- Transcription appears slowly
- Conversation feels sluggish

INVESTIGATION:
1. Measure actual latency (time from speech end to response start)
2. Check network conditions
3. Compare across surfaces
4. Test at different times of day

COLLECT:
- Measured latency (seconds)
- Network type (WiFi/cellular/strength)
- Device and OS version
- Surface and app version
- Time of day/location
- Prompt complexity

TAGS: metaai_voice_latency
OWNER: meta_ai_voice_backend
```

---

## Voice Personas

Meta AI supports different voice personas. Voice persona issues include:

| Issue | Description | Tag |
|-------|-------------|-----|
| Wrong Persona | Different voice than selected | `metaai_voice_personas` |
| Persona Switching | Voice changes mid-conversation | `metaai_voice_personas` |
| Persona Unavailable | Selected persona not working | `metaai_voice_personas` |
| Persona Quality | Specific persona sounds bad | `metaai_voice_personas` |

---

## Platform-Specific Considerations

### iOS (C50)
- Check microphone permissions in Settings
- Verify Siri is not intercepting voice
- Test with different audio routes (speaker/headphones)

### Android (C50)
- Check microphone permissions
- Verify Google Assistant not intercepting
- Check battery optimization settings

### Web (Ecto)
- Browser microphone permissions
- Check browser compatibility
- Verify HTTPS (required for mic access)

### FoA (FB/IG/WA/MSGR)
- Check app-specific microphone permissions
- In-app voice feature enablement
- Voice note vs AI voice distinction

---

## Data Collection Requirements

| Data Point | Required | Description |
|------------|----------|-------------|
| Audio Sample | If possible | Recording demonstrating issue |
| Spoken Text | Yes | What user said (for STT issues) |
| Output Text | Yes | What AI said (for TTS issues) |
| Expected vs Actual | Yes | What should have happened |
| Device Info | Yes | Device model, OS version |
| Surface | Yes | C50/Ecto/FoA |
| App Version | Yes | Current app version |
| Network Type | If latency | WiFi/cellular/signal strength |
| Environment | If STT | Noise level, distance from mic |
| Voice Persona | If TTS | Which persona selected |

---

## TOT Considerations

### Transfer TO Voice Model Quality
- Audio playback issues that are model-related (not UI)
- "AI didn't understand me" issues
- Voice persona problems

### Transfer FROM Voice Model Quality
- **To Surface Guides**: If UI audio player is broken (not voice quality)
- **To Text Quality**: If issue is response content (not audio)
- **To Media Generation**: If issue is music/audio generation (not voice)
- **To Device Support**: If issue is hardware microphone/speaker

---

## Key Contacts

| Role | Workplace Handle |
|------|------------------|
| Voice Backend Oncall | @meta_ai_voice_backend |
| I18n Oncall | @metaai_i18n_oncall |
| Voice PM | TBD |
| Voice Engineering Lead | TBD |

---

## Metrics & Dashboards

| Metric | Description | Dashboard |
|--------|-------------|-----------|
| STT Accuracy | Word error rate for transcription | Voice Quality Dashboard |
| TTS Latency | Time to first audio byte | Voice Latency Dashboard |
| Wake Word Success | % successful wake word activations | Voice Commands Dashboard |
| Voice Session Success | % sessions completing without error | Voice Health Dashboard |

---

## Resources

- Voice Backend Documentation: [Internal Link]
- Voice Quality Metrics: [Internal Link]
- Supported Languages: [Internal Link]
- Voice Team Workplace Group: [Workplace Group]

---

*This guide is part of the Meta AI Triage System. For surface-specific triage, see the respective surface guides (C50, Ecto, FoA).*
