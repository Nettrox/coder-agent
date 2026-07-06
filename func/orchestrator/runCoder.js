import { runAgent } from "../runAgent.js";

export async function runCoder(projectPath, agentContext, state) {
  return await runAgent("coder", projectPath, {
    ...agentContext,
    planner_output: state.plannerOutput,
    retriever_output: state.retrieverOutput,
    file_context: state.fileContext,
  });
}