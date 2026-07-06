export function parseJsonResponse(rawAnswer) {
  try {
    return JSON.parse(rawAnswer);
  } catch {
    return {
      success: false,
      reason: "AI response is not valid JSON",
      warnings: [],
      errors: [
        {
          message: "JSON parse failed",
          rawPreview: rawAnswer.slice(0, 500),
        },
      ],
      data: {},
    };
  }
}