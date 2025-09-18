/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
        schabo: ["SCHABO", "Arial", "sans-serif"],
        proxima: ["Proxima Nova", "Arial", "sans-serif"],
        "proxima-light": ["Proxima Nova Light", "Arial", "sans-serif"],
        "proxima-regular": ["Proxima Nova Regular", "Arial", "sans-serif"],
        "proxima-bold": ["proximanova-bold", "Arial", "sans-serif"],
        "proxima-extrabold": ["Proxima Nova Extrabold", "Arial", "sans-serif"],
        "proxima-black": ["Proxima Nova Black", "Arial", "sans-serif"],
        baskervville: ["Baskervville", "serif"],
        "baskervville-semibold": ["Baskervville Semibold", "serif"],
      },
      colors: {
        green: "#28AF4A",
        blue: "#3974F6",
        lightgrey: "#ADADAD",
        black: "#040405",
        midGrey: "#727272",
      },
      safelist: [{ pattern: /rotate-y-\[-?\d+deg\]/ }],
    },
  },
  plugins: [],
};
