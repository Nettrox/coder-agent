import fs from "fs/promises";
import path from "path";
import { formatSessionsMarkdown } from "./formatMarkdown.js";

export async function saveAgentSession(projectPath, agentName, sessionId) {
  const sessionsDir = path.join(projectPath, ".ai-agent", "sessions");
  const sessionFile = path.join(sessionsDir, "agents.json");
  const sessionMdFile = path.join(sessionsDir, "agents.md");

  let sessions = {};

  try {
    const file = await fs.readFile(sessionFile, "utf8");
    sessions = JSON.parse(file);
  } catch {
    sessions = {};
  }

  sessions[agentName] = {
    ...(sessions[agentName] || {}),
    sessionId,
    updatedAt: new Date().toISOString(),
  };

  await fs.writeFile(sessionFile, JSON.stringify(sessions, null, 2), "utf8");
  await fs.writeFile(sessionMdFile, formatSessionsMarkdown(sessions), "utf8");
}