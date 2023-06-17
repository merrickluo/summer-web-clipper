import { sanitizeContent } from "./utils";

describe("sanitize string", () => {
  test("replace multiple spaces to one", () => {
    expect(sanitizeContent("a   b  c\n\nd")).toBe("a b c d");
  });

  test("truncate to first K words split by spaces", () => {
    expect(sanitizeContent("a   b  c\n\nd", 2)).toBe("a b");
    expect(sanitizeContent("a   b  c\n\nd", 4)).toBe("a b c d");
  });
});
