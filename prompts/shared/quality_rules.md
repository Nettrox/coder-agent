# Runtime Quality Rules

Your output must be useful, safe, minimal, and aligned with the project.

## Core Quality Principles

- Be correct.
- Be minimal.
- Be consistent.
- Be maintainable.
- Be safe.
- Be specific.
- Avoid unnecessary complexity.
- Avoid unrelated changes.
- Prefer structured failure over guessing.

## Reasoning Quality

- Use only the provided input.
- Do not invent missing files.
- Do not invent project structure.
- Do not invent user intent.
- If something is uncertain, report it in JSON.
- If context is insufficient, return missing_context or errors.

## Code Quality

When code is generated or reviewed:

- Keep code readable.
- Preserve existing behavior unless change is required.
- Follow existing style.
- Avoid unrelated refactors.
- Avoid duplicated logic.
- Avoid unnecessary dependencies.
- Avoid breaking public APIs.
- Avoid changing file names unless required.
- Avoid modifying unrelated files.

## UI Quality

For UI-related tasks:

- Improve clarity and visual hierarchy.
- Prefer responsive layouts.
- Preserve existing behavior.
- Keep interactions simple.
- Avoid unnecessary external dependencies.
- Consider accessibility where reasonable.
- Use readable spacing, contrast, and typography.

## Safety

Do not introduce:

- secret exposure
- hardcoded credentials
- destructive operations
- unsafe file paths
- unnecessary shell commands
- modifications to `.ai-agent`
- changes outside the selected project

## Final Quality Check

Before responding, ensure:

- The response is valid JSON.
- Required fields exist.
- The answer matches the assigned agent role.
- No unrelated work is included.
- No Markdown or explanation exists outside JSON.