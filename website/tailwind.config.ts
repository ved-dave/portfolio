import type { Config } from "tailwindcss";
import defaultColors from "tailwindcss/colors";

// Full-colour CSS variables (hex or hsl()), with Tailwind opacity modifiers.
const mix = (name: string) =>
  `color-mix(in srgb, var(--${name}) calc(<alpha-value> * 100%), transparent)`;

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // shared by both designs
        card: { DEFAULT: mix("card"), foreground: "hsl(var(--card-foreground))" },
        muted: { DEFAULT: mix("muted"), foreground: "hsl(var(--muted-foreground))" },
        border: mix("border"),

        // classic design
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // terminal design
        bg: mix("bg"),
        fg: mix("fg"),
        "fg-muted": mix("fg-muted"),
        dim: mix("dim"),
        term: mix("term"),
        aqua: mix("aqua"),
        blue: { ...defaultColors.blue, DEFAULT: mix("blue") },
        orange: { ...defaultColors.orange, DEFAULT: mix("orange") },
        red: { ...defaultColors.red, DEFAULT: mix("red") },
        yellow: { ...defaultColors.yellow, DEFAULT: mix("yellow") },
        purple: { ...defaultColors.purple, DEFAULT: mix("purple") },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        page: "53rem",
      },
      container: {
        center: true,
        padding: { DEFAULT: "1rem", sm: "2rem", lg: "4rem", xl: "5rem", "2xl": "6rem" },
        screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1536px" },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
