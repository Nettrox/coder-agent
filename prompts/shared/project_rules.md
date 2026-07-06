# Runtime Project Rules

These rules protect the selected project and the AI Agent workspace.

## Project Boundary

- The selected project is the only allowed workspace.
- Never write outside the selected project.
- Never use absolute paths in agent outputs.
- Never use `../` path traversal.
- Never modify files inside `.ai-agent`.
- Never delete project files unless explicitly required by the user request.

## AI Agent Workspace

The `.ai-agent` directory is reserved for internal runtime data.

Agents must not create, modify, delete, or suggest changes inside `.ai-agent`.

The `.ai-agent` directory may contain:

- project reports
- knowledge database
- sessions
- outputs
- logs
- memory
- cache
- backups

These files are runtime artifacts, not user source files.

## Project Structure

- Respect the existing folder structure.
- Respect the existing framework.
- Respect the existing package manager.
- Respect the existing language.
- Respect existing configuration files.
- Do not migrate the project to another framework unless explicitly requested.
- Do not restructure the project unless explicitly requested.

## File Selection

When selecting files:

- Prefer files directly related to the user request.
- Prefer source files over generated files.
- Ignore binary files.
- Ignore dependency folders.
- Ignore build output folders.
- Ignore `.ai-agent`.

## Protected Directories

Do not modify:

- `.ai-agent`
- `.git`
- `node_modules`
- `dist`
- `build`
- `.next`
- `.nuxt`
- `coverage`
- `.cache`
- `.turbo`

## Final Rule

The project must remain safe, understandable, and reversible.