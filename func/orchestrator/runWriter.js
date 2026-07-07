import { runWriter as executeWriter } from "../writer/runWriter.js";

function buildFinalAgentOutput(state) {
  if (state.fixerOutput?.success === true) {
    const correctedOperations =
      state.fixerOutput.data?.corrected_operations ||
      state.fixerOutput.data?.corrected_files_changed ||
      [];

    return {
      success: true,
      reason: state.fixerOutput.reason || "",
      warnings: state.fixerOutput.warnings || [],
      errors: state.fixerOutput.errors || [],
      data: {
        operations: correctedOperations,
      },
    };
  }

  return state.coderOutput;
}

export async function runWriter(projectPath, agentContext, state) {
  const finalAgentOutput = buildFinalAgentOutput(state);

  return await executeWriter({
    projectPath,
    sessionId: agentContext?.session?.id || "",
    sessionPath: "",
    agentOutput: finalAgentOutput,
    source: state.fixerOutput?.success === true ? "fixer" : "coder",
  });
}