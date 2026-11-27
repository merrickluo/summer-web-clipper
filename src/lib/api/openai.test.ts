import { getCompletion } from "./openai";

const originalFetch = globalThis.fetch;
const fetchMock = jest.fn();
const baseurl = "https://api.example.test";
const messages = [{ role: "user", content: "hello" }];

beforeEach(() => {
  fetchMock.mockReset();
  globalThis.fetch = fetchMock as unknown as typeof fetch;
});

afterAll(() => {
  globalThis.fetch = originalFetch;
});

describe("getCompletion", () => {
  test("returns the message content", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ choices: [{ message: { content: "hi" } }] })),
    );

    await expect(
      getCompletion(baseurl, "key", "model", messages),
    ).resolves.toBe("hi");
    expect(fetchMock.mock.calls[0][0]).toBe(
      `${baseurl}/v1/chat/completions`,
    );
  });

  test("rejects with the status and body for a failed request", async () => {
    fetchMock.mockResolvedValue(
      new Response("invalid api key", { status: 401 }),
    );

    await expect(
      getCompletion(baseurl, "key", "model", messages),
    ).rejects.toThrow(
      new Error("OpenAI-compatible request failed (401): invalid api key"),
    );
  });

  test("rejects when the response has no message content", async () => {
    const body = { choices: [] };
    fetchMock.mockResolvedValue(new Response(JSON.stringify(body)));

    await expect(
      getCompletion(baseurl, "key", "model", messages),
    ).rejects.toThrow(
      new Error(
        `OpenAI-compatible response is missing message content: ${JSON.stringify(body)}`,
      ),
    );
  });
});
