import { requestAi } from "./requestAi.js";

export async function createNewSession() {
  const form = new FormData();

  form.append("name", "");
  form.append("endpoint_url", "https://chatgpt.com/backend-api/codex/responses");
  form.append("model", "gpt-5.4");
  form.append("rag", "false");
  form.append("skip_validation", "true");

  const res = await requestAi("http://127.0.0.1:7000/api/session", {
    method: "POST",
    body: form,
    timeoutMs: 60000,
    retries: 1,
  });

  const data = await res.json();
  return data.id;
}

// GEMINI
// import { requestAi } from "./requestAi.js";

// export async function createNewSession() {
//   const form = new FormData();

//   form.append("name", "");
//   form.append(
//     "endpoint_url",
//     "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions"
//   );

//   form.append("model", "gemini-2.5-flash");
//   form.append("rag", "false");
//   form.append("skip_validation", "true");

//   const res = await requestAi("http://127.0.0.1:7000/api/session", {
//     method: "POST",
//     body: form,
//     timeoutMs: 60000,
//     retries: 1,
//   });

//   const data = await res.json();
//   return data.id;
// }
