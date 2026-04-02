/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#000000",
        surface: "#0A0A0A",
        border: "#1F1F23",
        text: "#FFFFFF",
        muted: "#A1A1AA",
        accent: "#7C3AED",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
}
