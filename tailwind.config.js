/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#1C63D5",
        green: "#008000",
        grey: "#606060",
      },
    },
  },
  plugins: [],
};
