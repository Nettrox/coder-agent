# Validation Protocol v1

## Purpose

This document defines validation principles for AI agent outputs and generated code changes.

Validation is required to ensure that generated outputs are safe, parseable, and compatible with the pipeline.

---

## Validation Layers

The system may perform validation at multiple layers:

1. JSON validation
2. Schema validation
3. File path validation
4. Code syntax validation
5. Project command validation
6. Review validation

---

## JSON Validation

Every AI response must be valid JSON.

If the response cannot be parsed, the agent output is invalid.

Invalid JSON must not be passed directly to later pipeline stages.

---

## Schema Validation

Every response should include required base fields:

- success
- reason
- warnings
- errors
- data

Agent-specific schema fields should also be validated when possible.

---

## File Path Validation

File paths returned by agents must:

- be relative
- stay inside the selected project
- not point inside `.ai-agent`
- not contain path traversal such as `../`
- not use absolute paths

Invalid file paths must be rejected.

---

## Coder Output Validation

Coder output must be checked before applying changes.

Checks:

- `files_changed` exists
- each file change has a path
- each change_type is valid
- create and modify operations include content
- delete operations do not require content
- paths do not target `.ai-agent`
- paths do not escape project root

---

## Generated Code Validation

Generated code may be validated using:

- syntax checks
- lint commands
- build commands
- test commands
- type checks

Validation commands depend on project type.

Examples:

JavaScript or Node:

- node --check
- npm run lint
- npm test
- npm run build

TypeScript:

- tsc --noEmit

---

## Validator Agent Responsibility

Validator AI checks logical and structural issues in generated output.

It does not apply fixes.

Validator should report:

- syntax risks
- missing imports
- broken references
- invalid file paths
- incomplete implementation
- unsafe changes
- missing content
- schema problems

---

## Fixer Trigger

Fixer should run only when:

{
  "needs_fixer": true
}

Fixer must only fix reported validation issues.

---

## Validation Result Shape

Validator output should include:

{
  "valid": true,
  "issues": [],
  "needs_fixer": false,
  "commands_recommended": []
}

---

## Issue Shape

Each validation issue should use:

{
  "severity": "error",
  "file": "",
  "line": null,
  "message": "",
  "suggested_fix": ""
}

---

## Severity Definitions

### error

Blocking issue. The output should not be applied without fixing.

### warning

Non-blocking issue. The output may be usable but should be reviewed.

### info

Informational note.

---

## Runtime Validation

The runtime should not trust AI output blindly.

Even if Validator AI approves an output, the runtime should still enforce path safety and schema safety.

---

## Final Rule

Validation must prefer safe rejection over unsafe application.