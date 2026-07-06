import fs from "fs/promises";
import path from "path";

function generateConfigsMarkdown(configs, ignoreRules) {
  return `# Configuration Files

## Detected Config Files

| File |
|---|
${
  configs.length
    ? configs.map((file) => `| ${file} |`).join("\n")
    : "| - |"
}

## Ignore Rules

### .gitignore

\`\`\`text
${ignoreRules[".gitignore"]?.join("\n") || ""}
\`\`\`

### .dockerignore

\`\`\`text
${ignoreRules[".dockerignore"]?.join("\n") || ""}
\`\`\`

### .npmignore

\`\`\`text
${ignoreRules[".npmignore"]?.join("\n") || ""}
\`\`\`
`;
}

export async function generateConfigsFiles(projectPath, projectDir, configs, ignoreRules) {
  const data = {
    configs,
    ignoreRules,
  };

  await fs.writeFile(
    path.join(projectDir, "configs.json"),
    JSON.stringify(data, null, 2),
    "utf8"
  );

  await fs.writeFile(
    path.join(projectDir, "configs.md"),
    generateConfigsMarkdown(configs, ignoreRules),
    "utf8"
  );

  return data;
}