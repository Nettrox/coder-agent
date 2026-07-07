import { runAgent } from "../runAgent.js";
import { sanitizeAgentOutputForValidation } from "../context/sanitizeAgentOutputForValidation.js";

function sanitizeContextBuilderOutput(contextBuilderOutput) {
  return {
    success: contextBuilderOutput?.success === true,
    reason: contextBuilderOutput?.reason || "",
    data: {
      ready_for_coder: contextBuilderOutput?.data?.ready_for_coder,
      missing_context: contextBuilderOutput?.data?.missing_context || [],
      coder_context: {
        goal: contextBuilderOutput?.data?.coder_context?.goal || "",
        task_type: contextBuilderOutput?.data?.coder_context?.task_type || "",
        constraints:
          contextBuilderOutput?.data?.coder_context?.constraints || [],
        expected_output:
          contextBuilderOutput?.data?.coder_context?.expected_output || {},
        files:
          contextBuilderOutput?.data?.coder_context?.files?.map((file) => ({
            path: file.path || file.relativePath || "",
            language: file.language || "",
            size: file.size || 0,
            hasContent: Boolean(file.content || file.source),
          })) || [],
      },
    },
  };
}

function sanitizeValidatorOutput(validatorOutput) {
  return {
    success: validatorOutput?.success === true,
    reason: validatorOutput?.reason || "",
    warnings: validatorOutput?.warnings || [],
    errors: validatorOutput?.errors || [],
    data: {
      valid: validatorOutput?.data?.valid === true,
      needs_fixer: validatorOutput?.data?.needs_fixer === true,
      issues:
        validatorOutput?.data?.issues?.map((issue) => ({
          severity: issue.severity,
          file: issue.file || "",
          message: issue.message || "",
          suggested_fix: issue.suggested_fix || "",
        })) || [],
      safety_report: validatorOutput?.data?.safety_report || {},
    },
  };
}

export async function runFixer(projectPath, agentContext, state) {
  return await runAgent("fixer", projectPath, {
    request: agentContext.request,

    project: {
      summary: agentContext.project?.summary || {},
    },

    planner_output: {
      success: state.plannerOutput?.success,
      data: {
        goal: state.plannerOutput?.data?.goal,
        task_type: state.plannerOutput?.data?.task_type,
      },
    },

    retriever_output: {
      success: state.retrieverOutput?.success,
      data: {
        selected_files: state.retrieverOutput?.data?.selected_files || [],
        selected_symbols: state.retrieverOutput?.data?.selected_symbols || [],
      },
    },

    context_builder_output: sanitizeContextBuilderOutput(
      state.contextBuilderOutput
    ),

    coder_output: sanitizeAgentOutputForValidation(state.coderOutput),

    validator_output: sanitizeValidatorOutput(state.validatorOutput),
  });
}