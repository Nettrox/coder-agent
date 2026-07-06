export function extractFunctions(content, language = "") {
  const functions = [];
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    const declarationMatch = trimmed.match(/^(?:export\s+)?(?:async\s+)?function\s+([A-Za-z0-9_$]+)\s*\(/);
    const constArrowMatch = trimmed.match(/^(?:export\s+)?const\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s*)?\(?/);
    const methodMatch = trimmed.match(/^([A-Za-z0-9_$]+)\s*\([^)]*\)\s*\{/);

    if (declarationMatch) {
      functions.push({
        name: declarationMatch[1],
        type: "function-declaration",
        line: index + 1,
      });
      return;
    }

    if (constArrowMatch && trimmed.includes("=>")) {
      functions.push({
        name: constArrowMatch[1],
        type: "arrow-function",
        line: index + 1,
      });
      return;
    }

    if (
      methodMatch &&
      !["if", "for", "while", "switch", "catch", "function"].includes(
        methodMatch[1]
      )
    ) {
      functions.push({
        name: methodMatch[1],
        type: "method",
        line: index + 1,
      });
    }
  });

  return functions;
}