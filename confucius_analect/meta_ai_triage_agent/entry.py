# Copyright (c) Meta Platforms, Inc. and affiliates.

"""
Entry point for Meta AI Triage Agent.

This file configures the orchestrator with necessary extensions and capabilities.
"""

from confucius.analects.entry.base import Entry, EntryInput
from confucius.llm.anthropic import AnthropicLLMOrchestrator, AnthropicModel
from confucius.orchestrator.extensions.code import CodeExtension
from confucius.orchestrator.extensions.function import FunctionExtension
from confucius.orchestrator.extensions.plain_text import PlainTextExtension
from confucius.orchestrator.extensions.system_info import SystemInfoExtension
from confucius.orchestrator.extensions.thinking import ThinkingExtension
from confucius.orchestrator.orchestrator import Orchestrator

# Task-related utilities
from confucius.utils.orchestrator.task import (
    get_task_for_task_number,
    update_task_title,
    add_task_tags,
    add_task_comment,
    set_task_owner,
    set_task_priority,
)

# Message utilities
from confucius.utils.orchestrator.message_user import message_user

# URL resolution for bug viewer links
from confucius.utils.orchestrator.fburl import resolve_fburl

from .tasks import get_task_definition


class MetaAITriageAgentEntry(Entry):
    """Main entry point for Meta AI Triage Agent."""

    def create_orchestrator(self, inp: EntryInput) -> Orchestrator:
        """Create and configure the orchestrator with triage capabilities."""

        return AnthropicLLMOrchestrator(
            # Extensions provide capabilities to the agent
            extensions=[
                # Function extension enables tool use
                FunctionExtension(
                    functions=[
                        # Task READ capabilities
                        get_task_for_task_number,  # Fetch task details

                        # Task WRITE capabilities
                        update_task_title,  # Update task title
                        add_task_tags,  # Add tags to task
                        add_task_comment,  # Post comments
                        set_task_owner,  # Assign owner
                        set_task_priority,  # Set priority

                        # Utility functions
                        message_user,  # Send messages to user
                        resolve_fburl,  # Resolve internal URLs
                    ],
                ),
                # Plain text extension for regular responses
                PlainTextExtension(),
                # Thinking extension for step-by-step reasoning
                ThinkingExtension(enable_tool_use=True),
                # System info extension for context
                SystemInfoExtension(),
            ],
            # Use Claude Sonnet for good balance of speed and capability
            model=AnthropicModel.CLAUDE_3_7_SONNET,
            # Task definition contains the system prompt
            task_definition=get_task_definition(),
            # Allow up to 15 turns for complex triage operations
            max_turns=15,
        )
