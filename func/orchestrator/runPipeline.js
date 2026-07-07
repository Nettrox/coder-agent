import { runCoderDispatcher } from "./runCoderDispatcher.js";
import { runPlanner } from "./runPlanner.js";
import { runRetriever } from "./runRetriever.js";
import { runContextBuilder } from "./runContextBuilder.js";
import { runValidator } from "./runValidator.js";
import { runFixer } from "./runFixer.js";
import { runWriter } from "./runWriter.js";

import { buildRetrieverContext } from "../context/buildRetrieverContext.js";

export async function runPipeline(projectPath, agentContext) {
  // Planner
  const plannerOutput = await runPlanner(projectPath, agentContext);

  // Retriever
  const retrieverOutput = await runRetriever(projectPath, agentContext, {
    plannerOutput,
  });

  // File Context
  const fileContext = await buildRetrieverContext(
    projectPath,
    retrieverOutput
  );

  // Context Builder
  const contextBuilderOutput = await runContextBuilder(
    projectPath,
    agentContext,
    {
      plannerOutput,
      retrieverOutput,
      fileContext,
    }
  );

  // Coder
  const coderDispatch = await runCoderDispatcher(projectPath, agentContext, {
        plannerOutput,
        retrieverOutput,
        fileContext,
        contextBuilderOutput,
    });

    const coderOutput = coderDispatch.coderOutput;

  // Validator
  const validatorOutput = await runValidator(projectPath, agentContext, {
    plannerOutput,
    retrieverOutput,
    fileContext,
    coderOutput,
  });

  // Fixer (optional)
  let fixerOutput = null;
  let finalOutput = coderOutput;

  if (validatorOutput?.data?.needs_fixer) {
    fixerOutput = await runFixer(projectPath, agentContext, {
      plannerOutput,
      retrieverOutput,
      fileContext,
      contextBuilderOutput,
      coderOutput,
      validatorOutput,
    });

    finalOutput = fixerOutput;
  }

  // Writer
  let writerOutput = null;

  const canWrite =
    validatorOutput?.data?.valid === true ||
    fixerOutput?.success === true;

  if (canWrite) {
    writerOutput = await runWriter(projectPath, agentContext, {
      coderOutput,
      fixerOutput,
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
        fixer: fixerOutput,
      },

      contexts: {
        file_context: fileContext,
      },

      execution: {
        writer: writerOutput,
      },

      final: finalOutput,
    },
  };
}