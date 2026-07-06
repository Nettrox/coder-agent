# Changelog

All notable changes to this project will be documented in this file.

The format is inspired by **Keep a Changelog**, and this project follows a milestone-based development approach.

---

# [0.1.0] - Foundation Release

## Overview

This release establishes the core architecture of the AI Coder Agent.

The project is no longer a simple AI chat wrapper. It now includes a modular architecture capable of scanning projects, building a local knowledge database, processing source files, maintaining independent AI sessions, and preparing structured context for future AI agents.

This release focuses entirely on infrastructure and long-term maintainability.

---

## Added

### AI Agent Workspace

- Introduced `.ai-agent` project workspace.
- Automatic workspace creation.
- Standardized directory layout.
- Centralized configuration through `aiAgentConfig.js`.

Workspace includes:

- project
- knowledge
- sessions
- outputs
- logs
- memory
- cache
- backups

---

### Agent Infrastructure

- Independent AI sessions for every agent.
- Shared agent execution pipeline.
- Prompt loading system.
- JSON-only communication.
- Markdown and JSON output generation.
- Session persistence.
- Logging system.
- Agent orchestrator.

Current supported agents:

- Planner
- Coder
- Validator
- Fixer

---

### Orchestrator

Implemented modular execution pipeline.

Flow:

```
User Request
      │
      ▼
 Planner
      ▼
  Coder
      ▼
Validator
      ▼
 Fixer (if needed)
```

The orchestrator is designed to support future agents without changing the application entry point.

---

### Shared Agent Context

Introduced `buildAgentContext()`.

Provides a centralized context shared by all AI agents.

Includes:

- User request
- Project information
- Project reports
- Knowledge information
- Future extensibility

This removes duplicated payload construction across agents.

---

### Project Scanner

Implemented automatic project inspection.

Generated reports include:

- Tree
- Languages
- Frameworks
- Statistics
- Dependencies
- Configurations
- Entrypoints
- Ignore Rules
- Project Index

Reports are generated in both JSON and Markdown formats.

---

### Reader System

Implemented source reader.

Features:

- File discovery
- File filtering
- SHA256 hashing
- Metadata generation
- Workspace generation
- Source snapshot generation

Every discovered file receives its own workspace inside:

```
.ai-agent/knowledge/files/
```

---

### Knowledge Base

Introduced local knowledge database.

Every indexed file now contains:

```
metadata.json
metadata.md
source.*
chunks/
ast/
graph/
embeddings/
versions/
```

This establishes the foundation for future semantic retrieval.

---

### Knowledge Processor

Implemented deterministic source processing.

Currently extracts:

- Imports
- Exports
- Functions
- Classes
- HTML signals

Metadata is automatically updated after processing.

---

### Knowledge Database

Introduced structured knowledge indexes.

Knowledge categories currently include:

- Files
- Functions
- Classes
- Imports
- Exports
- HTML

Each category generates:

```
index.json
index.md
```

Each detected entity receives its own workspace.

Example:

```
knowledge/functions/calculate/
knowledge/functions/appendValue/
knowledge/html/index.html/
```

---

### HTML Analysis

Implemented HTML signal extraction.

Collected information includes:

- Page title
- HTML ids
- CSS classes
- Buttons
- Embedded scripts
- Embedded styles

---

### Markdown Documentation

Every generated artifact now produces both:

- JSON
- Markdown

This makes debugging and inspection significantly easier.

---

### Testing

Introduced internal testing utilities.

Current test modules:

- Reader
- Knowledge

These provide fast validation before integration into the main pipeline.

---

## Architecture Improvements

- Introduced layered architecture.
- Centralized AI configuration.
- Eliminated hardcoded workspace paths.
- Standardized project reports.
- Standardized knowledge storage.
- Modularized execution pipeline.
- Improved separation of responsibilities.
- Added extensible knowledge database structure.

---

## Current Capabilities

The project can currently:

- Scan an existing project.
- Detect project structure.
- Read project files.
- Generate metadata.
- Create source snapshots.
- Build a local knowledge database.
- Extract structural information.
- Execute multiple AI agents using independent sessions.
- Produce structured JSON outputs.
- Produce human-readable Markdown reports.

---

## Planned For Next Release

### Retrieval Layer

- Retriever AI
- Context Builder AI
- Intelligent file selection
- Token-aware context generation

### Code Generation

- Apply generated code to real project files
- Safe file modification
- Automatic backup creation
- Diff generation

### Validation

- Real project validation
- Build execution
- Test execution
- Automatic retry

### Knowledge Database

- Symbol database
- Function relationship graph
- Class relationship graph
- Call graph
- Import graph
- Architecture graph
- Dependency graph

### AI Features

- Reviewer AI
- Summarizer AI
- Session Manager AI
- Commit Message AI
- Naming Checker AI
- Title Generator AI

### Future Features

- Embedding generation
- Semantic search
- Vector retrieval
- Cross-file reasoning
- Automatic documentation generation

---

## Notes

Version **0.1.0** marks the completion of the foundational architecture of the AI Coder Agent.

The next development milestone focuses on transforming the current file-based knowledge into a semantic knowledge database, allowing the AI to understand projects instead of only reading files.

This foundation has been designed with scalability, modularity, maintainability, and future autonomous coding capabilities in mind.