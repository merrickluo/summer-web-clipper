interface ClipData {
  title?: string;
  url: string;
  summary?: string;
  text?: string;
}

export const buildUrl = (template: string, data: ClipData) => {
  let result = template;

  for (const [key, value] of Object.entries(data)) {
    const encodedValue = encodeURIComponent(value as string);
    result = result.replace(`{${key}}`, encodedValue);
  }

  return result;
};
