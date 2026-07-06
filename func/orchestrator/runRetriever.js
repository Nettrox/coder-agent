import { runAgent } from "../runAgent.js";

export async function runRetriever(projectPath, agentContext, state) {
  return await runAgent("retriever", projectPath, {
    ...agentContext,
    planner_output: state.plannerOutput,
  });
}