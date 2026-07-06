export function extractExports(content, language = "") {
  const exports = [];
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    const namedFunctionMatch = trimmed.match(/^export\s+function\s+([A-Za-z0-9_$]+)/);
    const namedClassMatch = trimmed.match(/^export\s+class\s+([A-Za-z0-9_$]+)/);
    const constMatch = trimmed.match(/^export\s+const\s+([A-Za-z0-9_$]+)/);
    const defaultMatch = trimmed.match(/^export\s+default\s+(.+)/);
    const exportListMatch = trimmed.match(/^export\s+\{(.+)\}/);

    if (namedFunctionMatch) {
      exports.push({
        name: namedFunctionMatch[1],
        type: "function",
        line: index + 1,
      });
    }

    if (namedClassMatch) {
      exports.push({
        name: namedClassMatch[1],
        type: "class",
        line: index + 1,
      });
    }

    if (constMatch) {
      exports.push({
        name: constMatch[1],
        type: "const",
        line: index + 1,
      });
    }

    if (defaultMatch) {
      exports.push({
        name: "default",
        type: "default",
        value: defaultMatch[1],
        line: index + 1,
      });
    }

    if (exportListMatch) {
      const names = exportListMatch[1]
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      for (const name of names) {
        exports.push({
          name,
          type: "named",
          line: index + 1,
        });
      }
    }
  });

  return exports;
}