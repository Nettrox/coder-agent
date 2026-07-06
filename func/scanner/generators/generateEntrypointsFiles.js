import fs from "fs/promises";
import path from "path";

function generateEntrypointsMarkdown(entryPoints) {
  return `# Entry Points

| File |
|---|
${
  entryPoints.length
    ? entryPoints.map((entry) => `| ${entry} |`).join("\n")
    : "| - |"
}
`;
}

export async function generateEntrypointsFiles(projectPath, projectDir, entryPoints) {
  const data = {
    entryPoints,
  };

  await fs.writeFile(
    path.join(projectDir, "entrypoints.json"),
    JSON.stringify(data, null, 2),
    "utf8"
  );

  await fs.writeFile(
    path.join(projectDir, "entrypoints.md"),
    generateEntrypointsMarkdown(entryPoints),
    "utf8"
  );

  return data;
}