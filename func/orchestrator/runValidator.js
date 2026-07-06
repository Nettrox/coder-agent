import { runAgent } from "../runAgent.js";

export async function runValidator(projectPath, agentContext, state) {
  return await runAgent("validator", projectPath, {
    ...agentContext,
    planner_output: state.plannerOutput,
    coder_output: state.coderOutput,
  });
}