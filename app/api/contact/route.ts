import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Reject oversized bodies before we ever buffer/parse them (memory-DoS guard).
const MAX_BODY_BYTES = 10 * 1024 // 10 KB is plenty for a contact message.

// Basic in-memory rate limit. Note: on serverless this is per-instance and
// resets on cold start — it raises the bar for casual abuse but is not a
// substitute for an edge/WAF rate limit if this endpoint gets real traffic.
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 5
const hits = new Map<string, { count: number; resetAt: number }>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = hits.get(ip)
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  entry.count += 1
  return entry.count > MAX_PER_WINDOW
}

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(1).max(5000),
})

function clientIp(request: NextRequest): string {
  const fwd = request.headers.get("x-forwarded-for")
  return fwd?.split(",")[0]?.trim() || "unknown"
}

export async function POST(request: NextRequest) {
  try {
    if (rateLimited(clientIp(request))) {
      return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 })
    }

    // Size guard: trust Content-Length when present, and cap the actual read.
    const declared = Number(request.headers.get("content-length") ?? 0)
    if (declared > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Payload too large." }, { status: 413 })
    }
    const raw = await request.text()
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Payload too large." }, { status: 413 })
    }

    let json: unknown
    try {
      json = JSON.parse(raw)
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
    }

    const parsed = ContactSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input. Check name, email, and message." }, { status: 400 })
    }

    // TODO: integrate an email/notification service here using parsed.data.
    // Deliberately NOT logging submitter PII (name/email/message) to stdout.

    return NextResponse.json(
      { message: "Message sent successfully! I'll get back to you within 24 hours." },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact form error:", error instanceof Error ? error.message : "unknown")
    return NextResponse.json({ error: "Internal server error. Please try again later." }, { status: 500 })
  }
}
