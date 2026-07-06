import fs from "fs/promises";
import path from "path";

function generateLanguagesMarkdown(language) {
  return `# Languages

## Primary Language

${language.primary || "Unknown"}

## Detected Languages

| Language | File Count |
|---|---|
${
  language.detected?.length
    ? language.detected.map((item) => `| ${item.language} | ${item.count} |`).join("\n")
    : "| - | - |"
}
`;
}

export async function generateLanguagesFiles(projectPath, projectDir, language) {
  await fs.writeFile(
    path.join(projectDir, "languages.json"),
    JSON.stringify(language, null, 2),
    "utf8"
  );

  await fs.writeFile(
    path.join(projectDir, "languages.md"),
    generateLanguagesMarkdown(language),
    "utf8"
  );

  return language;
}