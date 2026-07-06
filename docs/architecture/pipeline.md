AI Pipeline Architecture

Architecture Version: v0.1

Status: Active

Last Updated: 2026-07-06

⸻

Purpose

This document describes how requests move through the AI Coder Agent pipeline.

It explains the responsibilities of each stage, the data exchanged between stages, and the overall execution flow.

Unlike individual module documentation, this document focuses on the orchestration of the complete AI pipeline.

⸻

Overview

The AI Coder Agent follows a sequential pipeline architecture.

Each stage has a single responsibility and communicates only through structured JSON.

No stage directly modifies project files.

Each stage produces structured output that becomes the input of the next stage.

⸻

Core Principles

Sequential Processing

The pipeline executes one stage at a time.

Each stage completes before the next stage begins.

⸻

Structured Communication

Every stage exchanges information using predefined JSON schemas.

This guarantees deterministic communication between agents.

⸻

Minimal Context

Each stage receives only the information required for its responsibility.

Unnecessary project information should never be propagated.

⸻

Independent Agents

Every AI agent operates independently.

Agents do not share hidden state.

All required context must be explicitly provided.

⸻

Validation Before Application

Generated implementations must always pass validation before they are applied to the project.

⸻

Pipeline Stages

Stage 1 — Project Scanner

Responsibilities:

* Scan the project directory.
* Detect languages.
* Detect frameworks.
* Detect configurations.
* Detect entry points.
* Generate project reports.

Output:

* Project reports
* Project index

⸻

Stage 2 — Knowledge Processor

Responsibilities:

* Read project files.
* Extract symbols.
* Generate metadata.
* Build the knowledge database.

Output:

* Knowledge database
* File metadata
* Symbol indexes

⸻

Stage 3 — Planner AI

Responsibilities:

* Understand the user request.
* Determine implementation strategy.
* Identify affected areas.

Output:

* Implementation plan

⸻

Stage 4 — Retriever AI

Responsibilities:

* Select the smallest relevant project context.
* Identify required source files.
* Identify related symbols.

Output:

* Retrieved file list
* Selected symbols

⸻

Stage 5 — Context Builder AI

Responsibilities:

* Combine planner decisions.
* Combine retrieved files.
* Build the optimized coding context.

Output:

* Coder context

⸻

Stage 6 — Coder AI

Responsibilities:

* Generate implementation changes.
* Produce complete modified files.
* Return structured file operations.

Output:

* files_changed

⸻

Stage 7 — Validator AI

Responsibilities:

* Validate implementation.
* Verify schema.
* Verify safety.
* Verify project constraints.

Output:

* Validation report

⸻

Stage 8 — Fixer AI (Optional)

Responsibilities:

* Repair validation issues.
* Preserve original implementation.
* Produce corrected file operations.

Output:

* corrected_files_changed

⸻

Planned Stage — Writer Engine

Responsibilities:

* Apply validated file operations.
* Write files.
* Generate backups.
* Produce change reports.

Output:

* Updated project

⸻

Pipeline Flow

User Request
      │
      ▼
Project Scanner
      │
      ▼
Knowledge Processor
      │
      ▼
Planner AI
      │
      ▼
Retriever AI
      │
      ▼
Context Builder AI
      │
      ▼
Coder AI
      │
      ▼
Validator AI
      │
      ▼
Fixer AI (Optional)
      │
      ▼
Writer Engine (Planned)
      │
      ▼
Updated Project

⸻

Data Exchange

Each stage communicates using structured JSON.

Typical flow:

Request
    ↓
Plan
    ↓
Retrieved Context
    ↓
Coder Context
    ↓
File Operations
    ↓
Validation Report
    ↓
Corrected File Operations

No stage should depend on hidden memory.

⸻

Error Handling

If a stage fails:

1. Stop downstream execution.
2. Return structured error information.
3. Preserve all previous outputs.
4. Log execution details.

Validation failures may invoke Fixer AI before continuing.

⸻

Current Status

Implemented

* Scanner
* Knowledge Processor
* Planner AI
* Retriever AI
* Context Builder AI
* Coder AI
* Validator AI
* Fixer AI

Planned

* Writer Engine
* Backup Engine
* Parallel Execution
* Autonomous Planning

⸻

Future Evolution

Future pipeline improvements may include:

* Parallel retrieval
* Multi-agent collaboration
* Incremental project updates
* Memory-aware planning
* Continuous documentation updates
* Distributed execution

⸻

Related Documents

* System Architecture
* Agents Architecture
* Knowledge Architecture
* Prompt Architecture
* Architecture Decisions
* Current Roadmap