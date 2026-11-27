import { readJsonResponse } from "./http";

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status });

describe("readJsonResponse", () => {
  test("returns the parsed body for a successful response", async () => {
    const data = { transcript: [{ text: "hello" }] };

    await expect(readJsonResponse(jsonResponse(data), "Test")).resolves.toEqual(
      data,
    );
  });

  test("rejects with the label, status and body for a failed response", async () => {
    const response = new Response("invalid api key", { status: 401 });

    await expect(readJsonResponse(response, "Provider")).rejects.toThrow(
      new Error("Provider request failed (401): invalid api key"),
    );
  });

  test("truncates a long error body to 300 characters", async () => {
    const body = "x".repeat(300) + "overflow";
    const response = new Response(body, { status: 500 });

    await expect(readJsonResponse(response, "Provider")).rejects.toThrow(
      new Error(`Provider request failed (500): ${"x".repeat(300)}`),
    );
  });
});
