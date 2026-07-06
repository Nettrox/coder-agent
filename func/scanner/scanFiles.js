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

export async function scanFiles(projectPath, options = {}) {
  const ignored = new Set([...(options.ignored || []), ...DEFAULT_IGNORES]);
  const files = [];

  async function walk(currentPath) {
    const entries = await fs.readdir(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      if (ignored.has(entry.name)) continue;

      const fullPath = path.join(currentPath, entry.name);
      const relativePath = path.relative(projectPath, fullPath);

      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }

      const stat = await fs.stat(fullPath);

      files.push({
        path: relativePath,
        name: entry.name,
        extension: path.extname(entry.name),
        size: stat.size,
        modifiedAt: stat.mtime.toISOString(),
      });
    }
  }

  await walk(projectPath);

  return files.sort((a, b) => a.path.localeCompare(b.path));
}