import { describe, expect, it, jest } from "@jest/globals";
import {
  refreshDocumentIfUrlChanged,
  shouldRefreshDocument,
} from "./overlay-refresh";

const fakeClient = () => {
  const calls: (readonly unknown[])[] = [];
  const invalidateQueries = jest.fn(
    async (filters?: { queryKey?: readonly unknown[] }) => {
      calls.push(filters?.queryKey ?? []);
    },
  );
  return { calls, invalidateQueries };
};

describe("shouldRefreshDocument", () => {
  it("is false when the urls are the same", () => {
    expect(shouldRefreshDocument("https://a.example/x", "https://a.example/x")).toBe(
      false,
    );
  });

  it("is true when the urls differ", () => {
    expect(shouldRefreshDocument("https://a.example/x", "https://a.example/y")).toBe(
      true,
    );
  });

  it("is true when the parsed url is undefined", () => {
    expect(shouldRefreshDocument(undefined, "https://a.example/y")).toBe(true);
  });
});

describe("refreshDocumentIfUrlChanged", () => {
  it("returns false and leaves the client untouched at the same url", async () => {
    const client = fakeClient();

    const refreshed = await refreshDocumentIfUrlChanged(
      client,
      "https://a.example/x",
      "https://a.example/x",
    );

    expect(refreshed).toBe(false);
    expect(client.invalidateQueries).not.toHaveBeenCalled();
    expect(client.calls).toEqual([]);
  });

  it("invalidates only the document when the url changed", async () => {
    const client = fakeClient();

    const refreshed = await refreshDocumentIfUrlChanged(
      client,
      "https://a.example/x",
      "https://a.example/y",
    );

    expect(refreshed).toBe(true);
    expect(client.calls).toEqual([["doc"]]);
  });

  it("invalidates only the document when the parsed url is undefined", async () => {
    const client = fakeClient();

    const refreshed = await refreshDocumentIfUrlChanged(
      client,
      undefined,
      "https://a.example/y",
    );

    expect(refreshed).toBe(true);
    expect(client.calls).toEqual([["doc"]]);
  });
});
