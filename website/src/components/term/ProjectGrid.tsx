"use client";

import { useState } from "react";
import BrandIcon from "@/components/BrandIcon";
import { projects, type Project } from "@/data/projects";
import { profile } from "@/data/profile";

const FILTERS = ["all", "web", "research"] as const;
type Filter = (typeof FILTERS)[number];

function Preview({ project }: { project: Project }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.name} screenshot`}
        loading="lazy"
        className="aspect-[16/10] w-full object-cover object-top opacity-90 transition duration-300 group-hover:scale-[1.02] group-hover:opacity-100"
      />
    );
  }
  const slug = project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return (
    <div className="flex aspect-[16/10] w-full flex-col justify-center gap-1 bg-muted/60 px-6 text-[12px] leading-relaxed">
      <p className="text-fg-muted">
        <span className="text-term">$</span> cd ~/projects/{slug}
      </p>
      <p className="text-fg-muted">
        <span className="text-term">$</span> cat stack.txt
      </p>
      <p className="text-purple">{project.tags.join(" · ").toLowerCase()}</p>
      <p className="caret text-fg-muted">
        <span className="text-term">$</span>
      </p>
    </div>
  );
}

function Card({ project }: { project: Project }) {
  const href = project.link ?? project.github ?? undefined;
  return (
    <article className="group flex flex-col border border-border bg-card/40 transition-colors hover:border-fg-muted/50">
      <a href={href} target="_blank" rel="noopener noreferrer" className="block overflow-hidden border-b border-border" tabIndex={-1}>
        <Preview project={project} />
      </a>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-yellow">
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {project.name.toLowerCase()}
              </a>
            ) : (
              project.name.toLowerCase()
            )}
          </h3>
          {project.link && <span className="border border-term/50 px-1.5 text-[10.5px] text-term">live</span>}
        </div>
        <p className="mt-1 text-[12.5px] text-fg-muted">{project.subtitle.toLowerCase()}</p>
        <p className="mt-3 flex-1 text-[12.5px] leading-relaxed text-fg/90">{project.bullets[0]}</p>
        <div className="mt-4 flex items-center justify-between gap-3 text-[11.5px]">
          <span className="text-purple">{project.tags.join(" · ").toLowerCase()}</span>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} source`} className="text-fg-muted hover:text-fg">
              <BrandIcon name="github" className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProjectGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = projects.filter((p) => filter === "all" || p.kind === filter);
  const featured = visible.filter((p) => p.image);
  const other = visible.filter((p) => !p.image);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between text-[13px]">
        <div className="flex items-center gap-2">
          {FILTERS.map((f, i) => (
            <span key={f} className="flex items-center gap-2">
              {i > 0 && <span className="text-border">/</span>}
              <button type="button" onClick={() => setFilter(f)} className={filter === f ? "text-term" : "text-fg-muted hover:text-fg"}>
                {f}
              </button>
            </span>
          ))}
        </div>
        <a href={`https://github.com/${profile.handle}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-fg-muted hover:text-fg">
          <BrandIcon name="github" className="h-3.5 w-3.5" /> all repos
        </a>
      </div>

      {[
        { title: "featured", items: featured },
        { title: "other", items: other },
      ]
        .filter((g) => g.items.length)
        .map((g) => (
          <section key={g.title} className="mb-12">
            <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-term">
              {g.title}
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {g.items.map((p) => (
                <Card key={p.name} project={p} />
              ))}
            </div>
          </section>
        ))}
    </div>
  );
}
