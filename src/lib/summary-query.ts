import type { Doc } from "@lib/readbility";

export const canAutoSummarize = (
  autoSummary: boolean | undefined,
  doc: Doc | undefined,
): boolean => !!autoSummary && doc != null;
