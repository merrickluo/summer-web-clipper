interface ClipData {
  title?: string;
  url: string;
  summary?: string;
  text?: string;
}

const clipKeys: Array<keyof ClipData> = ["url", "title", "summary", "text"];

export const buildUrl = (template: string, data: ClipData) => {
  let result = template;

  for (const key of clipKeys) {
    result = result.replaceAll(
      `{${key}}`,
      encodeURIComponent(data[key] ?? "")
    );
  }

  return result;
};
