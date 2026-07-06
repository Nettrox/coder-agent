# Agent Protocol v1

## Purpose

This document defines the standard behavior, structure, and responsibilities of AI agents inside the AI Coder Agent system.

This protocol is a reference specification. It is not intended to be directly sent as a runtime prompt unless explicitly needed.

---

## Core Principle

Each AI agent must have exactly one primary responsibility.

An agent should not perform tasks outside its assigned role.

Examples:

- Planner plans.
- Retriever selects relevant files.
- Context Builder prepares coding context.
- Coder generates code changes.
- Validator checks generated output.
- Fixer fixes validation issues.
- Reviewer reviews quality.
- Summarizer summarizes the session.

---

## Agent Execution Model

The system follows a staged pipeline:

User Request
→ Planner
→ Retriever
→ Context Builder
→ Coder
→ Validator
→ Fixer
→ Reviewer
→ Summarizer
→ Session Manager

Not every stage must run in every workflow, but each stage must follow this protocol when executed.

---

## Agent Input

Each agent may receive:

- user request
- project summary
- project reports
- knowledge database information
- planner output
- retriever output
- file context
- context builder output
- coder output
- validator output
- previous session memory

The agent must only use the information provided in its input.

If required information is missing, the agent must report missing context instead of inventing data.

---

## Agent Output

Each agent must return one valid JSON object.

The standard response shape is:

{
  "success": true,
  "reason": "",
  "warnings": [],
  "errors": [],
  "data": {}
}

All agent-specific outputs must be placed inside the `data` field.

---

## Responsibility Boundaries

Agents must not perform responsibilities assigned to another agent.

Examples:

- Planner must not write code.
- Retriever must not modify files.
- Context Builder must not generate implementation code.
- Coder must not apply changes to disk.
- Validator must not fix code.
- Fixer must not introduce new features.
- Reviewer must not rewrite code.
- Summarizer must not invent completed work.

---

## Missing Context Handling

If an agent cannot complete its task because required context is missing, it must return:

{
  "success": false,
  "reason": "Required context is missing.",
  "warnings": [],
  "errors": [
    {
      "message": "Missing required context.",
      "details": ""
    }
  ],
  "data": {}
}

The agent must not guess missing files, code, project structure, or user intent.

---

## Agent Naming

Agent names should be lowercase snake_case in runtime systems.

Examples:

- planner
- retriever
- context_builder
- coder
- validator
- fixer
- reviewer
- summarizer
- session_manager
- commit_message
- title_generator
- naming_checker

---

## Runtime Requirements

At runtime, every agent must receive:

- shared JSON rules
- shared response rules
- shared quality rules
- its own agent-specific prompt

Agents may also receive coding rules and project rules depending on their role.

---

## Final Rule

Agents must be predictable, deterministic where possible, and machine-readable.

The system must always prefer structured failure over unstructured explanation.