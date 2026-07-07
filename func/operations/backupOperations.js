import fs from "fs/promises";
import path from "path";
import { AI_AGENT } from "../../config/aiAgentConfig.js";

function timestamp() {
  return new Date()
    .toISOString()
    .replaceAll(":", "-")
    .replaceAll(".", "-");
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function backupOperations(projectPath, validationResult) {
  const backupId = `backup_${timestamp()}`;

  const backupRoot = path.join(
    projectPath,
    AI_AGENT.ROOT,
    AI_AGENT.DIRS.BACKUPS,
    backupId
  );

  const result = {
    success: true,
    reason: "",
    backupId,
    backupRoot,
    backedUp: [],
    skipped: [],
    failed: [],
    summary: {
      total: validationResult.validOperations?.length || 0,
      backedUp: 0,
      skipped: 0,
      failed: 0,
    },
  };

  if (!validationResult?.success) {
    return {
      success: false,
      reason: "Cannot backup invalid operations.",
      backupId,
      backupRoot,
      backedUp: [],
      skipped: [],
      failed: [],
      summary: {
        total: 0,
        backedUp: 0,
        skipped: 0,
        failed: 0,
      },
    };
  }

  await fs.mkdir(backupRoot, { recursive: true });

  for (const operation of validationResult.validOperations) {
    const sourcePath = path.join(projectPath, operation.path);
    const backupPath = path.join(backupRoot, operation.path);

    try {
      const exists = await fileExists(sourcePath);

      if (!exists) {
        result.skipped.push({
          operationId: operation.id,
          path: operation.path,
          reason: "Source file does not exist yet.",
        });

        result.summary.skipped++;
        continue;
      }

      await fs.mkdir(path.dirname(backupPath), { recursive: true });

      const content = await fs.readFile(sourcePath, "utf8");
      await fs.writeFile(backupPath, content, "utf8");

      result.backedUp.push({
        operationId: operation.id,
        path: operation.path,
        backupPath: path.relative(projectPath, backupPath),
      });

      result.summary.backedUp++;
    } catch (error) {
      result.success = false;

      result.failed.push({
        operationId: operation.id,
        path: operation.path,
        error: error.message,
      });

      result.summary.failed++;
    }
  }

  if (!result.success) {
    result.reason = "One or more files failed to backup.";
  }

  await fs.writeFile(
    path.join(backupRoot, "backup-report.json"),
    JSON.stringify(result, null, 2),
    "utf8"
  );

  return result;
}