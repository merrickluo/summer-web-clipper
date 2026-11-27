export const readJsonResponse = async <T>(
  response: Response,
  label: string,
): Promise<T> => {
  if (!response.ok) {
    const body = await response.text();

    throw new Error(
      `${label} request failed (${response.status}): ${body.slice(0, 300)}`,
    );
  }

  return (await response.json()) as T;
};
