import { runAgent } from "../runAgent.js";
import { buildWorkerContext } from "./buildWorkerContext.js";

function hasValidOperations(output) {
  return (
    output?.success === true &&
    Array.isArray(output?.data?.operations) &&
    output.data.operations.length > 0
  );
}

function buildRetryPayload(workerContext, attempt, previousOutput) {
  return {
    ...workerContext,
    worker_mode: true,
    retry: {
      enabled: true,
      attempt,
      reason:
        previousOutput?.reason ||
        "Previous worker response was invalid or contained no operations.",
      previous_errors: previousOutput?.errors || [],
      instruction:
        "Return ONLY valid JSON. Return data.operations with at least one operation. Do not use markdown, code fences, tool calls, or explanations outside JSON.",
    },
  };
}

export async function runCoderWorker({
  projectPath,
  agentContext,
  task,
  plannerOutput,
  retrieverOutput,
  contextBuilderOutput,
  fileContext,
  maxRetries = 2,
}) {
  const workerContext = buildWorkerContext({
    task,
    agentContext,
    plannerOutput,
    retrieverOutput,
    contextBuilderOutput,
    fileContext,
  });

  const attempts = [];
  let finalOutput = null;

  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    const payload =
      attempt === 1
        ? {
            ...workerContext,
            worker_mode: true,
          }
        : buildRetryPayload(workerContext, attempt, finalOutput);

    const workerAgentName = `coder_worker_${task.id}`;

    const output = await runAgent(workerAgentName, projectPath, payload, {
        promptName: "coder",
        outputName: workerAgentName,
    });

    attempts.push({
      attempt,
      success: output?.success === true,
      hasOperations: hasValidOperations(output),
      reason: output?.reason || "",
      errors: output?.errors || [],
    });

    finalOutput = output;

    if (hasValidOperations(output)) {
      break;
    }
  }

  return {
    taskId: task.id,
    task,
    workerContext,
    attempts,
    output: finalOutput,
  };
}