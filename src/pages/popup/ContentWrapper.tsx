import { injectContentScript } from "@lib/browser";
import { ReactNode } from "react";
import { useQuery } from "react-query";

const ContentWrapper = ({ children }: { children: ReactNode }) => {
  const { isLoading, isSuccess: contentReady } = useQuery(
    "inject_content",
    injectContentScript,
    {
      retry: false,
    }
  );

  if (isLoading) {
    return <div className="p-3 text-lg">Parsing current page...</div>;
  }

  if (!contentReady) {
    return (
      <div className="p-3 text-base">
        Sorry, we’re having trouble loading content on this page.
      </div>
    );
  }

  return <>{children}</>;
};

export default ContentWrapper;
