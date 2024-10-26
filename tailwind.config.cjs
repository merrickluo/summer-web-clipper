/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
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
  plugins: [require("daisyui")],
};
