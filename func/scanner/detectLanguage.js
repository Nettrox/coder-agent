const LANGUAGE_BY_EXTENSION = {
  ".js": "JavaScript",
  ".jsx": "JavaScript React",
  ".ts": "TypeScript",
  ".tsx": "TypeScript React",
  ".py": "Python",
  ".java": "Java",
  ".cs": "C#",
  ".php": "PHP",
  ".rb": "Ruby",
  ".go": "Go",
  ".rs": "Rust",
  ".cpp": "C++",
  ".c": "C",
  ".html": "HTML",
  ".css": "CSS",
  ".scss": "SCSS",
  ".vue": "Vue",
  ".svelte": "Svelte",
};

export function detectLanguage(files) {
  const counts = {};

  for (const file of files) {
    const lang = LANGUAGE_BY_EXTENSION[file.extension];
    if (!lang) continue;

    counts[lang] = (counts[lang] || 0) + 1;
  }

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return {
    primary: sorted[0]?.[0] || "Unknown",
    detected: sorted.map(([language, count]) => ({ language, count })),
  };
}