import { runAgent } from "../runAgent.js";

export async function runPlanner(projectPath, agentContext) {
  return await runAgent("planner", projectPath, agentContext);
}