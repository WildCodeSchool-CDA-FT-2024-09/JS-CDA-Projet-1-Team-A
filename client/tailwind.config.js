/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-b": "#4F898C",
        "blue-v": "#235559",
        "blue-fd": "#568F94",
        "blue-bt": "#2A9BB7",
        "yellow-p": "#CFAB34",
        "yellow-v": "#A59A43",
      },
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
