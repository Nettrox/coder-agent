import fs from "fs/promises";
import path from "path";

import { AI_AGENT } from "../../config/aiAgentConfig.js";

import { ensureAiAgentFolder } from "../ensureAiAgentFolder.js";
import { scanFiles } from "./scanFiles.js";
import { scanFolders } from "./scanFolders.js";
import { detectLanguage } from "./detectLanguage.js";
import { detectFramework } from "./detectFramework.js";
import { detectPackageManager } from "./detectPackageManager.js";
import { detectEntryPoints } from "./detectEntryPoints.js";
import { detectGit } from "./detectGit.js";
import { detectConfigs } from "./detectConfigs.js";
import { detectIgnoreRules } from "./detectIgnoreRules.js";
import { generateProjectIndex } from "./generateProjectIndex.js";
import { generateProjectReport } from "./generateProjectReport.js";

import { generateTreeFiles } from "./generators/generateTreeFiles.js";
import { generateLanguagesFiles } from "./generators/generateLanguagesFiles.js";
import { generateStatisticsFiles } from "./generators/generateStatisticsFiles.js";
import { generateConfigsFiles } from "./generators/generateConfigsFiles.js";
import { generateEntrypointsFiles } from "./generators/generateEntrypointsFiles.js";
import { generateFrameworksFiles } from "./generators/generateFrameworksFiles.js";
import { generateDependenciesFiles } from "./generators/generateDependenciesFiles.js";

export async function scanProject(projectPath) {
  await ensureAiAgentFolder(projectPath);

  const projectDir = path.join(
    projectPath,
    AI_AGENT.ROOT,
    AI_AGENT.DIRS.PROJECT
  );

  await fs.mkdir(projectDir, { recursive: true });

  const files = await scanFiles(projectPath);
  const folders = await scanFolders(projectPath);

  const language = detectLanguage(files);
  const framework = await detectFramework(projectPath, files);
  const packageManager = detectPackageManager(files);
  const entryPoints = detectEntryPoints(files);
  const git = await detectGit(projectPath);
  const configs = detectConfigs(files);
  const ignoreRules = await detectIgnoreRules(projectPath);

  const index = generateProjectIndex({
    projectPath,
    files,
    folders,
    language,
    framework,
    packageManager,
    entryPoints,
    git,
  });

  await generateTreeFiles(projectPath, projectDir, files, folders);
  await generateLanguagesFiles(projectPath, projectDir, language);
  await generateStatisticsFiles(projectPath, projectDir, files, folders);
  await generateConfigsFiles(projectPath, projectDir, configs, ignoreRules);
  await generateEntrypointsFiles(projectPath, projectDir, entryPoints);
  await generateFrameworksFiles(projectPath, projectDir, framework);
  await generateDependenciesFiles(projectPath, projectDir, packageManager);

  const report = generateProjectReport(index);

  await fs.writeFile(
    path.join(projectDir, AI_AGENT.FILES.PROJECT_INDEX_JSON),
    JSON.stringify(index, null, 2),
    "utf8"
  );

  await fs.writeFile(
    path.join(projectDir, AI_AGENT.FILES.PROJECT_INDEX_MD),
    report,
    "utf8"
  );

  return index;
}