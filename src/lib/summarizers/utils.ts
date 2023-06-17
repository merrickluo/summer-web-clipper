export const sanitizeContent = (content: string, limit = 0): string => {
  const textSlices = content.replaceAll(/\s+/g, " ").split(" ");
  const truncateSlices = limit === 0 ? textSlices : textSlices.slice(0, limit);
  return truncateSlices.join(" ");
};
