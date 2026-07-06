export const AI_AGENT = {
  ROOT: ".ai-agent",

  DIRS: {
    PROJECT: "project",

    KNOWLEDGE: "knowledge",
    KNOWLEDGE_FILES: "knowledge/files",
    KNOWLEDGE_SYMBOLS: "knowledge/symbols",
    KNOWLEDGE_CLASSES: "knowledge/classes",
    KNOWLEDGE_FUNCTIONS: "knowledge/functions",
    KNOWLEDGE_IMPORTS: "knowledge/imports",
    KNOWLEDGE_EXPORTS: "knowledge/exports",
    KNOWLEDGE_ROUTES: "knowledge/routes",
    KNOWLEDGE_HTML: "knowledge/html",
    KNOWLEDGE_API: "knowledge/api",
    KNOWLEDGE_DATABASE: "knowledge/database",
    KNOWLEDGE_ARCHITECTURE: "knowledge/architecture",
    KNOWLEDGE_PROCESSOR: "knowledge/processor",

    SESSIONS: "sessions",
    OUTPUTS: "outputs",
    LOGS: "logs",
    MEMORY: "memory",
    CACHE: "cache",
    BACKUPS: "backups",
  },

  FILES: {
    AGENTS_JSON: "agents.json",
    AGENTS_MD: "agents.md",

    PROJECT_INDEX_JSON: "index.json",
    PROJECT_INDEX_MD: "index.md",

    FILES_INDEX_JSON: "files-index.json",
    FILES_INDEX_MD: "files-index.md",

    METADATA_JSON: "metadata.json",
    METADATA_MD: "metadata.md",

    SOURCE_FILE: "source",
  },
};

export const AI_AGENT_DIRECTORIES = [
  "",
  AI_AGENT.DIRS.PROJECT,

  AI_AGENT.DIRS.KNOWLEDGE,
  AI_AGENT.DIRS.KNOWLEDGE_FILES,
  AI_AGENT.DIRS.KNOWLEDGE_SYMBOLS,
  AI_AGENT.DIRS.KNOWLEDGE_CLASSES,
  AI_AGENT.DIRS.KNOWLEDGE_FUNCTIONS,
  AI_AGENT.DIRS.KNOWLEDGE_IMPORTS,
  AI_AGENT.DIRS.KNOWLEDGE_EXPORTS,
  AI_AGENT.DIRS.KNOWLEDGE_ROUTES,
  AI_AGENT.DIRS.KNOWLEDGE_HTML,
  AI_AGENT.DIRS.KNOWLEDGE_API,
  AI_AGENT.DIRS.KNOWLEDGE_DATABASE,
  AI_AGENT.DIRS.KNOWLEDGE_ARCHITECTURE,
  AI_AGENT.DIRS.KNOWLEDGE_PROCESSOR,

  AI_AGENT.DIRS.SESSIONS,
  AI_AGENT.DIRS.OUTPUTS,
  AI_AGENT.DIRS.LOGS,
  AI_AGENT.DIRS.MEMORY,
  AI_AGENT.DIRS.CACHE,
  AI_AGENT.DIRS.BACKUPS,
];