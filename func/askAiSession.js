import { requestAi } from "./requestAi.js";

export async function askAiSession(sessionId, message, options = {}) {
  const { stream = false } = options;

  const response = await requestAi("http://127.0.0.1:7001/api/chat_stream", {
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

//GEMINI
// import { requestAi } from "./requestAi.js";

// export async function askAiSession(sessionId, message, options = {}) {
//   const { stream = false } = options;

//   const response = await requestAi("http://127.0.0.1:7001/api/chat_stream", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       message,
//       session: sessionId,
//       mode: "chat",
//       use_rag: false,
//     }),
//     timeoutMs: 180000,
//     retries: 1,
//   });

//   if (!response.ok) {
//     const errorText = await response.text().catch(() => "");
//     throw new Error(`AI request failed: ${response.status} ${errorText}`);
//   }

//   if (!response.body) {
//     throw new Error("AI response body is empty.");
//   }

//   const reader = response.body.getReader();
//   const decoder = new TextDecoder("utf-8");

//   let answer = "";
//   let buffer = "";

//   while (true) {
//     const { value, done } = await reader.read();

//     if (done) {
//       break;
//     }

//     buffer += decoder.decode(value, { stream: true });

//     const lines = buffer.split("\n");
//     buffer = lines.pop() || "";

//     for (const line of lines) {
//       const trimmed = line.trim();

//       if (!trimmed.startsWith("data:")) {
//         continue;
//       }

//       const raw = trimmed.slice(5).trim();

//       if (!raw || raw === "[DONE]") {
//         continue;
//       }

//       try {
//         const json = JSON.parse(raw);

//         if (json.delta) {
//           answer += json.delta;

//           if (stream) {
//             process.stdout.write(json.delta);
//           }
//         }

//         if (json.type === "error") {
//           throw new Error(json.error || json.message || "AI stream error");
//         }
//       } catch (err) {
//         // JSON parçalı geldiyse veya metrics/model_info gibi önemsiz satırsa sessiz geç
//       }
//     }
//   }

//   if (buffer.trim().startsWith("data:")) {
//     const raw = buffer.trim().slice(5).trim();

//     if (raw && raw !== "[DONE]") {
//       try {
//         const json = JSON.parse(raw);

//         if (json.delta) {
//           answer += json.delta;

//           if (stream) {
//             process.stdout.write(json.delta);
//           }
//         }
//       } catch {}
//     }
//   }

//   return answer.trim();
// }