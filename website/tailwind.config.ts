import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "color-mix(in srgb, var(--bg) calc(<alpha-value> * 100%), transparent)",
        card: "color-mix(in srgb, var(--card) calc(<alpha-value> * 100%), transparent)",
        muted: "color-mix(in srgb, var(--muted) calc(<alpha-value> * 100%), transparent)",
        border: "color-mix(in srgb, var(--border) calc(<alpha-value> * 100%), transparent)",
        fg: "color-mix(in srgb, var(--fg) calc(<alpha-value> * 100%), transparent)",
        "fg-muted": "color-mix(in srgb, var(--fg-muted) calc(<alpha-value> * 100%), transparent)",
        dim: "color-mix(in srgb, var(--dim) calc(<alpha-value> * 100%), transparent)",
        term: "color-mix(in srgb, var(--term) calc(<alpha-value> * 100%), transparent)",
        aqua: "color-mix(in srgb, var(--aqua) calc(<alpha-value> * 100%), transparent)",
        blue: "color-mix(in srgb, var(--blue) calc(<alpha-value> * 100%), transparent)",
        orange: "color-mix(in srgb, var(--orange) calc(<alpha-value> * 100%), transparent)",
        red: "color-mix(in srgb, var(--red) calc(<alpha-value> * 100%), transparent)",
        yellow: "color-mix(in srgb, var(--yellow) calc(<alpha-value> * 100%), transparent)",
        purple: "color-mix(in srgb, var(--purple) calc(<alpha-value> * 100%), transparent)",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        page: "53rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
