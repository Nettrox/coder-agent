import { getAgentSession } from "./getAgentSession.js";
import { askAiSession } from "./askAiSession.js";
import { parseJsonResponse } from "./parseJsonResponse.js";
import { logAgentRun } from "./logAgentRun.js";
import { saveAgentOutput } from "./saveAgentOutput.js";

import { buildPrompt } from "./prompt/buildPrompt.js";
import { validatePrompt } from "./prompt/validatePrompt.js";
import { cachePrompt } from "./prompt/cachePrompt.js";

export async function runAgent(agentName, projectPath, payload, options = {}) {
  const outputName = options.outputName || agentName;
  const promptName = options.promptName || agentName;

  const sessionId = await getAgentSession(projectPath, agentName);

  const prompt = await buildPrompt(agentName, payload, {
    promptName,
  });

  const promptValidation = validatePrompt(prompt);

  if (!promptValidation.valid) {
    const failedOutput = {
      success: false,
      reason: "Prompt validation failed",
      warnings: [],
      errors: promptValidation.issues.map((issue) => ({
        message: issue,
      })),
      data: {},
    };

    await saveAgentOutput(projectPath, outputName, failedOutput);

    await logAgentRun(projectPath, {
      agent: agentName,
      promptName,
      outputName,
      sessionId,
      input: payload,
      rawOutput: "",
      parsedOutput: failedOutput,
      success: false,
    });

    return failedOutput;
  }

  await cachePrompt(projectPath, outputName, prompt);

  const rawAnswer = await askAiSession(sessionId, prompt, {
    stream: false,
  });

  const parsedAnswer = parseJsonResponse(rawAnswer);

  await saveAgentOutput(projectPath, outputName, parsedAnswer);

  await logAgentRun(projectPath, {
    agent: agentName,
    promptName,
    outputName,
    sessionId,
    input: payload,
    promptCache: `.ai-agent/cache/prompts/${outputName}.prompt.md`,
    rawOutput: rawAnswer,
    parsedOutput: parsedAnswer,
    success: parsedAnswer.success,
  });

  return parsedAnswer;
}