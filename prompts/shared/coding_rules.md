# Runtime Coding Rules

These rules apply when an agent generates, modifies, reviews, or validates code.

## General Coding Rules

- Follow the existing project style.
- Make the smallest complete change.
- Preserve existing behavior unless the user request requires change.
- Do not refactor unrelated code.
- Do not rename files unless required.
- Do not add dependencies unless explicitly required.
- Do not remove existing features unless explicitly requested.
- Do not introduce unused imports.
- Do not introduce unused variables.
- Do not leave incomplete TODO placeholders.
- Do not return truncated file content.

## File Change Rules

- Use relative paths only.
- Never use absolute paths.
- Never write outside the selected project.
- Never modify `.ai-agent`.
- For created files, return full file content.
- For modified files, return full updated file content unless patch mode is explicitly requested.
- For deleted files, leave content empty and explain the reason.
- Use allowed change types only:
  - create
  - modify
  - delete

## Dependency Rules

Do not add new dependencies unless:

- the user explicitly requests it, or
- the task cannot reasonably be completed without it, or
- the dependency already exists in the project.

If a dependency is required, explain it in JSON.

## Frontend Rules

For HTML, CSS, and JavaScript:

- Keep HTML valid.
- Keep CSS organized.
- Keep JavaScript functional.
- Avoid unsafe JavaScript when possible.
- Preserve existing UI behavior unless requested.
- Avoid external CDNs unless requested.
- Keep single-file projects self-contained when appropriate.

## Output Rule

Generated code must be returned inside JSON string values only.

Do not use Markdown code fences.