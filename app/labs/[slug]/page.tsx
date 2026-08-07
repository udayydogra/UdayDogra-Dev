import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { getLabs, getLabBySlug, notionEnabled, type LabMeta } from "@/lib/notion"
import { NotionBlocks } from "@/components/labs/notion-blocks"

export const revalidate = 3600

export async function generateStaticParams() {
  const labs = await getLabs()
  return labs.map((l) => ({ slug: l.slug }))
}

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

function MetaRow({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null
  return (
    <div className="border-b border-[var(--lightest-navy)] py-2.5">
      <dt className="mono text-[0.7rem] uppercase tracking-wider text-[var(--slate)]">{label}</dt>
      <dd className="mt-1 text-sm text-[var(--light-slate)]">{value}</dd>
    </div>
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

export default async function LabPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const lab = await getLabBySlug(slug)
  if (!lab) notFound()

  const all = await getLabs()
  const related = all
    .filter((l) => l.slug !== lab.slug && l.vulnerability.some((v) => lab.vulnerability.includes(v)))
    .slice(0, 4)

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:px-10 lg:px-16">
      <Link href="/labs" className="link-accent mono inline-flex items-center gap-2 text-sm">
        <ArrowLeft className="h-4 w-4" /> All labs
      </Link>

      <header className="mt-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {lab.platform.map((p) => (
            <span key={p} className="tag">{p}</span>
          ))}
          {lab.difficulty && <span className="tag">{lab.difficulty}</span>}
          {lab.severity && <span className="tag">{lab.severity}</span>}
        </div>
        <h1 className="text-2xl font-bold leading-tight text-[var(--lightest-slate)] sm:text-3xl">
          {lab.title}
        </h1>
      </header>

      <div className="mt-10 gap-10 lg:grid lg:grid-cols-[1fr_260px]">
        {/* Writeup body */}
        <article className="min-w-0">
          {lab.blocks.length > 0 ? (
            <NotionBlocks blocks={lab.blocks} />
          ) : (
            <div className="prose-writeup">
              <p>
                {notEnabled(lab)
                  ? "This is a sample entry. Connect the Notion integration to render the full writeup here."
                  : "The full writeup for this lab is being finalized. Metadata and analysis are available in the sidebar."}
              </p>
              {lab.attackVector && (
                <>
                  <h2>Attack Vector</h2>
                  <p><code>{lab.attackVector}</code></p>
                </>
              )}
              {lab.developerMistake && (
                <>
                  <h2>Developer Mistake</h2>
                  <p>{lab.developerMistake}</p>
                </>
              )}
              {lab.secureFixStrategy && (
                <>
                  <h2>Secure Fix Strategy</h2>
                  <p>{lab.secureFixStrategy}</p>
                </>
              )}
              {lab.businessImpact && (
                <>
                  <h2>Business Impact</h2>
                  <p>{lab.businessImpact}</p>
                </>
              )}
              {lab.notesReflection && (
                <>
                  <h2>Notes &amp; Reflection</h2>
                  <p>{lab.notesReflection}</p>
                </>
              )}
            </div>
          )}
        </article>

        {/* Metadata sidebar */}
        <aside className="mt-10 lg:mt-0">
          <div className="lg:sticky lg:top-8 card-panel p-5">
            <h2 className="mono mb-2 text-xs uppercase tracking-widest text-[var(--accent)]">
              Analysis
            </h2>
            <dl>
              <MetaRow label="Vulnerability" value={lab.vulnerability.length ? <Tags items={lab.vulnerability} /> : null} />
              <MetaRow label="Severity" value={lab.severity} />
              <MetaRow label="Difficulty" value={lab.difficulty} />
              <MetaRow label="Confidence" value={lab.confidence} />
              <MetaRow label="CWE" value={lab.cwe.length ? <Tags items={lab.cwe.map((c) => c.split(":")[0])} /> : null} />
              <MetaRow label="Root Cause" value={lab.rootCause.length ? <Tags items={lab.rootCause} /> : null} />
              <MetaRow label="Technical Impact" value={lab.technicalImpact} />
              <MetaRow label="Bypass Technique" value={lab.bypassTechnique.length ? <Tags items={lab.bypassTechnique} /> : null} />
              <MetaRow label="Defense Observed" value={lab.defenseObserved.length ? <Tags items={lab.defenseObserved} /> : null} />
            </dl>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-[var(--lightest-navy)] pt-10">
          <h2 className="mono mb-5 text-sm uppercase tracking-widest text-[var(--accent)]">
            Related labs
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
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

function notEnabled(lab: { blocks: unknown[] }): boolean {
  return !notionEnabled && lab.blocks.length === 0
}
