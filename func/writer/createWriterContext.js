export function createWriterContext({
  projectPath,
  sessionId = "",
  sessionPath = "",
  agentOutput,
  source = "coder",
}) {
  return {
    id: `writer_${new Date()
      .toISOString()
      .replaceAll(":", "-")
      .replaceAll(".", "-")}`,

    createdAt: new Date().toISOString(),

    projectPath,
    sessionId,
    sessionPath,

    source,

    input: {
      agentOutput,
    },

    normalized: null,
    validated: null,
    backedUp: null,
    applied: null,
    verified: null,
    report: null,

    status: {
      normalized: false,
      validated: false,
      backedUp: false,
      applied: false,
      verified: false,
      reported: false,
      completed: false,
      failed: false,
    },

    warnings: [],
    errors: [],
  };
}