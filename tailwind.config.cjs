/** @type {import('tailwindcss').Config} */

/** Channel-based token so Tailwind opacity modifiers keep working. */
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        /* Themed tokens — resolve per data-theme, see src/index.css */
        paper: token("paper"),
        surface: token("surface"),
        raised: token("raised"),
        ink: token("ink"),
        grey: token("muted"),
        accent: token("accent"),
        accent2: token("accent2"),
        clay: token("clay"),
        sand: token("sand"),

        /* Legacy aliases so older utility strings keep resolving */
        primary: token("paper"),
        secondary: token("muted"),
        tertiary: token("surface"),
        espresso: token("clay"),
        warm: token("sand"),
        "paper-200": token("surface"),
      },
      fontFamily: {
        display: ["Instrument Serif", "Georgia", "serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tighter2: "-0.045em",
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(115deg, var(--accent), var(--accent2))",
      },
      boxShadow: {
        card: "0 30px 60px -35px var(--shadow-strong)",
        lift: "0 40px 80px -40px var(--shadow-soft)",
        glow: "0 18px 40px -18px rgb(var(--c-accent) / 0.7)",
      },
      screens: {
        xs: "450px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
