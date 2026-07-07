export function distributeTasks(taskDistributorOutput) {
  const tasks = taskDistributorOutput?.data?.tasks || [];

  return {
    success: taskDistributorOutput?.success === true,
    reason: taskDistributorOutput?.reason || "",
    warnings: taskDistributorOutput?.warnings || [],
    errors: taskDistributorOutput?.errors || [],
    mode: taskDistributorOutput?.data?.mode || "single",
    tasks,
    taskCount: tasks.length,
    canRunInParallel:
      taskDistributorOutput?.data?.can_run_in_parallel === true,
    missingContext: taskDistributorOutput?.data?.missing_context || [],
  };
}