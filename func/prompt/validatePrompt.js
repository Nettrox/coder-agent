export function validatePrompt(prompt) {
  const issues = [];

  if (!prompt || typeof prompt !== "string") {
    issues.push("Prompt is empty or not a string.");
  }

  if (!prompt.includes("# RUNTIME INPUT")) {
    issues.push("Prompt does not include runtime input section.");
  }

  if (!prompt.includes("# AI CODER AGENT RUNTIME PROMPT")) {
    issues.push("Prompt does not include runtime header.");
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}