import fs from "fs/promises";
import path from "path";
import { createNewSession } from "./createNewSession.js";
import { formatSessionsMarkdown } from "./formatMarkdown.js";
import { AI_AGENT } from "../config/aiAgentConfig.js";

export async function getAgentSession(projectPath, agentName) {
  const sessionsDir = path.join(
    projectPath,
    AI_AGENT.ROOT,
    AI_AGENT.DIRS.SESSIONS
  );

  await fs.mkdir(sessionsDir, { recursive: true });

  const sessionFile = path.join(sessionsDir, AI_AGENT.FILES.AGENTS_JSON);
  const sessionMdFile = path.join(sessionsDir, AI_AGENT.FILES.AGENTS_MD);

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