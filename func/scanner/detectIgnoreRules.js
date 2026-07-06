import fs from "fs/promises";
import path from "path";

export async function detectIgnoreRules(projectPath) {
  const files = [".gitignore", ".dockerignore", ".npmignore"];
  const result = {};

  for (const file of files) {
    try {
      const content = await fs.readFile(path.join(projectPath, file), "utf8");
      result[file] = content
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .filter((line) => !line.startsWith("#"));
    } catch {
      result[file] = [];
    }
  }

  return result;
}