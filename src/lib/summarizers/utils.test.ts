import { sanitizeContent } from "./utils";

describe("sanitize string", () => {
  test("replace multiple spaces to one", () => {
    expect(sanitizeContent("a   b  c\n\nd")).toBe("a b c d");
  });
});
