import fs from "fs/promises";
import path from "path";
import { AI_AGENT } from "../../config/aiAgentConfig.js";

function removeExtension(fileName) {
  const ext = path.extname(fileName);
  return ext ? fileName.slice(0, -ext.length) : fileName;
}

export async function createFileWorkspace(projectPath, relativePath) {
  const parsed = path.parse(relativePath);

  const workspacePath = path.join(
    projectPath,
    AI_AGENT.ROOT,
    AI_AGENT.DIRS.KNOWLEDGE_FILES,
    parsed.dir,
    removeExtension(parsed.base)
  );

  const folders = [
    workspacePath,
    path.join(workspacePath, "chunks"),
    path.join(workspacePath, "ast"),
    path.join(workspacePath, "graph"),
    path.join(workspacePath, "embeddings"),
    path.join(workspacePath, "versions"),
  ];

  for (const folder of folders) {
    await fs.mkdir(folder, { recursive: true });
  }

  return workspacePath;
}