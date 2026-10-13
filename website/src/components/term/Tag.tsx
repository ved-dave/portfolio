import type { AccentColor } from "@/data/profile";

const COLOR_CLASS: Record<AccentColor, string> = {
  term: "text-term",
  aqua: "text-aqua",
  blue: "text-blue",
  orange: "text-orange",
  red: "text-red",
  yellow: "text-yellow",
  purple: "text-purple",
  fg: "text-fg",
};

export default function Tag({ label, color = "fg" }: { label: string; color?: AccentColor }) {
  return (
    <span className={`border border-border bg-card px-2 py-0.5 text-[11.5px] ${COLOR_CLASS[color]}`}>
      {label}
    </span>
  );
}
