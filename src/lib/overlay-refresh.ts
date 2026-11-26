import type { QueryClient } from "@tanstack/react-query";

type QueryInvalidator = Pick<QueryClient, "invalidateQueries">;

const DOC_QUERY = { queryKey: ["doc"] };
const SUMMARY_QUERY = { queryKey: ["summary"] };

export const shouldRefreshDocument = (
  parsedUrl: string | undefined,
  currentUrl: string,
): boolean => parsedUrl !== currentUrl;

export const refreshIfUrlChanged = async (
  queryClient: QueryInvalidator,
  parsedUrl: string | undefined,
  currentUrl: string,
): Promise<boolean> => {
  if (!shouldRefreshDocument(parsedUrl, currentUrl)) {
    return false;
  }

  await queryClient.invalidateQueries(DOC_QUERY);
  await queryClient.invalidateQueries(SUMMARY_QUERY);

  return true;
};
