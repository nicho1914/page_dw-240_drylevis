/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./Templates/**/*.html",
    "./Assets/JS/**/*.js"
  ],
  safelist: [
    "bg-white",
    "bg-neutral-400",
    "bg-neutral-900"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#fdf7ee",
          100: "#f8e7c6",
          200: "#f0cd8a",
          300: "#e6b052",
          400: "#d8932a",
          500: "#b6781d",
          600: "#8f5d17",
          700: "#6b4512",
          800: "#48300d",
          900: "#2a1c08"
        },
        ink: {
          DEFAULT: "#1a1a1a",
          muted:   "#6b6b6b",
          subtle:  "#9a9a9a"
        },
        surface: {
          DEFAULT: "#ffffff",
          alt:     "#f6f6f6",
          line:    "#e6e6e6"
        },
        success: "#1e8f4e",
        danger:  "#c0392b",
        info:    "#2f6fdb"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Bebas Neue", "Impact", "sans-serif"]
      },
      borderRadius: {
        DEFAULT: "6px",
        lg: "10px"
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)"
      },
      maxWidth: {
        checkout: "1200px"
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms")
  ]
};
