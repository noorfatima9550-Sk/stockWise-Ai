/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef3ff",
          100: "#dde7ff",
          200: "#b8cbff",
          300: "#8babff",
          400: "#5b82ff",
          500: "#3763f4",
          600: "#2953e0", // primary brand blue (buttons, links, active states)
          700: "#2143b8",
          800: "#1c3790",
          900: "#0f1f4d"
        },
        brand: {
          50: "#eef3ff",
          100: "#dde7ff",
          200: "#b8cbff",
          300: "#8babff",
          400: "#5b82ff",
          500: "#3763f4",
          600: "#2953e0",
          700: "#2143b8",
          800: "#1c3790",
          900: "#0f1f4d"
        }
      },
      fontFamily: {
        sans: [
          "DM Sans",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif"
        ]
      },
      boxShadow: {
        card: "0 1px 2px rgba(16, 24, 40, 0.06), 0 1px 3px rgba(16, 24, 40, 0.10)",
        panel: "0 4px 6px -2px rgba(16, 24, 40, 0.05), 0 12px 24px -4px rgba(16, 24, 40, 0.10)"
      }
    }
  },
  plugins: []
};
