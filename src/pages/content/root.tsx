import { useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AiOutlineClose } from "react-icons/ai";

import Header from "@components/header";
import Overlay from "@components/overlay";
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

  const closeOverlayAction = useMemo(
    () => (
      <AiOutlineClose
        className="swc-ml-auto swc-mr-6 swc-w-6 swc-h-6 hover:swc-text-blue-600 "
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
        <div className="swc-flex swc-flex-col swc-h-full">
          <Header actions={closeOverlayAction} subtitle="Summary" />
          <Main />
        </div>
      </Overlay>
    </QueryClientProvider>
  );
};

export default Root;
