import { buildWorkerContext } from "../workers/buildWorkerContext.js";

const task = {
  id: "task_001",
  title: "Modify server",
  goal: "Add necromancer class support.",
  assigned_files: [
    {
      path: "src/main.py",
      reason: "Main server file.",
    },
  ],
  instructions: ["Add necromancer support without breaking existing classes."],
  expected_operations: [
    {
      type: "modify",
      path: "src/main.py",
      reason: "Update class handling.",
    },
  ],
  depends_on: [],
  priority: "high",
};

const context = buildWorkerContext({
  task,
  agentContext: {
    request: {
      user: "Necromancer sınıfı ekle.",
    },
    project: {
      summary: {
        primaryLanguage: "Python",
      },
    },
  },
  plannerOutput: {
    success: true,
    data: {
      goal: "Add necromancer class.",
      task_type: "modify",
    },
  },
  retrieverOutput: {
    success: true,
    data: {
      selected_files: [{ path: "src/main.py" }],
      selected_symbols: [],
    },
  },
  contextBuilderOutput: {
    success: true,
    data: {
      coder_context: {
        goal: "Add necromancer class.",
        task_type: "modify",
        constraints: ["Use operations format."],
        expected_output: {
          format: "operations",
          requires_full_file_content: true,
          allowed_change_types: ["create", "modify", "delete"],
        },
      },
    },
  },
  fileContext: {
    success: true,
    files: [
      {
        path: "src/main.py",
        language: "Python",
        content: "print('hello')",
      },
    ],
    missing: [],
  },
});

console.log(JSON.stringify(context, null, 2));