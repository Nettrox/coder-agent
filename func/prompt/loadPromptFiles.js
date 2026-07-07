import fs from "fs/promises";
import path from "path";

const SHARED_PROMPT_FILES = [
  "json_rules.md",
  "response_rules.md",
  "quality_rules.md",
  "coding_rules.md",
  "project_rules.md",
];

export async function loadPromptFiles(agentName, options = {}) {
  const promptName = options.promptName || agentName;

  const root = process.cwd();

  const sharedDir = path.join(root, "prompts", "shared");
  const agentPromptPath = path.join(root, "prompts", `${promptName}.md`);

  const sharedPrompts = [];

  for (const fileName of SHARED_PROMPT_FILES) {
    const filePath = path.join(sharedDir, fileName);
    const content = await fs.readFile(filePath, "utf8");

    sharedPrompts.push({
      name: fileName,
      content,
    });
  }

  const agentPrompt = await fs.readFile(agentPromptPath, "utf8");

  return {
    agentName,
    promptName,
    sharedPrompts,
    agentPrompt,
  };
}