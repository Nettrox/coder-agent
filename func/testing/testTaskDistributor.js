import { distributeTasks } from "../distributor/distributeTasks.js";
import { validateTasks } from "../distributor/validateTasks.js";

const mockTaskDistributorOutput = {
  success: true,
  reason: "",
  warnings: [],
  errors: [],
  data: {
    mode: "pool",
    can_run_in_parallel: true,
    tasks: [
      {
        id: "task_001",
        title: "Create server",
        goal: "Create the TCP server entry file.",
        assigned_files: [
          {
            path: "src/main.py",
            reason: "Main server file.",
          },
        ],
        instructions: ["Create a Python asyncio TCP server."],
        expected_operations: [
          {
            type: "create",
            path: "src/main.py",
            reason: "Create server file.",
          },
        ],
        depends_on: [],
        priority: "high",
      },
    ],
    task_count: 1,
    missing_context: [],
  },
};

const distributed = distributeTasks(mockTaskDistributorOutput);
const validated = validateTasks(distributed);

console.log(
  JSON.stringify(
    {
      distributed,
      validated,
    },
    null,
    2
  )
);