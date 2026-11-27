import { normalizeDoc } from "./readbility";

const URL = "https://example.com/article";

const emptyFields = {
  title: "",
  byline: "",
  content: "",
  textContent: "",
  excerpt: "",
  siteName: "",
};

const nullFields = {
  title: null,
  byline: null,
  content: null,
  textContent: null,
  excerpt: null,
  siteName: null,
};

const undefinedFields = {
  title: undefined,
  byline: undefined,
  content: undefined,
  textContent: undefined,
  excerpt: undefined,
  siteName: undefined,
};

describe("normalizeDoc", () => {
  test("passes through present fields", () => {
    const parsed = {
      title: "A title",
      byline: "A byline",
      content: "<p>Some content</p>",
      textContent: "Some content",
      length: 12,
      excerpt: "An excerpt",
      siteName: "Example",
    };

    expect(normalizeDoc(parsed, URL, true, "en")).toEqual({
      ...parsed,
      url: URL,
      readable: true,
      language: "en",
    });
  });

  test("turns null string fields into empty strings", () => {
    expect(normalizeDoc({ ...nullFields, length: null }, URL, false, "fr")).toEqual({
      ...emptyFields,
      length: 0,
      url: URL,
      readable: false,
      language: "fr",
    });
  });

  test("turns undefined string fields into empty strings", () => {
    expect(
      normalizeDoc({ ...undefinedFields, length: undefined }, URL, true, "de"),
    ).toEqual({
      ...emptyFields,
      length: 0,
      url: URL,
      readable: true,
      language: "de",
    });
  });

  test("treats missing fields as empty", () => {
    expect(normalizeDoc({}, URL, false, "es")).toEqual({
      ...emptyFields,
      length: 0,
      url: URL,
      readable: false,
      language: "es",
    });
  });
});
