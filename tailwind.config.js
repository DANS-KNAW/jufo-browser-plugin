const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{tsx,ts,js}"],
  theme: {
    extend: {
      colors: {
        rda: {
          50: "#EDF7E8",
          100: "#DBEFD1",
          200: "#B4DEA0",
          300: "#90CF73",
          400: "#69BE41",
          500: "#4F8E31",
          600: "#3F7227",
          700: "#30571E",
          800: "#1F3914",
          900: "#111E0A",
          950: "#080F05",
        },
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
