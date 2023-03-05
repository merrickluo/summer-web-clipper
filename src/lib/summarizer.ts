export interface Summarizer {
  summarize(title: string, content: string): Promise<string>;
