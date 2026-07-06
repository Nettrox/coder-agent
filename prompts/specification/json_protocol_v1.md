# JSON Protocol v1

## Purpose

This document defines the JSON communication standard used between AI agents and the AI Coder Agent runtime.

This protocol exists to make agent outputs machine-readable, parseable, and safe to pass between pipeline stages.

---

## Core Rule

Every AI agent response must be a single valid JSON object.

The first character of the response must be:

{

The last character of the response must be:

}

---

## Forbidden Output

Agents must not output:

- Markdown
- Code fences
- Explanations outside JSON
- Tool calls
- Comments inside JSON
- Multiple JSON objects
- Plain text before JSON
- Plain text after JSON
- Trailing commas
- JavaScript object syntax
- undefined
- NaN
- Infinity
- Functions

---

## Required Base Shape

Every response must follow this base shape:

{
  "success": true,
  "reason": "",
  "warnings": [],
  "errors": [],
  "data": {}
}

---

## Field Definitions

### success

Boolean.

Indicates whether the agent completed its assigned task successfully.

### reason

String.

Short explanation of the result.

For successful responses, this may be empty.

For failed responses, this must explain why the agent failed.

### warnings

Array.

Non-blocking issues discovered by the agent.

### errors

Array.

Blocking issues that prevented successful completion.

### data

Object.

Agent-specific response payload.

---

## Success Response

Example:

{
  "success": true,
  "reason": "",
  "warnings": [],
  "errors": [],
  "data": {
    "summary": "Task completed."
  }
}

---

## Failure Response

Example:

{
  "success": false,
  "reason": "Required file context was missing.",
  "warnings": [],
  "errors": [
    {
      "message": "Missing file context.",
      "details": "No source files were provided to the agent."
    }
  ],
  "data": {}
}

---

## Arrays

Fields that are documented as arrays must always be arrays, even when empty.

Correct:

{
  "warnings": [],
  "errors": []
}

Incorrect:

{
  "warnings": "",
  "errors": null
}

---

## Null Values

Null values are allowed only when explicitly expected by the schema.

Prefer empty strings, empty arrays, or empty objects when the field is required but has no value.

---

## String Escaping

All strings must be valid JSON strings.

Multiline code must be escaped correctly inside JSON string values.

---

## Code Content

When returning file content, code must be included as a JSON string.

Agents must not wrap code in Markdown fences.

Correct:

{
  "content": "<!DOCTYPE html>\n<html>\n</html>"
}

Incorrect:

{
  "content": "```html\n<!DOCTYPE html>\n```"
}

---

## Tool Calls

Agents do not have runtime tools unless explicitly provided by the system.

Agents must not output tool blocks such as:

- get_workspace
- read_file
- write_file
- shell
- terminal
- browser

---

## Parse Failure Policy

If the runtime cannot parse the response as JSON, the response is considered invalid.

The system may retry or repair the response, but agents must always attempt to return valid JSON on the first response.

---

## Final Rule

If the agent is unsure, it must still return valid JSON with:

{
  "success": false,
  "reason": "Unable to complete task with available context.",
  "warnings": [],
  "errors": [],
  "data": {}
}