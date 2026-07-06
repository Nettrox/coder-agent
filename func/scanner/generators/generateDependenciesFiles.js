import fs from "fs/promises";
import path from "path";

async function readPackageJson(projectPath) {
  try {
    const content = await fs.readFile(path.join(projectPath, "package.json"), "utf8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}

function generateDependenciesMarkdown(data) {
  const depRows = Object.entries(data.dependencies || {})
    .map(([name, version]) => `| ${name} | ${version} |`)
    .join("\n");

  const devDepRows = Object.entries(data.devDependencies || {})
    .map(([name, version]) => `| ${name} | ${version} |`)
    .join("\n");

  const scriptRows = Object.entries(data.scripts || {})
    .map(([name, command]) => `| ${name} | \`${command}\` |`)
    .join("\n");

  return `# Dependencies

## Package Manager

${data.packageManager || "unknown"}

## Scripts

| Script | Command |
|---|---|
${scriptRows || "| - | - |"}

## Dependencies

| Package | Version |
|---|---|
${depRows || "| - | - |"}

## Dev Dependencies

| Package | Version |
|---|---|
${devDepRows || "| - | - |"}
`;
}

export async function generateDependenciesFiles(
  projectPath,
  projectDir,
  packageManager
) {
  const packageJson = await readPackageJson(projectPath);

  const data = {
    packageManager,
    hasPackageJson: Boolean(packageJson),
    scripts: packageJson?.scripts || {},
    dependencies: packageJson?.dependencies || {},
    devDependencies: packageJson?.devDependencies || {},
  };

  await fs.writeFile(
    path.join(projectDir, "dependencies.json"),
    JSON.stringify(data, null, 2),
    "utf8"
  );

  await fs.writeFile(
    path.join(projectDir, "dependencies.md"),
    generateDependenciesMarkdown(data),
    "utf8"
  );

  return data;
}