import { processKnowledgeFiles } from "../processor/processKnowledgeFiles.js";

import { getInput } from "../getInput.js";
import { ensureAiAgentFolder } from "../ensureAiAgentFolder.js";

import { scanProject } from "../scanner/scanProject.js";
import { indexProjectFiles } from "../reader/indexProjectFiles.js";

import { buildAgentContext } from "../context/buildAgentContext.js";
import { runPipeline } from "./runPipeline.js";

export async function runCoderAgent() {
  const projectPath = await getInput("Project path: ");
  const userRequest = await getInput("Request: ");

  await ensureAiAgentFolder(projectPath);

  const projectIndex = await scanProject(projectPath);
  const filesKnowledgeIndex = await indexProjectFiles(projectPath);
  const processorReport = await processKnowledgeFiles(projectPath);

  const agentContext = await buildAgentContext(projectPath, userRequest, {
    projectIndex,
    filesKnowledgeIndex,
    processorReport,
  });

  const finalOutput = await runPipeline(projectPath, agentContext);

  console.log(JSON.stringify(finalOutput, null, 2));

  return finalOutput;
}