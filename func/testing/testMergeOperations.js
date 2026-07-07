import { mergeOperations } from "../operations/mergeOperations.js";

const workerResults = [
  {
    taskId: "task_001",
    output: {
      success: true,
      reason: "",
      warnings: [],
      errors: [],
      data: {
        operations: [
          {
            type: "create",
            path: "src/main.py",
            reason: "Create main server.",
            content: "print('server')",
            patch: "",
          },
        ],
      },
    },
  },
  {
    taskId: "task_002",
    output: {
      success: true,
      reason: "",
      warnings: [],
      errors: [],
      data: {
        operations: [
          {
            type: "create",
            path: "README.md",
            reason: "Create documentation.",
            content: "# Project",
            patch: "",
          },
        ],
      },
    },
  },
];

const merged = mergeOperations(workerResults);

console.log(JSON.stringify(merged, null, 2));