import type { Metadata } from "next"
import Link from "next/link"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Pick a direction · Uday Dogra",
  robots: { index: false, follow: false },
}

const worlds = [
  {
    href: "/spec",
    label: "The Specification",
    blurb: "Portfolio as an authoritative security standard — clauses, control IDs, normative evidence.",
    accent: "#b5231b",
    bg: "#e4e7e9",
    fg: "#15171c",
    tag: "light · document",
  },
  {
    href: "/diff",
    label: "The Diff",
    blurb: "Portfolio as a reviewed pull request — vulnerabilities removed, fixes added, merge to contact.",
    accent: "#4cc85f",
    bg: "#0d1014",
    fg: "#d6dce4",
    tag: "dark · code review",
  },
  {
    href: "/glass",
    label: "The Glass Partition",
    blurb: "Portfolio as a glazier's glass wall — clear panes at rest, a few lit for what matters now.",
    accent: "#2458e6",
    bg: "#0e0f13",
    fg: "#eef1f4",
    tag: "dark · architectural",
  },
]

export default function PreviewPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0d11",
        color: "#f5f6f8",
        padding: "clamp(2rem,6vw,5rem) clamp(1rem,5vw,4rem)",
        fontFamily: "var(--font-sans), system-ui, sans-serif",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: ".72rem",
          letterSpacing: ".22em",
          textTransform: "uppercase",
          color: "#838b98",
        }}
      >
        {site.name} — three directions
      </p>
      <h1
        style={{
          fontSize: "clamp(1.8rem,5vw,3.2rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          margin: ".6rem 0 .4rem",
          maxWidth: "20ch",
        }}
      >
        Same work, three unique worlds. Pick the one that feels like you.
      </h1>
      <p style={{ color: "#c6ccd5", maxWidth: "60ch", lineHeight: 1.6 }}>
        Each is fully built from your real content. Open them side by side, then tell me which to make
        the flagship — I’ll promote it and redesign the chooser in its language.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: "1.2rem",
          marginTop: "2.5rem",
        }}
      >
        {worlds.map((w) => (
          <Link
            key={w.href}
            href={w.href}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ".8rem",
              background: w.bg,
              color: w.fg,
              borderRadius: 12,
              padding: "1.6rem",
              textDecoration: "none",
              border: `1px solid ${w.accent}`,
              minHeight: 200,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: ".64rem",
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: w.accent,
              }}
            >
              {w.tag}
            </span>
            <span style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
              {w.label}
            </span>
            <span style={{ fontSize: ".92rem", lineHeight: 1.5, opacity: 0.85 }}>{w.blurb}</span>
            <span
              style={{
                marginTop: "auto",
                fontFamily: "var(--font-mono), monospace",
                fontSize: ".8rem",
                color: w.accent,
                fontWeight: 700,
              }}
            >
              Open {w.href} →
            </span>
          </Link>
        ))}
      </div>

      <p style={{ marginTop: "2.5rem", color: "#838b98", fontSize: ".85rem" }}>
        For reference, the earlier builds remain at{" "}
        <Link href="/editorial" style={{ color: "#f2c14e" }}>
          /editorial
        </Link>{" "}
        and{" "}
        <Link href="/classic" style={{ color: "#00d9ff" }}>
          /classic
        </Link>
        .
      </p>
    </main>
  )
}
