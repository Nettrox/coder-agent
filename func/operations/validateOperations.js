const ALLOWED_OPERATION_TYPES = new Set([
  "create",
  "modify",
  "delete",
]);

const PROTECTED_PATH_PARTS = new Set([
  ".ai-agent",
  ".git",
  "node_modules",
  "dist",
  "build",
  ".next",
  ".nuxt",
  "coverage",
  ".cache",
  ".turbo",
]);

function isAbsolutePath(filePath) {
  return (
    filePath.startsWith("/") ||
    /^[A-Za-z]:\//.test(filePath)
  );
}

function hasPathTraversal(filePath) {
  return filePath
    .split("/")
    .some((part) => part === "..");
}

function touchesProtectedPath(filePath) {
  return filePath
    .split("/")
    .some((part) => PROTECTED_PATH_PARTS.has(part));
}

export function validateOperations(normalizedResult) {
  const result = {
    success: true,
    reason: "",
    warnings: [],
    errors: [],
    validOperations: [],
    invalidOperations: [],
    summary: {
      total: normalizedResult.operations?.length || 0,
      valid: 0,
      invalid: 0,
    },
  };

  if (!normalizedResult?.success) {
    result.success = false;
    result.reason = "Normalization failed.";
    result.errors.push(...(normalizedResult.errors || []));
    return result;
  }

  const seenPaths = new Set();

  for (const operation of normalizedResult.operations) {
    const errors = [];
    const warnings = [];

    if (!ALLOWED_OPERATION_TYPES.has(operation.type)) {
      errors.push("Unsupported operation type.");
    }

    if (!operation.path) {
      errors.push("Operation path is missing.");
    }

    if (operation.path && isAbsolutePath(operation.path)) {
      errors.push("Absolute paths are not allowed.");
    }

    if (operation.path && hasPathTraversal(operation.path)) {
      errors.push("Path traversal is not allowed.");
    }

    if (operation.path && touchesProtectedPath(operation.path)) {
      errors.push("Protected paths cannot be modified.");
    }

    if (operation.path) {
      const duplicateKey = `${operation.type}:${operation.path}`;

      if (seenPaths.has(duplicateKey)) {
        errors.push("Duplicate operation detected.");
      }

      seenPaths.add(duplicateKey);
    }

    if (
      (operation.type === "create" || operation.type === "modify") &&
      operation.content.trim() === ""
    ) {
      errors.push("Create and modify operations require full content.");
    }

    if (
      operation.type === "delete" &&
      operation.content.trim() !== ""
    ) {
      warnings.push("Delete operation should not include content.");
    }

    const validation = {
      operation,
      errors,
      warnings,
      valid: errors.length === 0,
    };

    if (validation.valid) {
      result.validOperations.push(operation);
      result.summary.valid++;
    } else {
      result.invalidOperations.push(validation);
      result.summary.invalid++;
      result.success = false;
    }

    result.warnings.push(
      ...warnings.map((message) => ({
        operationId: operation.id,
        path: operation.path,
        message,
      }))
    );

    result.errors.push(
      ...errors.map((message) => ({
        operationId: operation.id,
        path: operation.path,
        message,
      }))
    );
  }

  if (!result.success) {
    result.reason = "One or more operations are invalid.";
  }

  return result;
}