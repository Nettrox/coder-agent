import { runAgent } from "../runAgent.js";
import { sanitizeAgentOutputForValidation } from "../context/sanitizeAgentOutputForValidation.js";

export async function runFixer(projectPath, agentContext, state) {
  return await runAgent("fixer", projectPath, {
    request: agentContext.request,

    project: {
      summary: agentContext.project?.summary || {},
    },

    planner_output: {
      success: state.plannerOutput?.success,
      data: {
        goal: state.plannerOutput?.data?.goal,
        task_type: state.plannerOutput?.data?.task_type,
        steps: state.plannerOutput?.data?.steps,
      },
    },

    retriever_output: {
      success: state.retrieverOutput?.success,
      data: {
        selected_files: state.retrieverOutput?.data?.selected_files || [],
        selected_symbols: state.retrieverOutput?.data?.selected_symbols || [],
      },
    },

    context_builder_output: state.contextBuilderOutput,

    coder_output: sanitizeAgentOutputForValidation(state.coderOutput),

    validator_output: state.validatorOutput,
  });
}