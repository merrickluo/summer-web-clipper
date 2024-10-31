import ClaudeSettings from "@components/settings/summarizers/claude";
import { Doc } from "@lib/readbility";
import { Summarizer } from "../summarizers";
import { sanitizeContent, systemPrompt } from "./utils";
import Anthropic from "@anthropic-ai/sdk";

const summarize = async (doc: Doc, options: any): Promise<string> => {
    if (!options.apikey) {
        throw new Error("Claude API key not set");
    }

    const model = options.model ?? "claude-3-haiku-20240307";
    const api = new Anthropic({
        apiKey: options.apikey,
        dangerouslyAllowBrowser: true,
    });
    const docXml = `<document>${doc.title}\n${sanitizeContent(
        doc.textContent
    )}</document>`;
    const rsp = await api.messages.create({
        model: model, // https://docs.anthropic.com/claude/docs/models-overview
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: "user", content: docXml }],
        temperature: 0.16,
    });
    return rsp.content[0].text;
};

export default {
    id: "claude",
    name: "Claude AI",
    SettingsComp: ClaudeSettings,
    summarize,
} as Summarizer;
