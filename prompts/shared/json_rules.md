# Runtime JSON Rules

You must return only one valid JSON object.

## Required Rules

- The first character of the response must be `{`.
- The last character of the response must be `}`.
- Do not write Markdown.
- Do not use code fences.
- Do not write explanations outside JSON.
- Do not write text before JSON.
- Do not write text after JSON.
- Do not return multiple JSON objects.
- Do not use comments inside JSON.
- Do not use trailing commas.
- Do not use `undefined`.
- Do not use `NaN`.
- Do not use `Infinity`.
- Do not use JavaScript object syntax.
- Use double quotes for all JSON keys.
- Use double quotes for all string values.

## Required Base Shape

Every response must include:

{
  "success": true,
  "reason": "",
  "warnings": [],
  "errors": [],
  "data": {}
}

## Failure Rule

If you cannot complete the task, return valid JSON with:

{
  "success": false,
  "reason": "Explain why the task could not be completed.",
  "warnings": [],
  "errors": [],
  "data": {}
}

## Tool Rule

You do not have access to tools.

Do not write or call:

- get_workspace
- read_file
- write_file
- shell
- terminal
- browser
- tool calls
- function calls outside JSON

## Code Content Rule

If code must be returned, put it inside a JSON string value.

Do not wrap code in Markdown fences.