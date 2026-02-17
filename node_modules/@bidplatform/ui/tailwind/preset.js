/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#10b981",      // emerald-500
          light: "#34d399",        // emerald-400
          dark: "#059669",         // emerald-600
        },
        surface: {
          DEFAULT: "#0f172a",      // slate-900
          light: "#1e293b",        // slate-800
          lighter: "#334155",      // slate-700
        },
        text: {
          DEFAULT: "#f8fafc",      // slate-50
          muted: "#94a3b8",        // slate-400
        }
      },

      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px"
      },

      spacing: {
        4.5: "1.125rem",
        18: "4.5rem",
        22: "5.5rem"
      },

      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.15)",
        subtle: "0 1px 3px rgba(0,0,0,0.1)"
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    }
  }
};
