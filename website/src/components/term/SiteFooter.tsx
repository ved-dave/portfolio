"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";

function localTime() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: profile.clock.timeZone,
    timeZoneName: "short",
  }).format(new Date());
}

export default function SiteFooter() {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(localTime());
    const id = setInterval(() => setTime(localTime()), 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="mx-auto mt-16 max-w-page border-t border-border px-5 py-5">
      <div className="flex items-center justify-between text-xs text-fg-muted">
        <span suppressHydrationWarning>{time ? `${time} · ${profile.clock.city}` : "\u00a0"}</span>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-1 transition-colors hover:text-fg"
          aria-label="Back to top"
        >
          top <ArrowUp className="h-3 w-3" />
        </button>
      </div>
    </footer>
  );
}
