"use client";

import { useState } from "react";
import { profile } from "@/data/profile";

export default function HireForm() {
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = from ? `${body}\n\n— ${from}` : body;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  };

  const row = "flex items-center gap-3 border-b border-border px-4 py-2.5 text-[13px]";
  const input = "min-w-0 flex-1 bg-transparent text-fg placeholder:italic placeholder:text-dim/70 focus:outline-none";

  return (
    <form onSubmit={send} className="border border-border">
      <div className={row}>
        <span className="w-16 shrink-0 text-term">to:</span>
        <span className="font-semibold text-yellow">{profile.email}</span>
      </div>
      <label className={row}>
        <span className="w-16 shrink-0 text-term">from:</span>
        <input type="email" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="you@example.com" className={input} />
      </label>
      <label className={row}>
        <span className="w-16 shrink-0 text-term">subject:</span>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What's this about?" className={input} required />
      </label>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Hey Ved, we're building something and could use a hand with…"
        rows={6}
        className={`${input} block w-full resize-none px-4 py-3 text-[13px]`}
        required
      />
      <div className="flex justify-end px-4 pb-4">
        <button type="submit" className="border border-border px-4 py-1.5 text-[13px] text-term transition-colors hover:border-term hover:bg-term/10">
          send
        </button>
      </div>
    </form>
  );
}
