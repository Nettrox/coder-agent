function getOperations(workerResult) {
  return workerResult?.output?.data?.operations || [];
}

function getWorkerId(workerResult, index) {
  return workerResult?.taskId || workerResult?.task?.id || `worker_${index + 1}`;
}

function operationKey(operation) {
  return `${operation.type}:${operation.path}`;
}

export function mergeOperations(workerResults = []) {
  const result = {
    success: true,
    reason: "",
    warnings: [],
    errors: [],
    operations: [],
    workers: [],
    conflicts: [],
    summary: {
      workers: workerResults.length,
      successfulWorkers: 0,
      failedWorkers: 0,
      operations: 0,
      conflicts: 0,
    },
  };

  const seen = new Map();

  workerResults.forEach((workerResult, index) => {
    const workerId = getWorkerId(workerResult, index);
    const output = workerResult?.output;

    const workerSummary = {
      workerId,
      success: output?.success === true,
      operationCount: 0,
      errors: output?.errors || [],
      warnings: output?.warnings || [],
    };

    if (output?.success !== true) {
      result.success = false;
      result.summary.failedWorkers++;
      result.errors.push({
        workerId,
        message: "Worker failed.",
        details: output?.reason || "",
      });
      result.workers.push(workerSummary);
      return;
    }

    result.summary.successfulWorkers++;

    const operations = getOperations(workerResult);

    if (!Array.isArray(operations) || operations.length === 0) {
      result.warnings.push({
        workerId,
        message: "Worker returned no operations.",
      });

      result.workers.push(workerSummary);
      return;
    }

    for (const operation of operations) {
      const key = operationKey(operation);

      if (seen.has(key)) {
        const previous = seen.get(key);

        const conflict = {
          type: "duplicate_operation",
          key,
          path: operation.path,
          operationType: operation.type,
          workers: [previous.workerId, workerId],
        };

        result.conflicts.push(conflict);
        result.summary.conflicts++;
        result.success = false;

        result.errors.push({
          workerId,
          message: "Duplicate operation conflict.",
          details: conflict,
        });

        continue;
      }

      seen.set(key, {
        workerId,
        operation,
      });

      result.operations.push({
        ...operation,
        sourceWorker: workerId,
      });

      workerSummary.operationCount++;
      result.summary.operations++;
    }

    result.workers.push(workerSummary);
  });

  if (result.conflicts.length > 0) {
    result.reason = "One or more operation conflicts were detected.";
  } else if (!result.success) {
    result.reason = "One or more workers failed.";
  }

  return result;
}