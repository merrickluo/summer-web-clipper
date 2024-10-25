import Overlay from "@components/overlay";
import Header from "@pages/popup/Header";
import { QueryClient, QueryClientProvider } from "react-query";
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
  return (
    <QueryClientProvider client={queryClient}>
      <Overlay>
        <div className="flex flex-col h-full">
          <Header />
          <Main />
        </div>
      </Overlay>
    </QueryClientProvider>
  );
};

export default Root;
