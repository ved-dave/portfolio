"use client";

import { useState } from "react";
import { workExperience } from "@/data/experience";

const DOTS = ["bg-term", "bg-aqua", "bg-yellow", "bg-blue", "bg-orange", "bg-purple", "bg-red"];
const TEXT = ["text-term", "text-aqua", "text-yellow", "text-blue", "text-orange", "text-purple", "text-red"];
const RECENT = 4;

export default function ExperienceLog() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const [showAll, setShowAll] = useState(false);
  const entries = showAll ? workExperience : workExperience.slice(0, RECENT);

  return (
    <>
      <ol className="relative ml-[5px] border-l border-border">
        {entries.map((e, i) => {
          const expanded = open[i];
          const bullets = expanded ? e.bullets : e.bullets.slice(0, 1);
          const hidden = e.bullets.length - 1;
          return (
            <li key={e.company + e.role} className="relative pb-9 pl-7 last:pb-0">
              <span className={`absolute -left-[4.5px] top-[5px] h-2 w-2 rounded-full ${DOTS[i % DOTS.length]}`} />
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <p className={`text-[13px] ${TEXT[i % TEXT.length]}`}>
                  {e.role.toLowerCase()} —{" "}
                  {e.link ? (
                    <a href={e.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {e.company.toLowerCase()}
                    </a>
                  ) : (
                    e.company.toLowerCase()
                  )}
                </p>
                <span className="shrink-0 text-[11.5px] text-fg-muted">
                  {e.start.toLowerCase()} → {e.end.toLowerCase()}
                </span>
              </div>
              {e.team && <p className="mt-0.5 text-[11.5px] text-dim">{e.team.toLowerCase()}</p>}
              <ul className="mt-2.5 space-y-1.5">
                {bullets.map((b) => (
                  <li key={b} className="text-[13.5px] leading-relaxed text-fg">
                    {b}
                  </li>
                ))}
              </ul>
              {hidden > 0 && (
                <button
                  type="button"
                  onClick={() => setOpen((o) => ({ ...o, [i]: !expanded }))}
                  className="mt-2 text-[12px] text-fg-muted transition-colors hover:text-term"
                >
                  {expanded ? "- collapse" : `+ ${hidden} more`}
                </button>
              )}
            </li>
          );
        })}
      </ol>
      {workExperience.length > RECENT && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          aria-expanded={showAll}
          className="ml-[5px] mt-6 pl-7 text-[12px] text-fg-muted transition-colors hover:text-term"
        >
          {showAll ? "show less" : "show more..."}
        </button>
      )}
    </>
  );
}
