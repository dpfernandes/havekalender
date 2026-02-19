/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
      },
      colors: {
        // Dark green theme
        dark: {
          bg: "#060e05",
          card: "#0f1f0d",
          border: "#1e3a1a",
          border2: "#2d4a2a",
          muted: "#3a5a38",
          text: "#c8e6c4",
          "text-bright": "#e8f5e4",
          accent: "#4a7c59",
          hover: "#142918",
        },
        harvest: {
          bg: "#1a1400",
          border: "#3a2e00",
          hover: "#221c00",
          text: "#fde68a",
          muted: "#78694a",
        },
      },
    },
  },
  plugins: [],
};
