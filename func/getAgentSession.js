import fs from "fs/promises";
import path from "path";
import { createNewSession } from "./createNewSession.js";
import { formatSessionsMarkdown } from "./formatMarkdown.js";

export async function getAgentSession(projectPath, agentName) {
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

  if (!sessions[agentName]) {
    const sessionId = await createNewSession();

    sessions[agentName] = {
      sessionId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await fs.writeFile(sessionFile, JSON.stringify(sessions, null, 2), "utf8");
    await fs.writeFile(sessionMdFile, formatSessionsMarkdown(sessions), "utf8");
  }

  return sessions[agentName].sessionId;
}