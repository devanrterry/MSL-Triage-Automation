# Meta AI Triage Agent - Confucius Analect

An automated bug triage specialist for Meta AI products built on the Confucius platform.

## Overview

This agent analyzes incoming bug reports, determines the correct categorization (surface, platform, feature), and **applies updates directly to tasks** including title, tags, owner, and priority.

### Supported Surfaces
- **C50** (Meta AI App - iOS/Android)
- **Ecto** (meta.ai website)
- **FoA** (Facebook, Instagram, WhatsApp, Messenger)
- **Vibes App**
- **Hatch**

### Capabilities
| Capability | Description |
|------------|-------------|
| **Task Read** | Fetch task data (title, description, tags, attachments) |
| **Task Write** | Update title, add tags, set owner, set priority, post comments |
| **URL Resolution** | Follow links to BugViewer for additional context |
| **Screenshot Analysis** | Analyze attached images to understand visual issues |

---

## File Structure

```
meta_ai_triage_agent/
├── __init__.py        # Package initialization
├── BUCK               # Build configuration and dependencies
├── README.md          # This file
├── metadata.py        # Agent metadata (name, description, examples, greeting)
├── entry.py           # Orchestrator setup with extensions and capabilities
└── tasks.py           # System prompt with triage logic
```

---

## Setup Instructions

### Step 1: Copy to fbcode

Copy this folder to the Confucius analects directory:

```bash
cp -r meta_ai_triage_agent fbcode/confucius/analects/
```

### Step 2: Register the Analect

Add the analect to the Confucius registry. Edit `fbcode/confucius/analects/BUCK`:

```python
deps = [
    # ... existing deps ...
    "//confucius/analects/meta_ai_triage_agent:meta_ai_triage_agent",
]
```

### Step 3: Build

```bash
buck2 build //confucius/analects/meta_ai_triage_agent:meta_ai_triage_agent
```

### Step 4: Test Locally

```bash
confucius local --analect meta_ai_triage_agent
```

Then try: `Triage T258972123`

### Step 5: Deploy

Once tested, deploy to production:

```bash
confucius deploy --analect meta_ai_triage_agent
```

---

## Usage

### Basic Triage
```
Triage T258972123
```

### Batch Triage
```
Triage these tasks: T258674764, T258678662, T258667622
```

### Verify Existing Triage
```
Check if T258684950 was triaged correctly
```

---

## Example Output

```
✅ Task T258972123 Triaged Successfully

| Field | Value |
|-------|-------|
| **Title** | [c50][History][iOS][264.0.0.0.159] Conversation history does not show on text mode |
| **Surface** | C50 |
| **Platform** | iOS |
| **Feature** | History |
| **Priority** | Medium |
| **Owner** | silverstone_ios |
| **Tags Added** | c50-ios, c50-history, ios, input-modality-ai-text, ProdOps - Repro |

Routing to iOS client team as this is a history UI issue on C50 iOS app.
```

---

## Customization

### Adding New Features

Edit `tasks.py` and add to the feature tables:

```python
| New Feature | "keyword1", "keyword2" | `new-feature-tag` | new_oncall |
```

### Adding New Surfaces

1. Add surface detection pattern in Step 3 of `tasks.py`
2. Add title format in Step 7
3. Add surface-specific feature table in Step 5

### Modifying Priority Rules

Edit the Priority table in Step 6 of `tasks.py`.

---

## Troubleshooting

### Agent can't fetch task data
- Ensure `get_task_for_task_number` is in the FunctionExtension
- Check that the task ID format is correct (T followed by numbers)

### Agent doesn't update task
- Verify write functions (`update_task_title`, `add_task_tags`, etc.) are imported
- Check that the oncall queue exists and is valid

### Import errors
- Run `buck2 build` to verify all dependencies are available
- Check that task utilities are available at `//confucius/utils/orchestrator:task`

---

## Contributing

To update the triage logic:
1. Edit `tasks.py` with new rules
2. Test locally with `confucius local`
3. Submit a diff for review
4. Deploy after approval

---

## Contact

- **Team:** Product Implementations
- **Owner:** Devan Terry (devanterry@)
- **Manager:** YK Kim
