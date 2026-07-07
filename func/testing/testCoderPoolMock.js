import { mergeOperations } from "../operations/mergeOperations.js";
import { scheduleTasks } from "../distributor/scheduleTasks.js";

const validatedTasks = {
  success: true,
  validTasks: [
    {
      id: "task_001",
      title: "Create server",
      goal: "Create server file",
      priority: "high",
    },
    {
      id: "task_002",
      title: "Create README",
      goal: "Create documentation",
      priority: "medium",
    },
  ],
};

const scheduled = scheduleTasks(validatedTasks, {
  maxWorkers: 2,
});

const mockWorkerResults = [
  {
    taskId: "task_001",
    output: {
      success: true,
      warnings: [],
      errors: [],
      data: {
        operations: [
          {
            type: "create",
            path: "src/main.py",
            reason: "Create server.",
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
      warnings: [],
      errors: [],
      data: {
        operations: [
          {
            type: "create",
            path: "README.md",
            reason: "Create README.",
            content: "# README",
            patch: "",
          },
        ],
      },
    },
  },
];

const merged = mergeOperations(mockWorkerResults);

console.log(
  JSON.stringify(
    {
      scheduled,
      merged,
    },
    null,
    2
  )
);