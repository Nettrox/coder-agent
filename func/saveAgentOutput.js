import fs from "fs/promises";
import path from "path";
import { formatAgentOutputMarkdown } from "./formatMarkdown.js";

export async function saveAgentOutput(projectPath, agentName, output) {
  const outputsDir = path.join(projectPath, ".ai-agent", "outputs");

  const jsonFile = path.join(outputsDir, `${agentName}.json`);
  const mdFile = path.join(outputsDir, `${agentName}.md`);

  await fs.writeFile(jsonFile, JSON.stringify(output, null, 2), "utf8");

  await fs.writeFile(
    mdFile,
    formatAgentOutputMarkdown(agentName, output),
    "utf8"
  );
}