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
  baseurl: string,
  apikey: string,
  model: string,
  messages: ChatMessage[]
): Promise<string> => {
  let payload = {
    'model': model,
    'messages': messages,
    // reasoning model and beta feature
    'service_tier': 'auto',
  };
  // https://platform.openai.com/docs/pricing?latest-pricing=flex
  if (model === "o3" || model === "o4-mini" || model.startsWith("gpt-5")) {
    payload['service_tier'] = 'flex';
  }

  const url = baseurl + "/v1/chat/completions";
  const data = await post(url, apikey, payload).then((r: any) => r.json());

  return data?.choices?.[0].message?.content;
};
