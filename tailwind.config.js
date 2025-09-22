/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        twinkle: "twinkle 4s ease-in-out infinite",
        "bounce-slow": "bounce 2s infinite",
        "pulse-slow": "pulse 2s infinite",
        "fade-in-up": "fadeInUp 1s ease-out both",
        "fade-in-right": "fadeInRight 1.2s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        fadeInUp: {
          "100%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInRight: {
          "0%": { opacity: "1", transform: "translate3d(40px, 0, 0)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
      },
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
        black: "#000000",
        midGrey: "#727272",
      },
      safelist: [{ pattern: /rotate-y-\[-?\d+deg\]/ }],
    },
  },
  plugins: [],
};
