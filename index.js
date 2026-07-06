import { getInput } from "./func/getInput.js";
import { ensureAiAgentFolder } from "./func/ensureAiAgentFolder.js";
import { runAgent } from "./func/runAgent.js";

const projectPath = await getInput("Project path: ");
const userRequest = await getInput("Request: ");

await ensureAiAgentFolder(projectPath);

const plannerOutput = await runAgent("planner", projectPath, {
  user_request: userRequest,
});

const coderOutput = await runAgent("coder", projectPath, {
  user_request: userRequest,
  planner_output: plannerOutput,
});

const validatorOutput = await runAgent("validator", projectPath, {
  user_request: userRequest,
  planner_output: plannerOutput,
  coder_output: coderOutput,
});

let finalOutput = coderOutput;

if (validatorOutput?.data?.needs_fixer) {
  finalOutput = await runAgent("fixer", projectPath, {
    user_request: userRequest,
    validator_output: validatorOutput,
    coder_output: coderOutput,
  });
}

console.log(JSON.stringify(finalOutput, null, 2));