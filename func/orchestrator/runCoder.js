import { runAgent } from "../runAgent.js";

export async function runCoder(projectPath, agentContext, state) {
  return await runAgent("coder", projectPath, {
    ...agentContext,
    planner_output: state.plannerOutput,
  });
}