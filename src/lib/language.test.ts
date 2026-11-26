import { normalizeLanguage, pickLanguage } from "./language";

describe("normalizeLanguage", () => {
  test("takes the base language before a region subtag", () => {
    expect(normalizeLanguage("en-US")).toBe("en");
  });

  test("lowercases the tag", () => {
    expect(normalizeLanguage("FR")).toBe("fr");
  });

  test("takes the base before an underscore subtag", () => {
    expect(normalizeLanguage("pt_BR")).toBe("pt");
  });

  test("trims surrounding whitespace", () => {
    expect(normalizeLanguage("  de-AT  ")).toBe("de");
  });

  test("returns an empty string for empty input", () => {
    expect(normalizeLanguage("")).toBe("");
    expect(normalizeLanguage(null)).toBe("");
    expect(normalizeLanguage(undefined)).toBe("");
  });

  test("returns an empty string for an undetermined tag", () => {
    expect(normalizeLanguage("und")).toBe("");
    expect(normalizeLanguage("UND")).toBe("");
  });
});

describe("pickLanguage", () => {
  test("returns the only detected language", () => {
    expect(pickLanguage([{ language: "ja", percentage: 100 }], "en")).toBe("ja");
  });

  test("returns the fallback for an empty list", () => {
    expect(pickLanguage([], "fr")).toBe("fr");
  });

  test("returns the first language when several are detected", () => {
    expect(
      pickLanguage(
        [
          { language: "es", percentage: 70 },
          { language: "en", percentage: 30 },
        ],
        "en",
      ),
    ).toBe("es");
  });

  test("skips entries with an empty language", () => {
    expect(
      pickLanguage([{ language: "" }, { language: "ko", percentage: 50 }], "en"),
    ).toBe("ko");
  });

  test("returns the fallback when every entry is empty", () => {
    expect(pickLanguage([{ language: "" }], "de")).toBe("de");
  });
});
