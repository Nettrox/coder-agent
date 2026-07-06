import fs from "fs/promises";
import path from "path";

function generateFrameworksMarkdown(frameworks) {
  return `# Frameworks

| Framework |
|---|
${
  frameworks.length
    ? frameworks.map((framework) => `| ${framework} |`).join("\n")
    : "| Unknown |"
}
`;
}

export async function generateFrameworksFiles(projectPath, projectDir, frameworks) {
  const data = {
    frameworks,
  };

  await fs.writeFile(
    path.join(projectDir, "frameworks.json"),
    JSON.stringify(data, null, 2),
    "utf8"
  );

  await fs.writeFile(
    path.join(projectDir, "frameworks.md"),
    generateFrameworksMarkdown(frameworks),
    "utf8"
  );

  return data;
}