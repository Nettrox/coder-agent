function trimContent(content = "") {
  if (typeof content !== "string") return "";

  return {
    length: content.length,
    preview: content.slice(0, 500),
    hasContent: content.length > 0,
  };
}

function sanitizeOperations(operations = []) {
  return operations.map((operation) => ({
    type: operation.type || operation.change_type || "",
    path: operation.path || "",
    reason: operation.reason || "",
    patch: operation.patch ? "[patch provided]" : "",
    content_meta: trimContent(operation.content),
  }));
}

export function sanitizeAgentOutputForValidation(agentOutput) {
  return {
    success: agentOutput?.success === true,
    reason: agentOutput?.reason || "",
    warnings: agentOutput?.warnings || [],
    errors: agentOutput?.errors || [],
    data: {
      summary: agentOutput?.data?.summary || "",
      operations: sanitizeOperations(
        agentOutput?.data?.operations ||
          agentOutput?.data?.corrected_operations ||
          agentOutput?.data?.files_changed ||
          agentOutput?.data?.corrected_files_changed ||
          []
      ),
      commands_to_run: agentOutput?.data?.commands_to_run || [],
      notes: agentOutput?.data?.notes || [],
    },
  };
}