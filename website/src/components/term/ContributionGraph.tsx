"use client";

import { useEffect, useMemo, useState } from "react";
import { profile } from "@/data/profile";

interface Day {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function ContributionGraph() {
  const [days, setDays] = useState<Day[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${profile.handle}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { total: { lastYear: number }; contributions: Day[] }) => {
        setDays(data.contributions);
        setTotal(data.total.lastYear);
      })
      .catch(() => setFailed(true));
  }, []);

  const weeks = useMemo(() => {
    if (!days?.length) return [];
    const out: (Day | null)[][] = [];
    const firstDow = new Date(`${days[0].date}T00:00:00`).getDay();
    let week: (Day | null)[] = Array(firstDow).fill(null);
    for (const d of days) {
      week.push(d);
      if (week.length === 7) {
        out.push(week);
        week = [];
      }
    }
    if (week.length) out.push(week);
    return out;
  }, [days]);

  const monthLabels = useMemo(() => {
    let last = -1;
    return weeks.map((w) => {
      const first = w.find(Boolean);
      if (!first) return "";
      const m = new Date(`${first.date}T00:00:00`).getMonth();
      if (m === last) return "";
      last = m;
      return MONTHS[m];
    });
  }, [weeks]);

  return (
    <section className="border border-border bg-card/40 p-5 sm:p-6">
      {failed ? (
        <p className="text-[13px] text-fg-muted">
          <span className="text-red">✗</span> couldn&apos;t reach github — see{" "}
          <a className="text-term hover:underline" href={`https://github.com/${profile.handle}`}>
            github.com/{profile.handle}
          </a>
        </p>
      ) : (
        <>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="inline-flex min-w-full flex-col gap-1.5">
              <div className="flex gap-[3px] text-[11px] text-fg">
                {(weeks.length ? monthLabels : Array(53).fill("")).map((m, i) => (
                  <span key={i} className="w-[11px] shrink-0 overflow-visible whitespace-nowrap">
                    {m}
                  </span>
                ))}
              </div>
              <div className="flex gap-[3px]">
                {(weeks.length ? weeks : Array(53).fill(Array(7).fill(null))).map((w: (Day | null)[], i: number) => (
                  <div key={i} className="flex flex-col gap-[3px]">
                    {Array.from({ length: 7 }).map((_, j) => {
                      const d = w[j];
                      return (
                        <span
                          key={j}
                          title={d ? `${d.count} contributions on ${d.date}` : undefined}
                          className={`h-[11px] w-[11px] ${days ? "" : "animate-pulse"}`}
                          style={{ backgroundColor: d ? `var(--graph-${d.level})` : "var(--graph-0)", opacity: d || !days ? 1 : 0 }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[12px] text-fg">
            <span>{total !== null ? `${total.toLocaleString()} contributions in the last year` : "fetching github…"}</span>
            <span className="hidden items-center gap-1.5 sm:flex">
              less
              {[0, 1, 2, 3, 4].map((l) => (
                <span key={l} className="h-[11px] w-[11px]" style={{ backgroundColor: `var(--graph-${l})` }} />
              ))}
              more
            </span>
          </div>
        </>
      )}
    </section>
  );
}
