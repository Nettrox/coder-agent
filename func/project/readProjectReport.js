import fs from "fs/promises";
import path from "path";
import { AI_AGENT } from "../../config/aiAgentConfig.js";

export async function readProjectReport(projectPath, reportName) {
  const reportFile = path.join(
    projectPath,
    AI_AGENT.ROOT,
    AI_AGENT.DIRS.PROJECT,
    `${reportName}.json`
  );

  try {
    const content = await fs.readFile(reportFile, "utf8");
    return JSON.parse(content);
  } catch (error) {
    throw new Error(
      `Project report could not be read: ${reportName}\nPath: ${reportFile}\n${error.message}`
    );
  }
}