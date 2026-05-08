import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        floral: {
          ivory: "var(--floral-ivory)",
          cream: "var(--floral-cream)",
          blush: "var(--floral-blush)",
          rose: "var(--floral-rose)",
          dusty: "var(--floral-dusty)",
          gold: "var(--floral-gold)",
          "gold-deep": "var(--floral-gold-deep)",
          sage: "var(--floral-sage)",
          "sage-dark": "var(--floral-sage-dark)",
          text: "var(--floral-text)",
          muted: "var(--floral-muted)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "cursive"],
        serif: ["var(--font-heading)", "serif"],
        sans: ["var(--font-body)", "sans-serif"],
        // Brush
        "brush-display": ["var(--font-brush-display)", "serif"],
        "brush-heading": ["var(--font-brush-heading)", "serif"],
        "brush-body": ["var(--font-brush-body)", "sans-serif"],
        "brush-accent": ["var(--font-brush-accent)", "cursive"],
        // Modern
        "modern-display": ["var(--font-modern-display)", "sans-serif"],
        "modern-body": ["var(--font-modern-body)", "monospace"],
        "modern-accent": ["var(--font-modern-accent)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
