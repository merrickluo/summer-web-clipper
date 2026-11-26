import { useEffect, useMemo, useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AiOutlineClose } from "react-icons/ai";

import Header from "@components/header";
import Overlay from "@components/overlay";
import type { Doc } from "@lib/readbility";
import { refreshDocumentIfUrlChanged } from "@lib/overlay-refresh";
import Main from "./main";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const Root = () => {
  const [hidden, setHidden] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    const toggleOverlay = () => setHidden((current) => !current);

    window.addEventListener("swc:toggle-overlay", toggleOverlay);
    return () => {
      window.removeEventListener("swc:toggle-overlay", toggleOverlay);
    };
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (hidden) {
      return;
    }

    void refreshDocumentIfUrlChanged(
      queryClient,
      queryClient.getQueryData<Doc>(["doc"])?.url,
      window.location.href,
    );
  }, [hidden]);

  const closeOverlayAction = useMemo(
    () => (
      <AiOutlineClose
        className="swc:ml-auto swc:mr-6 swc:w-6 swc:h-6 hover:swc:text-blue-600"
        onClick={() => {
          setHidden(true);
        }}
      />
    ),
    [setHidden],
  );

  if (hidden) {
    return <></>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Overlay>
        <div className="swc:flex swc:flex-col swc:h-full">
          <Header actions={closeOverlayAction} subtitle="Summary" />
          <Main />
        </div>
      </Overlay>
    </QueryClientProvider>
  );
};

export default Root;
