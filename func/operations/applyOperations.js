import fs from "fs/promises";
import path from "path";

function getTargetPath(projectPath, operationPath) {
  return path.join(projectPath, operationPath);
}

async function applyCreate(projectPath, operation) {
  const targetPath = getTargetPath(projectPath, operation.path);

  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.writeFile(targetPath, operation.content, "utf8");

  return {
    operationId: operation.id,
    type: operation.type,
    path: operation.path,
    applied: true,
    message: "File created.",
  };
}

async function applyModify(projectPath, operation) {
  const targetPath = getTargetPath(projectPath, operation.path);

  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.writeFile(targetPath, operation.content, "utf8");

  return {
    operationId: operation.id,
    type: operation.type,
    path: operation.path,
    applied: true,
    message: "File modified.",
  };
}

async function applyDelete(projectPath, operation) {
  const targetPath = getTargetPath(projectPath, operation.path);

  try {
    await fs.unlink(targetPath);

    return {
      operationId: operation.id,
      type: operation.type,
      path: operation.path,
      applied: true,
      message: "File deleted.",
    };
  } catch (error) {
    if (error.code === "ENOENT") {
      return {
        operationId: operation.id,
        type: operation.type,
        path: operation.path,
        applied: false,
        message: "File does not exist.",
      };
    }

    throw error;
  }
}

export async function applyOperations(projectPath, validationResult) {
  const result = {
    success: true,
    reason: "",
    applied: [],
    failed: [],
    summary: {
      total: validationResult.validOperations?.length || 0,
      applied: 0,
      failed: 0,
    },
  };

  if (!validationResult?.success) {
    return {
      success: false,
      reason: "Cannot apply invalid operations.",
      applied: [],
      failed: [],
      summary: {
        total: 0,
        applied: 0,
        failed: 0,
      },
    };
  }

  for (const operation of validationResult.validOperations) {
    try {
      let appliedOperation;

      if (operation.type === "create") {
        appliedOperation = await applyCreate(projectPath, operation);
      } else if (operation.type === "modify") {
        appliedOperation = await applyModify(projectPath, operation);
      } else if (operation.type === "delete") {
        appliedOperation = await applyDelete(projectPath, operation);
      } else {
        throw new Error(`Unsupported operation type: ${operation.type}`);
      }

      result.applied.push(appliedOperation);
      result.summary.applied++;
    } catch (error) {
      result.success = false;
      result.failed.push({
        operationId: operation.id,
        type: operation.type,
        path: operation.path,
        error: error.message,
      });
      result.summary.failed++;
    }
  }

  if (!result.success) {
    result.reason = "One or more operations failed to apply.";
  }

  return result;
}