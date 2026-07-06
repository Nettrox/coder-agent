const COMMON_ENTRY_POINTS = [
  "index.js",
  "server.js",
  "app.js",
  "main.js",
  "src/index.js",
  "src/server.js",
  "src/app.js",
  "src/main.js",
  "index.ts",
  "server.ts",
  "app.ts",
  "main.ts",
  "src/index.ts",
  "src/server.ts",
  "src/app.ts",
  "src/main.ts",
  "index.html",
  "public/index.html",
  "src/main.jsx",
  "src/main.tsx",
  "src/App.jsx",
  "src/App.tsx",
  "main.py",
  "app.py",
  "manage.py",
];

export function detectEntryPoints(files) {
  const paths = new Set(files.map((file) => file.path));

  return COMMON_ENTRY_POINTS.filter((entry) => paths.has(entry));
}