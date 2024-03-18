import ClaudeSettings from "@components/settings/summarizers/Claude";
import { Doc } from "@lib/readbility";
import { Summarizer } from "../summarizers";
import { sanitizeContent } from "./utils";
import Anthropic from '@anthropic-ai/sdk';


// Claude insists that they are an assistant, leave only task instructions then.
const systemPrompt = "You are an professional editor, please outline the most relevant content in the document, in an Axios style.";


const summarize = async (doc: Doc, options: any): Promise<string> => {
    if (!options.apikey) {
        throw new Error("Claude API key not set");
    }

    const api = new Anthropic({
        apiKey: options.apikey,
    });
    const docXml = `<document>${doc.title}\n${sanitizeContent(doc.textContent)}</document>`;
    const rsp = await api.messages.create({
        model: 'claude-3-sonnet-20240229', // https://docs.anthropic.com/claude/docs/models-overview
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
            {"role": "user", "content": docXml}
        ],
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
