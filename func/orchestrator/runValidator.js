import { runAgent } from "../runAgent.js";

export async function runValidator(projectPath, agentContext, state) {
  return await runAgent("validator", projectPath, {
    ...agentContext,
    planner_output: state.plannerOutput,
    retriever_output: state.retrieverOutput,
    file_context: state.fileContext,
    coder_output: state.coderOutput,
  });
}