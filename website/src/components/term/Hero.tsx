"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Mail } from "lucide-react";
import BrandIcon from "@/components/BrandIcon";
import Image from "next/image";
import Modal from "./Modal";
import Tag from "./Tag";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { workExperience } from "@/data/experience";

type Panel = "tldr" | "offhours" | null;

export default function Hero() {
  const [panel, setPanel] = useState<Panel>(null);
  const current = workExperience.filter((e) => e.end === "Present");
  const notable = projects.filter((p) => p.link).slice(0, 3);

  return (
    <section className="relative grid gap-10 sm:grid-cols-[minmax(0,300px)_1fr] sm:gap-12">
      <div className="flex flex-col items-center gap-5">
        <figure className="w-full max-w-[300px] border border-border bg-card">
          <figcaption className="flex items-center gap-1.5 border-b border-border px-3 py-2 text-[11px] text-fg-muted">
            <span className="h-2 w-2 rounded-full bg-red/70" />
            <span className="h-2 w-2 rounded-full bg-yellow/70" />
            <span className="h-2 w-2 rounded-full bg-term/70" />
            <span className="ml-2">~/ved.jpg</span>
          </figcaption>
          <Image
            src="/profile.jpg"
            alt="Ved Dave"
            width={600}
            height={600}
            priority
            className="block aspect-square w-full object-cover"
          />
        </figure>
        <div className="flex gap-2 text-xs">
          <button
            type="button"
            onClick={() => setPanel("tldr")}
            className="border border-border px-3 py-1.5 text-fg-muted transition-colors hover:border-term hover:text-fg"
          >
            tl;dr
          </button>
          <button
            type="button"
            onClick={() => setPanel("offhours")}
            className="border border-border px-3 py-1.5 text-fg-muted transition-colors hover:border-term hover:text-fg"
          >
            off-hours
          </button>
        </div>
      </div>

      <div className="min-w-0">
        <p className="text-xs text-fg-muted">
          <span className="text-term">~</span> whoami
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-fg sm:text-[2.1rem]">{profile.name}</h1>
        <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-fg-muted">{profile.intro}</p>
        <p className="mt-4 text-[14px] text-fg-muted">
          <span className="text-term">▸</span> building{" "}
          <a href={profile.building.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-yellow hover:underline">
            {profile.building.name}
          </a>{" "}
          — {profile.building.note}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {profile.stack.map((t) => (
            <Tag key={t.label} label={t.label} color={t.color} />
          ))}
        </div>

        <div className="mt-6 flex items-center gap-1">
          {profile.socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="p-2 text-fg-muted transition-colors hover:text-term"
            >
              <BrandIcon name={s.name} className="h-[17px] w-[17px]" />
            </a>
          ))}
          <a href="#email" aria-label="email" className="p-2 text-fg-muted transition-colors hover:text-term">
            <Mail className="h-[18px] w-[18px]" />
          </a>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 text-[13px]">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-fg-muted transition-colors hover:text-fg"
          >
            <FileText className="h-3.5 w-3.5" /> resume
          </a>
          <a
            href={profile.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 border border-term/60 px-3 py-1.5 text-term transition-colors hover:bg-term/10"
          >
            book a time
          </a>
        </div>
      </div>

      <Modal open={panel === "tldr"} onClose={() => setPanel(null)} label="tl;dr">
        <div className="border-b border-border p-5">
          <p className="text-xs text-fg-muted">
            <span className="text-term">$</span> whoami
          </p>
          <p className="mt-1 text-lg font-semibold text-fg">{profile.name}</p>
          <p className="text-[13px] text-fg-muted">{profile.tagline}</p>
        </div>
        <div className="space-y-5 p-5 text-[13px]">
          <div>
            <p className="mb-1.5 text-[11px] text-fg-muted">now</p>
            {current.map((e) => (
              <p key={e.company + e.role} className="text-fg">
                <span className="text-term">▸</span> {e.role.toLowerCase()}{" "}
                <span className="text-fg-muted">@ </span>
                <span className="text-yellow">{e.company.toLowerCase()}</span>
              </p>
            ))}
          </div>
          <div>
            <p className="mb-1.5 text-[11px] text-fg-muted">previously</p>
            <p className="text-fg">
              software engineer <span className="text-fg-muted">@</span> <span className="text-blue">microsoft</span>{" "}
              <span className="text-fg-muted">· dynamics 365</span>
            </p>
          </div>
          <div>
            <p className="mb-1.5 text-[11px] text-fg-muted">notable</p>
            <ul className="space-y-1">
              {notable.map((p) => (
                <li key={p.name} className="flex items-baseline justify-between gap-3">
                  <a href={p.link ?? undefined} target="_blank" rel="noopener noreferrer" className="text-fg hover:text-term">
                    {p.name.toLowerCase()}
                  </a>
                  <span className="truncate text-fg-muted">{p.subtitle.toLowerCase()}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-1.5 text-[11px] text-fg-muted">based</p>
            <p className="text-fg">{profile.location}</p>
          </div>
        </div>
        <div className="flex gap-2 border-t border-border p-5 text-[13px]">
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-fg-muted hover:text-fg">
            <FileText className="h-3.5 w-3.5" /> resume
          </a>
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-fg-muted hover:text-fg">
            <Mail className="h-3.5 w-3.5" /> email
          </a>
        </div>
      </Modal>

      <Modal open={panel === "offhours"} onClose={() => setPanel(null)} label="off-hours">
        <div className="border-b border-border p-5">
          <p className="text-xs text-fg-muted">
            <span className="text-term">$</span> cat ~/.off-hours
          </p>
          <p className="mt-1 text-[13px] text-fg-muted">what I&apos;m doing when I&apos;m not shipping</p>
        </div>
        <ul className="divide-y divide-border">
          {profile.offHours.map((item) => {
            const inner = (
              <>
                <span className="w-24 shrink-0 text-term">{item.title}</span>
                <span className="text-fg-muted">{item.text}</span>
              </>
            );
            const cls = "flex gap-3 px-5 py-3 text-[13px]";
            if (!item.href) return <li key={item.title} className={cls}>{inner}</li>;
            return (
              <li key={item.title}>
                {item.href.startsWith("/") ? (
                  <Link href={item.href} className={`${cls} hover:bg-muted`}>{inner}</Link>
                ) : (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={`${cls} hover:bg-muted`}>{inner}</a>
                )}
              </li>
            );
          })}
        </ul>
      </Modal>
    </section>
  );
}
