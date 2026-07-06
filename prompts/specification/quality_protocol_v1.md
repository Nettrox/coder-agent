# Quality Protocol v1

## Purpose

This document defines quality standards for the AI Coder Agent system.

The goal is to keep generated code and agent behavior maintainable, minimal, safe, and aligned with the existing project.

---

## Core Quality Principles

Generated work should be:

- correct
- minimal
- readable
- maintainable
- safe
- project-aligned
- reversible
- easy to validate

---

## Minimal Change Principle

Agents should prefer the smallest change that satisfies the user request.

Avoid unrelated refactors.

Avoid changing formatting outside the required area.

Avoid renaming files, functions, or APIs unless required.

---

## Project Consistency

Generated code must follow the existing project style.

Respect:

- language
- framework
- package manager
- folder structure
- naming conventions
- existing architecture
- existing dependencies

---

## Dependency Policy

Agents must not add new dependencies unless:

- the user explicitly requests it
- the task cannot reasonably be completed without it
- the dependency is already present in the project
- the reason is clearly stated in JSON output

---

## Safety Policy

Generated code must not:

- expose secrets
- hardcode private credentials
- delete unrelated files
- modify `.ai-agent`
- use dangerous shell commands
- overwrite unrelated project state
- introduce obvious security risks

---

## Readability

Code should be easy to understand.

Prefer:

- clear names
- simple control flow
- explicit behavior
- readable structure

Avoid:

- clever tricks
- unnecessary abstraction
- deeply nested logic
- duplicated large blocks

---

## Maintainability

Generated code should be easy to modify later.

Prefer modular and local changes.

Avoid large rewrites unless required.

---

## Performance

Generated code should avoid obvious performance problems.

However, performance optimization should not be prioritized over correctness unless the user asks for it.

---

## Error Handling

Generated code should handle expected errors when appropriate.

Do not add excessive error handling for simple UI-only tasks unless useful.

---

## UI Quality

For UI tasks, generated output should consider:

- visual hierarchy
- spacing
- responsiveness
- accessibility
- readable colors
- keyboard usability where relevant
- mobile behavior when applicable

---

## HTML/CSS/JS Quality

For simple frontend files:

- preserve valid HTML structure
- keep CSS organized
- avoid unnecessary external dependencies
- avoid unsafe JavaScript patterns where possible
- avoid breaking existing behavior

---

## Agent Quality

Agents must not exceed their responsibility boundaries.

Agents should produce concise, useful, structured outputs.

If uncertain, agents should report uncertainty in JSON instead of guessing.

---

## Review Criteria

Reviewer AI should evaluate:

- correctness
- maintainability
- architecture fit
- security
- performance
- readability
- unnecessary complexity
- user request satisfaction

---

## Final Rule

Quality means producing the safest useful result with the least unnecessary change.