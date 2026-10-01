import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { getLabs, getLabBySlug, notionEnabled, type LabMeta } from "@/lib/notion"
import { NotionBlocks } from "@/components/labs/notion-blocks"

// Always fresh: reflect Notion edits on the next page load.
export const dynamic = "force-dynamic"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const lab = await getLabBySlug(slug)
  if (!lab) return { title: "Lab not found" }
  const desc =
    lab.businessImpact ||
    lab.attackVector ||
    `${lab.vulnerability.join(", ") || "Web security"} lab writeup: root cause, exploitation, and remediation.`
  return {
    title: lab.title,
    description: desc.slice(0, 160),
    alternates: { canonical: `/labs/${lab.slug}` },
    openGraph: { title: lab.title, description: desc.slice(0, 160), type: "article" },
  }
}

// Render a rich_text field, turning inline "/code … /code*" fences into real code blocks.
function renderContent(text: string): React.ReactNode[] {
  const lines = text.replace(/\r\n/g, "\n").split("\n")
  const out: React.ReactNode[] = []
  let buf: string[] = []
  let inCode = false
  let key = 0
  const flush = () => {
    const content = buf.join("\n").replace(/^\n+|\n+$/g, "")
    buf = []
    if (!content.trim()) return
    if (inCode) {
      out.push(
        <pre
          key={key++}
          className="my-3 whitespace-pre-wrap break-words rounded-md border border-[var(--lightest-navy)] bg-black/40 p-3.5 font-mono text-[0.82rem] leading-relaxed text-[var(--light-slate)]"
        >
          <code>{content}</code>
        </pre>
      )
    } else {
      out.push(
        <p key={key++} className="whitespace-pre-line leading-relaxed text-[var(--light-slate)]">
          {content}
        </p>
      )
    }
  }
  for (const line of lines) {
    if (/^\/code\*?$/.test(line.trim())) {
      flush()
      inCode = !inCode
      continue
    }
    buf.push(line)
  }
  flush()
  return out
}

function FieldCard({ label, value }: { label: string; value: string | null }) {
  if (!value) return null
  return (
    <section className="card-panel p-5 sm:p-6">
      <h2 className="mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--accent)]">{label}</h2>
      <div className="mt-3 space-y-1 text-sm">{renderContent(value)}</div>
    </section>
  )
}

function Tags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((i) => (
        <span key={i} className="tag">{i}</span>
      ))}
    </div>
  )
}

// Top "at a glance" tile.
function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="card-panel min-w-0 overflow-hidden px-4 py-3">
      <div className="mono text-[0.62rem] uppercase tracking-[0.15em] text-[var(--slate)]">{label}</div>
      <div className="mt-2 text-sm font-medium text-[var(--lightest-slate)]">{children}</div>
    </div>
  )
}

