import ClaudeSettings from "@components/settings/summarizers/Claude";
import { Doc } from "@lib/readbility";
import { Summarizer } from "../summarizers";
import { sanitizeContent } from "./utils";
import Anthropic from '@anthropic-ai/sdk';


const systemPrompt = "I want you to act like a you are a professional editor." +
    "You will summarize the document so readers can get the essence of the article, while keep it short and precise." +
    "You will always use an objective tone." +
    "You will only reply with the summary, and nothing else.";


const summarize = async (doc: Doc, options: any): Promise<string> => {
    if (!options.apikey) {
        throw new Error("Claude API key not set");
    }

    const api = new Anthropic({
        apiKey: options.apikey,
    });
    const docXml = `<document>${doc.title}\n${sanitizeContent(doc.textContent)}</document>`;
    const prompt = `${systemPrompt}${Anthropic.HUMAN_PROMPT}${docXml}${Anthropic.AI_PROMPT}`;
    const rsp = await api.completions.create({
        model: 'claude-2',  // majar version, means 2.1 
        max_tokens_to_sample: 1000,
        prompt: prompt
    });
    return rsp.completion;
};

export default {
    id: "claude",
    name: "Claude AI",
    SettingsComp: ClaudeSettings,
    summarize,
} as Summarizer;
