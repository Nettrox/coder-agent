Architecture Decisions

Architecture Version: v0.1

Status: Active

Last Updated: 2026-07-06

⸻

Purpose

This document records the major architectural decisions made during the development of the AI Coder Agent.

Its purpose is to preserve the reasoning behind important design choices so future contributors can understand why the architecture evolved in its current direction.

This document focuses on decisions rather than implementation.

⸻

Decision Record Format

Every decision follows the same structure:

* Decision ID
* Status
* Decision
* Reason
* Alternatives Considered
* Consequences

⸻

ADR-001

Status

Accepted

Decision

Adopt a pipeline-based architecture.

Reason

Separate complex tasks into independent processing stages.

Reduce coupling.

Improve maintainability.

Allow future expansion.

Alternatives Considered

* Single AI agent
* Monolithic implementation
* Direct code generation

Consequences

Positive

* Clear architecture
* Easier debugging
* Better scalability

Negative

* More components
* More orchestration logic

⸻

ADR-002

Status

Accepted

Decision

Every AI agent has a single responsibility.

Reason

Reduce prompt complexity.

Improve predictability.

Allow independent evolution of agents.

Alternatives Considered

* Multi-purpose AI agents

Consequences

Positive

* Simpler prompts
* Easier maintenance
* Better testing

Negative

* More AI stages

⸻

ADR-003

Status

Accepted

Decision

Introduce the Knowledge Database.

Reason

Avoid repeatedly reading raw source code.

Create reusable project knowledge.

Improve retrieval quality.

Alternatives Considered

* Read source files every execution

Consequences

Positive

* Faster retrieval
* Better project understanding
* Lower token usage

Negative

* Requires knowledge generation

⸻

ADR-004

Status

Accepted

Decision

Introduce Retriever AI.

Reason

Provide only the smallest useful project context.

Alternatives Considered

* Send the whole project to Coder AI

Consequences

Positive

* Lower token usage
* Reduced hallucination
* Better focus

Negative

* Retrieval logic becomes more important

⸻

ADR-005

Status

Accepted

Decision

Introduce Context Builder AI.

Reason

Move reasoning away from Coder AI.

Prepare deterministic coding context.

Alternatives Considered

* Let Coder AI interpret everything

Consequences

Positive

* Simpler Coder AI
* Better separation of concerns
* More predictable outputs

Negative

* One additional AI stage

⸻

ADR-006

Status

Accepted

Decision

Introduce Prompt Builder.

Reason

Avoid duplicated prompt logic.

Provide shared runtime rules.

Centralize prompt construction.

Alternatives Considered

* Independent prompts per agent

Consequences

Positive

* Easier maintenance
* Shared standards
* Consistent prompts

Negative

* Requires prompt assembly

⸻

ADR-007

Status

Accepted

Decision

Use structured JSON communication between all AI agents.

Reason

Guarantee deterministic communication.

Allow automatic validation.

Simplify orchestration.

Alternatives Considered

* Natural language communication

Consequences

Positive

* Reliable pipeline
* Machine-readable outputs
* Easier debugging

Negative

* Stricter schemas required

⸻

ADR-008

Status

Accepted

Decision

Preserve Living Documentation.

Reason

Documentation should evolve together with the architecture.

Alternatives Considered

* Static documentation

Consequences

Positive

* Documentation remains accurate
* Easier onboarding
* Better long-term maintenance

Negative

* Documentation requires continuous updates

⸻

Current Status

All listed architectural decisions are currently active.

Future architecture changes should be recorded by adding new ADR entries rather than modifying previous decisions.

⸻

Future Evolution

As the system grows, this document may be replaced by a dedicated ADR directory containing one document per decision.

⸻

Related Documents

* System Architecture
* Pipeline Architecture
* AI Agents Architecture
* Knowledge Architecture
* Prompt Architecture
* Version History
* Roadmap