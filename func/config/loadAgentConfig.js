import fs from "fs/promises";
import path from "path";

const DEFAULT_CONFIG = {
  coder: {
    mode: "single",
    maxWorkers: 4,
    poolThreshold: 8,
  },
};

export async function loadAgentConfig() {
  const configPath = path.join(process.cwd(), "config", "agent.config.json");

  try {
    const content = await fs.readFile(configPath, "utf8");
    const userConfig = JSON.parse(content);

    return {
      ...DEFAULT_CONFIG,
      ...userConfig,
      coder: {
        ...DEFAULT_CONFIG.coder,
        ...(userConfig.coder || {}),
      },
    };
  } catch {
    return DEFAULT_CONFIG;
  }
}