// Sidebar row.
function Row({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null
  return (
    <div className="border-b border-[var(--lightest-navy)] py-3 last:border-0">
      <dt className="mono text-[0.66rem] uppercase tracking-wider text-[var(--slate)]">{label}</dt>
      <dd className="mt-1.5 text-sm text-[var(--light-slate)]">{value}</dd>
    </div>
  )
}

export default async function LabPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const lab = await getLabBySlug(slug)
  if (!lab) notFound()

  const all = await getLabs()
  const related = all
    .filter((l) => l.slug !== lab.slug && l.vulnerability.some((v) => lab.vulnerability.includes(v)))
    .slice(0, 4)

  // Content: writeup body + long-form fields, in the main column.
  const contentFields: { label: string; value: string | null }[] = [
    { label: "Attack Vector", value: lab.attackVector },
    { label: "Trust Boundary Broken", value: lab.trustBoundary },
    { label: "Developer Mistake", value: lab.developerMistake },
    { label: "Exploit Payload Used", value: lab.exploitPayload },
    { label: "Detection Strategy", value: lab.detectionStrategy },
    { label: "Secure Fix Strategy", value: lab.secureFixStrategy },
    { label: "Business Impact", value: lab.businessImpact },
    { label: "Notes / Reflection", value: lab.notesReflection },
  ]
  const hasBody = lab.blocks.length > 0 || Boolean(lab.writeup)
  const hasContent = hasBody || contentFields.some((f) => f.value)

  // Least-interesting criteria — bottom strip.
  const bottom: { label: string; items: string[] }[] = [
    { label: "Platform", items: lab.platform },
    { label: "Defense Observed", items: lab.defenseObserved },
  ].filter((b) => b.items.length)

  return (
    <div className="mx-auto w-full max-w-[110rem] px-5 py-12 sm:px-8 lg:px-14">
      <Link href="/labs" className="link-accent mono inline-flex items-center gap-2 text-sm">
        <ArrowLeft className="h-4 w-4" /> All labs
      </Link>

      <header className="mt-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {lab.difficulty && <span className="tag">{lab.difficulty}</span>}
          {lab.severity && <span className="tag">{lab.severity}</span>}
          {lab.vulnerability.map((v) => (
            <span key={v} className="tag">{v}</span>
          ))}
        </div>
        <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-[var(--lightest-slate)] sm:text-[2.4rem]">
          {lab.title}
        </h1>
      </header>

      {/* TOP — important at-a-glance criteria, full width */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {lab.severity && <Fact label="Severity">{lab.severity}</Fact>}
        {lab.difficulty && <Fact label="Difficulty">{lab.difficulty}</Fact>}
        {lab.confidence && <Fact label="Confidence">{lab.confidence}</Fact>}
        {lab.technicalImpact && <Fact label="Technical Impact">{lab.technicalImpact}</Fact>}
        {lab.vulnerability.length > 0 && (
          <Fact label="Vulnerability"><Tags items={lab.vulnerability} /></Fact>
        )}
        {lab.cwe.length > 0 && <Fact label="CWE"><Tags items={lab.cwe.map((c) => c.split(":")[0].trim())} /></Fact>}
        {lab.rootCause.length > 0 && (
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Fact label="Root Cause Type"><Tags items={lab.rootCause} /></Fact>
          </div>
        )}
      </div>

      {/* MIDDLE — writeup content (main) + supporting analysis (rhs) */}
      <div className="mt-10 gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="min-w-0 space-y-4">
          {hasBody && (
            <section className="card-panel p-5 sm:p-6">
              <h2 className="mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--accent)]">Writeup</h2>
              <div className="mt-3">
                {lab.writeup && (
                  <p className="prose-writeup mb-4 whitespace-pre-line leading-relaxed">{lab.writeup}</p>
                )}
                {lab.blocks.length > 0 && <NotionBlocks blocks={lab.blocks} />}
              </div>
            </section>
          )}

          {contentFields.map((f) => (
            <FieldCard key={f.label} label={f.label} value={f.value} />
          ))}

          {!hasContent && (
            <p className="text-sm text-[var(--slate)]">
              {notionEnabled
                ? "No details yet — add content to this lab in Notion and it will appear here."
                : "Connect Notion to render the full writeup here."}
            </p>
          )}
        </article>

        {/* RHS — supporting analysis */}
        <aside className="mt-8 lg:mt-0">
          <div className="lg:sticky lg:top-6 card-panel p-5">
            <h2 className="mono mb-1 text-[0.7rem] uppercase tracking-[0.18em] text-[var(--accent)]">Analysis</h2>
            <dl>
              <Row label="Vulnerability" value={lab.vulnerability.length ? <Tags items={lab.vulnerability} /> : null} />
              <Row label="Severity" value={lab.severity} />
              <Row label="Difficulty" value={lab.difficulty} />
              <Row label="Confidence Level" value={lab.confidence} />
              <Row
                label="CWE Mapping"
                value={
                  lab.cwe.length ? (
                    <div className="space-y-1.5">
                      {lab.cwe.map((c) => (
                        <div
                          key={c}
                          className="mono break-words rounded border border-[var(--lightest-navy)] bg-white/[0.03] px-2 py-1 text-[0.72rem] leading-snug text-[var(--light-slate)]"
                        >
                          {c}
                        </div>
                      ))}
                    </div>
                  ) : null
                }
              />
              <Row label="Root Cause Type" value={lab.rootCause.length ? <Tags items={lab.rootCause} /> : null} />
              <Row label="Technical Impact" value={lab.technicalImpact} />
              <Row label="Bypass Technique" value={lab.bypassTechnique.length ? <Tags items={lab.bypassTechnique} /> : null} />
            </dl>
          </div>
        </aside>
      </div>

      {/* BOTTOM — least-interesting criteria */}
      {bottom.length > 0 && (
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[var(--lightest-navy)] pt-6">
          {bottom.map((b) => (
            <div key={b.label} className="flex flex-wrap items-center gap-2">
              <span className="mono text-[0.66rem] uppercase tracking-wider text-[var(--slate)]">{b.label}:</span>
              <Tags items={b.items} />
            </div>
          ))}
        </div>
      )}

      {related.length > 0 && (
        <section className="mt-14 border-t border-[var(--lightest-navy)] pt-10">
          <h2 className="mono mb-5 text-sm uppercase tracking-widest text-[var(--accent)]">Related labs</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r: LabMeta) => (
              <Link
                key={r.slug}
                href={`/labs/${r.slug}`}
                className="card-panel flex items-center justify-between gap-3 p-4"
              >
                <span className="text-sm text-[var(--light-slate)]">{r.title}</span>
                <ExternalLink className="h-4 w-4 shrink-0 text-[var(--slate)]" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
