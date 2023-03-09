export const sanitizeContent = (content: string, limit = 0): string => {
  const text = content.replaceAll(/\s+/g, " ");
  if (limit != 0) {
    return text.slice(0, limit);
  }

  return text;
};
