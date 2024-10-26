import Overlay from "@components/overlay";
import Header from "@pages/popup/Header";
import { QueryClient, QueryClientProvider } from "react-query";
import Main from "./main";
import { AiOutlineClose } from "react-icons/ai";
import { useCallback, useMemo, useRef, useState } from "react";

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

  const closeOverlayAction = useMemo(
    () => (
      <AiOutlineClose
        className="ml-auto mr-6 w-6 h-6 hover:text-blue-600"
        onClick={() => {
          setHidden(true);
        }}
      />
    ),
    [setHidden]
  );

  if (hidden) {
    return <></>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Overlay>
        <div className="flex flex-col h-full">
          <Header actions={closeOverlayAction} />
          <Main />
        </div>
      </Overlay>
    </QueryClientProvider>
  );
};

export default Root;
