export const THEME_STORAGE_KEY = "portfolio-terminal-theme";

export const THEMES = [
  { id: "void", label: "void", swatch: "#b8c572" },
  { id: "nord", label: "nord", swatch: "#88c0d0" },
  { id: "gruvbox", label: "gruvbox light", swatch: "#79740e" },
  { id: "sepia", label: "sepia", swatch: "#9d5c26" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];
