import { FC } from "react";

export type DataState =
  | { status: "loading" }
  | { status: "success"; data: any }
  | { status: "error"; message: string };

const DefaultLoadingComponent = () => {
  return <p>Loading...</p>;
};

const DefaultErrorComponent = ({ message }: { message: string }) => {
  return <p>Error: {message}</p>;
};

export const renderDataState = (
  state: DataState,
  Component: FC<{ data: any }>,
  LoadingComponent = DefaultLoadingComponent,
  ErrorComponent = DefaultErrorComponent
) => {
  return (
    <>
      {state.status == "loading" && <LoadingComponent />}
      {state.status == "error" && <ErrorComponent message={state.message} />}
      {state.status == "success" && <Component data={state.data} />}
    </>
  );
};
