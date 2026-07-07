import { runCoderPool } from "../workers/runCoderPool.js";

const projectPath = "/Users/irfanaksu/Desktop/agent-test-empty";

const agentContext = {
  request: {
    user: "Basit bir terminal MUD projesi oluştur.",
  },
  project: {
    summary: {
      primaryLanguage: "Python",
      packageManager: "none",
    },
  },
};

const validatedTasks = {
  success: true,
  validTasks: [
    {
      id: "task_001",
      title: "Create README",
      goal: "Create project documentation for a terminal MUD game.",
      assigned_files: [
        {
          path: "README.md",
          reason: "Project documentation.",
        },
      ],
      instructions: [
        "Create a concise README for a Python terminal MUD game.",
        "Include run instructions.",
        "Do not mention unavailable features.",
      ],
      expected_operations: [
        {
          type: "create",
          path: "README.md",
          reason: "Create project documentation.",
        },
      ],
      depends_on: [],
      priority: "medium",
    },
    {
      id: "task_002",
      title: "Create server",
      goal: "Create a minimal Python TCP terminal server.",
      assigned_files: [
        {
          path: "src/main.py",
          reason: "Main server entry file.",
        },
      ],
      instructions: [
        "Create a minimal Python asyncio TCP server.",
        "Accept multiple clients.",
        "Support help, look, say, quit commands.",
        "Use only Python standard library.",
      ],
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
};

const result = await runCoderPool({
  projectPath,
  agentContext,
  validatedTasks,
  plannerOutput: {
    success: true,
    data: {
      goal: "Create a terminal MUD project.",
      task_type: "create",
    },
  },
  retrieverOutput: {
    success: true,
    data: {
      selected_files: [],
      selected_symbols: [],
    },
  },
  contextBuilderOutput: {
    success: true,
    data: {
      coder_context: {
        goal: "Create a small Python terminal MUD project.",
        task_type: "create",
        constraints: [
          "Use operations format.",
          "Use relative paths only.",
          "Do not modify .ai-agent.",
          "Return full content for created files.",
        ],
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
    files: [],
    missing: [],
  },
  maxWorkers: 2,
});

console.log(
  JSON.stringify(
    {
      success: result.success,
      reason: result.reason,
      summary: result.summary,
      merged: result.merged,
      output: result.output,
    },
    null,
    2
  )
);