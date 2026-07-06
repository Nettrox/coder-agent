import { runAgent } from "../runAgent.js";

export async function runContextBuilder(projectPath, agentContext, state) {
  return await runAgent("context_builder", projectPath, {
    ...agentContext,
    planner_output: state.plannerOutput,
    retriever_output: state.retrieverOutput,
    file_context: state.fileContext,
  });
}