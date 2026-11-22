"use client";

import { useRef, useState } from "react";
import { profile } from "@/data/profile";

type Status = { state: "idle" } | { state: "sending" } | { state: "sent" } | { state: "error"; message: string };

export default function HireForm() {
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });
  // One key per message, so a retry after a network blip can't send it twice.
  const idempotencyKey = useRef<string>(crypto.randomUUID());

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status.state === "sending") return;
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, subject, body, website, idempotencyKey: idempotencyKey.current }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Couldn't send right now.");
      setStatus({ state: "sent" });
      setFrom("");
      setSubject("");
      setBody("");
      idempotencyKey.current = crypto.randomUUID();
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Couldn't send right now." });
    }
  };

  const row = "flex items-center gap-3 border-b border-border px-4 py-2.5 text-[13px]";
  const input = "min-w-0 flex-1 bg-transparent text-fg placeholder:italic placeholder:text-dim/70 focus:outline-none";
  const sending = status.state === "sending";

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
        <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What's this about?" className={input} maxLength={200} required />
      </label>
      {/* Honeypot for bots: hidden from people and screen readers. */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Hey Ved, we're building something and could use a hand with…"
        rows={6}
        maxLength={5000}
        className={`${input} block w-full resize-none px-4 py-3 text-[13px]`}
        required
      />
      <div className="flex items-center justify-end gap-4 px-4 pb-4">
        <p className="text-[12px]" role="status" aria-live="polite">
          {status.state === "sent" && <span className="text-term">sent ✓ — I'll get back to you soon.</span>}
          {status.state === "error" && <span className="text-red">{status.message}</span>}
        </p>
        <button
          type="submit"
          disabled={sending}
          className="border border-border px-4 py-1.5 text-[13px] text-term transition-colors hover:border-term hover:bg-term/10 disabled:opacity-50"
        >
          {sending ? "sending…" : "send"}
        </button>
      </div>
    </form>
  );
}
