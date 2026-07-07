import fs from "fs/promises";
import path from "path";

function getTargetPath(projectPath, operationPath) {
  return path.join(projectPath, operationPath);
}

export async function verifyOperations(projectPath, validationResult) {
  const result = {
    success: true,
    reason: "",
    verified: [],
    failed: [],
    summary: {
      total: validationResult.validOperations?.length || 0,
      verified: 0,
      failed: 0,
    },
  };

  if (!validationResult?.success) {
    return {
      success: false,
      reason: "Cannot verify invalid operations.",
      verified: [],
      failed: [],
      summary: {
        total: 0,
        verified: 0,
        failed: 0,
      },
    };
  }

  for (const operation of validationResult.validOperations) {
    const targetPath = getTargetPath(projectPath, operation.path);

    try {
      if (operation.type === "delete") {
        try {
          await fs.access(targetPath);

          result.success = false;

          result.failed.push({
            operationId: operation.id,
            path: operation.path,
            message: "File still exists after delete.",
          });

          result.summary.failed++;

          continue;
        } catch {
          result.verified.push({
            operationId: operation.id,
            path: operation.path,
            message: "Delete verified.",
          });

          result.summary.verified++;

          continue;
        }
      }

      const currentContent = await fs.readFile(targetPath, "utf8");

      if (currentContent !== operation.content) {
        result.success = false;

        result.failed.push({
          operationId: operation.id,
          path: operation.path,
          message: "File content does not match expected content.",
        });

        result.summary.failed++;

        continue;
      }

      result.verified.push({
        operationId: operation.id,
        path: operation.path,
        message: `${operation.type} verified.`,
      });

      result.summary.verified++;
    } catch (error) {
      result.success = false;

      result.failed.push({
        operationId: operation.id,
        path: operation.path,
        message: error.message,
      });

      result.summary.failed++;
    }
  }

  if (!result.success) {
    result.reason = "One or more operations failed verification.";
  }

  return result;
}