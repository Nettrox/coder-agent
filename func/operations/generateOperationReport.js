import fs from "fs/promises";
import path from "path";
import { AI_AGENT } from "../../config/aiAgentConfig.js";

function buildReport(writerContext) {
  return {
    generatedAt: new Date().toISOString(),

    writer: {
      id: writerContext.id,
      source: writerContext.source,
      sessionId: writerContext.sessionId,
      sessionPath: writerContext.sessionPath,
    },

    summary: {
      normalized: writerContext.normalized?.operations?.length || 0,
      valid: writerContext.validated?.summary?.valid || 0,
      invalid: writerContext.validated?.summary?.invalid || 0,
      backedUp: writerContext.backedUp?.summary?.backedUp || 0,
      skippedBackup: writerContext.backedUp?.summary?.skipped || 0,
      applied: writerContext.applied?.summary?.applied || 0,
      applyFailed: writerContext.applied?.summary?.failed || 0,
      verified: writerContext.verified?.summary?.verified || 0,
      verifyFailed: writerContext.verified?.summary?.failed || 0,
    },

    operations:
      writerContext.validated?.validOperations?.map((operation) => ({
        id: operation.id,
        type: operation.type,
        path: operation.path,
        reason: operation.reason,
      })) || [],

    failures: [
      ...(writerContext.normalized?.errors || []),
      ...(writerContext.validated?.errors || []),
      ...(writerContext.backedUp?.failed || []),
      ...(writerContext.applied?.failed || []),
      ...(writerContext.verified?.failed || []),
    ],

    warnings: [
      ...(writerContext.normalized?.warnings || []),
      ...(writerContext.validated?.warnings || []),
      ...(writerContext.backedUp?.skipped || []),
    ],

    status: writerContext.status,
  };
}

function buildMarkdownReport(report) {
  return `# Operation Report

## Writer

| Field | Value |
|---|---|
| Writer ID | ${report.writer.id} |
| Source | ${report.writer.source} |
| Session ID | ${report.writer.sessionId || "-"} |
| Session Path | ${report.writer.sessionPath || "-"} |
| Generated At | ${report.generatedAt} |

## Summary

| Field | Value |
|---|---:|
| Normalized Operations | ${report.summary.normalized} |
| Valid Operations | ${report.summary.valid} |
| Invalid Operations | ${report.summary.invalid} |
| Backed Up | ${report.summary.backedUp} |
| Skipped Backup | ${report.summary.skippedBackup} |
| Applied | ${report.summary.applied} |
| Apply Failed | ${report.summary.applyFailed} |
| Verified | ${report.summary.verified} |
| Verify Failed | ${report.summary.verifyFailed} |

## Operations

| ID | Type | Path | Reason |
|---|---|---|---|
${
  report.operations.length
    ? report.operations
        .map((op) => `| ${op.id} | ${op.type} | ${op.path} | ${op.reason} |`)
        .join("\n")
    : "| - | - | - | - |"
}

## Failures

\`\`\`json
${JSON.stringify(report.failures, null, 2)}
\`\`\`

## Warnings

\`\`\`json
${JSON.stringify(report.warnings, null, 2)}
\`\`\`
`;
}

export async function generateOperationReport(writerContext) {
  const report = buildReport(writerContext);

  const baseDir = writerContext.sessionPath
    ? writerContext.sessionPath
    : path.join(
        writerContext.projectPath,
        AI_AGENT.ROOT,
        AI_AGENT.DIRS.LOGS
      );

  await fs.mkdir(baseDir, { recursive: true });

  const jsonPath = path.join(baseDir, "operation-report.json");
  const mdPath = path.join(baseDir, "operation-report.md");

  await fs.writeFile(jsonPath, JSON.stringify(report, null, 2), "utf8");
  await fs.writeFile(mdPath, buildMarkdownReport(report), "utf8");

  writerContext.report = {
    success: true,
    jsonPath,
    mdPath,
    data: report,
  };

  writerContext.status.reported = true;

  return writerContext.report;
}