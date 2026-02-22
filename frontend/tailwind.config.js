/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#059669", // Teal/emerald primary (domain-monitor style)
        secondary: "#10B981",
        accent: "#059669",
        dark: "#111827", // Very dark gray for text
        border: "#E5E7EB", // Light gray borders
        light: "#F9FAFB", // Background white
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundColor: {
        base: "#FFFFFF",
        secondary: "#F9FAFB",
      }
    },
  },
  plugins: [],
};