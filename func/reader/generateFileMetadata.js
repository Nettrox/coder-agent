import path from "path";

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
  ".json": "JSON",
  ".md": "Markdown",
  ".yml": "YAML",
  ".yaml": "YAML",
};

export function generateFileMetadata({
  file,
  content,
  encoding,
  hash,
}) {
  const parsed = path.parse(file.path);

  return {
    relativePath: file.path,
    fileName: file.name,
    extension: file.extension,
    language: LANGUAGE_BY_EXTENSION[file.extension] || "Unknown",

    size: file.size,
    encoding,
    hash,

    createdAt: null,
    modifiedAt: file.modifiedAt,
    lastScan: new Date().toISOString(),

    status: {
      parsed: false,
      summarized: false,
      chunked: false,
      embedded: false,
      indexed: true,
    },

    summary: "",

    imports: [],
    exports: [],
    classes: [],
    functions: [],
    routes: [],

    dependencies: [],
    todos: extractTodos(content),
    warnings: [],

    chunks: [],

    sourceSnapshot: {
        enabled: true,
        fileName: `source${file.extension || ".txt"}`,
    },

    workspace: {
      sourceDirectory: parsed.dir,
      sourceBaseName: parsed.base,
      sourceNameWithoutExtension: parsed.name,
    },
  };
}

function extractTodos(content) {
  const todos = [];

  const lines = content.split("\n");

  lines.forEach((line, index) => {
    if (/TODO|FIXME|HACK/i.test(line)) {
      todos.push({
        line: index + 1,
        text: line.trim(),
      });
    }
  });

  return todos;
}