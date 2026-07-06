import fs from "fs/promises";
import path from "path";
import { AI_AGENT, AI_AGENT_DIRECTORIES } from "../config/aiAgentConfig.js";

export async function ensureAiAgentFolder(projectPath) {
  const aiAgentRoot = path.join(projectPath, AI_AGENT.ROOT);

  for (const directory of AI_AGENT_DIRECTORIES) {
    await fs.mkdir(path.join(aiAgentRoot, directory), {
      recursive: true,
    });
  }

  return aiAgentRoot;
}