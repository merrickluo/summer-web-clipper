import { Doc } from "@lib/readbility";
import { sanitizeContent, systemPrompt } from "./utils";

interface ClaudeMessageResponse {
  content: Array<{ type: string; text?: string }>;
}

const summarize = async (doc: Doc, options: any): Promise<string> => {
  if (!options.apikey) {
    throw new Error("Claude API key not set");
  }

  const model = options.model ?? "claude-haiku-4-5-20251001";
  const docXml = `<document>${doc.title}\n${sanitizeContent(
    doc.textContent,
  )}</document>`;
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": options.apikey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1536,
      system: systemPrompt(doc.language),
      messages: [{ role: "user", content: docXml }],
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Claude API request failed (${response.status}): ${await response.text()}`,
    );
  }

  const message = (await response.json()) as ClaudeMessageResponse;
  let summary = "";
  for (const block of message.content) {
    if (block.type === "text") {
      summary = block.text ?? "";
    }
  }
  return summary;
};

export default {
  id: "claude",
  summarize,
};
