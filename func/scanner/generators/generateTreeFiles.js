import fs from "fs/promises";
import path from "path";

function buildTree(files, folders) {
  return {
    folders,
    files,
  };
}

function generateTreeMarkdown(tree) {
  return `# Project Tree

## Folders

| Path | Depth |
|---|---|
${
  tree.folders.length
    ? tree.folders.map((folder) => `| ${folder.path} | ${folder.depth} |`).join("\n")
    : "| - | - |"
}

## Files

| Path | Size |
|---|---|
${
  tree.files.length
    ? tree.files.map((file) => `| ${file.path} | ${file.size} bytes |`).join("\n")
    : "| - | - |"
}
`;
}

export async function generateTreeFiles(projectPath, projectDir, files, folders) {
  const tree = buildTree(files, folders);

  await fs.writeFile(
    path.join(projectDir, "tree.json"),
    JSON.stringify(tree, null, 2),
    "utf8"
  );

  await fs.writeFile(
    path.join(projectDir, "tree.md"),
    generateTreeMarkdown(tree),
    "utf8"
  );

  return tree;
}