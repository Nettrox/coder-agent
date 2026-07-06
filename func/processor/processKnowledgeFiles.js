import fs from "fs/promises";
import path from "path";

import { AI_AGENT } from "../../config/aiAgentConfig.js";
import { readFileKnowledge } from "../knowledge/readFileKnowledge.js";
import { findFileKnowledge } from "../knowledge/findFileKnowledge.js";
import { readProjectReport } from "../project/readProjectReport.js";
import { processFileMetadata } from "./processFileMetadata.js";
import { saveProcessedMetadata } from "./saveProcessedMetadata.js";
import { generateKnowledgeIndexes } from "./generateKnowledgeIndexes.js";

export async function processKnowledgeFiles(projectPath) {
  const tree = await readProjectReport(projectPath, "tree");

  const processedFiles = [];
  const failed = [];

  for (const file of tree.files) {
    try {
      const fileKnowledge = await readFileKnowledge(projectPath, file.path);

      if (!fileKnowledge.success) {
        continue;
      }

      const knowledgeLocation = await findFileKnowledge(projectPath, file.path);

      const processedMetadata = processFileMetadata(
        fileKnowledge.metadata,
        fileKnowledge.source
      );

      await saveProcessedMetadata(
        knowledgeLocation.workspacePath,
        processedMetadata
      );

      processedFiles.push({
        relativePath: file.path,
        metadata: processedMetadata,
      });
    } catch (error) {
      failed.push({
        path: file.path,
        error: error.message,
      });
    }
  }

  const indexes = await generateKnowledgeIndexes(projectPath, processedFiles);

  const result = {
    generatedAt: new Date().toISOString(),
    processedFiles: processedFiles.length,
    failedFiles: failed.length,
    indexes,
    failed,
  };

  const knowledgeDir = path.join(
    projectPath,
    AI_AGENT.ROOT,
    AI_AGENT.DIRS.KNOWLEDGE_PROCESSOR
    );

  await fs.writeFile(
    path.join(knowledgeDir, "report.json"),
    JSON.stringify(result, null, 2),
    "utf8"
  );

  await fs.writeFile(
    path.join(knowledgeDir, "report.md"),
    generateProcessorReportMarkdown(result),
    "utf8"
  );

  return result;
}

function generateProcessorReportMarkdown(result) {
  return `# Knowledge Processor Report

## Summary

| Field | Value |
|---|---:|
| Generated At | ${result.generatedAt} |
| Processed Files | ${result.processedFiles} |
| Failed Files | ${result.failedFiles} |
| Functions Indexed | ${result.indexes.functions} |
| Classes Indexed | ${result.indexes.classes} |
| Imports Indexed | ${result.indexes.imports} |
| Exports Indexed | ${result.indexes.exports} |
| HTML Files Indexed | ${result.indexes.html} |

## Failed Files

\`\`\`json
${JSON.stringify(result.failed, null, 2)}
\`\`\`
`;
}