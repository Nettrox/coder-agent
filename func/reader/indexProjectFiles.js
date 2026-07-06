import { AI_AGENT } from "../../config/aiAgentConfig.js";

import fs from "fs/promises";
import path from "path";

import { readProjectReport } from "../project/readProjectReport.js";
import { shouldReadFile } from "./shouldReadFile.js";
import { readFile } from "./readFile.js";
import { calculateHash } from "./calculateHash.js";
import { createFileWorkspace } from "./createFileWorkspace.js";
import { generateFileMetadata } from "./generateFileMetadata.js";
import { generateFileMetadataMarkdown } from "./generateFileMetadataMarkdown.js";

async function saveFileMetadata(workspacePath, metadata, content) {
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

  const sourceFileName = `${AI_AGENT.FILES.SOURCE_FILE}${metadata.extension || ".txt"}`;

  await fs.writeFile(
    path.join(workspacePath, sourceFileName),
    content,
    "utf8"
  );
}

export async function indexProjectFiles(projectPath) {
  const tree = await readProjectReport(projectPath, "tree");

  const result = {
    generatedAt: new Date().toISOString(),
    totalFiles: tree.files.length,
    indexedFiles: 0,
    skippedFiles: 0,
    failedFiles: 0,
    files: [],
    skipped: [],
    failed: [],
  };

  for (const file of tree.files) {
    if (!shouldReadFile(file)) {
      result.skippedFiles++;

      result.skipped.push({
        path: file.path,
        reason: "File ignored by reader rules",
      });

      continue;
    }

    try {
      const { content, encoding } = await readFile(projectPath, file.path);
      const hash = calculateHash(content);
      const workspacePath = await createFileWorkspace(projectPath, file.path);

      const metadata = generateFileMetadata({
        file,
        content,
        encoding,
        hash,
      });

      await saveFileMetadata(workspacePath, metadata, content);

      result.indexedFiles++;

      result.files.push({
        path: file.path,
        workspace: path.relative(
          path.join(projectPath, AI_AGENT.ROOT),
          workspacePath
        ),
        hash,
        language: metadata.language,
        size: file.size,
      });
    } catch (error) {
      result.failedFiles++;

      result.failed.push({
        path: file.path,
        error: error.message,
      });
    }
  }

  const knowledgeDir = path.join(
    projectPath,
    AI_AGENT.ROOT,
    AI_AGENT.DIRS.KNOWLEDGE
    );
  await fs.mkdir(knowledgeDir, { recursive: true });

  await fs.writeFile(
    path.join(knowledgeDir, AI_AGENT.FILES.FILES_INDEX_JSON),
    JSON.stringify(result, null, 2),
    "utf8"
  );

  await fs.writeFile(
    path.join(knowledgeDir, AI_AGENT.FILES.FILES_INDEX_MD),
    generateFilesIndexMarkdown(result),
    "utf8"
  );

  return result;
}

function generateFilesIndexMarkdown(result) {
  return `# Files Knowledge Index

## Summary

| Field | Value |
|---|---:|
| Generated At | ${result.generatedAt} |
| Total Files | ${result.totalFiles} |
| Indexed Files | ${result.indexedFiles} |
| Skipped Files | ${result.skippedFiles} |
| Failed Files | ${result.failedFiles} |

## Indexed Files

| File | Language | Size | Workspace |
|---|---|---:|---|
${
  result.files.length
    ? result.files
        .map(
          (file) =>
            `| ${file.path} | ${file.language} | ${file.size} | ${file.workspace} |`
        )
        .join("\n")
    : "| - | - | - | - |"
}

## Skipped Files

\`\`\`json
${JSON.stringify(result.skipped, null, 2)}
\`\`\`

## Failed Files

\`\`\`json
${JSON.stringify(result.failed, null, 2)}
\`\`\`
`;
}