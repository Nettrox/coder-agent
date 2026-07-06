const DEFAULT_IGNORED_DIRS = [
  "node_modules",
  ".git",
  ".ai-agent",
  "dist",
  "build",
  ".next",
  ".nuxt",
  "coverage",
  ".cache",
  ".turbo",
  "vendor",
];

const DEFAULT_IGNORED_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".ico",
  ".pdf",
  ".zip",
  ".gz",
  ".tar",
  ".mp4",
  ".mp3",
  ".mov",
  ".woff",
  ".woff2",
  ".ttf",
  ".eot",
  ".exe",
  ".dll",
  ".so",
  ".dylib",
];

export function shouldReadFile(file) {
  const normalizedPath = file.path.replaceAll("\\", "/");

  if (DEFAULT_IGNORED_DIRS.some((dir) => normalizedPath.split("/").includes(dir))) {
    return false;
  }

  if (DEFAULT_IGNORED_EXTENSIONS.includes(file.extension.toLowerCase())) {
    return false;
  }

  if (file.size > 1024 * 1024) {
    return false;
  }

  return true;
}