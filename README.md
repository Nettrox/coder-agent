# AI Agent Workflow

## Overview

This project is built around a multi-agent architecture. Each AI agent has a single responsibility and communicates with the next agent using structured JSON responses.

The primary goal is to create a predictable, modular, and scalable coding workflow where every agent performs one task only.

---

# Workflow

```text
                    User Request
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
                    │        │
              Valid │        │ Invalid
                    ▼        ▼
              Reviewer AI  Fixer AI
                    │        │
                    │        └──────────────┐
                    ▼                       │
             Summarizer AI                  │
                    │                       │
                    ▼                       │
            Session Manager AI ◄───────────┘
                    │
                    ▼
        Commit Message Generator
                    │
                    ▼
          Session Title Generator
                    │
                    ▼
          Naming Consistency Check
                    │
                    ▼
                 Final Output
```

---

# Shared Rules

Every AI agent automatically receives the shared prompt files before executing.

```
shared/
├── json_rules.md
├── coding_rules.md
├── project_rules.md
├── response_rules.md
└── quality_rules.md
```

These shared prompts guarantee:

* Valid JSON responses
* Consistent coding style
* Respect for project architecture
* Standard response structure
* High-quality implementations

---

# Agent Responsibilities

---

## Planner AI

### Purpose

Understand the user's request and generate an implementation plan.

### Responsibilities

* Analyze the request.
* Determine the project goal.
* Decide which files will be affected.
* Break the work into implementation steps.
* Detect risks.
* Detect missing context.

### Does NOT

* Write code.
* Modify files.
* Generate patches.

### Output

* Goal
* Tasks
* Required files
* Dependencies
* Risks

---

## Retriever AI

### Purpose

Locate the minimum amount of project context required.

### Responsibilities

* Find relevant files.
* Locate functions.
* Locate classes.
* Locate routes.
* Locate dependencies.
* Return only necessary context.

### Does NOT

* Write code.
* Change files.
* Create plans.

### Output

* Selected files
* Selected symbols
* Missing context

---

## Context Builder AI

### Purpose

Prepare a clean context package for the coding model.

### Responsibilities

Combine:

* User request
* Planner output
* Retrieved files
* Session memory
* Project rules

into one optimized context.

### Does NOT

* Write implementation code.
* Change project logic.

### Output

* Optimized coding context

---

## Coder AI

### Purpose

Implement the requested feature.

### Responsibilities

* Write code.
* Modify existing files.
* Create new files if requested.
* Produce patches.
* Follow project style.

### Does NOT

* Change the original plan.
* Refactor unrelated code.
* Add unnecessary dependencies.

### Output

* Modified files
* New files
* Patches
* Summary

---

## Validator AI

### Purpose

Verify that generated code is correct.

### Responsibilities

Check:

* Syntax
* Imports
* References
* Type errors
* Lint issues
* Missing implementations
* Invalid JSON
* Runtime risks

### Does NOT

* Modify code.
* Rewrite implementations.

### Output

* Validation status
* Errors
* Warnings

---

## Fixer AI

### Purpose

Repair only the issues reported by Validator.

### Responsibilities

* Fix syntax errors.
* Fix missing imports.
* Fix broken references.
* Fix implementation mistakes.

### Does NOT

* Add features.
* Refactor code.
* Change project behavior.

### Output

* Fixed files
* Remaining issues

---

## Reviewer AI

### Purpose

Perform a quality review before completion.

### Responsibilities

Evaluate:

* Readability
* Maintainability
* Architecture
* Performance
* Security
* Code cleanliness

### Does NOT

* Modify code.
* Generate patches.

### Output

* Review score
* Suggestions
* Approval status

---

## Summarizer AI

### Purpose

Generate a concise summary of the completed work.

### Responsibilities

Summarize:

* User goal
* Completed work
* Modified files
* Decisions made
* Remaining tasks

### Output

* Session summary

---

## Session Manager AI

### Purpose

Maintain long-term project memory.

### Responsibilities

Store:

* Current goal
* Completed tasks
* Pending tasks
* Changed files
* Important decisions
* Known issues

### Output

* Updated session memory

---

## Commit Message Generator

### Purpose

Generate a Git commit message.

### Responsibilities

Produce a Conventional Commit message.

Example:

```
feat(auth): add remember me support
```

### Output

* Commit type
* Scope
* Message

---

## Title Generator

### Purpose

Generate a short session title.

Examples

```
Add Remember Me

Fix Login Validation

Refactor Payment Module
```

### Output

* Session title

---

## Naming Checker

### Purpose

Ensure naming consistency across the project.

### Responsibilities

Review:

* Variables
* Functions
* Classes
* Files
* Folders
* Constants
* Routes

### Output

* Naming issues
* Suggested improvements

---

# Communication Rules

Every agent communicates using JSON only.

```
Agent A
      │
      ▼
Valid JSON
      │
      ▼
Agent B
```

No markdown.

No explanations.

No code blocks.

No free-form text.

Every response must follow the predefined JSON schema.

---

# Design Principles

* One agent = one responsibility.
* Every response must be machine-readable.
* Every step must be deterministic.
* Context should be minimal.
* Agents must never invent unavailable information.
* Only the required files should be processed.
* Shared rules are automatically applied to every agent.
* All outputs must be compatible with the next agent.
* The system must be scalable and easy to extend with new agents.

---

# Final Execution Pipeline

```text
User Request
      │
      ▼
Planner
      │
      ▼
Retriever
      │
      ▼
Context Builder
      │
      ▼
Coder
      │
      ▼
Validator
      │
 ┌────┴────┐
 │         │
 ▼         ▼
Review   Fix
 │         │
 └────┬────┘
      ▼
Summarizer
      ▼
Session Manager
      ▼
Commit Generator
      ▼
Title Generator
      ▼
Naming Checker
      ▼
Completed Session
```

This architecture ensures that every AI agent performs a single well-defined responsibility while producing deterministic, structured, and reliable outputs that can be consumed automatically by the next stage of the workflow.
