import { scheduleTasks } from "../distributor/scheduleTasks.js";
import { runCoderWorker } from "./runCoderWorker.js";
import { mergeOperations } from "../operations/mergeOperations.js";

export async function runCoderPool({
  projectPath,
  agentContext,
  validatedTasks,
  plannerOutput,
  retrieverOutput,
  contextBuilderOutput,
  fileContext,
  maxWorkers = 3,
}) {
  const scheduled = scheduleTasks(validatedTasks, {
    maxWorkers,
  });

  const result = {
    success: false,
    reason: "",
    warnings: [],
    errors: [],
    scheduled,
    workerResults: [],
    merged: null,
    output: null,
    summary: {
      batches: scheduled.summary?.batchCount || 0,
      workers: 0,
      successfulWorkers: 0,
      failedWorkers: 0,
      operations: 0,
    },
  };

  if (!scheduled.success) {
    result.reason = "Task scheduling failed.";
    result.errors.push(...(scheduled.errors || []));
    return result;
  }

  for (const batch of scheduled.batches) {
    const batchResults = await Promise.all(
      batch.map((task) =>
        runCoderWorker({
            projectPath,
            agentContext,
            task,
            plannerOutput,
            retrieverOutput,
            contextBuilderOutput,
            fileContext,
            maxRetries: 2,
        })
      )
    );

    result.workerResults.push(...batchResults);
  }

  result.summary.workers = result.workerResults.length;
  result.summary.successfulWorkers = result.workerResults.filter(
    (worker) => worker.output?.success === true
  ).length;
  result.summary.failedWorkers =
    result.summary.workers - result.summary.successfulWorkers;

  const merged = mergeOperations(result.workerResults);

  result.merged = merged;
  result.summary.operations = merged.summary.operations;

  result.success = merged.success;
  result.reason = merged.reason || "";
  result.warnings.push(...(merged.warnings || []));
  result.errors.push(...(merged.errors || []));

  result.output = {
    success: merged.success,
    reason: merged.reason || "",
    warnings: merged.warnings || [],
    errors: merged.errors || [],
    data: {
      summary: "Coder pool generated merged operations.",
      operations: merged.operations,
      commands_to_run: [],
      notes: [
        `Coder pool used ${result.summary.workers} worker(s).`,
        `Merged ${result.summary.operations} operation(s).`,
      ],
    },
  };

  return result;
}