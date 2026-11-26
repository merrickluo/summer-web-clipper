import type { QueryClient } from "@tanstack/react-query";

type QueryInvalidator = Pick<QueryClient, "invalidateQueries">;

const DOC_QUERY = { queryKey: ["doc"] };

export const shouldRefreshDocument = (
  parsedUrl: string | undefined,
  currentUrl: string,
): boolean => parsedUrl !== currentUrl;

export const refreshDocumentIfUrlChanged = async (
  queryClient: QueryInvalidator,
  parsedUrl: string | undefined,
  currentUrl: string,
): Promise<boolean> => {
  if (!shouldRefreshDocument(parsedUrl, currentUrl)) {
    return false;
  }

  await queryClient.invalidateQueries(DOC_QUERY);

  return true;
};
