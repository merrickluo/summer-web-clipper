const baseUrl = "https://api.openai.com";

const post = (path: string, apikey: string, payload: any = {}): any => {
  const url = `${baseUrl}${path}`;

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

export const getCompletion = async (
  apikey: string,
  model: string,
  messages: ChatMessage[]
): Promise<string> => {
  const payload = {
    model: model,
    temperature: 0,
    messages: messages,
  };

  const data = await post("/v1/chat/completions", apikey, payload).then(
    (r: any) => r.json()
  );

  return data?.choices?.[0].message?.content;
};
