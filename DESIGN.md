# Design — Editorial Dark

Recorded from the built world (direction contract in `app/layout.tsx`). Ground truth from the shipped
UI. This replaced an earlier "Field Logbook" direction (seed `841d0122`) at the user's request. The
world is a **confident editorial dark portfolio**: near-black ground, warm off-white text, one gold
accent used sparingly, strong display type, and generous whitespace. Authority through restraint, not
costume — no grid, no stamps, no thematic labels.

## Mode

Persuade — a skimming recruiter must grasp identity, role and a next action within seconds, then be
carried through clean confident sections that prove real security work.

## Color (dark; scene = recruiter reading on a screen)

Tokens live in `app/globals.css :root` (names are legacy `--navy` etc., roles are below).

| Role | Token | Value |
|------|-------|-------|
| Near-black ground | `--navy` | `#0b0d11` |
| Raised panel | `--light-navy` | `#14171d` |
| Hairline borders | `--lightest-navy` | `#262b33` |
| Secondary text | `--slate` | `#838b98` |
| Body text | `--light-slate` | `#c6ccd5` |
| Heading text | `--lightest-slate` | `#f5f6f8` |
| Gold accent (links, active, CTA) | `--accent` | `#f2c14e` |
| Gold emphasis / hover | `--accent-strong` | `#ffd166` |
| Severity red (labs only) | `--signal` | `#e8705f` |

Strategy: near-monochrome dark + a **single gold accent**, used sparingly (role line, active nav,
links, primary CTA, small dashes, section index refs). Everything else is the neutral ramp. Contrast
verified ≥4.5:1 for text on the ground.

## Type

Loaded via `next/font`. **Archivo** (`--font-sans`) — grotesque, all UI + headings; the name display
is extra-bold at ~3–3.7rem with tight tracking. **JetBrains Mono** (`--font-mono`, `.mono`) — metadata,
tags, index refs, availability line, code. No serif, no system display face.

## Components (`app/globals.css`)

- `.section-heading` — quiet gold mono index ref (raised like a superscript) + extra-bold title +
  a hairline gradient divider.
- `.tag` — minimal rounded chip: 1px hairline border, secondary/off-white text, faint fill.
- `.btn-ghost` — **primary CTA, solid gold** with dark text; lifts + soft gold shadow on hover.
- `.btn-line` — secondary ghost: hairline border, lifts on hover.
- `.card-panel` — raised panel (`rgba(255,255,255,.022)`, 12px radius, hairline); hover lifts, border
  tints gold, soft shadow.
- `.hl-list` / `.hl-item` — Experience/Projects rows: 128px mono date margin + body; hover raises one
  row and dims siblings on desktop.
- `.log-tick` — small 2px gold dash; the bullet marker (replaces glyph bullets).
- `.link-accent` — gold link with a `transform: scaleX` underline (no layout animation).
- `.prose-writeup` — dark writeups; subtle code fills; blockquote keeps a conventional gold left rule.
- `.spotlight` — a faint gold ambient sheen tracking the pointer (desktop, motion-safe).

## Motion (one grammar)

`riseIn` via scroll-driven `animation-timeline: view()` — section headings, rows and cards fade + rise
as they enter view; a natural per-element stagger, not one identical section entrance. Gated behind
`prefers-reduced-motion` and `@supports`. The name uses a single `rise-in` on load.

## Preserved (product truth, not restyled away)

Content from `lib/site.ts`; the Notion-backed Labs engine (`/labs`, `/labs/[slug]`) and its routes;
all SEO/structured-data plumbing (`metadataBase`, canonical, OG/Twitter, JSON-LD Person, `robots.ts`,
`sitemap.ts`); accessibility and responsive behavior; the `/sudo` route (noindex).
