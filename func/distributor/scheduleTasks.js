function priorityValue(priority) {
  const values = {
    high: 3,
    medium: 2,
    low: 1,
  };

  return values[priority] || 0;
}

function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    const priorityDiff = priorityValue(b.priority) - priorityValue(a.priority);

    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return String(a.id).localeCompare(String(b.id));
  });
}

export function scheduleTasks(validatedTasks, options = {}) {
  const maxWorkers = Math.max(1, options.maxWorkers || 3);
  const tasks = sortTasks(validatedTasks.validTasks || []);

  const result = {
    success: validatedTasks?.success === true,
    reason: "",
    warnings: [],
    errors: [],
    maxWorkers,
    batches: [],
    summary: {
      totalTasks: tasks.length,
      batchCount: 0,
      maxWorkers,
    },
  };

  if (!validatedTasks?.success) {
    return {
      ...result,
      success: false,
      reason: "Cannot schedule invalid tasks.",
      errors: validatedTasks.errors || [],
    };
  }

  for (let index = 0; index < tasks.length; index += maxWorkers) {
    result.batches.push(tasks.slice(index, index + maxWorkers));
  }

  result.summary.batchCount = result.batches.length;

  return result;
}