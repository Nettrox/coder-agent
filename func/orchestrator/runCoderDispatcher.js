import { runCoder } from "./runCoder.js";
import { runTaskDistributor } from "./runTaskDistributor.js";
import { distributeTasks } from "../distributor/distributeTasks.js";
import { validateTasks } from "../distributor/validateTasks.js";
import { runCoderPool } from "../workers/runCoderPool.js";
import { loadAgentConfig } from "../config/loadAgentConfig.js";
import { saveAgentOutput } from "../saveAgentOutput.js";

function resolveCoderMode(config, taskCount) {
  const mode = config.coder?.mode || "single";

  if (mode === "single") return "single";
  if (mode === "pool") return "pool";

  if (mode === "auto") {
    return taskCount >= config.coder.poolThreshold ? "pool" : "single";
  }

  return "single";
}

export async function runCoderDispatcher(projectPath, agentContext, state) {
  const config = await loadAgentConfig();

  const taskDistributorOutput = await runTaskDistributor(
    projectPath,
    agentContext,
    state
  );

  const distributedTasks = distributeTasks(taskDistributorOutput);
  const validatedTasks = validateTasks(distributedTasks);

  const taskCount = validatedTasks.summary?.valid || 0;
  const resolvedMode = resolveCoderMode(config, taskCount);

  if (resolvedMode === "pool") {
    if (!validatedTasks.success) {
      const dispatchResult = {
        mode: "pool",
        taskDistributorOutput,
        distributedTasks,
        validatedTasks,
        poolResult: null,
        coderOutput: {
          success: false,
          reason: "Pool mode selected but distributed tasks are invalid.",
          warnings: [],
          errors: validatedTasks.errors || [],
          data: {
            operations: [],
          },
        },
      };

      await saveAgentOutput(projectPath, "coder_dispatch", dispatchResult);

      return dispatchResult;
    }

    const poolResult = await runCoderPool({
      projectPath,
      agentContext,
      validatedTasks,
      plannerOutput: state.plannerOutput,
      retrieverOutput: state.retrieverOutput,
      contextBuilderOutput: state.contextBuilderOutput,
      fileContext: state.fileContext,
      maxWorkers: config.coder.maxWorkers,
    });

    const dispatchResult = {
      mode: "pool",
      taskDistributorOutput,
      distributedTasks,
      validatedTasks,
      poolResult,
      coderOutput: poolResult.output,
    };

    await saveAgentOutput(projectPath, "coder_dispatch", dispatchResult);

    return dispatchResult;
  }

  const coderOutput = await runCoder(projectPath, agentContext, {
    plannerOutput: state.plannerOutput,
    retrieverOutput: state.retrieverOutput,
    fileContext: state.fileContext,
    contextBuilderOutput: state.contextBuilderOutput,
  });

  const dispatchResult = {
    mode: "single",
    taskDistributorOutput,
    distributedTasks,
    validatedTasks,
    poolResult: null,
    coderOutput,
  };

  await saveAgentOutput(projectPath, "coder_dispatch", dispatchResult);

  return dispatchResult;
}