import { readProjectReport } from "../project/readProjectReport.js";

export async function buildAgentContext(projectPath, userRequest, extra = {}) {
  const treeReport = await readProjectReport(projectPath, "tree");
  const dependenciesReport = await readProjectReport(projectPath, "dependencies");
  const configsReport = await readProjectReport(projectPath, "configs");
  const entrypointsReport = await readProjectReport(projectPath, "entrypoints");
  const frameworksReport = await readProjectReport(projectPath, "frameworks");
  const languagesReport = await readProjectReport(projectPath, "languages");
  const statisticsReport = await readProjectReport(projectPath, "statistics");

  return {
    request: {
      user: userRequest,
    },

    project: {
      path: projectPath,
      summary: extra.projectIndex?.summary || null,
      reports: extra.projectIndex?.reports || null,
    },

    knowledge: {
      files: extra.filesKnowledgeIndex
        ? {
            indexed: extra.filesKnowledgeIndex.indexedFiles,
            skipped: extra.filesKnowledgeIndex.skippedFiles,
            failed: extra.filesKnowledgeIndex.failedFiles,
            index_path: ".ai-agent/knowledge/files-index.json",
          }
        : null,
    },

    reports: {
      tree: {
        total_files: treeReport.files.length,
        total_folders: treeReport.folders.length,
        available_files: treeReport.files.map((file) => file.path),
      },

      dependencies: dependenciesReport,
      configs: configsReport,
      entrypoints: entrypointsReport,
      frameworks: frameworksReport,
      languages: languagesReport,
      statistics: statisticsReport,
    },

    extra,
  };
}