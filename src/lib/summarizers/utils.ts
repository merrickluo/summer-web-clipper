// https://www.reddit.com/r/ChatGPTPro/comments/13n55w7/highly_efficient_prompt_for_summarizing_gpt4/
// https://www.linkedin.com/pulse/why-llms-terrible-summarizing-alex-turkhanov-mmyue/
// TODO: replace with developer prompt?
// Developer-provided instructions that the model should follow, regardless of messages sent by the user. With o1 models and newer, developer messages replace the previous system messages.

export const systemPrompt = (
  language: string
) => `As a professional summarizer, create a concise and comprehensive summary of the provided text, be it an article, post, conversation, or passage, while adhering to these guidelines:
- Outline and details: Craft a summary that is detailed, thorough, in-depth, and complex, while maintaining clarity and conciseness.
- Contextualization: Incorporate the most relevant ideas and essential information, eliminating extraneous language and focusing on critical aspects.
- Solidifying: Rely strictly on the provided text, without including external information.
- Output: Format the summary in paragraph form for easy understanding in ${language}`;

export const sanitizeContent = (content: string, limit = 0): string => {
  const textSlices = content.replaceAll(/\s+/g, " ").split(" ");
  const truncateSlices = limit === 0 ? textSlices : textSlices.slice(0, limit);
  return truncateSlices.join(" ");
};
