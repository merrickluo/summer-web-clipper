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
