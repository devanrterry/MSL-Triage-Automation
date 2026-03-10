# Copyright (c) Meta Platforms, Inc. and affiliates.

from confucius.analects.entry.decorators import public
from confucius.analects.entry.mixin import EntryAnalectMixin
from confucius.analects.entry.tags import BETA


@public
class MetaAITriageAgentMetadata(EntryAnalectMixin):
    """Metadata for Meta AI Triage Agent analect."""

    @classmethod
    def display_name(cls) -> str:
        return "Meta AI Triage Agent"

    @classmethod
    def description(cls) -> str:
        return (
            "Automated bug triage specialist for Meta AI products. "
            "Analyzes bug reports, determines correct categorization, "
            "and applies updates directly to tasks (title, tags, owner, priority). "
            "Supports C50, Ecto, FoA, Vibes, and Hatch surfaces."
        )

    @classmethod
    def tags(cls) -> list[str]:
        return [BETA]

    @classmethod
    def input_examples(cls) -> list[str]:
        return [
            "Triage T258972123",
            "Analyze and triage task T258674764",
            "Route this bug: T258678662",
            "Help me triage T258684950",
        ]

    @classmethod
    def greeting_messages(cls) -> list[str]:
        return [
            "👋 Welcome to the Meta AI Triage Agent! "
            "I can analyze bug reports and automatically update tasks with the correct "
            "title format, tags, owner, and priority. "
            "Just give me a task ID (e.g., 'Triage T258972123') and I'll handle the rest."
        ]

    @classmethod
    async def new_from_entry_input(cls, entry_input):
        from .entry import MetaAITriageAgentEntry  # Lazy import for fast startup

        return MetaAITriageAgentEntry()
