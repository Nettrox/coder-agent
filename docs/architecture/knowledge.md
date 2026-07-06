Knowledge Architecture

Architecture Version: v0.1

Status: Active

Last Updated: 2026-07-06

⸻

Purpose

This document describes the Knowledge Database architecture used by the AI Coder Agent.

The Knowledge Database is responsible for transforming raw project files into structured, searchable project knowledge.

Instead of repeatedly reading source code, AI agents consume structured knowledge whenever possible.

⸻

Overview

The Knowledge Database is a persistent representation of the project.

Its purpose is to reduce repeated file analysis, improve retrieval accuracy, and provide deterministic project understanding.

Knowledge is generated automatically after project scanning and is continuously updated as the project evolves.

The Knowledge Database does not replace source files.

Instead, it describes them.

⸻

Core Principles

Knowledge First

AI agents should use structured project knowledge before reading raw source files.

⸻

Source of Truth

Source code remains the ultimate source of truth.

Knowledge is a structured representation of that source code.

⸻

Incremental Updates

Only changed files should be reprocessed.

Previously generated knowledge should be reused whenever possible.

⸻

Deterministic Processing

The same project state should always generate equivalent knowledge.

⸻

Extensible Design

New knowledge types should be added without affecting existing indexes.

⸻

Knowledge Structure

The knowledge database is stored inside:

.ai-agent/
└── knowledge/

Each subdirectory represents a different type of project knowledge.

Current structure:

knowledge/
│
├── files/
├── functions/
├── classes/
├── routes/
├── api/
├── database/
├── symbols/
├── architecture/
├── html/
│
├── files-index.md
├── processor-report.md
└── processor-report.json

Future versions may introduce additional indexes as new languages and frameworks are supported.

⸻

Knowledge Generation Pipeline

Knowledge is generated through a dedicated processing pipeline.

Project Files
      │
      ▼
Reader
      │
      ▼
Metadata Extraction
      │
      ▼
Language Processors
      │
      ▼
Knowledge Processor
      │
      ▼
Knowledge Database

⸻

Knowledge Categories

File Knowledge

Stores information about every indexed source file.

Examples:

* metadata
* hash
* language
* encoding
* timestamps
* status
* summary

⸻

Function Knowledge

Stores discovered functions.

Examples:

* function name
* file
* language
* occurrences

⸻

Class Knowledge

Stores discovered classes.

Examples:

* class name
* file
* inheritance
* methods

⸻

HTML Knowledge

Stores HTML-specific information.

Examples:

* title
* ids
* classes
* buttons
* forms
* scripts
* styles

⸻

Symbol Knowledge

Provides a searchable symbol index.

Examples:

* functions
* classes
* exports
* imports
* routes

⸻

Future Knowledge Types

Planned knowledge categories include:

* CSS
* JavaScript AST
* TypeScript
* React Components
* Vue Components
* Database Models
* API Endpoints
* Dependency Graph
* Call Graph
* Semantic Embeddings

⸻

Knowledge Lifecycle

Every knowledge entry follows the same lifecycle.

Source File
      │
      ▼
Read
      │
      ▼
Parse
      │
      ▼
Extract Metadata
      │
      ▼
Generate Knowledge
      │
      ▼
Store
      │
      ▼
Reuse

⸻

Knowledge Consumers

The following components use the Knowledge Database:

Component	Usage
Planner AI	Project understanding
Retriever AI	File selection
Context Builder AI	Context construction
Coder AI	Supplemental project information
Validator AI	Project validation
Reviewer AI (Planned)	Quality review

⸻

Current Status

Implemented

* File metadata
* File indexing
* Function index
* Class index
* HTML index
* Symbol index
* Processor reports

Planned

* AST indexes
* Dependency graph
* Semantic embeddings
* Cross-file references
* Incremental re-indexing
* Knowledge caching improvements

⸻

Future Evolution

The Knowledge Database is expected to become the central intelligence layer of the AI Coder Agent.

Future versions may support:

* semantic retrieval
* vector search
* project memory
* cross-project knowledge
* architecture reasoning
* automatic documentation generation

⸻

Related Documents

* System Architecture
* Pipeline Architecture
* AI Agents Architecture
* Prompt Architecture
* Reader Module
* Knowledge Processor Module
* Retriever Module
* Context Builder Module
* Roadmap