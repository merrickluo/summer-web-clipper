import { readJsonResponse } from "../http";

// OpenCode Go wants a stable session id per conversation,
// derive it from the request body: text and model-id.
const hash = async (body: string): Promise<string> => {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(body),
  );
  const hex = Array.from(new Uint8Array(digest), (b) =>
    b.toString(16).padStart(2, "0"),
  );

  return hex.join("").slice(0, 32);
};

const post = async (
  url: string,
  apikey: string,
  payload: any = {},
): Promise<Response> => {
  const body = JSON.stringify(payload);
  const headers: Record<string, string> = {
    "content-type": "application/json",
    authorization: `Bearer ${apikey}`,
  };

  if (url.includes("opencode.ai")) {
    headers["x-opencode-session"] = `summer-${await hash(body)}`;
  }

  return fetch(url, {
    method: "post",
    headers,
    body,
  });
};

interface ChatMessage {
  role: string;
  content: string;
}

interface CompletionOptions {
  serviceTier?: "flex" | "priority";
  lowVerbosity?: boolean;
}

interface ChatCompletion {
  choices?: Array<{ message?: { content?: unknown } }>;
}

export const getCompletion = async (
  baseurl: string,
  apikey: string,
  model: string,
  messages: ChatMessage[],
  options: CompletionOptions = {},
): Promise<string> => {
  const payload: Record<string, unknown> = { model, messages };

  if (options.serviceTier) {
    payload.service_tier = options.serviceTier;
  }
  if (options.lowVerbosity) {
    payload.verbosity = "low";
  }

  const url = baseurl + "/v1/chat/completions";
  const response = await post(url, apikey, payload);
  const data = await readJsonResponse<ChatCompletion>(
    response,
    "OpenAI-compatible",
  );
  const content = data?.choices?.[0]?.message?.content;

  if (typeof content !== "string") {
    throw new Error("OpenAI-compatible response is missing message content");
  }

  return content;
};
