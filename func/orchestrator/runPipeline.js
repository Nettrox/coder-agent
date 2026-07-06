import { runPlanner } from "./runPlanner.js";
import { runCoder } from "./runCoder.js";
import { runValidator } from "./runValidator.js";
import { runFixer } from "./runFixer.js";

export async function runPipeline(projectPath, agentContext) {
  const plannerOutput = await runPlanner(projectPath, agentContext);

  const coderOutput = await runCoder(projectPath, agentContext, {
    plannerOutput,
  });

  const validatorOutput = await runValidator(projectPath, agentContext, {
    plannerOutput,
    coderOutput,
  });

  let finalOutput = coderOutput;

  if (validatorOutput?.data?.needs_fixer) {
    finalOutput = await runFixer(projectPath, agentContext, {
      plannerOutput,
      coderOutput,
      validatorOutput,
    });
  }

  return {
    success: finalOutput?.success === true,
    reason: finalOutput?.reason || "",
    warnings: finalOutput?.warnings || [],
    errors: finalOutput?.errors || [],
    data: {
      planner: plannerOutput,
      coder: coderOutput,
      validator: validatorOutput,
      final: finalOutput,
    },
  };
}