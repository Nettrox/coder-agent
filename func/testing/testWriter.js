import { runWriter } from "../writer/runWriter.js";

const projectPath = "/Users/irfanaksu/Desktop/deneme";

const mockCoderOutput = {
  success: true,
  data: {
    operations: [
      {
        type: "modify",
        path: "index.html",
        reason: "Test Writer Engine",
        content:
          "<!DOCTYPE html><html><body><h1>Writer Engine Test</h1></body></html>",
        patch: "",
      },
    ],
  },
};

const result = await runWriter({
  projectPath,
  agentOutput: mockCoderOutput,
  source: "test",
});

console.log(
  JSON.stringify(
    {
      status: result.status,
      normalized: result.normalized?.success,
      validated: result.validated?.success,
      backedUp: result.backedUp?.success,
      applied: result.applied?.success,
      verified: result.verified?.success,
      report: result.report?.success,
    },
    null,
    2
  )
);