Scanner Module

Module Version: v0.1

Status: Active

Last Updated: 2026-07-06

⸻

Purpose

The Scanner module is responsible for discovering and analyzing the project structure.

It performs the initial inspection of the selected project and generates the metadata required by downstream modules.

The Scanner never reads file contents for semantic analysis.

Its responsibility is limited to project discovery and structural analysis.

⸻

Responsibilities

The Scanner module must:

* Discover project files.
* Discover project directories.
* Detect supported programming languages.
* Detect supported frameworks.
* Detect package managers.
* Detect entry points.
* Detect configuration files.
* Detect ignore rules.
* Generate project reports.
* Generate the project index.

The Scanner must not:

* Parse source code.
* Modify project files.
* Generate implementation code.
* Produce knowledge indexes.

⸻

Inputs

Input	Description
Project Path	Root directory of the selected project.

⸻

Outputs

Output	Description
Project Index	Structured representation of the project.
Project Reports	Generated project analysis reports.

⸻

Workflow

Project Path
      │
      ▼
Scan Files
      │
      ▼
Scan Directories
      │
      ▼
Detect Languages
      │
      ▼
Detect Frameworks
      │
      ▼
Detect Entry Points
      │
      ▼
Generate Reports
      │
      ▼
Project Index

⸻

Public API

Function	Responsibility
scanProject()	Execute the complete project scanning pipeline.
scanFiles()	Discover project files.
scanFolders()	Discover project directories.
detectLanguage()	Detect project languages.
detectFramework()	Detect project frameworks.
detectPackageManager()	Detect package managers.
detectEntryPoints()	Detect application entry points.
detectGit()	Detect Git repository information.
detectConfigs()	Detect configuration files.
detectIgnoreRules()	Detect ignore patterns.

⸻

Generated Files

The Scanner produces project reports inside:

.ai-agent/project/

Typical outputs include:

* tree
* languages
* frameworks
* dependencies
* statistics
* entrypoints
* configs
* index

⸻

Consumed By

The Scanner output is consumed by:

* Reader
* Knowledge Processor
* Planner AI
* Retriever AI
* Context Builder AI

⸻

Produced Data

The Scanner generates:

* Project Index
* Project Reports
* Structural Metadata

This data serves as the foundation for the remaining pipeline.

⸻

Constraints

The Scanner:

* must never modify project files
* must be deterministic
* must ignore excluded paths
* must support incremental rescans in future versions

⸻

Future Improvements

Planned improvements include:

* Incremental scanning
* Parallel directory traversal
* Cached scan results
* Plugin-based language detection
* Performance metrics

⸻

Related Modules

* Reader Module
* Knowledge Processor Module
* Pipeline Architecture
* Knowledge Architecture
* System Architecture