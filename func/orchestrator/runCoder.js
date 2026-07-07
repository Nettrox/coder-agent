import { runAgent } from "../runAgent.js";

export async function runCoder(projectPath, agentContext, state) {
  return await runAgent("coder", projectPath, {
    request: agentContext.request,

    project: {
      summary: agentContext.project?.summary || {},
    },

    context_builder_output: state.contextBuilderOutput,

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
  });
}