const ALLOWED_PRIORITIES = new Set(["high", "medium", "low"]);
const ALLOWED_OPERATION_TYPES = new Set(["create", "modify", "delete"]);

function isUnsafePath(filePath = "") {
  return (
    filePath.startsWith("/") ||
    filePath.includes("../") ||
    filePath.includes(".ai-agent") ||
    filePath.includes(".git") ||
    filePath.includes("node_modules")
  );
}

export function validateTasks(distributedTasks) {
  const result = {
    success: true,
    reason: "",
    warnings: [],
    errors: [],
    validTasks: [],
    invalidTasks: [],
    summary: {
      total: distributedTasks.tasks?.length || 0,
      valid: 0,
      invalid: 0,
      duplicateFileAssignments: 0,
    },
  };

  if (!distributedTasks?.success) {
    return {
      ...result,
      success: false,
      reason: "Task distribution failed.",
      errors: distributedTasks.errors || [],
    };
  }

  const fileOwners = new Map();

  for (const task of distributedTasks.tasks) {
    const errors = [];
    const warnings = [];

    if (!task.id) errors.push("Task id is missing.");
    if (!task.title) errors.push("Task title is missing.");
    if (!task.goal) errors.push("Task goal is missing.");

    if (!ALLOWED_PRIORITIES.has(task.priority)) {
      errors.push("Invalid task priority.");
    }

    if (!Array.isArray(task.assigned_files)) {
      errors.push("assigned_files must be an array.");
    }

    if (!Array.isArray(task.instructions)) {
      errors.push("instructions must be an array.");
    }

    if (!Array.isArray(task.expected_operations)) {
      errors.push("expected_operations must be an array.");
    }

    if (!Array.isArray(task.depends_on)) {
      errors.push("depends_on must be an array.");
    }

    for (const file of task.assigned_files || []) {
      if (!file.path) {
        errors.push("Assigned file path is missing.");
        continue;
      }

      if (isUnsafePath(file.path)) {
        errors.push(`Unsafe assigned file path: ${file.path}`);
      }

      if (fileOwners.has(file.path)) {
        warnings.push(
          `File is assigned to multiple tasks: ${file.path}`
        );
        result.summary.duplicateFileAssignments++;
      }

      fileOwners.set(file.path, task.id);
    }

    for (const operation of task.expected_operations || []) {
      if (!ALLOWED_OPERATION_TYPES.has(operation.type)) {
        errors.push(`Invalid expected operation type: ${operation.type}`);
      }

      if (!operation.path) {
        errors.push("Expected operation path is missing.");
      }

      if (operation.path && isUnsafePath(operation.path)) {
        errors.push(`Unsafe expected operation path: ${operation.path}`);
      }
    }

    const validatedTask = {
      task,
      valid: errors.length === 0,
      errors,
      warnings,
    };

    if (validatedTask.valid) {
      result.validTasks.push(task);
      result.summary.valid++;
    } else {
      result.invalidTasks.push(validatedTask);
      result.summary.invalid++;
      result.success = false;
    }

    result.warnings.push(
      ...warnings.map((message) => ({
        taskId: task.id,
        message,
      }))
    );

    result.errors.push(
      ...errors.map((message) => ({
        taskId: task.id,
        message,
      }))
    );
  }

  if (!result.success) {
    result.reason = "One or more distributed tasks are invalid.";
  }

  return result;
}