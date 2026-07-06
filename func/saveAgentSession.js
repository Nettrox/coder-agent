import fs from "fs/promises";
import path from "path";

export async function saveAgentSession(projectPath, agentName, sessionId) {
  const sessionFile = path.join(
    projectPath,
    ".ai-agent",
    "sessions",
    "agents.json"
  );

  let sessions = {};

  try {
    const file = await fs.readFile(sessionFile, "utf8");
    sessions = JSON.parse(file);
  } catch {
    sessions = {};
  }

  sessions[agentName] = {
    sessionId,
    updatedAt: new Date().toISOString(),
  };

  await fs.writeFile(sessionFile, JSON.stringify(sessions, null, 2), "utf8");
}