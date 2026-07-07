const ALLOWED_OPERATION_TYPES = new Set([
  "create",
  "modify",
  "delete",
]);

function normalizeType(type) {
  if (!type || typeof type !== "string") return "";

  const normalized = type.trim().toLowerCase();

  const aliases = {
    add: "create",
    new: "create",
    write: "create",
    update: "modify",
    edit: "modify",
    change: "modify",
    remove: "delete",
    destroy: "delete",
  };

  return aliases[normalized] || normalized;
}

function normalizePath(filePath) {
  if (!filePath || typeof filePath !== "string") return "";

  return filePath
    .trim()
    .replaceAll("\\", "/")
    .replace(/^\.\//, "")
    .replace(/\/+/g, "/");
}

function normalizeString(value) {
  if (value === null || value === undefined) return "";
  if (typeof value !== "string") return String(value);
  return value;
}

function getRawOperations(agentOutput) {
  if (Array.isArray(agentOutput?.data?.operations)) {
    return agentOutput.data.operations;
  }

  if (Array.isArray(agentOutput?.data?.files_changed)) {
    return agentOutput.data.files_changed.map((fileChange) => ({
      type: fileChange.change_type,
      path: fileChange.path,
      reason: fileChange.reason,
      content: fileChange.content,
      patch: fileChange.patch,
    }));
  }

  if (Array.isArray(agentOutput?.data?.corrected_operations)) {
    return agentOutput.data.corrected_operations;
  }

  if (Array.isArray(agentOutput?.data?.corrected_files_changed)) {
    return agentOutput.data.corrected_files_changed.map((fileChange) => ({
      type: fileChange.change_type,
      path: fileChange.path,
      reason: fileChange.reason,
      content: fileChange.content,
      patch: fileChange.patch,
    }));
  }

  return [];
}

export function normalizeOperations(agentOutput) {
  const rawOperations = getRawOperations(agentOutput);

  const result = {
    success: true,
    reason: "",
    warnings: [],
    errors: [],
    operations: [],
  };

  rawOperations.forEach((operation, index) => {
    const type = normalizeType(operation.type || operation.change_type);
    const filePath = normalizePath(operation.path);

    const normalizedOperation = {
      id: `op_${String(index + 1).padStart(3, "0")}`,
      type,
      path: filePath,
      reason: normalizeString(operation.reason),
      content: normalizeString(operation.content),
      patch: normalizeString(operation.patch),
      source: {
        index,
        originalType: operation.type || operation.change_type || "",
        normalizedAt: new Date().toISOString(),
      },
    };

    if (!ALLOWED_OPERATION_TYPES.has(type)) {
      result.success = false;
      result.errors.push({
        operationIndex: index,
        path: filePath,
        message: "Unsupported operation type",
        value: operation.type || operation.change_type || "",
      });
    }

    if (!filePath) {
      result.success = false;
      result.errors.push({
        operationIndex: index,
        path: filePath,
        message: "Operation path is missing",
      });
    }

    result.operations.push(normalizedOperation);
  });

  if (result.operations.length === 0) {
    result.success = false;
    result.reason = "No operations found in agent output.";
    result.errors.push({
      message: "No operations found.",
    });
  }

  return result;
}