import { v4 as uuidv4 } from "uuid";

const baseUrl = "https://www.notion.so/api/v3";

const notionPost = (path: string, payload: any = {}): Promise<Response> => {
  const url = `${baseUrl}${path}`;
  return fetch(url, {
    method: "post",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: payload && JSON.stringify(payload),
  });
};

export const fetchNotionSpaces = async () => {
  const data = await notionPost("/getSpaces").then((r) => r.json());

  if (!data || Object.keys(data).length < 1) {
    throw new Error("failed to get notion spaces");
  }

  const [key] = Object.keys(data);
  const spaces = data[key].space;

  return Object.keys(spaces).map((spaceId) => {
    return {
      id: spaceId,
      name: spaces[spaceId].value.name,
    };
  });
};

export const getCompletion = async (
  spaceId: string,
  model: string,
  title: string,
  content: string
) => {
  const context = {
    type: "summarize",
    pageTitle: title.trim(),
    selectedText: content,
  };

  const payload = {
    id: uuidv4(),
    model: model,
    spaceId: spaceId,
    isSpacePermission: false,
    context,
  };

  return await notionPost("/getCompletion", payload).then((r) => r.text());
};
