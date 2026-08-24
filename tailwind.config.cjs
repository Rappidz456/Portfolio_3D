/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#06090f",
        secondary: "#9aa4b2",
        tertiary: "#101826",
        accent: "#2dd4bf",
        accentSoft: "#5eead4",
        warm: "#fbbf24",
        "black-100": "#0c1422",
        "black-200": "#080d16",
        "white-100": "#eef2f7",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["Outfit", "sans-serif"],
      },
      boxShadow: {
        card: "0px 28px 80px -20px rgba(45, 212, 191, 0.18)",
        glow: "0 0 40px rgba(45, 212, 191, 0.35)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern":
          "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(45, 212, 191, 0.18), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 10%, rgba(251, 191, 36, 0.08), transparent 50%), linear-gradient(180deg, #06090f 0%, #0a1018 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.85" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        shimmer: "shimmer 4s linear infinite",
        pulseGlow: "pulseGlow 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
