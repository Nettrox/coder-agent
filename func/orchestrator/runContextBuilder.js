import { runAgent } from "../runAgent.js";

function sanitizeFileContext(fileContext) {
  return {
    success: fileContext?.success === true,
    reason: fileContext?.reason || "",
    files:
      fileContext?.files?.map((file) => {
        const content = file.source || file.content || "";

        return {
          path: file.path || file.relativePath || "",
          language: file.language || "",
          size: file.size || content.length,
          hash: file.hash || "",
          content_preview: content.slice(0, 4000),
          content_length: content.length,
          has_full_content: content.length > 0,
        };
      }) || [],
    missing: fileContext?.missing || [],
  };
}

export async function runContextBuilder(projectPath, agentContext, state) {
  return await runAgent("context_builder", projectPath, {
    request: agentContext.request,

    project: {
      summary: agentContext.project?.summary || {},
    },

    planner_output: {
      success: state.plannerOutput?.success,
      data: {
        goal: state.plannerOutput?.data?.goal,
        task_type: state.plannerOutput?.data?.task_type,
        steps: state.plannerOutput?.data?.steps || [],
        required_files: state.plannerOutput?.data?.required_files || [],
        possible_new_files: state.plannerOutput?.data?.possible_new_files || [],
      },
    },

    retriever_output: {
      success: state.retrieverOutput?.success,
      data: {
        selected_files: state.retrieverOutput?.data?.selected_files || [],
        possible_new_files: state.retrieverOutput?.data?.possible_new_files || [],
        selected_symbols: state.retrieverOutput?.data?.selected_symbols || [],
        missing_context: state.retrieverOutput?.data?.missing_context || [],
      },
    },

    file_context: sanitizeFileContext(state.fileContext),
  });
}