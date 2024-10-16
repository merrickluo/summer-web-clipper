const openaiBase = "https://api.openai.com";
const groqBase = "https://api.groq.com/openai";
const mistralBase = "https://api.mistral.ai";

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

  const base = model.startsWith("mistral") 
    ? mistralBase
    : (model.startsWith("llama") ? groqBase : openaiBase);
  const url = base + "/v1/chat/completions";
  const data = await post(url, apikey, payload).then(
    (r: any) => r.json()
  );

  return data?.choices?.[0].message?.content;
};
