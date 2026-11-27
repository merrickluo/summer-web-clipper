import { buildUrl } from "./helpers";

describe("build org protocol url", () => {
  describe("with full template", () => {
    const template =
      "org-protocol://roam-ref?template=w&ref={url}&title={title}&summary={summary}&text={text}";

    test("build full url with valid data", () => {
      expect(
        buildUrl(template, {
          url: "http://example.com",
          title: "awesome",
          summary: "summer",
          text: "web clipper",
        })
      ).toBe(
        "org-protocol://roam-ref?template=w&ref=http%3A%2F%2Fexample.com&title=awesome&summary=summer&text=web%20clipper"
      );
    });
  });

  describe("placeholder handling", () => {
    test("replaces every occurrence of the same placeholder", () => {
      expect(
        buildUrl("org-protocol://x?ref={url}&again={url}", {
          url: "http://example.com/a b",
        })
      ).toBe(
        "org-protocol://x?ref=http%3A%2F%2Fexample.com%2Fa%20b&again=http%3A%2F%2Fexample.com%2Fa%20b"
      );
    });

    test("uses an empty value for missing optional data", () => {
      expect(
        buildUrl("org-protocol://x?title={title}&summary={summary}&text={text}", {
          url: "http://example.com",
          title: "awesome",
        })
      ).toBe("org-protocol://x?title=awesome&summary=&text=");
    });
  });

  describe("with template with lesser keys", () => {
    const template =
      "org-protocol://roam-ref?template=w&ref={url}&title={title}&summary={summary}";

    test("build full url with valid data", () => {
      expect(
        buildUrl(template, {
          url: "http://example.com",
          title: "awesome",
          summary: "summer",
          text: "web clipper",
        })
      ).toBe(
        "org-protocol://roam-ref?template=w&ref=http%3A%2F%2Fexample.com&title=awesome&summary=summer"
      );
    });
  });
});
