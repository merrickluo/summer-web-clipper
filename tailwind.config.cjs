/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");
const fs = require("fs");
const path = require("path");
const postcss = require("postcss");

// preflight is disabled because we inject css to the page
// using preflight will affect page display.
// instead use a custom plugin to apply preflight only in containers for the extension
// see: https://github.com/tailwindlabs/tailwindcss/discussions/10332
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.tsx", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: colors.slate["700"],
        secondary: colors.gray["400"],
      },
      spacing: {
        "1/2": "50%",
        "3/4": "75%",
      },
      zIndex: {
        "999": "999",
      },
    },
  },
  plugins: [
    require("daisyui"),
    plugin(({ addBase }) => {
      const preflightStyles = postcss.parse(
        fs.readFileSync(
          require.resolve("tailwindcss/lib/css/preflight.css"),
          "utf8"
        )
      );

      // Scope the selectors to specific components
      preflightStyles.walkRules((rule) => {
        rule.selector = ".swc-preflight " + rule.selector;
      });

      addBase(preflightStyles.nodes);
    }),
  ],
  prefix: "swc-",
};
