import { backupOperations } from "../operations/backupOperations.js";
import { normalizeOperations } from "../operations/normalizeOperations.js";
import { validateOperations } from "../operations/validateOperations.js";
import { applyOperations } from "../operations/applyOperations.js";
import { verifyOperations } from "../operations/verifyOperations.js";

const projectPath = "/Users/irfanaksu/Desktop/deneme";

const mockCoderOutput = {
  success: true,
  data: {
    operations: [
      {
        type: "Modify ",
        path: "./index.html",
        reason: "Improve UI",
        content: "<!DOCTYPE html><html><body><h1>Operation test</h1></body></html>",
        patch: null,
      },
    ],
  },
};

const normalized = normalizeOperations(mockCoderOutput);
const validated = validateOperations(normalized);
const backedUp = await backupOperations(projectPath, validated);
const applied = await applyOperations(projectPath, validated);
const verified = await verifyOperations(projectPath, validated);

console.log(
  JSON.stringify(
    {
      normalized,
      validated,
      backedUp,
      applied,
      verified,
    },
    null,
    2
  )
);