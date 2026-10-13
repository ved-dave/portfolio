"use client";

import { useEffect, useState } from "react";
import { THEMES, THEME_STORAGE_KEY, type ThemeId } from "@/lib/themes";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>("void");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") as ThemeId | null;
    if (current && THEMES.some((t) => t.id === current)) setTheme(current);
  }, []);

  const cycle = () => {
    const i = THEMES.findIndex((t) => t.id === theme);
    const next = THEMES[(i + 1) % THEMES.length].id;
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
  };

  const active = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <button
      type="button"
      onClick={cycle}
      className="group inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-fg"
      aria-label={`Theme: ${active.label}. Click to switch theme.`}
      title="switch theme"
    >
      <span
        className="h-2.5 w-2.5 rounded-full ring-1 ring-border transition-transform group-hover:scale-125"
        style={{ backgroundColor: active.swatch }}
        aria-hidden="true"
      />
      <span className="hidden sm:inline">{active.label}</span>
    </button>
  );
}
