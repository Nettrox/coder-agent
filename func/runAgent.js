import { getAgentSession } from "./getAgentSession.js";
import { askAiSession } from "./askAiSession.js";
import { loadPrompt } from "./loadPrompt.js";
import { parseJsonResponse } from "./parseJsonResponse.js";
import { logAgentRun } from "./logAgentRun.js";
import { saveAgentOutput } from "./saveAgentOutput.js";

export async function runAgent(agentName, projectPath, payload) {
  const sessionId = await getAgentSession(projectPath, agentName);
  const prompt = await loadPrompt(agentName);

  const message = [
    prompt,
    "",
    "INPUT:",
    JSON.stringify(payload, null, 2),
    ].join("\n");

  const rawAnswer = await askAiSession(sessionId, message, {
    stream: false,
  });

  const parsedAnswer = parseJsonResponse(rawAnswer);

  await saveAgentOutput(projectPath, agentName, parsedAnswer);

  await logAgentRun(projectPath, {
    agent: agentName,
    sessionId,
    input: payload,
    rawOutput: rawAnswer,
    parsedOutput: parsedAnswer,
    success: parsedAnswer.success,
  });

  return parsedAnswer;
}