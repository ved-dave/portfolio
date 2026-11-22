import { NextResponse } from "next/server";
import { Resend } from "resend";
import { profile } from "@/data/profile";
import { checkContactRateLimit, clientIp } from "@/lib/rateLimit";

const FROM = process.env.CONTACT_FROM ?? "Portfolio <contact@send.veddave.com>";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (typeof data.website === "string" && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const from = typeof data.from === "string" ? data.from.trim() : "";
  const subject = typeof data.subject === "string" ? data.subject.trim() : "";
  const body = typeof data.body === "string" ? data.body.trim() : "";
  const idempotencyKey = typeof data.idempotencyKey === "string" ? data.idempotencyKey : undefined;

  if (!subject || !body) {
    return NextResponse.json({ error: "Subject and message are required." }, { status: 400 });
  }
  if (subject.length > 200 || body.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }
  if (from && (!EMAIL_RE.test(from) || from.length > 254)) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  }

  const limit = await checkContactRateLimit(clientIp(req), from || undefined);
  if (!limit.ok) {
    const minutes = Math.ceil(limit.retryAfter / 60);
    return NextResponse.json(
      { error: `Too many messages. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}.` },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send(
    {
      from: FROM,
      to: profile.email,
      replyTo: from || undefined,
      subject: `[veddave.com] ${subject}`,
      text: `${body}\n\n— ${from || "no reply address given"}`,
    },
    idempotencyKey ? { idempotencyKey: `contact/${idempotencyKey}` } : undefined,
  );

  if (error) {
    console.error("[contact] resend error", error);
    return NextResponse.json({ error: "Couldn't send right now. Try again in a minute." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
