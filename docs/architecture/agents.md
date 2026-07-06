AI Agents Architecture

Architecture Version: v0.1

Status: Active

Last Updated: 2026-07-06

⸻

Purpose

This document defines the AI agents that make up the AI Coder Agent pipeline.

Each agent has a single responsibility and communicates only through structured JSON.

The purpose of this document is to describe the role, responsibility, inputs, outputs, and lifecycle of every AI agent.

⸻

Overview

The AI Coder Agent architecture is built around specialized AI agents.

Rather than relying on one large prompt, the system distributes responsibilities across multiple focused agents.

Each agent:

* Performs one responsibility.
* Receives structured input.
* Produces structured output.
* Never modifies project files directly.
* Never depends on hidden state.

⸻

Core Principles

Single Responsibility

Every AI agent owns exactly one responsibility.

No responsibility should be duplicated.

⸻

Structured Communication

Agents communicate only through predefined JSON schemas.

Natural language is used only inside prompts and documentation.

⸻

Independent Execution

Agents are independent.

They receive all required information through explicit inputs.

⸻

Predictable Behavior

Agents should produce deterministic outputs whenever possible.

⸻

Extensible Design

New AI agents can be introduced without redesigning the pipeline.

⸻

Active Agents

Agent	Responsibility	Status
Planner AI	Build implementation plan	Active
Retriever AI	Retrieve minimal project context	Active
Context Builder AI	Build optimized coding context	Active
Coder AI	Generate implementation changes	Active
Validator AI	Validate implementation output	Active
Fixer AI	Repair validation issues	Active

⸻

Planned Agents

Agent	Responsibility	Status
Writer AI	Apply validated file operations	Planned
Reviewer AI	Review implementation quality	Planned
Session Manager AI	Manage long-term sessions	Planned
Summarizer AI	Summarize project knowledge	Planned
Naming Checker AI	Validate naming consistency	Planned
Commit Message AI	Generate commit messages	Planned
Title Generator AI	Generate concise task titles	Planned

⸻

Agent Lifecycle

Each AI agent follows the same execution lifecycle.

Receive Input
      ↓
Validate Input
      ↓
Execute Responsibility
      ↓
Generate Structured JSON
      ↓
Self Validation
      ↓
Return Output

⸻

Agent Responsibilities

Planner AI

Transforms the user request into an implementation strategy.

Produces:

* implementation plan
* affected files
* execution steps

⸻

Retriever AI

Finds the minimum project context required.

Produces:

* selected files
* selected symbols
* retrieval notes

⸻

Context Builder AI

Combines planning, retrieval, and project context into a deterministic coding context.

Produces:

* coder_context

⸻

Coder AI

Generates implementation changes.

Produces:

* files_changed

⸻

Validator AI

Validates generated implementation.

Produces:

* validation report
* safety report
* needs_fixer

⸻

Fixer AI

Repairs only validation issues.

Produces:

* corrected_files_changed

⸻

Communication Model

Every agent communicates using structured JSON.

No agent communicates directly with another agent.

Instead, outputs are passed through the pipeline orchestrator.

Agent A
    ↓
JSON
    ↓
Pipeline
    ↓
Agent B

⸻

Prompt Architecture

Each AI agent receives its runtime prompt from the Prompt Builder.

Prompt composition:

Shared Rules
      ↓
Agent Definition
      ↓
Runtime Context
      ↓
User Request
      ↓
Final Prompt

⸻

Current Status

Active

* Planner AI
* Retriever AI
* Context Builder AI
* Coder AI
* Validator AI
* Fixer AI

Planned

* Writer AI
* Reviewer AI
* Session Manager AI
* Summarizer AI
* Naming Checker AI
* Commit Message AI
* Title Generator AI

⸻

Future Evolution

Future versions may introduce:

* Parallel AI execution
* Dynamic agent routing
* Specialized language agents
* Autonomous planning agents
* Documentation agents
* Testing agents
* Security analysis agents

The architecture is designed so new agents can be added without changing existing agent responsibilities.

⸻

Related Documents

* System Architecture
* Pipeline Architecture
* Knowledge Architecture
* Prompt Architecture
* Architecture Decisions
* Roadmap