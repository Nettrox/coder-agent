export function detectPackageManager(files) {
  const paths = new Set(files.map((file) => file.path));

  if (paths.has("pnpm-lock.yaml")) return "pnpm";
  if (paths.has("yarn.lock")) return "yarn";
  if (paths.has("package-lock.json")) return "npm";
  if (paths.has("bun.lockb")) return "bun";
  if (paths.has("requirements.txt")) return "pip";
  if (paths.has("poetry.lock")) return "poetry";
  if (paths.has("Pipfile")) return "pipenv";
  if (paths.has("composer.lock")) return "composer";
  if (paths.has("go.mod")) return "go";
  if (paths.has("Cargo.toml")) return "cargo";

  return "unknown";
}