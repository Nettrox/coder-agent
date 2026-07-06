const CONFIG_FILES = [
  "package.json",
  "tsconfig.json",
  "jsconfig.json",
  "vite.config.js",
  "vite.config.ts",
  "next.config.js",
  "next.config.mjs",
  "webpack.config.js",
  "docker-compose.yml",
  "Dockerfile",
  ".env",
  ".env.example",
  "README.md",
  "eslint.config.js",
  ".eslintrc",
  ".prettierrc",
  "tailwind.config.js",
  "postcss.config.js",
];

export function detectConfigs(files) {
  const paths = new Set(files.map((file) => file.path));

  return CONFIG_FILES.filter((file) => paths.has(file));
}