export function safeStringify(value) {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export function previewText(text, maxLength = 5000) {
  if (!text) return "";

  const value = String(text);

  if (value.length <= maxLength) return value;

  return value.slice(0, maxLength) + "\n\n...TRUNCATED...";
}

export function formatAgentOutputMarkdown(agentName, output) {
  const data = output?.data || {};

  return `# ${agentName} Output

## Status

| Field | Value |
|---|---|
| Success | ${output?.success === true ? "true" : "false"} |
| Reason | ${output?.reason || "-"} |
| Warnings | ${output?.warnings?.length || 0} |
| Errors | ${output?.errors?.length || 0} |

## Warnings

\`\`\`json
${safeStringify(output?.warnings || [])}
\`\`\`

## Errors

\`\`\`json
${safeStringify(output?.errors || [])}
\`\`\`

## Data

\`\`\`json
${safeStringify(data)}
\`\`\`
`;
}

export function formatSessionsMarkdown(sessions) {
  const rows = Object.entries(sessions || {})
    .map(([agent, info]) => {
      return `| ${agent} | ${info.sessionId || "-"} | ${info.createdAt || "-"} | ${info.updatedAt || "-"} |`;
    })
    .join("\n");

  return `# AI Agent Sessions

| Agent | Session ID | Created At | Updated At |
|---|---|---|---|
${rows || "| - | - | - | - |"}
`;
}

export function formatMemoryMarkdown(memory) {
  return `# AI Agent Memory

\`\`\`json
${safeStringify(memory)}
\`\`\`
`;
}