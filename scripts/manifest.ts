import pkg from "../package.json" assert { type: "json" };

const manifest = {
  manifest_version: 3,
  name: pkg.name,
  description: pkg.description,
  version: pkg.version,
  icons: {
    "64": "icons/icon.png",
  },
  permissions: ["activeTab", "storage", "scripting"],
  action: {
    default_icon: {
      "64": "icons/icon.png",
    },
    default_popup: "popup.html",
    default_title: pkg.name,
  },
};

const browserSettings = {
  chrome: {
    background: {
      service_worker: "dist/background.js",
    },
    optional_host_permissions: [
      "https://www.notion.so/*",
      "*://api.anthropic.com/*"
    ],
    commands: {
      _execute_action: {
        suggested_key: {
          default: "Ctrl+Shift+S",
          mac: "Command+Shift+S",
        },
      },
    },
  },
  firefox: {
    background: {
      scripts: ["dist/background.js"],
    },
    commands: {
      _execute_action: {
        suggested_key: {
          default: "Ctrl+Alt+S",
          mac: "Command+Alt+S",
        },
      },
    },
    optional_permissions: [
      "https://www.notion.so/*",
      "*://api.anthropic.com/*"
    ],
    browser_specific_settings: {
      gecko: {
        id: process.env.FIREFOX_ADDON_ID || "smc@luois.ninja",
      },
    },
  },
};

export const getManifest = (browser: "chrome" | "firefox") => {
  return {
    ...manifest,
    ...browserSettings[browser],
  };
};
