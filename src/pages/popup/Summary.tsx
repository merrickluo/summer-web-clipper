import { UseQueryResult } from "react-query";

const Summary = ({
  summary,
  valid,
  auto,
}: {
  summary: UseQueryResult<string>;
  valid: boolean;
  auto: boolean;
}) => {
  const { error, data, isFetching, isFetched } = summary;
  if (!valid) {
    return <p>No summary provider selected, please check the settings.</p>;
  }

  if (!auto && !(isFetched || isFetching)) {
    return <p>Auto generation disabled, click refresh to generate summary.</p>;
  }

  if (error && (error as any)?.message) {
    return <p>{(error as any)?.message}</p>;
  }

  if (data) {
    return <p>{data}</p>;
  }

  return <p>Generating summary, please be patient...</p>;
};

export default Summary;
