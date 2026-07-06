import { runPlanner } from "./runPlanner.js";
import { runRetriever } from "./runRetriever.js";
import { runCoder } from "./runCoder.js";
import { runValidator } from "./runValidator.js";
import { runFixer } from "./runFixer.js";
import { buildRetrieverContext } from "../context/buildRetrieverContext.js";

export async function runPipeline(projectPath, agentContext) {
  const plannerOutput = await runPlanner(projectPath, agentContext);

  const retrieverOutput = await runRetriever(projectPath, agentContext, {
    plannerOutput,
  });

  const fileContext = await buildRetrieverContext(
    projectPath,
    retrieverOutput
  );

  const coderOutput = await runCoder(projectPath, agentContext, {
    plannerOutput,
    retrieverOutput,
    fileContext,
  });

  const validatorOutput = await runValidator(projectPath, agentContext, {
    plannerOutput,
    retrieverOutput,
    fileContext,
    coderOutput,
  });

  let finalOutput = coderOutput;

  if (validatorOutput?.data?.needs_fixer) {
    finalOutput = await runFixer(projectPath, agentContext, {
      plannerOutput,
      retrieverOutput,
      fileContext,
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
      retriever: retrieverOutput,
      file_context: fileContext,
      coder: coderOutput,
      validator: validatorOutput,
      final: finalOutput,
    },
  };
}