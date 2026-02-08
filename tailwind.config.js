/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Added this as a safety net
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B2D72",
        secondary: "#0992C2",
        accent: "#0AC4E0",
        cream: "#F6E7BC",
      },
    },
  },
  plugins: [],
};
