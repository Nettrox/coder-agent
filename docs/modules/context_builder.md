Context Builder Module

Module Version: v0.1

Status: Active

Last Updated: 2026-07-06

⸻

Purpose

The Context Builder module is responsible for transforming retrieved project information into a deterministic coding context.

It combines planning decisions, retrieved knowledge, project reports, and source files into a single optimized context for Coder AI.

The Context Builder is the primary reasoning layer of the AI Coder Agent.

⸻

Responsibilities

The Context Builder module must:

* Combine planner decisions.
* Combine retrieved files.
* Merge project knowledge.
* Remove irrelevant information.
* Preserve implementation intent.
* Produce the smallest complete coding context.
* Define implementation constraints.
* Prepare deterministic AI input.

The Context Builder must not:

* Generate implementation code.
* Modify project files.
* Retrieve additional project data.
* Validate generated code.
* Apply project changes.

⸻

Inputs

Input	Description
Planner Output	Implementation strategy
Retriever Output	Selected files and symbols
Knowledge Database	Structured project knowledge
Project Reports	Scanner-generated reports
File Context	Retrieved source files
User Request	Original request

⸻

Outputs

Output	Description
Coder Context	Optimized implementation context
Constraints	Implementation boundaries
Context Metadata	Additional runtime information

⸻

Workflow

Planner Output
        │
        ▼
Retriever Output
        │
        ▼
Knowledge Database
        │
        ▼
Merge Context
        │
        ▼
Remove Noise
        │
        ▼
Apply Constraints
        │
        ▼
Generate Coder Context

⸻

Public API

Function	Responsibility
buildContext()	Generate the complete coding context.
mergeKnowledge()	Merge knowledge sources.
reduceContext()	Remove unrelated information.
applyConstraints()	Define implementation constraints.
buildCoderContext()	Produce deterministic runtime context.

⸻

Generated Data

The Context Builder produces:

* coder_context
* implementation constraints
* selected runtime files
* execution metadata

This output becomes the primary input for Coder AI.

⸻

Consumed By

Context Builder output is consumed by:

* Coder AI

Indirectly consumed by:

* Validator AI
* Fixer AI
* Reviewer AI (Planned)

⸻

Context Building Strategy

The Context Builder follows these principles:

1. Preserve implementation intent.
2. Remove unnecessary information.
3. Minimize token usage.
4. Preserve complete required source code.
5. Produce deterministic context.
6. Never invent project information.
7. Prefer structured knowledge over assumptions.

⸻

Constraints

The Context Builder:

* must never generate implementation code
* must never modify project files
* must never retrieve additional project data
* must preserve planner intent
* must preserve retriever decisions
* must minimize context size
* must remain deterministic

⸻

Future Improvements

Planned improvements include:

* semantic context compression
* memory-aware context generation
* architecture-aware context building
* dependency-aware context assembly
* token optimization
* confidence scoring
* adaptive context generation

⸻

Related Modules

* Planner Module
* Retriever Module
* Coder Module
* Knowledge Processor Module
* Knowledge Architecture
* Prompt Architecture
* Pipeline Architecture
* System Architecture