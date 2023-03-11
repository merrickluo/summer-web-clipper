import pkg from "../package.json" assert { type: "json" };

const manifest = {
  manifest_version: 3,
  name: pkg.name,
  description: pkg.description,
  version: pkg.version,
  icons: {
    "64": "icons/icon.png",
  },
  permissions: ["tabs", "storage"],
  content_scripts: [
    {
      js: ["dist/content.js"],
      run_at: "document_idle",
    },
  ],
  action: {
    default_icon: {
      "64": "icons/icon.png",
    },
    default_popup: "popup.html",
    default_title: "Summer Web Clipper",
  },
};

const browserSettings = {
  chrome: {
    background: {
      service_worker: "dist/background.js",
    },
  },
  firefox: {
    background: {
      scripts: ["dist/background.js"],
    },
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
