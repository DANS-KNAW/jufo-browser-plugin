/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{tsx,ts,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
