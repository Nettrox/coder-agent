import fs from "fs/promises";
import path from "path";
import { AI_AGENT } from "../../config/aiAgentConfig.js";
import { generateFileMetadataMarkdown } from "../reader/generateFileMetadataMarkdown.js";

export async function saveProcessedMetadata(workspacePath, metadata) {
  await fs.writeFile(
    path.join(workspacePath, AI_AGENT.FILES.METADATA_JSON),
    JSON.stringify(metadata, null, 2),
    "utf8"
  );

  await fs.writeFile(
    path.join(workspacePath, AI_AGENT.FILES.METADATA_MD),
    generateFileMetadataMarkdown(metadata),
    "utf8"
  );
}