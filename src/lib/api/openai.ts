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
  messages: ChatMessage[]
): Promise<string> => {
  const words = messages
    .map((x) => x.content.split(" ").length)
    .reduce((a, b) => a + b);

  const payload = {
    // see napkin math in OpenAI.tsx
    model: words > 3000 ? "gpt-3.5-turbo-16k" : "gpt-3.5-turbo",
    temperature: 0,
    messages: messages,
  };

  const data = await post("/v1/chat/completions", apikey, payload).then(
    (r: any) => r.json()
  );

  return data?.choices?.[0].message?.content;
};
