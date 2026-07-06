import fs from "fs/promises";
import path from "path";
import { AI_AGENT } from "../../config/aiAgentConfig.js";

export async function cachePrompt(projectPath, agentName, prompt) {
  const cacheDir = path.join(
    projectPath,
    AI_AGENT.ROOT,
    AI_AGENT.DIRS.CACHE,
    "prompts"
  );

  await fs.mkdir(cacheDir, { recursive: true });

  const filePath = path.join(cacheDir, `${agentName}.prompt.md`);

  await fs.writeFile(filePath, prompt, "utf8");

  return filePath;
}