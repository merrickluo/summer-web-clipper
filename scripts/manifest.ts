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
      matches: ["*://*/*"],
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
  background: {
    scripts: ["dist/background.js"],
  },
};

const chromeBackground = {
  service_worker: "dist/background.js",
};

export const getManifest = (browser: string) => {
  if (browser == "chrome") {
    return {
      ...manifest,
      background: chromeBackground,
    };
  }

  return manifest;
};
