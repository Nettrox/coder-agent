import { runPlanner } from "./runPlanner.js";
import { runRetriever } from "./runRetriever.js";
import { runCoder } from "./runCoder.js";
import { runValidator } from "./runValidator.js";
import { runFixer } from "./runFixer.js";
import { buildRetrieverContext } from "../context/buildRetrieverContext.js";
import { runContextBuilder } from "./runContextBuilder.js";

export async function runPipeline(projectPath, agentContext) {
  const plannerOutput = await runPlanner(projectPath, agentContext);

  const retrieverOutput = await runRetriever(projectPath, agentContext, {
    plannerOutput,
  });

  const fileContext = await buildRetrieverContext(
    projectPath,
    retrieverOutput
  );
  const contextBuilderOutput = await runContextBuilder(projectPath, agentContext, {
    plannerOutput,
    retrieverOutput,
    fileContext,
    });

  const coderOutput = await runCoder(projectPath, agentContext, {
    plannerOutput,
    retrieverOutput,
    fileContext,
    contextBuilderOutput,
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
        agents: {
        planner: plannerOutput,
        retriever: retrieverOutput,
        context_builder: contextBuilderOutput,
        coder: coderOutput,
        validator: validatorOutput,
        },

        contexts: {
        file_context: fileContext,
        },

        final: finalOutput,
    },
    };
}