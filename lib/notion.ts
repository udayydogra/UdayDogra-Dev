// Notion-backed data layer for the /labs section.
//
// Talks to the Notion REST API directly over fetch (no SDK dependency).
// If NOTION_TOKEN / NOTION_DATABASE_ID are not set, every function falls back
// to a local sample dataset so the site still builds and renders.
//
// Property names in the Notion database intentionally carry trailing spaces
// (e.g. "Vulnerability "); they are matched exactly against the schema.

import { FALLBACK_LABS } from "./labs-fallback"

const NOTION_TOKEN = process.env.NOTION_TOKEN
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID
const NOTION_VERSION = "2022-06-28"
const API = "https://api.notion.com/v1"

export const notionEnabled = Boolean(NOTION_TOKEN && NOTION_DATABASE_ID)

export type LabMeta = {
  id: string
  slug: string
  title: string
  vulnerability: string[]
  platform: string[]
  severity: string | null
  difficulty: string | null
  cwe: string[]
  attackVector: string | null
  confidence: string | null
  rootCause: string[]
  technicalImpact: string | null
  businessImpact: string | null
  notesReflection: string | null
  developerMistake: string | null
  secureFixStrategy: string | null
  exploitPayload: string | null
  detectionStrategy: string | null
  trustBoundary: string | null
  bypassTechnique: string[]
  defenseObserved: string[]
  createdTime: string
}

export type RichSpan = { text: string; bold?: boolean; italic?: boolean; code?: boolean; href?: string | null }

export type LabBlock =
  | { type: "heading_1" | "heading_2" | "heading_3"; spans: RichSpan[] }
  | { type: "paragraph"; spans: RichSpan[] }
  | { type: "bulleted_list_item" | "numbered_list_item"; spans: RichSpan[] }
  | { type: "quote"; spans: RichSpan[] }
  | { type: "callout"; spans: RichSpan[]; icon?: string }
  | { type: "code"; language: string; text: string }
  | { type: "image"; url: string; caption?: string }
  | { type: "divider" }
  | { type: "toggle"; spans: RichSpan[] }
  | { type: "unsupported"; label: string }

export type Lab = LabMeta & { blocks: LabBlock[] }

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90)
}

export function normalizeDifficulty(d: string | null): string | null {
  if (!d) return d
  return d.replace(/Apperentice/i, "Apprentice")
}

// ---- Notion property extractors -------------------------------------------

/* eslint-disable @typescript-eslint/no-explicit-any */
function plainText(rich: any[] | undefined): string {
  if (!Array.isArray(rich)) return ""
  return rich.map((r) => r.plain_text ?? "").join("")
}

function spans(rich: any[] | undefined): RichSpan[] {
  if (!Array.isArray(rich)) return []
  return rich.map((r) => ({
    text: r.plain_text ?? "",
    bold: r.annotations?.bold,
    italic: r.annotations?.italic,
    code: r.annotations?.code,
    href: r.href ?? null,
  }))
}

function getTitle(props: any): string {
  const p = props?.["Name"]
  return plainText(p?.title).trim() || "Untitled"
}

function getSelect(props: any, key: string): string | null {
  return props?.[key]?.select?.name ?? null
}

function getMultiSelect(props: any, key: string): string[] {
  const arr = props?.[key]?.multi_select
  return Array.isArray(arr) ? arr.map((o: any) => o.name) : []
}

function getRich(props: any, key: string): string | null {
  const t = plainText(props?.[key]?.rich_text).trim()
  return t || null
}

function mapPage(page: any): LabMeta {
  const props = page.properties ?? {}
  const title = getTitle(props)
  return {
    id: page.id,
    slug: slugify(title),
    title,
    vulnerability: getMultiSelect(props, "Vulnerability "),
    platform: getMultiSelect(props, "Platform "),
    severity: getSelect(props, "Severity Estimate "),
    difficulty: normalizeDifficulty(getSelect(props, "Difficulty ")),
    cwe: getMultiSelect(props, "CWE Mapping "),
    attackVector: getRich(props, "Attack Vector "),
    confidence: getSelect(props, "Confidence Level "),
    rootCause: getMultiSelect(props, "Root Cause Type "),
    technicalImpact: getSelect(props, "Technical impact "),
    businessImpact: getRich(props, "Buisness Impact "),
    notesReflection: getRich(props, "Notes / Reflection "),
    developerMistake: getRich(props, "Developer Mistake "),
    secureFixStrategy: getRich(props, "Secure Fix Strategy "),
    exploitPayload: getRich(props, "Exploit Payload Used "),
    detectionStrategy: getRich(props, "Detection Strategy "),
    trustBoundary: getRich(props, "Trust Boundary Broken "),
    bypassTechnique: getMultiSelect(props, "Bypass Technique "),
    defenseObserved: getMultiSelect(props, "Defense Observed "),
    createdTime: page.created_time ?? "",
  }
}

