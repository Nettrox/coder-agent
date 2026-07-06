import fs from "fs/promises";
import path from "path";

export async function saveAgentOutput(projectPath, agentName, output) {
  const outputFile = path.join(
    projectPath,
    ".ai-agent",
    "outputs",
    `${agentName}.json`
  );

  await fs.writeFile(outputFile, JSON.stringify(output, null, 2), "utf8");
}