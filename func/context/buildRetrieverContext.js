import { buildFileContext } from "../knowledge/buildFileContext.js";

export async function buildRetrieverContext(projectPath, retrieverOutput) {
  const selectedFiles =
    retrieverOutput?.data?.selected_files?.map((file) => file.path) || [];

  return await buildFileContext(projectPath, selectedFiles);
}