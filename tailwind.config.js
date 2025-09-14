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
        // You can add your custom font families here
        // Example:
        // 'display': ['FontName', 'sans-serif'],
        // 'body': ['FontName', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
