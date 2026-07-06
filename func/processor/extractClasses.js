export function extractClasses(content, language = "") {
  const classes = [];
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    const classMatch = trimmed.match(/^(?:export\s+)?class\s+([A-Za-z0-9_$]+)/);

    if (classMatch) {
      classes.push({
        name: classMatch[1],
        line: index + 1,
      });
    }
  });

  return classes;
}