async function notionFetch(path: string, init?: RequestInit): Promise<any> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    // ISR: revalidate once an hour so new Notion entries appear without redeploy.
    next: { revalidate: 3600 },
  })
  if (!res.ok) {
    const body = await res.text().catch(() => "")
    throw new Error(`Notion API ${res.status}: ${body.slice(0, 300)}`)
  }
  return res.json()
}

// ---- Public API ------------------------------------------------------------

export async function getLabs(): Promise<LabMeta[]> {
  if (!notionEnabled) return FALLBACK_LABS

  try {
    const all: any[] = []
    let cursor: string | undefined
    do {
      const data = await notionFetch(`/databases/${NOTION_DATABASE_ID}/query`, {
        method: "POST",
        body: JSON.stringify({
          page_size: 100,
          ...(cursor ? { start_cursor: cursor } : {}),
        }),
      })
      all.push(...(data.results ?? []))
      cursor = data.has_more ? data.next_cursor : undefined
    } while (cursor)

    const labs = all
      .map(mapPage)
      // Drop the template/placeholder row and anything without a real title.
      .filter((l) => l.title && l.title.toLowerCase() !== "title" && l.title !== "Untitled")

    // De-duplicate slugs (long PortSwigger titles can collide when truncated).
    const seen = new Map<string, number>()
    for (const lab of labs) {
      const n = seen.get(lab.slug) ?? 0
      if (n > 0) lab.slug = `${lab.slug}-${n + 1}`
      seen.set(lab.slug, n + 1)
    }

    labs.sort((a, b) => (b.createdTime || "").localeCompare(a.createdTime || ""))
    return labs
  } catch (err) {
    console.error("[notion] getLabs failed, using fallback:", err)
    return FALLBACK_LABS
  }
}

export async function getLabBySlug(slug: string): Promise<Lab | null> {
  const labs = await getLabs()
  const meta = labs.find((l) => l.slug === slug)
  if (!meta) return null

  if (!notionEnabled) {
    return { ...meta, blocks: [] }
  }

  try {
    const blocks = await getBlocks(meta.id)
    return { ...meta, blocks }
  } catch (err) {
    console.error("[notion] getLabBySlug blocks failed:", err)
    return { ...meta, blocks: [] }
  }
}

async function getBlocks(blockId: string): Promise<LabBlock[]> {
  const out: LabBlock[] = []
  let cursor: string | undefined
  do {
    const qs = new URLSearchParams({ page_size: "100" })
    if (cursor) qs.set("start_cursor", cursor)
    const data = await notionFetch(`/blocks/${blockId}/children?${qs.toString()}`)
    for (const b of data.results ?? []) {
      const mapped = mapBlock(b)
      if (mapped) out.push(mapped)
    }
    cursor = data.has_more ? data.next_cursor : undefined
  } while (cursor)
  return out
}

function mapBlock(b: any): LabBlock | null {
  const t = b.type
  switch (t) {
    case "heading_1":
    case "heading_2":
    case "heading_3":
      return { type: t, spans: spans(b[t]?.rich_text) }
    case "paragraph":
      return { type: "paragraph", spans: spans(b.paragraph?.rich_text) }
    case "bulleted_list_item":
    case "numbered_list_item":
      return { type: t, spans: spans(b[t]?.rich_text) }
    case "quote":
      return { type: "quote", spans: spans(b.quote?.rich_text) }
    case "toggle":
      return { type: "toggle", spans: spans(b.toggle?.rich_text) }
    case "callout":
      return {
        type: "callout",
        spans: spans(b.callout?.rich_text),
        icon: b.callout?.icon?.emoji,
      }
    case "code":
      return {
        type: "code",
        language: b.code?.language ?? "text",
        text: plainText(b.code?.rich_text),
      }
    case "image": {
      const img = b.image
      const url = img?.type === "external" ? img.external?.url : img?.file?.url
      if (!url) return null
      return { type: "image", url, caption: plainText(img?.caption) || undefined }
    }
    case "divider":
      return { type: "divider" }
    default:
      return null
  }
}
