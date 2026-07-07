import { runAgent } from "../runAgent.js";
import { sanitizeAgentOutputForValidation } from "../context/sanitizeAgentOutputForValidation.js";

export async function runValidator(projectPath, agentContext, state) {
  return await runAgent("validator", projectPath, {
    ...agentContext,
    planner_output: state.plannerOutput,
    retriever_output: state.retrieverOutput,
    file_context: {
      success: state.fileContext?.success,
      reason: state.fileContext?.reason,
      files: state.fileContext?.files?.map((file) => ({
        path: file.path,
        language: file.language,
        size: file.size,
        hash: file.hash,
      })) || [],
      missing: state.fileContext?.missing || [],
    },
    context_builder_output: state.contextBuilderOutput,
    coder_output: sanitizeAgentOutputForValidation(state.coderOutput),
  });
}