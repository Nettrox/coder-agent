import fs from "fs/promises";
import path from "path";

function safeStringify(value) {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function previewText(text, maxLength = 3000) {
  if (!text) return "";

  const value = String(text);

  if (value.length <= maxLength) {
    return value;
  }

  return value.slice(0, maxLength) + "\n\n...TRUNCATED...";
}

export async function logAgentRun(projectPath, logData) {
  const now = new Date();
  const date = now.toISOString().slice(0, 10);

  const logsDir = path.join(projectPath, ".ai-agent", "logs");

  const jsonlFile = path.join(logsDir, `${date}.jsonl`);
  const readableFile = path.join(logsDir, `${date}.md`);

  const jsonLine = JSON.stringify({
    time: now.toISOString(),
    ...logData,
  });

  await fs.appendFile(jsonlFile, jsonLine + "\n", "utf8");

  const readableLog = `
---

# Agent Run

**Time:** ${now.toISOString()}  
**Agent:** ${logData.agent || "-"}  
**Session ID:** ${logData.sessionId || "-"}  
**Success:** ${logData.success === true ? "true" : "false"}

## Input

\`\`\`json
${safeStringify(logData.input || {})}
\`\`\`

## Parsed Output

\`\`\`json
${safeStringify(logData.parsedOutput || {})}
\`\`\`

## Raw Output Preview

\`\`\`text
${previewText(logData.rawOutput || "")}
\`\`\`

`;

  await fs.appendFile(readableFile, readableLog, "utf8");
}