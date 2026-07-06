# Output Protocol v1

## Purpose

This document defines the standard output structure for AI Coder Agent pipeline stages.

The goal is to ensure that every pipeline step can reliably consume the output of previous steps.

---

## Standard Output Envelope

All agent outputs must use the standard response envelope:

{
  "success": true,
  "reason": "",
  "warnings": [],
  "errors": [],
  "data": {}
}

---

## Agent Data Ownership

Agent-specific data must be placed inside the `data` object.

Examples:

Planner output:

{
  "data": {
    "goal": "",
    "steps": [],
    "required_files": []
  }
}

Retriever output:

{
  "data": {
    "selected_files": [],
    "selected_symbols": []
  }
}

Coder output:

{
  "data": {
    "files_changed": []
  }
}

Validator output:

{
  "data": {
    "valid": true,
    "issues": []
  }
}

---

## Output Stability

Output schemas must be stable.

New fields may be added, but existing fields should not be removed or renamed without a protocol version change.

---

## Pipeline Compatibility

Each agent output should be compatible with the next pipeline stage.

Expected flow:

Planner output
→ Retriever input

Retriever output
→ Context Builder input

Context Builder output
→ Coder input

Coder output
→ Validator input

Validator output
→ Fixer input

---

## Coder Output Standard

Coder output must describe file changes using `files_changed`.

Required shape:

{
  "path": "",
  "change_type": "create",
  "reason": "",
  "content": "",
  "patch": ""
}

Allowed `change_type` values:

- create
- modify
- delete

Rules:

- `path` must be relative.
- `path` must not point inside `.ai-agent`.
- `content` must contain full file content for create and modify operations.
- `content` must be empty for delete operations.
- `patch` may be empty unless patch mode is explicitly used.

---

## Validator Output Standard

Validator output must include:

{
  "valid": true,
  "issues": [],
  "needs_fixer": false,
  "commands_recommended": []
}

Each issue should include:

{
  "severity": "error",
  "file": "",
  "line": null,
  "message": "",
  "suggested_fix": ""
}

Allowed severity values:

- error
- warning
- info

---

## Retriever Output Standard

Retriever output must include:

{
  "selected_files": [],
  "possible_new_files": [],
  "selected_symbols": [],
  "missing_context": [],
  "retrieval_notes": ""
}

Selected files must use relative paths.

---

## Context Builder Output Standard

Context Builder output must include:

{
  "coder_context": {
    "goal": "",
    "task_type": "",
    "instructions": [],
    "files": [],
    "possible_new_files": [],
    "constraints": [],
    "expected_output": {}
  },
  "ready_for_coder": true,
  "missing_context": []
}

---

## Failure Output

Every agent must be able to fail safely.

Failure output must still follow the standard envelope:

{
  "success": false,
  "reason": "",
  "warnings": [],
  "errors": [],
  "data": {}
}

---

## Human Readability

Runtime systems may convert JSON outputs into Markdown reports.

Agents themselves must not generate Markdown unless the specific task explicitly requires Markdown content inside a JSON string.

---

## Final Rule

Machine-readability is more important than natural language friendliness.