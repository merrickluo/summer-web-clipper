import { canAutoSummarize } from "./summary-query";
import type { Doc } from "@lib/readbility";

const doc = { url: "https://example.com/article", title: "Article" } as Doc;

describe("canAutoSummarize", () => {
  test("auto summary on and document parsed -> true", () => {
    expect(canAutoSummarize(true, doc)).toBe(true);
  });

  test("auto summary on but document not parsed -> false", () => {
    expect(canAutoSummarize(true, undefined)).toBe(false);
  });

  test("auto summary off with parsed document -> false", () => {
    expect(canAutoSummarize(false, doc)).toBe(false);
  });

  test("auto summary undefined -> false", () => {
    expect(canAutoSummarize(undefined, doc)).toBe(false);
    expect(canAutoSummarize(undefined, undefined)).toBe(false);
  });
});
