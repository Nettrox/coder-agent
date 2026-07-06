import fs from "fs/promises";
import path from "path";
import { AI_AGENT } from "../../config/aiAgentConfig.js";

function removeExtension(fileName) {
  const ext = path.extname(fileName);
  return ext ? fileName.slice(0, -ext.length) : fileName;
}

export function getFileKnowledgeWorkspace(projectPath, relativePath) {
  const parsed = path.parse(relativePath);

  return path.join(
    projectPath,
    AI_AGENT.ROOT,
    AI_AGENT.DIRS.KNOWLEDGE_FILES,
    parsed.dir,
    removeExtension(parsed.base)
  );
}

export async function findFileKnowledge(projectPath, relativePath) {
  const workspacePath = getFileKnowledgeWorkspace(projectPath, relativePath);

  const metadataPath = path.join(
    workspacePath,
    AI_AGENT.FILES.METADATA_JSON
  );

  try {
    await fs.access(metadataPath);

    return {
      found: true,
      relativePath,
      workspacePath,
      metadataPath,
    };
  } catch {
    return {
      found: false,
      relativePath,
      workspacePath,
      metadataPath,
    };
  }
}