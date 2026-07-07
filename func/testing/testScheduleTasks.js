import { scheduleTasks } from "../distributor/scheduleTasks.js";

const validatedTasks = {
  success: true,
  validTasks: [
    {
      id: "task_001",
      title: "Low task",
      priority: "low",
    },
    {
      id: "task_002",
      title: "High task",
      priority: "high",
    },
    {
      id: "task_003",
      title: "Medium task",
      priority: "medium",
    },
    {
      id: "task_004",
      title: "High task 2",
      priority: "high",
    },
  ],
};

const scheduled = scheduleTasks(validatedTasks, {
  maxWorkers: 2,
});

console.log(JSON.stringify(scheduled, null, 2));