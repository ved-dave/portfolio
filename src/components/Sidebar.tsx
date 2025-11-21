"use client";

import { useState, useEffect, useId } from "react";
import { Mail, Calendar, MapPin, Linkedin, Github, Instagram, X, Menu, ChevronDown, User } from "lucide-react";

const THEME_OPTIONS = [
  { name: "Red", color: "#FF2020" },
  { name: "Green", color: "#20C20E" },
  { name: "Blue", color: "#0043FF" },
  { name: "Yellow", color: "#F6FF00" },
  { name: "Purple", color: "#AC47FF" },
  { name: "Orange", color: "#FFA845" },
  { name: "Violet", color: "#545FED" },
  { name: "Sky Blue", color: "#38D4FF" },
] as const;

function hexToHsl(hex: string) {
  const sanitizedHex = hex.replace("#", "");
  const bigint = parseInt(sanitizedHex, 16);

  if (Number.isNaN(bigint)) {
    return null;
  }

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / delta) % 6;
        break;
      case gNorm:
        h = (bNorm - rNorm) / delta + 2;
        break;
      default:
        h = (rNorm - gNorm) / delta + 4;
    }
    s = delta / (1 - Math.abs(2 * l - 1));
  }

  const hue = Math.round(h * 60);
  const saturation = Math.round(s * 100);
  const lightness = Math.round(l * 100);

  return `${(hue + 360) % 360} ${saturation}% ${lightness}%`;
}

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [activeTheme, setActiveTheme] = useState<string>(THEME_OPTIONS[0].color);
  const [customColor, setCustomColor] = useState("#FFFFFF");
  const [themePickerOpen, setThemePickerOpen] = useState(false);
  const customInputId = useId();

  const isPresetActive = THEME_OPTIONS.some((option) => option.color === activeTheme);
  const selectValue = isPresetActive ? activeTheme : "custom";
  const normalizedCustomColor = customColor.startsWith("#")
    ? customColor.toUpperCase()
    : `#${customColor.toUpperCase()}`;
  const isCustomValid = /^#([0-9A-F]{6})$/.test(normalizedCustomColor);

  useEffect(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    setCurrentDate(`${days[now.getDay()]} ${months[now.getMonth()]} ${now.getDate()} ${now.getFullYear()}`);
  }, []);

  useEffect(() => {
    const hslColor = hexToHsl(activeTheme);
    if (!hslColor) return;
    const root = document.documentElement;
    root.style.setProperty("--primary", hslColor);
    root.style.setProperty("--accent", hslColor);
    root.style.setProperty("--ring", hslColor);
  }, [activeTheme]);

  const handleThemeSelect = (value: string) => {
    if (value === "custom") {
      if (isCustomValid) {
        setActiveTheme(normalizedCustomColor);
      } else {
        setActiveTheme("#FFFFFF");
        setCustomColor("#FFFFFF");
      }
      return;
    }
    setActiveTheme(value);
  };

  const handleCustomColorChange = (value: string) => {
    let sanitized = value.trim().toUpperCase();
    if (!sanitized.startsWith("#")) {
      sanitized = `#${sanitized}`;
    }
    setCustomColor(sanitized);
    if (!THEME_OPTIONS.some((option) => option.color === activeTheme) && /^#([0-9A-F]{6})$/.test(sanitized)) {
      setActiveTheme(sanitized);
    }
  };

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 w-12 h-12 bg-[#1e1e1f] border border-[#383838] rounded-xl flex items-center justify-center"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <User className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`lg:w-80 bg-[#1e1e1f] border border-[#383838] rounded-3xl p-6 lg:sticky lg:top-8 lg:h-fit transition-all ${
          sidebarOpen ? "block" : "hidden lg:block"
        }`}
      >
        <div className="mb-6">
          <div className="flex items-start gap-4">
            <img
              src="https://ext.same-assets.com/1816051347/4031630246.png"
              alt="Ved Dave"
              className="w-20 h-20 rounded-3xl"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-white mb-2">Ved Dave</h1>
              <div className="flex flex-wrap gap-2">
                <p className="text-sm text-gray-400 bg-[#2b2b2c] px-3 py-1 rounded-lg">
                  Software Engineer
                </p>
                <p className="text-sm text-gray-400 bg-[#2b2b2c] px-3 py-1 rounded-lg">
                  Photographer
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 border-t border-[#383838] pt-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#2b2b2c] rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase mb-1">Email</p>
                <a href="mailto:me@hveddave.com" className="text-sm text-white hover:text-primary">
                  me@veddave.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#2b2b2c] rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase mb-1">Location</p>
                <p className="text-sm text-white">Seattle, WA</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#2b2b2c] rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase mb-1">Today</p>
                <time className="text-sm text-white">{currentDate}</time>
              </div>
            </div>
          </div>

          <div className="border-t border-[#383838] pt-6">
            <div className="flex gap-3 justify-center">
              <a
                href="https://www.linkedin.com/in/ved-dave-b715ab152/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#2b2b2c] rounded-xl flex items-center justify-center hover:bg-[#383838] transition-colors"
              >
                <Linkedin className="w-5 h-5 text-gray-300" />
              </a>
              <a
                href="https://github.com/ved-dave"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#2b2b2c] rounded-xl flex items-center justify-center hover:bg-[#383838] transition-colors"
              >
                <Github className="w-5 h-5 text-gray-300" />
              </a>
              <a
                href="https://www.instagram.com/daves.shoots/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#2b2b2c] rounded-xl flex items-center justify-center hover:bg-[#383838] transition-colors"
              >
                <Instagram className="w-5 h-5 text-gray-300" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#383838] pt-6">
          <button
            type="button"
            onClick={() => setThemePickerOpen((prev) => !prev)}
            className="flex w-full items-center justify-between px-1 py-2 text-xs font-medium uppercase tracking-wide text-gray-400 transition-colors hover:text-white"
            aria-expanded={themePickerOpen}
          >
            <span>Change Theme</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${themePickerOpen ? "rotate-180" : ""}`} />
          </button>

          {themePickerOpen && (
            <div className="mt-4 space-y-4">
              <div className="flex flex-wrap gap-2">
                {THEME_OPTIONS.map((theme) => (
                  <button
                    key={theme.name}
                    type="button"
                    onClick={() => setActiveTheme(theme.color)}
                    className={`h-6 w-6 rounded-full border transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      activeTheme === theme.color
                        ? "border-white shadow-[0_0_8px_rgba(255,255,255,0.5)] scale-110"
                        : "border-[#383838] hover:border-primary/40"
                    }`}
                    aria-pressed={activeTheme === theme.color}
                    aria-label={`Switch to ${theme.name} theme`}
                  >
                    <span
                      className="block h-full w-full rounded-full"
                      style={{ backgroundColor: theme.color }}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => isCustomValid && setActiveTheme(normalizedCustomColor)}
                  className={`h-6 w-6 rounded-full border transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    !isPresetActive
                      ? "border-white shadow-[0_0_8px_rgba(255,255,255,0.5)] scale-110"
                      : "border-[#383838]"
                  }`}
                  aria-pressed={!isPresetActive}
                  aria-label="Apply custom theme"
                  disabled={!isCustomValid}
                  style={{
                    backgroundColor: isCustomValid ? normalizedCustomColor : "#FFFFFF",
                    opacity: isCustomValid ? 1 : 0.5,
                  }}
                />
                <div className="flex flex-1 items-center gap-2">
                  <label htmlFor={customInputId} className="text-xs uppercase tracking-wide text-gray-500">
                    Custom HEX
                  </label>
                  <input
                    id={customInputId}
                    type="text"
                    value={customColor}
                    onChange={(event) => handleCustomColorChange(event.target.value)}
                    placeholder="#FFFFFF"
                    className="flex-1 rounded-2xl border border-[#383838] bg-[#2b2b2c] px-3 py-2 text-sm text-gray-200 focus:border-primary focus:outline-none uppercase"
                    maxLength={7}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
