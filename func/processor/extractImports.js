export function extractImports(content, language = "") {
  const imports = [];
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    const jsImportMatch = trimmed.match(/^import\s+.*?\s+from\s+["'](.+)["'];?/);
    const jsSideEffectImportMatch = trimmed.match(/^import\s+["'](.+)["'];?/);
    const requireMatch = trimmed.match(/require\(["'](.+)["']\)/);

    if (jsImportMatch) {
      imports.push({
        source: jsImportMatch[1],
        type: "import",
        line: index + 1,
      });
    }

    if (jsSideEffectImportMatch) {
      imports.push({
        source: jsSideEffectImportMatch[1],
        type: "side-effect-import",
        line: index + 1,
      });
    }

    if (requireMatch) {
      imports.push({
        source: requireMatch[1],
        type: "require",
        line: index + 1,
      });
    }
  });

  return imports;
}