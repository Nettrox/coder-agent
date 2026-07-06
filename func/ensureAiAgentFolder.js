import fs from "fs/promises";
import path from "path";

export async function ensureAiAgentFolder(projectPath) {
  const aiAgentPath = path.join(projectPath, ".ai-agent");

  const folders = [
    aiAgentPath,
    path.join(aiAgentPath, "sessions"),
    path.join(aiAgentPath, "logs"),
    path.join(aiAgentPath, "outputs"),
    path.join(aiAgentPath, "memory"),
  ];

  for (const folder of folders) {
    await fs.mkdir(folder, { recursive: true });
  }

  return aiAgentPath;
}