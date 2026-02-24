/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10B981", // Vibrant emerald green
        secondary: "#059669", // Darker emerald
        accent: "#34D399", // Bright green accent
        dark: "#1F2937", // Dark gray for text
        border: "#D1D5DB", // Gray borders
        light: "#F9FAFB", // Off-white background
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      backgroundColor: {
        base: "#FFFFFF",
        secondary: "#F3F4F6",
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'large': '0 8px 24px rgba(0, 0, 0, 0.1)',
        'green-glow': '0 0 20px rgba(16, 185, 129, 0.3)',
      }
    },
  },
  plugins: [],
};