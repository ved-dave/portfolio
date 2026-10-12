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
        bg: "var(--bg)",
        card: "var(--card)",
        muted: "var(--muted)",
        border: "var(--border)",
        fg: "var(--fg)",
        "fg-muted": "var(--fg-muted)",
        dim: "var(--dim)",
        term: "var(--term)",
        aqua: "var(--aqua)",
        blue: "var(--blue)",
        orange: "var(--orange)",
        red: "var(--red)",
        yellow: "var(--yellow)",
        purple: "var(--purple)",
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
