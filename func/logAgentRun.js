import fs from "fs/promises";
import path from "path";

export async function logAgentRun(projectPath, logData) {
  const date = new Date().toISOString().slice(0, 10);

  const logFile = path.join(
    projectPath,
    ".ai-agent",
    "logs",
    `${date}.log`
  );

  const line = JSON.stringify(
    {
      time: new Date().toISOString(),
      ...logData,
    },
    null,
    0
  );

  await fs.appendFile(logFile, line + "\n", "utf8");
}