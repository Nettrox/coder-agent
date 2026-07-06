import { loadPromptFiles } from "./loadPromptFiles.js";

function section(title, content) {
  return `# ${title}

${content}`;
}

export async function buildPrompt(agentName, payload) {
  const { sharedPrompts, agentPrompt } = await loadPromptFiles(agentName);

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
    section(`AGENT: ${agentName}`, agentPrompt),
    "",
    "---",
    "",
    "# RUNTIME INPUT",
    "",
    runtimeInput,
  ].join("\n");
}