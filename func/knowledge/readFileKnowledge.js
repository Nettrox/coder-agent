import fs from "fs/promises";
import path from "path";
import { AI_AGENT } from "../../config/aiAgentConfig.js";
import { findFileKnowledge } from "./findFileKnowledge.js";

export async function readFileKnowledge(projectPath, relativePath) {
  const knowledge = await findFileKnowledge(projectPath, relativePath);

  if (!knowledge.found) {
    return {
      success: false,
      reason: "File knowledge was not found",
      relativePath,
      metadata: null,
      source: null,
    };
  }

  const metadataRaw = await fs.readFile(knowledge.metadataPath, "utf8");
  const metadata = JSON.parse(metadataRaw);

  const sourceFileName =
    metadata?.sourceSnapshot?.fileName ||
    `${AI_AGENT.FILES.SOURCE_FILE}${metadata.extension || ".txt"}`;

  const sourcePath = path.join(knowledge.workspacePath, sourceFileName);

  let source = "";

  try {
    source = await fs.readFile(sourcePath, "utf8");
  } catch {
    source = "";
  }

  return {
    success: true,
    reason: "",
    relativePath,
    workspacePath: knowledge.workspacePath,
    metadata,
    source,
  };
}