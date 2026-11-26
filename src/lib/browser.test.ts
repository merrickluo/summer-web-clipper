import { toggleOrInjectContent } from "./browser";

describe("toggleOrInjectContent", () => {
  const sendMessageMock = jest.fn();
  const executeScriptMock = jest.fn();

  beforeEach(() => {
    sendMessageMock.mockReset();
    executeScriptMock.mockReset();
    (globalThis as any).chrome = {
      tabs: { sendMessage: sendMessageMock },
      scripting: { executeScript: executeScriptMock },
    };
  });

  afterEach(() => {
    delete (globalThis as any).chrome;
  });

  test("toggles the overlay when the content script responds", async () => {
    sendMessageMock.mockResolvedValue({ type: "success" });

    await expect(toggleOrInjectContent(42)).resolves.toBe("toggled");

    expect(sendMessageMock).toHaveBeenCalledWith(42, {
      action: "toggle_overlay",
    });
    expect(executeScriptMock).not.toHaveBeenCalled();
  });

  test("injects the content script when no content script responds", async () => {
    sendMessageMock.mockRejectedValue(
      new Error("Could not establish connection. Receiving end does not exist."),
    );
    executeScriptMock.mockResolvedValue([]);

    await expect(toggleOrInjectContent(42)).resolves.toBe("injected");

    expect(executeScriptMock).toHaveBeenCalledWith({
      target: { tabId: 42 },
      files: ["dist/content.js"],
    });
  });
});
