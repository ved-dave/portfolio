import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Vercel's Upstash integration sets KV_REST_API_*; a direct Upstash setup uses UPSTASH_REDIS_REST_*.
const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

const redis = url && token ? new Redis({ url, token }) : null;

function limiter(name: string, tokens: number, window: Parameters<typeof Ratelimit.slidingWindow>[1]) {
  return redis
    ? new Ratelimit({ redis, prefix: `ratelimit:contact:${name}`, limiter: Ratelimit.slidingWindow(tokens, window) })
    : null;
}

const limits = {
  ip: [limiter("ip-hour", 3, "1 h"), limiter("ip-day", 10, "1 d")],
  email: [limiter("email-hour", 2, "1 h"), limiter("email-day", 5, "1 d")],
};

export type RateLimitResult = { ok: true } | { ok: false; retryAfter: number };

/**
 * Contact form limits: 3/hour + 10/day per IP, 2/hour + 5/day per sender email.
 * Fails open (allows the message) if Upstash isn't configured or is unreachable,
 * so an outage never silently eats real messages.
 */
export async function checkContactRateLimit(ip: string, email?: string): Promise<RateLimitResult> {
  if (!redis) {
    console.warn("[contact] rate limiting disabled: Upstash env vars not set");
    return { ok: true };
  }

  const checks: [Ratelimit | null, string][] = [
    ...limits.ip.map((l) => [l, ip] as [Ratelimit | null, string]),
    ...(email ? limits.email.map((l) => [l, email.toLowerCase()] as [Ratelimit | null, string]) : []),
  ];

  try {
    for (const [l, key] of checks) {
      if (!l) continue;
      const { success, reset } = await l.limit(key);
      if (!success) {
        return { ok: false, retryAfter: Math.max(1, Math.ceil((reset - Date.now()) / 1000)) };
      }
    }
  } catch (err) {
    console.error("[contact] rate limit check failed, allowing request", err);
  }
  return { ok: true };
}

export function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}
