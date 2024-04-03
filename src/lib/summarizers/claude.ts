import ClaudeSettings from "@components/settings/summarizers/Claude";
import { Doc } from "@lib/readbility";
import { Summarizer } from "../summarizers";
import { sanitizeContent } from "./utils";
import Anthropic from '@anthropic-ai/sdk';


// Claude insists that they are an assistant, leave only task instructions then.
// https://www.reddit.com/r/ChatGPTPro/comments/13n55w7/highly_efficient_prompt_for_summarizing_gpt4/
// https://www.linkedin.com/pulse/why-llms-terrible-summarizing-alex-turkhanov-mmyue/
const systemPrompt = `As a professional summarizer, create a concise and comprehensive summary of the provided text, be it an article, post, conversation, or passage, while adhering to these guidelines:
- Outline and details: Craft a summary that is detailed, thorough, in-depth, and complex, while maintaining clarity and conciseness.
- Contextualization: Incorporate the most relevant ideas and essential information, eliminating extraneous language and focusing on critical aspects.
- Solidifying: Rely strictly on the provided text, without including external information.
- Output: Format the summary in paragraph form for easy understanding.`;

const summarize = async (doc: Doc, options: any): Promise<string> => {
    if (!options.apikey) {
        throw new Error("Claude API key not set");
    }

    const model = options.model ?? 'claude-3-haiku-20240307';
    const api = new Anthropic({
        apiKey: options.apikey,
    });
    const docXml = `<document>${doc.title}\n${sanitizeContent(doc.textContent)}</document>`;
    const rsp = await api.messages.create({
        model: model, // https://docs.anthropic.com/claude/docs/models-overview
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
