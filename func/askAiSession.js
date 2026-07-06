import { requestAi } from "./requestAi.js";

export async function askAiSession(sessionId, message, options = {}) {
  const { stream = false } = options;

  const response = await requestAi("http://127.0.0.1:7000/api/chat_stream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      session: sessionId,
      mode: "chat",
      use_rag: false,
    }),
    timeoutMs: 180000,
    retries: 1,
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let answer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });

    for (const line of chunk.split("\n")) {
      if (!line.startsWith("data: ")) continue;

      const raw = line.replace("data: ", "").trim();

      if (raw === "[DONE]") {
        return answer;
      }

      try {
        const json = JSON.parse(raw);

        if (json.delta) {
          answer += json.delta;

          if (stream) {
            process.stdout.write(json.delta);
          }
        }
      } catch {}
    }
  }

  return answer;
}