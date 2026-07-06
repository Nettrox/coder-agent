import { readFileKnowledge } from "./readFileKnowledge.js";

export async function buildFileContext(projectPath, filePaths = []) {
  const result = {
    success: true,
    reason: "",
    files: [],
    missing: [],
  };

  for (const filePath of filePaths) {
    const fileKnowledge = await readFileKnowledge(projectPath, filePath);

    if (!fileKnowledge.success) {
      result.missing.push({
        path: filePath,
        reason: fileKnowledge.reason,
      });

      continue;
    }

    result.files.push({
      path: fileKnowledge.relativePath,
      language: fileKnowledge.metadata.language,
      size: fileKnowledge.metadata.size,
      hash: fileKnowledge.metadata.hash,
      summary: fileKnowledge.metadata.summary,
      imports: fileKnowledge.metadata.imports,
      exports: fileKnowledge.metadata.exports,
      classes: fileKnowledge.metadata.classes,
      functions: fileKnowledge.metadata.functions,
      routes: fileKnowledge.metadata.routes,
      todos: fileKnowledge.metadata.todos,
      source: fileKnowledge.source,
    });
  }

  if (result.missing.length > 0) {
    result.success = false;
    result.reason = "Some file knowledge entries were missing";
  }

  return result;
}