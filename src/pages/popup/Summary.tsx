import { UseQueryResult } from "react-query";

const Summary = ({
  summary,
  valid,
}: {
  summary: UseQueryResult<string>;
  valid: boolean;
}) => {
  const { error, data } = summary;
  if (!valid) {
    return <p>No summary provider selected, please check the settings.</p>;
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
