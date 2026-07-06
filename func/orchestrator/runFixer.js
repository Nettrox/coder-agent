import { runAgent } from "../runAgent.js";

export async function runFixer(projectPath, agentContext, state) {
  return await runAgent("fixer", projectPath, {
    ...agentContext,
    planner_output: state.plannerOutput,
    coder_output: state.coderOutput,
    validator_output: state.validatorOutput,
  });
}