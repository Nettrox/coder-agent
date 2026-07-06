import fs from "fs/promises";
import path from "path";

const DEFAULT_IGNORES = new Set([
  "node_modules",
  ".git",
  ".ai-agent",
  "dist",
  "build",
  ".next",
  ".nuxt",
  "coverage",
  ".cache",
  ".turbo",
  "vendor",
]);

export async function scanFolders(projectPath, options = {}) {
  const ignored = new Set([...(options.ignored || []), ...DEFAULT_IGNORES]);
  const folders = [];

  async function walk(currentPath, depth = 0) {
    const entries = await fs.readdir(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (ignored.has(entry.name)) continue;

      const fullPath = path.join(currentPath, entry.name);
      const relativePath = path.relative(projectPath, fullPath);

      folders.push({
        path: relativePath,
        name: entry.name,
        depth,
      });

      await walk(fullPath, depth + 1);
    }
  }

  await walk(projectPath);

  return folders.sort((a, b) => a.path.localeCompare(b.path));
}