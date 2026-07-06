import fs from "fs/promises";
import path from "path";

export async function detectGit(projectPath) {
  try {
    await fs.access(path.join(projectPath, ".git"));
    return {
      isGitRepository: true,
    };
  } catch {
    return {
      isGitRepository: false,
    };
  }
}