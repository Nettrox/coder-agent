function extractJson(rawAnswer) {
  if (!rawAnswer) return "";

  let text = String(rawAnswer).trim();

  text = text
    .replace(/^```[a-zA-Z0-9_-]*\s*/g, "")
    .replace(/```$/g, "")
    .trim();

  const firstObject = text.indexOf("{");
  const lastObject = text.lastIndexOf("}");

  if (firstObject !== -1 && lastObject !== -1 && lastObject > firstObject) {
    return text.slice(firstObject, lastObject + 1);
  }

  return text;
}

export function parseJsonResponse(rawAnswer) {
  const extracted = extractJson(rawAnswer);

  try {
    return JSON.parse(extracted);
  } catch {
    return {
      success: false,
      reason: "AI response is not valid JSON",
      warnings: [],
      errors: [
        {
          message: "JSON parse failed",
          rawPreview: String(rawAnswer).slice(0, 1000),
          extractedPreview: extracted.slice(0, 1000),
        },
      ],
      data: {},
    };
  }
}