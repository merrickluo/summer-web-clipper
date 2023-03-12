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
    optional_host_permissions: ["https://www.notion.so/*"],
  },
  firefox: {
    background: {
      scripts: ["dist/background.js"],
    },
    optional_permissions: ["https://www.notion.so/*"],
    browser_specific_settings: {
      gecko: {
        id: "summber-web-clipper@luois.me",
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
