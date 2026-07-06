import fs from "fs/promises";
import path from "path";

export async function loadPrompt(agentName) {
  const root = process.cwd();

  const sharedDir = path.join(root, "prompts", "shared");
  const agentPromptPath = path.join(root, "prompts", `${agentName}.md`);

  const sharedFiles = [
    "json_rules.md",
    "coding_rules.md",
    "project_rules.md",
    "response_rules.md",
    "quality_rules.md",
  ];

  const sharedPrompts = [];

  for (const file of sharedFiles) {
    const content = await fs.readFile(path.join(sharedDir, file), "utf8");
    sharedPrompts.push(content);
  }

  const agentPrompt = await fs.readFile(agentPromptPath, "utf8");

  return [...sharedPrompts, agentPrompt].join("\n\n---\n\n");
}