import { runAgent } from "../runAgent.js";

export async function runTaskDistributor(projectPath, agentContext, state) {
  return await runAgent("task_distributor", projectPath, {
    request: agentContext.request,

    project: {
      summary: agentContext.project?.summary || {},
    },

    planner_output: {
      success: state.plannerOutput?.success,
      data: {
        goal: state.plannerOutput?.data?.goal,
        task_type: state.plannerOutput?.data?.task_type,
        steps: state.plannerOutput?.data?.steps || [],
        possible_new_files:
          state.plannerOutput?.data?.possible_new_files || [],
      },
    },

    retriever_output: {
      success: state.retrieverOutput?.success,
      data: {
        selected_files: state.retrieverOutput?.data?.selected_files || [],
        possible_new_files:
          state.retrieverOutput?.data?.possible_new_files || [],
        selected_symbols: state.retrieverOutput?.data?.selected_symbols || [],
      },
    },

    context_builder_output: state.contextBuilderOutput,
  });
}