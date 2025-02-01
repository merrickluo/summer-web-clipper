/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const {
  scopedPreflightStyles,
  isolateInsideOfContainer,
} = require("tailwindcss-scoped-preflight");

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
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer(".swc-preflight"),
    }),
    require("daisyui"),
  ],
  prefix: "swc-",
};
