const post = (url: string, apikey: string, payload: any = {}): any => {
  return fetch(url, {
    method: "post",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apikey}`,
    },
    body: JSON.stringify(payload),
  });
};

interface ChatMessage {
  role: string;
  content: string;
}

interface CompletionOptions {
  serviceTier?: "flex" | "priority";
  lowVerbosity?: boolean;
}

export const getCompletion = async (
  baseurl: string,
  apikey: string,
  model: string,
  messages: ChatMessage[],
  options: CompletionOptions = {},
): Promise<string> => {
  const payload: Record<string, unknown> = { model, messages };

  if (options.serviceTier) {
    payload.service_tier = options.serviceTier;
  }
  if (options.lowVerbosity) {
    payload.verbosity = "low";
  }

  const url = baseurl + "/v1/chat/completions";
  const data = await post(url, apikey, payload).then((response: Response) =>
    response.json(),
  );

  return data?.choices?.[0].message?.content;
};
