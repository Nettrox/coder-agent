import { loadPromptFiles } from "./loadPromptFiles.js";

function section(title, content) {
  return `# ${title}

${content}`;
}

export async function buildPrompt(agentName, payload, options = {}) {
  const { sharedPrompts, agentPrompt, promptName } = await loadPromptFiles(
    agentName,
    options
  );

  const sharedSections = sharedPrompts
    .map((prompt) => section(`SHARED: ${prompt.name}`, prompt.content))
    .join("\n\n---\n\n");

  const runtimeInput = JSON.stringify(payload, null, 2);

  return [
    "# AI CODER AGENT RUNTIME PROMPT",
    "",
    "This prompt is assembled from shared runtime rules, the agent definition, and runtime input.",
    "",
    "---",
    "",
    sharedSections,
    "",
    "---",
    "",
    section(`AGENT: ${promptName}`, agentPrompt),
    "",
    "---",
    "",
    "# RUNTIME INPUT",
    "",
    runtimeInput,
  ].join("\n");
}