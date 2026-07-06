import fs from "fs/promises";
import path from "path";
import { AI_AGENT } from "../../config/aiAgentConfig.js";

function safeFolderName(name) {
  return String(name || "unknown")
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "_")
    .replace(/\s+/g, "_")
    .slice(0, 120);
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function writeJson(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

async function writeText(filePath, content) {
  await fs.writeFile(filePath, content, "utf8");
}

function addToIndex(index, key, item) {
  if (!key) return;

  if (!index[key]) {
    index[key] = [];
  }

  index[key].push(item);
}

function formatIndexMarkdown(title, index) {
  const rows = Object.entries(index)
    .map(([name, items]) => `| ${name} | ${items.length} |`)
    .join("\n");

  return `# ${title}

| Name | Occurrences |
|---|---:|
${rows || "| - | - |"}
`;
}

function formatEntityMarkdown(title, data) {
  return `# ${title}

\`\`\`json
${JSON.stringify(data, null, 2)}
\`\`\`
`;
}

async function writeKnowledgeCategory(projectPath, dirName, title, index) {
  const categoryDir = path.join(
    projectPath,
    AI_AGENT.ROOT,
    dirName
  );

  await ensureDir(categoryDir);

  await writeJson(path.join(categoryDir, "index.json"), index);
  await writeText(
    path.join(categoryDir, "index.md"),
    formatIndexMarkdown(title, index)
  );

  for (const [name, occurrences] of Object.entries(index)) {
    const entityDir = path.join(categoryDir, safeFolderName(name));

    await ensureDir(entityDir);

    const metadata = {
      name,
      occurrenceCount: occurrences.length,
      occurrences,
      generatedAt: new Date().toISOString(),
    };

    await writeJson(path.join(entityDir, "metadata.json"), metadata);
    await writeText(
      path.join(entityDir, "metadata.md"),
      formatEntityMarkdown(name, metadata)
    );
  }
}

async function writeHtmlKnowledge(projectPath, htmlIndex) {
  const htmlDir = path.join(
    projectPath,
    AI_AGENT.ROOT,
    AI_AGENT.DIRS.KNOWLEDGE_HTML
  );

  await ensureDir(htmlDir);

  await writeJson(path.join(htmlDir, "index.json"), htmlIndex);

  const rows = Object.entries(htmlIndex)
    .map(([file, signals]) => {
      return `| ${file} | ${signals.title || "-"} | ${signals.ids.length} | ${signals.classes.length} | ${signals.buttons.length} | ${signals.scripts} | ${signals.styles} |`;
    })
    .join("\n");

  await writeText(
    path.join(htmlDir, "index.md"),
    `# HTML Knowledge

| File | Title | IDs | Classes | Buttons | Scripts | Styles |
|---|---|---:|---:|---:|---:|---:|
${rows || "| - | - | - | - | - | - | - |"}
`
  );

  for (const [file, signals] of Object.entries(htmlIndex)) {
    const entityDir = path.join(htmlDir, safeFolderName(file));

    await ensureDir(entityDir);

    const metadata = {
      file,
      signals,
      generatedAt: new Date().toISOString(),
    };

    await writeJson(path.join(entityDir, "metadata.json"), metadata);
    await writeText(
      path.join(entityDir, "metadata.md"),
      formatEntityMarkdown(file, metadata)
    );
  }
}

export async function generateKnowledgeIndexes(projectPath, processedFiles) {
  const functionsIndex = {};
  const classesIndex = {};
  const importsIndex = {};
  const exportsIndex = {};
  const htmlIndex = {};

  for (const file of processedFiles) {
    for (const fn of file.metadata.functions || []) {
      addToIndex(functionsIndex, fn.name, {
        file: file.relativePath,
        line: fn.line,
        type: fn.type,
        language: file.metadata.language,
      });
    }

    for (const cls of file.metadata.classes || []) {
      addToIndex(classesIndex, cls.name, {
        file: file.relativePath,
        line: cls.line,
        language: file.metadata.language,
      });
    }

    for (const imp of file.metadata.imports || []) {
      addToIndex(importsIndex, imp.source, {
        file: file.relativePath,
        line: imp.line,
        type: imp.type,
        language: file.metadata.language,
      });
    }

    for (const exp of file.metadata.exports || []) {
      addToIndex(exportsIndex, exp.name, {
        file: file.relativePath,
        line: exp.line,
        type: exp.type,
        language: file.metadata.language,
      });
    }

    if (file.metadata.htmlSignals) {
      htmlIndex[file.relativePath] = file.metadata.htmlSignals;
    }
  }

  await writeKnowledgeCategory(
    projectPath,
    AI_AGENT.DIRS.KNOWLEDGE_FUNCTIONS,
    "Functions Knowledge",
    functionsIndex
  );

  await writeKnowledgeCategory(
    projectPath,
    AI_AGENT.DIRS.KNOWLEDGE_CLASSES,
    "Classes Knowledge",
    classesIndex
  );

  await writeKnowledgeCategory(
    projectPath,
    AI_AGENT.DIRS.KNOWLEDGE_IMPORTS,
    "Imports Knowledge",
    importsIndex
  );

  await writeKnowledgeCategory(
    projectPath,
    AI_AGENT.DIRS.KNOWLEDGE_EXPORTS,
    "Exports Knowledge",
    exportsIndex
  );

  await writeHtmlKnowledge(projectPath, htmlIndex);

  return {
    functions: Object.keys(functionsIndex).length,
    classes: Object.keys(classesIndex).length,
    imports: Object.keys(importsIndex).length,
    exports: Object.keys(exportsIndex).length,
    html: Object.keys(htmlIndex).length,
  };
}