import fs from "fs/promises";
import path from "path";
import { formatMemoryMarkdown } from "./formatMarkdown.js";

export async function saveMemory(projectPath, memory) {
  const memoryDir = path.join(projectPath, ".ai-agent", "memory");

  const jsonFile = path.join(memoryDir, "session-summary.json");
  const mdFile = path.join(memoryDir, "session-summary.md");

  await fs.writeFile(jsonFile, JSON.stringify(memory, null, 2), "utf8");
  await fs.writeFile(mdFile, formatMemoryMarkdown(memory), "utf8");
}