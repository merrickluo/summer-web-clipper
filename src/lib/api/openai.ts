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
    'temperature': 0,
    'service_tier': 'auto',
  };
  if (model.startsWith("o4-mini")) {
    payload['service_tier'] = 'flex';
    payload['temperature'] = 1;
  }

  const url = baseurl + "/v1/chat/completions";
  const data = await post(url, apikey, payload).then((r: any) => r.json());

  return data?.choices?.[0].message?.content;
};
