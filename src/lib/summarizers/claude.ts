import { Doc } from "@lib/readbility";
import { sanitizeContent, systemPrompt } from "./utils";
import Anthropic from "@anthropic-ai/sdk";

const summarize = async (doc: Doc, options: any): Promise<string> => {
    if (!options.apikey) {
        throw new Error("Claude API key not set");
    }

    const model = options.model ?? "claude-haiku-4-5-20251001";
    const api = new Anthropic({
        apiKey: options.apikey,
        dangerouslyAllowBrowser: true,
    });
    const docXml = `<document>${doc.title}\n${sanitizeContent(
        doc.textContent
    )}</document>`;
    const rsp = await api.messages.create({
        model: model, // https://docs.anthropic.com/claude/docs/models-overview
        max_tokens: 1536,
        system: systemPrompt(doc.language),
        messages: [{ role: "user", content: docXml }],
    });
    let summary = '';
    for (const block of rsp.content) {
        // no thinking block yet, make lint happy
        if (block.type === "text") {
            summary = block.text;
        }
    }
    return summary;
};

export default {
    id: "claude",
    summarize,
};
