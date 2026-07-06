export async function requestAi(url, options = {}) {
  const {
    method = "GET",
    headers = {},
    body = undefined,
    timeoutMs = 120000,
    retries = 2,
  } = options;

  let lastError;

  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const startedAt = Date.now();

      const response = await fetch(url, {
        method,
        headers,
        body,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const durationMs = Date.now() - startedAt;

      if (!response.ok) {
        const responseText = await response.text();

        throw new Error(
          `AI request failed.
URL: ${url}
Method: ${method}
Status: ${response.status}
Duration: ${durationMs}ms
Response:
${responseText}`
        );
      }

      return response;
    } catch (error) {
      clearTimeout(timeout);
      lastError = error;

      const isLastAttempt = attempt === retries + 1;

      if (isLastAttempt) {
        throw new Error(
          `AI request failed after ${attempt} attempt(s).
URL: ${url}
Method: ${method}
Error:
${error.message}`
        );
      }

      await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
    }
  }

  throw lastError;
}