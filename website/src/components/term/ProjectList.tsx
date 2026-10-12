"use client";

import { useState } from "react";
import { ChevronRight, ExternalLink } from "lucide-react";
import BrandIcon from "@/components/BrandIcon";
import { projects } from "@/data/projects";

export default function ProjectList({ limit }: { limit?: number }) {
  const [open, setOpen] = useState<string | null>(null);
  const list = limit ? projects.slice(0, limit) : projects;

  return (
    <ul className="divide-y divide-border/60">
      {list.map((p) => {
        const expanded = open === p.name;
        return (
          <li key={p.name}>
            <button
              type="button"
              onClick={() => setOpen(expanded ? null : p.name)}
              className="group flex w-full items-center gap-3 py-3 text-left"
              aria-expanded={expanded}
            >
              <ChevronRight className={`h-3.5 w-3.5 shrink-0 text-fg-muted transition-transform ${expanded ? "rotate-90 text-term" : ""}`} />
              <span className="font-semibold text-yellow group-hover:text-fg">{p.name.toLowerCase()}</span>
              <span className="hidden min-w-0 flex-1 truncate text-[12.5px] text-fg-muted sm:block">{p.subtitle.toLowerCase()}</span>
              <span className="ml-auto shrink-0 text-[11px] text-dim">{p.kind}</span>
            </button>
            {expanded && (
              <div className="pb-5 pl-[26px] animate-in fade-in slide-in-from-top-1 duration-150">
                <ul className="space-y-1.5">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-[13px] leading-relaxed text-fg">
                      <span className="text-term">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px]">
                  <span className="text-purple">{p.tags.join(" · ").toLowerCase()}</span>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-term hover:underline">
                      <ExternalLink className="h-3 w-3" /> live
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-fg-muted hover:text-fg">
                      <BrandIcon name="github" className="h-3 w-3" /> source
                    </a>
                  )}
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
