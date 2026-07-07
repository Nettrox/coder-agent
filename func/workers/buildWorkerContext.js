function getFilePath(file) {
  return file?.path || file?.relativePath || "";
}

function findFileContext(fileContext, targetPath) {
  const files = fileContext?.files || [];

  return files.find((file) => getFilePath(file) === targetPath) || null;
}

export function buildWorkerContext({
  task,
  agentContext,
  plannerOutput,
  retrieverOutput,
  contextBuilderOutput,
  fileContext,
}) {
  const assignedPaths = task.assigned_files?.map((file) => file.path) || [];

  const taskFiles = assignedPaths
    .map((filePath) => findFileContext(fileContext, filePath))
    .filter(Boolean);

  return {
    request: agentContext.request,

    project: {
      summary: agentContext.project?.summary || {},
    },

    worker_task: {
      id: task.id,
      title: task.title,
      goal: task.goal,
      priority: task.priority,
      instructions: task.instructions || [],
      expected_operations: task.expected_operations || [],
      depends_on: task.depends_on || [],
      assigned_files: task.assigned_files || [],
    },

    planner_output: {
      success: plannerOutput?.success,
      data: {
        goal: plannerOutput?.data?.goal,
        task_type: plannerOutput?.data?.task_type,
      },
    },

    retriever_output: {
      success: retrieverOutput?.success,
      data: {
        selected_files: retrieverOutput?.data?.selected_files || [],
        selected_symbols: retrieverOutput?.data?.selected_symbols || [],
      },
    },

    context_builder_output: {
      success: contextBuilderOutput?.success,
      data: {
        coder_context: {
          goal: contextBuilderOutput?.data?.coder_context?.goal || "",
          task_type:
            contextBuilderOutput?.data?.coder_context?.task_type || "unknown",
          constraints:
            contextBuilderOutput?.data?.coder_context?.constraints || [],
          expected_output:
            contextBuilderOutput?.data?.coder_context?.expected_output || {
              format: "operations",
              requires_full_file_content: true,
              allowed_change_types: ["create", "modify", "delete"],
            },
        },
      },
    },

    file_context: {
      success: fileContext?.success === true,
      files: taskFiles,
      missing: assignedPaths.filter(
        (filePath) => !findFileContext(fileContext, filePath)
      ),
    },
  };
}