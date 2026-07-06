import fs from "fs/promises";
import path from "path";

export async function readFile(projectPath, relativePath) {
  const fullPath = path.join(projectPath, relativePath);

  const content = await fs.readFile(fullPath, "utf8");

  return {
    content,
    encoding: "utf8",
  };
}