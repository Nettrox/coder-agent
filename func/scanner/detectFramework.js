import fs from "fs/promises";
import path from "path";

export async function detectFramework(projectPath, files) {
  const paths = new Set(files.map((file) => file.path));
  const frameworks = [];

  if (paths.has("package.json")) {
    try {
      const packageJson = JSON.parse(
        await fs.readFile(path.join(projectPath, "package.json"), "utf8")
      );

      const deps = {
        ...(packageJson.dependencies || {}),
        ...(packageJson.devDependencies || {}),
      };

      if (deps.next) frameworks.push("Next.js");
      if (deps.react) frameworks.push("React");
      if (deps.vue) frameworks.push("Vue");
      if (deps.svelte) frameworks.push("Svelte");
      if (deps.express) frameworks.push("Express");
      if (deps.fastify) frameworks.push("Fastify");
      if (deps["@nestjs/core"]) frameworks.push("NestJS");
      if (deps.vite) frameworks.push("Vite");
      if (deps.electron) frameworks.push("Electron");
    } catch {}
  }

  if (paths.has("manage.py")) frameworks.push("Django");
  if (paths.has("app.py") || paths.has("main.py")) frameworks.push("Python App");
  if (paths.has("artisan")) frameworks.push("Laravel");

  return frameworks.length ? frameworks : ["Unknown"];
}