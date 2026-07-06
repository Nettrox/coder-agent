Reader Module

Module Version: v0.1

Status: Active

Last Updated: 2026-07-06

⸻

Purpose

The Reader module is responsible for reading project files and converting them into a normalized representation.

It provides a consistent interface for accessing source code regardless of file type, encoding, or platform.

The Reader never performs semantic analysis.

It only reads and normalizes project data.

⸻

Responsibilities

The Reader module must:

* Read source files.
* Detect supported encodings.
* Normalize file contents.
* Calculate file hashes.
* Generate file metadata.
* Create file workspaces.
* Skip unsupported files.
* Preserve original source content.

The Reader must not:

* Parse source code.
* Analyze project structure.
* Generate knowledge.
* Modify files.
* Make architectural decisions.

⸻

Inputs

Input	Description
Project Path	Root project directory
Relative File Path	File to read

⸻

Outputs

Output	Description
Source Content	Normalized file content
Metadata	File metadata
Hash	File fingerprint
Workspace	File workspace

⸻

Workflow

Project File
      │
      ▼
Read
      │
      ▼
Normalize
      │
      ▼
Hash
      │
      ▼
Metadata
      │
      ▼
Workspace

⸻

Public API

Function	Responsibility
indexProjectFiles()	Index project source files.
readFile()	Read a source file.
calculateHash()	Generate content hash.
createFileWorkspace()	Create knowledge workspace.
shouldReadFile()	Determine whether a file should be processed.
generateFileMetadata()	Generate structured metadata.
generateFileMetadataMarkdown()	Generate human-readable metadata.

⸻

Generated Files

The Reader produces data inside:

.ai-agent/knowledge/files/

Typical generated artifacts:

* source copies
* metadata
* metadata markdown
* workspace structure

⸻

Consumed By

Reader output is consumed by:

* Knowledge Processor
* Retriever AI
* Context Builder AI

⸻

Produced Data

The Reader produces:

* normalized source
* metadata
* hashes
* workspace structure

This information becomes the input of the Knowledge Processor.

⸻

Constraints

The Reader:

* must never modify project files
* must preserve original source
* must be deterministic
* must support large files
* must support future language extensions

⸻

Future Improvements

Planned improvements include:

* Binary file support
* Encoding auto-detection improvements
* Incremental reading
* Parallel reading
* Cached file reading
* Large project optimization

⸻

Related Modules

* Scanner Module
* Knowledge Processor Module
* Knowledge Architecture
* Pipeline Architecture
* System Architecture