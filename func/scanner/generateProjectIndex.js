export function generateProjectIndex({
  projectPath,
  files,
  folders,
  language,
  framework,
  packageManager,
  entryPoints,
  git,
}) {
  return {
    generatedAt: new Date().toISOString(),

    projectPath,

    summary: {
      totalFiles: files.length,
      totalFolders: folders.length,
      primaryLanguage: language.primary,
      frameworks: framework,
      packageManager,
      entryPoints,
      isGitRepository: git.isGitRepository,
    },

    reports: {
      tree: {
        json: ".ai-agent/project/tree.json",
        markdown: ".ai-agent/project/tree.md",
      },
      languages: {
        json: ".ai-agent/project/languages.json",
        markdown: ".ai-agent/project/languages.md",
      },
      statistics: {
        json: ".ai-agent/project/statistics.json",
        markdown: ".ai-agent/project/statistics.md",
      },
      configs: {
        json: ".ai-agent/project/configs.json",
        markdown: ".ai-agent/project/configs.md",
      },
      entrypoints: {
        json: ".ai-agent/project/entrypoints.json",
        markdown: ".ai-agent/project/entrypoints.md",
      },
      frameworks: {
        json: ".ai-agent/project/frameworks.json",
        markdown: ".ai-agent/project/frameworks.md",
      },
      dependencies: {
        json: ".ai-agent/project/dependencies.json",
        markdown: ".ai-agent/project/dependencies.md",
      },
    },
  };
}