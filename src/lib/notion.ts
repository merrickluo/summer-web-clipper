import { v4 as uuidv4 } from "uuid";
import { Summarizer } from "./summarizer";

const defaultModel = "openai-3";
const defaultUrl = "https://www.notion.so/api/v3/getCompletion";

export class NotionSummarizer implements Summarizer {
  constructor(
    private spaceId: string,
    private url = defaultUrl,
    private model = defaultModel
  ) {}

  async summarize(title: string, content: string): Promise<string> {
    const context = {
      type: "summarize",
      pageTitle: title,
      selectedText: content,
    };

    const payload = {
      id: uuidv4(),
      model: this.model,
      spaceId: this.spaceId,
      isSpacePermission: false,
      context,
    };

    const resp = await this.request(payload);
    const text = await resp.text();
    if (!resp.ok) {
      throw "failed to summarize page: " + text;
    }

    const lines = text.split("\n");
    return lines.map(this.parseLine).join("");
  }

  async request(payload: any): Promise<Response> {
    return fetch(this.url, {
      method: "post",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }

  parseLine(line: string): string {
    try {
      const data = JSON.parse(line);
      if (data.type == "success") {
        return data.completion;
      }
    } catch (e) {
      // ignore invalid json
    }
    return "";
  }
}
