import { fetchYoutubeTranscript } from "./youtube";

const originalFetch = globalThis.fetch;
const fetchMock = jest.fn();

beforeEach(() => {
  fetchMock.mockReset();
  globalThis.fetch = fetchMock as unknown as typeof fetch;
});

afterAll(() => {
  globalThis.fetch = originalFetch;
});

describe("fetchYoutubeTranscript", () => {
  test("returns the parsed transcript", async () => {
    const payload = {
      transcript: [{ text: "hello" }],
      metadata: { title: "A video" },
    };
    fetchMock.mockResolvedValue(new Response(JSON.stringify(payload)));

    await expect(fetchYoutubeTranscript("https://youtu.be/abc")).resolves.toEqual(
      payload,
    );
  });

  test("posts the video url as json", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({})));

    await fetchYoutubeTranscript("https://youtu.be/abc");

    expect(fetchMock).toHaveBeenCalledWith(
      "https://www.youtranscripts.com/api/transcript/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: "https://youtu.be/abc" }),
      },
    );
  });

  test("rejects on a rate limited request without parsing the body", async () => {
    const json = jest.fn();
    fetchMock.mockResolvedValue({
      ok: false,
      status: 429,
      text: async () => "Too Many Requests",
      json,
    });

    await expect(fetchYoutubeTranscript("https://youtu.be/abc")).rejects.toThrow(
      "YouTube transcript request failed (429)",
    );
    expect(json).not.toHaveBeenCalled();
  });
});
