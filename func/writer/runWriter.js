import { createWriterContext } from "./createWriterContext.js";

import { normalizeOperations } from "../operations/normalizeOperations.js";
import { validateOperations } from "../operations/validateOperations.js";
import { backupOperations } from "../operations/backupOperations.js";
import { applyOperations } from "../operations/applyOperations.js";
import { verifyOperations } from "../operations/verifyOperations.js";
import { generateOperationReport } from "../operations/generateOperationReport.js";

export async function runWriter({
  projectPath,
  sessionId = "",
  sessionPath = "",
  agentOutput,
  source = "coder",
}) {
  const writerContext = createWriterContext({
    projectPath,
    sessionId,
    sessionPath,
    agentOutput,
    source,
  });

  try {
    writerContext.normalized = normalizeOperations(agentOutput);
    writerContext.status.normalized = writerContext.normalized.success;

    if (!writerContext.normalized.success) {
      writerContext.status.failed = true;
      writerContext.errors.push(...writerContext.normalized.errors);
      await generateOperationReport(writerContext);
      return writerContext;
    }

    writerContext.validated = validateOperations(writerContext.normalized);
    writerContext.status.validated = writerContext.validated.success;

    if (!writerContext.validated.success) {
      writerContext.status.failed = true;
      writerContext.errors.push(...writerContext.validated.errors);
      await generateOperationReport(writerContext);
      return writerContext;
    }

    writerContext.backedUp = await backupOperations(
      projectPath,
      writerContext.validated
    );
    writerContext.status.backedUp = writerContext.backedUp.success;

    if (!writerContext.backedUp.success) {
      writerContext.status.failed = true;
      writerContext.errors.push(...writerContext.backedUp.failed);
      await generateOperationReport(writerContext);
      return writerContext;
    }

    writerContext.applied = await applyOperations(
      projectPath,
      writerContext.validated
    );
    writerContext.status.applied = writerContext.applied.success;

    if (!writerContext.applied.success) {
      writerContext.status.failed = true;
      writerContext.errors.push(...writerContext.applied.failed);
      await generateOperationReport(writerContext);
      return writerContext;
    }

    writerContext.verified = await verifyOperations(
      projectPath,
      writerContext.validated
    );
    writerContext.status.verified = writerContext.verified.success;

    if (!writerContext.verified.success) {
      writerContext.status.failed = true;
      writerContext.errors.push(...writerContext.verified.failed);
      await generateOperationReport(writerContext);
      return writerContext;
    }

    writerContext.status.completed = true;

    await generateOperationReport(writerContext);

    return writerContext;
  } catch (error) {
    writerContext.status.failed = true;

    writerContext.errors.push({
      message: error.message,
      stack: error.stack,
    });

    await generateOperationReport(writerContext);

    return writerContext;
  }
}