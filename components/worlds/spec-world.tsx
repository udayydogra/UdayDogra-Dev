"use client"

import { useEffect, useRef, useState } from "react"
import type { LabMeta } from "@/lib/notion"
import {
  site,
  aboutParagraphs,
  currentFocus,
  skills,
  experience,
  education,
  certifications,
  projects,
} from "@/lib/site"

/* ------------------------------------------------------------------ *
 * THE SPECIFICATION — portfolio rendered as an authoritative security
 * standard. Evidence over claims becomes the literal grammar: numbered
 * normative clauses, control IDs, requirement tables, reference
 * implementations, a revision history, normative references, an
 * appendix of documented findings. (seed a5f46a72 · candidate 7)
 * ------------------------------------------------------------------ */

type Clause = { id: string; label: string }
const TOC: Clause[] = [
  { id: "scope", label: "Scope & Abstract" },
  { id: "capabilities", label: "Capabilities (Normative)" },
  { id: "implementations", label: "Reference Implementations" },
  { id: "revisions", label: "Revision History" },
  { id: "references", label: "Normative References" },
  { id: "findings", label: "Appendix A — Findings" },
  { id: "contact", label: "Point of Contact" },
]

const CTRL_PREFIX: Record<string, string> = {
  "Application Security": "AS",
  "Security Testing & Tooling": "ST",
  "Cloud & DevSecOps": "CD",
  "Languages & Development": "LD",
}

function KW({ children }: { children: string }) {
  return <span className="kw">{children}</span>
}

export default function SpecWorld({ labs, total }: { labs: LabMeta[]; total: number }) {
  const [active, setActive] = useState<string>("scope")
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Scroll-spy for the clause index.
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id)
        })
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    )
    TOC.forEach((c) => {
      const el = document.getElementById(c.id)
      if (el) spy.observe(el)
    })

    // One authored reveal: clauses settle as they enter.
    let reveal: IntersectionObserver | null = null
    if (!prefersReduced) {
      reveal = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in")
              reveal!.unobserve(e.target)
            }
          })
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
      )
      rootRef.current?.querySelectorAll(".reveal").forEach((el) => reveal!.observe(el))
    } else {
      rootRef.current?.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"))
    }

    return () => {
      spy.disconnect()
      reveal?.disconnect()
    }
  }, [])

  const year = "2025.1"

  return (
    <div className="spec" ref={rootRef}>
      <style>{CSS}</style>

      {/* Classification banner */}
      <div className="classbar" aria-hidden="true">
        <span>PUBLIC</span>
        <span className="classbar-mid">APPLICATION SECURITY ENGINEERING SPECIFICATION</span>
        <span>DOC&nbsp;UD0G-001</span>
      </div>

      <div className="shell">
        {/* Clause index */}
        <aside className="toc" aria-label="Clause index">
          <div className="toc-inner">
            <p className="toc-head">Contents</p>
            <ol>
              {TOC.map((c, i) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    className={active === c.id ? "on" : ""}
                    aria-current={active === c.id ? "true" : undefined}
                  >
                    <span className="toc-no">§{i + 1}</span>
                    <span className="toc-label">{c.label}</span>
                  </a>
                </li>
              ))}
            </ol>
            <div className="toc-status">
              <span className="dot" /> STATUS: STABLE
            </div>
          </div>
        </aside>

        {/* Document body */}
        <main className="doc">
          {/* Cover */}
          <header className="cover">
            <p className="cover-kicker">Document&nbsp;UD0G-001 · Edition {year}</p>
            <h1 className="cover-title">
              Application<br />Security<br />Engineer
            </h1>
            <p className="cover-sub">
              A self-authored specification of the capabilities, reference implementations and
              verifiable evidence of the subject. Claims are referenced; no metric is asserted
              without proof.
            </p>

            <table className="meta">
              <tbody>
                <tr>
                  <th>Subject</th>
                  <td>{site.name}</td>
                  <th>Handle</th>
                  <td className="m">{site.handle}</td>
                </tr>
                <tr>
                  <th>Document No.</th>
                  <td className="m">UD0G-001</td>
                  <th>Edition</th>
                  <td className="m">{year}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>
                    <span className="chip chip-stable">STABLE</span>
                  </td>
                  <th>Classification</th>
                  <td>
                    <span className="chip">PUBLIC</span>
                  </td>
                </tr>
                <tr>
                  <th>Jurisdiction</th>
                  <td colSpan={3}>{site.location}</td>
                </tr>
                <tr>
                  <th>Availability</th>
                  <td colSpan={3} className="avail">
                    {site.availability}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="cover-actions">
              <a className="act act-primary" href={site.resumeUrl}>
                §0.1 &nbsp;Download résumé
              </a>
              <a className="act" href={`mailto:${site.emails.primary}`}>
                §0.2 &nbsp;Get in touch
              </a>
              <a className="act" href={site.socials.github} target="_blank" rel="noreferrer">
                §0.3 &nbsp;Source evidence ↗
              </a>
            </div>
          </header>

          {/* §1 Scope */}
          <Section n={1} id="scope" title="Scope & Abstract">
            {aboutParagraphs.map((p, i) => (
              <p key={i} className="body">
                {p}
              </p>
            ))}
            <div className="note">
              <p className="note-head">1.1&nbsp;&nbsp;Work in progress</p>
              <ul className="list">
                {currentFocus.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </Section>

          {/* §2 Capabilities */}
          <Section n={2} id="capabilities" title="Capabilities (Normative)">
            <p className="body">
              The subject <KW>SHALL</KW> demonstrate the following capabilities. Each is assigned a
              control identifier and is held <KW>CONFORMANT</KW> only where supported by the
              reference implementations and findings in §3 and Appendix&nbsp;A.
            </p>
            {skills.map((group, gi) => {
              const px = CTRL_PREFIX[group.group] ?? group.group.slice(0, 2).toUpperCase()
              return (
                <div className="subclause reveal" key={group.group}>
                  <h3 className="subhead">
                    <span className="sub-no">2.{gi + 1}</span> {group.group}
                  </h3>
                  <table className="reqs">
                    <thead>
                      <tr>
                        <th className="c-id">ID</th>
                        <th>Capability</th>
                        <th className="c-conf">Conformance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.items.map((item, i) => (
                        <tr key={item}>
                          <td className="c-id m">
                            {px}.{String(i + 1).padStart(2, "0")}
                          </td>
                          <td>{item}</td>
                          <td className="c-conf">
                            <span className="tick">✓</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            })}
          </Section>

          {/* §3 Reference Implementations */}
          <Section n={3} id="implementations" title="Reference Implementations">
            <p className="body">
              The following systems were designed and built by the subject and are offered as
              conforming implementations of §2. Each exposes verifiable source where noted.
            </p>
            {projects.map((p, i) => (
              <article className="impl reveal" key={p.title}>
                <div className="impl-head">
                  <h3 className="subhead">
                    <span className="sub-no">3.{i + 1}</span> {p.title}
                  </h3>
                  <span className="chip chip-cat">{p.category}</span>
                </div>
                <p className="body">{p.description}</p>
                <p className="conf-line">
                  <span className="conf-key">Conformance</span>
                  {p.relevance}
                </p>
                <div className="iface">
                  <span className="conf-key">Interfaces</span>
                  <span className="iface-tags">
                    {p.tools.map((t) => (
                      <span className="itag" key={t}>
                        {t}
                      </span>
                    ))}
                  </span>
                </div>
                <div className="impl-refs">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" className="ref-link">
                      ↗ Source repository
                    </a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="ref-link ref-live">
                      ● Live deployment
                    </a>
                  )}
                </div>
              </article>
            ))}
          </Section>

          {/* §4 Revision History */}
          <Section n={4} id="revisions" title="Revision History">
            <p className="body">
              Chronological record of the subject’s professional and academic revisions.
            </p>
            <div className="rev">
              {experience.map((e, i) => (
                <div className="rev-row reveal" key={`${e.role}-${i}`}>
                  <div className="rev-meta">
                    <span className="rev-ver m">rev&nbsp;{experience.length - i}.0</span>
                    <span className="rev-period m">{e.period}</span>
                  </div>
                  <div className="rev-body">
                    <h3 className="rev-title">
                      {e.role} <span className="rev-org">· {e.org}</span>
                    </h3>
                    <ul className="list">
                      {e.points.map((pt, j) => (
                        <li key={j}>{pt}</li>
                      ))}
                    </ul>
                    <div className="iface-tags tight">
                      {e.tags.map((t) => (
                        <span className="itag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              {education.map((ed) => (
                <div className="rev-row reveal" key={ed.degree}>
                  <div className="rev-meta">
                    <span className="rev-ver m">edu</span>
                    <span className="rev-period m">{ed.period}</span>
                  </div>
                  <div className="rev-body">
                    <h3 className="rev-title">
                      {ed.degree} <span className="rev-org">· {ed.org}</span>
                    </h3>
                    {ed.detail && <p className="body tight">{ed.detail}</p>}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* §5 Normative References */}
          <Section n={5} id="references" title="Normative References">
            <p className="body">
              The following credentials are referenced normatively throughout this document.
            </p>
            <ol className="refs">
              {certifications.map((c, i) => (
                <li key={c.id ?? c.name} className="reveal">
                  <span className="ref-no m">[{i + 1}]</span>
                  <span className="ref-text">
                    <strong>{c.name}</strong>, {c.org}. {c.date}.
                    {c.id && <span className="ref-id m"> ID&nbsp;{c.id}</span>}
                  </span>
                </li>
              ))}
            </ol>
          </Section>

          {/* §6 Appendix A — Findings */}
          <Section n={6} id="findings" title="Appendix A — Documented Findings">
            <p className="body">
              Representative extract from {total} documented web-security findings. Each carries a
              root-cause analysis and a concrete remediation.
            </p>
            <div className="findings">
              {labs.map((l) => (
                <a className="finding reveal" key={l.slug} href={`/labs/${l.slug}`}>
                  <div className="finding-top">
                    {l.severity && (
                      <span className={`sev sev-${l.severity.toLowerCase()}`}>{l.severity}</span>
                    )}
                    {l.cwe?.[0] && <span className="cwe m">{l.cwe[0]}</span>}
                  </div>
                  <h3 className="finding-title">{l.title}</h3>
                  <div className="finding-tags">
                    {l.vulnerability?.slice(0, 3).map((v) => (
                      <span className="itag" key={v}>
                        {v}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
            <a className="all-findings" href="/labs">
              View all {total} findings →
            </a>
          </Section>

          {/* §7 Point of Contact */}
          <Section n={7} id="contact" title="Point of Contact">
            <p className="body">
              Correspondence regarding this specification, or regarding Application Security /
              Product Security engagements, <KW>SHOULD</KW> be addressed to:
            </p>
            <div className="poc">
              <a className="poc-primary" href={`mailto:${site.emails.primary}`}>
                {site.emails.primary}
              </a>
              <a className="poc-alt" href={`mailto:${site.emails.secondary}`}>
                {site.emails.secondary}
              </a>
            </div>
            <div className="poc-links">
              <a href={site.socials.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <a href={site.socials.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a href={site.socials.instagram} target="_blank" rel="noreferrer">
                Instagram ↗
              </a>
            </div>
            <div className="cover-actions end">
              <a className="act act-primary" href={site.resumeUrl}>
                Download résumé
              </a>
              <a className="act" href={`mailto:${site.emails.primary}`}>
                Get in touch
              </a>
            </div>
          </Section>

          <footer className="colophon">
            <span>END OF DOCUMENT</span>
            <span className="m">UD0G-001 · {year} · PUBLIC</span>
            <span>{site.name}</span>
          </footer>
        </main>
      </div>
    </div>
  )
}

function Section({
  n,
  id,
  title,
  children,
}: {
  n: number
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="clause reveal">
      <h2 className="clause-head">
        <span className="clause-no">§{n}</span>
        <span className="clause-title">{title}</span>
      </h2>
      <div className="clause-body">{children}</div>
    </section>
  )
}

const CSS = `
.w-spec .spec{
  --paper:#e4e7e9; --paper-2:#edeff0; --ink:#15171c; --muted:#565c63;
  --rule:#c3c8cc; --rule-2:#d4d8db; --normative:#b5231b; --ref:#1d4e89;
  --stable:#2f6b43; --panel:#f4f5f6;
  background:var(--paper); color:var(--ink);
  font-family:var(--font-spec),"Libre Franklin",system-ui,sans-serif;
  min-height:100vh; letter-spacing:-0.006em;
  background-image:linear-gradient(var(--paper),var(--paper));
}
.w-spec .m{font-family:var(--font-mono),ui-monospace,monospace;font-feature-settings:"tnum" 1;}

/* classification banner */
.w-spec .classbar{
  position:sticky;top:0;z-index:40;display:flex;justify-content:space-between;align-items:center;
  gap:1rem;padding:.5rem clamp(1rem,4vw,3rem);
  background:var(--ink);color:#e9eaec;
  font-family:var(--font-mono),monospace;font-size:.62rem;letter-spacing:.22em;
  border-bottom:2px solid var(--normative);
}
.w-spec .classbar-mid{opacity:.72;text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
@media(max-width:720px){.w-spec .classbar-mid{display:none;}}

.w-spec .shell{
  display:grid;grid-template-columns:minmax(220px,260px) minmax(0,1fr);
  gap:clamp(1.5rem,4vw,4rem);
  max-width:1180px;margin:0 auto;padding:0 clamp(1rem,4vw,3rem) 6rem;
}
@media(max-width:900px){.w-spec .shell{grid-template-columns:1fr;}}

/* clause index */
.w-spec .toc{position:relative;}
.w-spec .toc-inner{position:sticky;top:4.5rem;padding-top:2.5rem;}
@media(max-width:900px){
  .w-spec .toc-inner{position:static;padding-top:1.5rem;
    border-bottom:1px solid var(--rule);padding-bottom:1.25rem;margin-bottom:1rem;}
}
.w-spec .toc-head{font-family:var(--font-mono),monospace;font-size:.62rem;letter-spacing:.22em;
  text-transform:uppercase;color:var(--muted);margin-bottom:.9rem;}
.w-spec .toc ol{list-style:none;margin:0;padding:0;}
.w-spec .toc li{margin:0;}
.w-spec .toc a{display:grid;grid-template-columns:2.2rem 1fr;gap:.4rem;align-items:baseline;
  padding:.42rem .5rem;text-decoration:none;color:var(--muted);
  border-left:2px solid transparent;transition:color .18s,border-color .18s,background .18s;}
.w-spec .toc a:hover{color:var(--ink);background:var(--panel);}
.w-spec .toc a.on{color:var(--ink);border-left-color:var(--normative);background:var(--panel);}
.w-spec .toc-no{font-family:var(--font-mono),monospace;font-size:.72rem;color:var(--ref);}
.w-spec .toc a.on .toc-no{color:var(--normative);}
.w-spec .toc-label{font-size:.82rem;font-weight:500;line-height:1.3;}
.w-spec .toc-status{margin-top:1.4rem;display:flex;align-items:center;gap:.5rem;
  font-family:var(--font-mono),monospace;font-size:.62rem;letter-spacing:.14em;color:var(--stable);}
.w-spec .toc-status .dot{width:7px;height:7px;border-radius:50%;background:var(--stable);
  box-shadow:0 0 0 3px rgba(47,107,67,.16);}

/* document */
.w-spec .doc{min-width:0;padding-top:2.5rem;position:relative;}
.w-spec .doc::before{content:"";position:absolute;left:-1px;top:2.5rem;bottom:0;width:1px;
  background:var(--rule-2);}
@media(max-width:900px){.w-spec .doc::before{display:none;}.w-spec .doc{padding-top:1rem;}}

/* cover */
.w-spec .cover{padding-left:clamp(1rem,2.5vw,2.25rem);padding-bottom:3.5rem;
  border-bottom:3px double var(--rule);margin-bottom:3.5rem;}
.w-spec .cover-kicker{font-family:var(--font-mono),monospace;font-size:.68rem;letter-spacing:.2em;
  color:var(--ref);text-transform:uppercase;margin-bottom:1.1rem;}
.w-spec .cover-title{font-size:clamp(2.7rem,8.5vw,6rem);line-height:.92;font-weight:900;
  letter-spacing:-0.04em;margin:0 0 1.4rem;color:var(--ink);text-transform:uppercase;}
.w-spec .cover-sub{max-width:60ch;font-size:1.02rem;line-height:1.6;color:var(--muted);
  margin-bottom:2.2rem;}

.w-spec .meta{width:100%;border-collapse:collapse;margin-bottom:2rem;
  border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);font-size:.9rem;}
.w-spec .meta th,.w-spec .meta td{text-align:left;padding:.6rem .8rem;vertical-align:top;
  border-bottom:1px solid var(--rule-2);}
.w-spec .meta tr:last-child th,.w-spec .meta tr:last-child td{border-bottom:none;}
.w-spec .meta th{font-family:var(--font-mono),monospace;font-size:.64rem;letter-spacing:.12em;
  text-transform:uppercase;color:var(--muted);font-weight:500;width:7.5rem;white-space:nowrap;}
.w-spec .meta td{font-weight:600;color:var(--ink);}
.w-spec .meta td.avail{font-weight:500;color:var(--stable);}
@media(max-width:560px){
  .w-spec .meta,.w-spec .meta tbody,.w-spec .meta tr,.w-spec .meta th,.w-spec .meta td{display:block;width:auto;}
  .w-spec .meta tr{padding:.5rem 0;border-bottom:1px solid var(--rule-2);}
  .w-spec .meta th{padding:0 0 .15rem;}.w-spec .meta td{padding:0 0 .3rem;}
}

.w-spec .chip{display:inline-block;font-family:var(--font-mono),monospace;font-size:.64rem;
  letter-spacing:.12em;padding:.2rem .55rem;border:1px solid var(--rule);border-radius:2px;
  color:var(--muted);background:#fff;}
.w-spec .chip-stable{color:var(--stable);border-color:rgba(47,107,67,.4);background:rgba(47,107,67,.08);}
.w-spec .chip-cat{color:var(--ref);border-color:rgba(29,78,137,.35);background:rgba(29,78,137,.07);}

.w-spec .cover-actions{display:flex;flex-wrap:wrap;gap:.7rem;}
.w-spec .cover-actions.end{margin-top:1.8rem;}
.w-spec .act{font-family:var(--font-mono),monospace;font-size:.78rem;letter-spacing:.02em;
  padding:.7rem 1.1rem;border:1px solid var(--ink);color:var(--ink);text-decoration:none;
  background:#fff;transition:transform .16s,box-shadow .16s,background .16s;border-radius:2px;}
.w-spec .act:hover{transform:translateY(-2px);box-shadow:3px 3px 0 var(--ink);}
.w-spec .act-primary{background:var(--normative);border-color:var(--normative);color:#fff;}
.w-spec .act-primary:hover{box-shadow:3px 3px 0 rgba(181,35,27,.4);}

/* clauses */
.w-spec .clause{padding-left:clamp(1rem,2.5vw,2.25rem);margin-bottom:3.6rem;scroll-margin-top:4.5rem;}
.w-spec .clause-head{display:flex;align-items:baseline;gap:1rem;margin-bottom:1.5rem;
  padding-bottom:.7rem;border-bottom:1px solid var(--rule);}
.w-spec .clause-no{font-family:var(--font-mono),monospace;font-size:1.05rem;color:var(--normative);
  font-weight:700;flex:none;}
.w-spec .clause-title{font-size:clamp(1.25rem,3vw,1.7rem);font-weight:800;letter-spacing:-0.02em;}
.w-spec .body{font-size:1rem;line-height:1.66;color:var(--ink);max-width:68ch;margin:0 0 1rem;}
.w-spec .body.tight{margin:.2rem 0 0;color:var(--muted);font-size:.92rem;}
.w-spec .kw{font-family:var(--font-mono),monospace;font-size:.82em;font-weight:600;
  letter-spacing:.06em;color:var(--normative);}

.w-spec .note{margin-top:1.4rem;background:var(--panel);border:1px solid var(--rule);
  border-radius:3px;padding:1rem 1.2rem;max-width:68ch;}
.w-spec .note-head{font-family:var(--font-mono),monospace;font-size:.7rem;letter-spacing:.1em;
  color:var(--ref);margin-bottom:.5rem;text-transform:uppercase;}
.w-spec .list{margin:.3rem 0 0;padding-left:1.1rem;}
.w-spec .list li{font-size:.96rem;line-height:1.6;color:var(--ink);margin-bottom:.3rem;}
.w-spec .list li::marker{color:var(--normative);}

/* subclauses + requirement tables */
.w-spec .subclause{margin:1.8rem 0;}
.w-spec .subhead{display:flex;align-items:baseline;gap:.6rem;font-size:1.05rem;font-weight:700;
  margin-bottom:.8rem;letter-spacing:-0.01em;}
.w-spec .sub-no{font-family:var(--font-mono),monospace;font-size:.82rem;color:var(--ref);}
.w-spec .reqs{width:100%;border-collapse:collapse;font-size:.92rem;
  border:1px solid var(--rule);background:#fff;}
.w-spec .reqs thead th{font-family:var(--font-mono),monospace;font-size:.6rem;letter-spacing:.14em;
  text-transform:uppercase;color:var(--muted);font-weight:500;text-align:left;
  padding:.5rem .8rem;background:var(--panel);border-bottom:1px solid var(--rule);}
.w-spec .reqs td{padding:.5rem .8rem;border-bottom:1px solid var(--rule-2);vertical-align:middle;}
.w-spec .reqs tr:last-child td{border-bottom:none;}
.w-spec .reqs .c-id{width:4.5rem;color:var(--ref);font-size:.8rem;white-space:nowrap;}
.w-spec .reqs .c-conf{width:6rem;text-align:center;}
.w-spec .tick{color:var(--stable);font-weight:700;}

/* reference implementations */
.w-spec .impl{margin:1.6rem 0;padding:1.3rem 1.4rem;background:#fff;border:1px solid var(--rule);
  border-radius:3px;transition:box-shadow .2s,transform .2s;}
.w-spec .impl:hover{box-shadow:0 10px 30px -18px rgba(21,23,28,.4);transform:translateY(-2px);}
.w-spec .impl-head{display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;
  flex-wrap:wrap;margin-bottom:.6rem;}
.w-spec .impl-head .subhead{margin-bottom:0;}
.w-spec .conf-line,.w-spec .iface{display:flex;gap:.7rem;align-items:baseline;margin-top:.7rem;
  font-size:.92rem;line-height:1.5;flex-wrap:wrap;}
.w-spec .conf-key{font-family:var(--font-mono),monospace;font-size:.6rem;letter-spacing:.12em;
  text-transform:uppercase;color:var(--muted);flex:none;padding-top:.15rem;}
.w-spec .iface-tags{display:flex;flex-wrap:wrap;gap:.4rem;}
.w-spec .iface-tags.tight{margin-top:.7rem;}
.w-spec .itag{font-family:var(--font-mono),monospace;font-size:.68rem;color:var(--ink);
  background:var(--panel);border:1px solid var(--rule-2);border-radius:2px;padding:.15rem .5rem;}
.w-spec .impl-refs{display:flex;gap:1.2rem;margin-top:1rem;flex-wrap:wrap;}
.w-spec .ref-link{font-family:var(--font-mono),monospace;font-size:.76rem;color:var(--ref);
  text-decoration:none;border-bottom:1px solid transparent;transition:border-color .16s;}
.w-spec .ref-link:hover{border-bottom-color:var(--ref);}
.w-spec .ref-live{color:var(--stable);}

/* revision history */
.w-spec .rev-row{display:grid;grid-template-columns:7rem 1fr;gap:1.2rem;padding:1.1rem 0;
  border-bottom:1px solid var(--rule-2);}
.w-spec .rev-row:last-child{border-bottom:none;}
@media(max-width:560px){.w-spec .rev-row{grid-template-columns:1fr;gap:.4rem;}}
.w-spec .rev-meta{display:flex;flex-direction:column;gap:.2rem;}
.w-spec .rev-ver{font-size:.72rem;color:var(--normative);}
.w-spec .rev-period{font-size:.72rem;color:var(--muted);}
.w-spec .rev-title{font-size:1.02rem;font-weight:700;margin-bottom:.5rem;letter-spacing:-0.01em;}
.w-spec .rev-org{color:var(--muted);font-weight:500;}

/* references */
.w-spec .refs{list-style:none;margin:0;padding:0;}
.w-spec .refs li{display:grid;grid-template-columns:2.6rem 1fr;gap:.6rem;padding:.6rem 0;
  border-bottom:1px solid var(--rule-2);font-size:.95rem;line-height:1.55;}
.w-spec .refs li:last-child{border-bottom:none;}
.w-spec .ref-no{color:var(--ref);}
.w-spec .ref-id{color:var(--muted);font-size:.78rem;}

/* findings */
.w-spec .findings{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:.9rem;}
.w-spec .finding{display:flex;flex-direction:column;gap:.6rem;padding:1rem;background:#fff;
  border:1px solid var(--rule);border-radius:3px;text-decoration:none;color:var(--ink);
  transition:box-shadow .18s,transform .18s,border-color .18s;}
.w-spec .finding:hover{transform:translateY(-3px);box-shadow:0 12px 26px -16px rgba(21,23,28,.4);
  border-color:var(--muted);}
.w-spec .finding-top{display:flex;align-items:center;gap:.5rem;}
.w-spec .sev{font-family:var(--font-mono),monospace;font-size:.6rem;letter-spacing:.1em;
  padding:.12rem .45rem;border-radius:2px;text-transform:uppercase;font-weight:600;}
.w-spec .sev-critical{color:#fff;background:#8a1410;}
.w-spec .sev-high{color:#fff;background:var(--normative);}
.w-spec .sev-medium{color:#6b4e00;background:#f0c850;}
.w-spec .sev-low{color:var(--stable);background:rgba(47,107,67,.14);}
.w-spec .cwe{font-size:.66rem;color:var(--muted);margin-left:auto;}
.w-spec .finding-title{font-size:.95rem;font-weight:700;line-height:1.3;letter-spacing:-0.01em;}
.w-spec .finding-tags{display:flex;flex-wrap:wrap;gap:.3rem;margin-top:auto;}
.w-spec .all-findings{display:inline-block;margin-top:1.4rem;font-family:var(--font-mono),monospace;
  font-size:.8rem;color:var(--ref);text-decoration:none;border-bottom:1px solid var(--ref);
  padding-bottom:1px;}

/* point of contact */
.w-spec .poc{display:flex;flex-direction:column;gap:.3rem;margin:1rem 0;}
.w-spec .poc-primary{font-size:1.4rem;font-weight:800;color:var(--ink);text-decoration:none;
  letter-spacing:-0.02em;border-bottom:2px solid var(--normative);width:fit-content;}
.w-spec .poc-alt{font-size:.95rem;color:var(--muted);text-decoration:none;width:fit-content;}
.w-spec .poc-alt:hover,.w-spec .poc-primary:hover{color:var(--normative);}
.w-spec .poc-links{display:flex;gap:1.4rem;margin:1.1rem 0;flex-wrap:wrap;}
.w-spec .poc-links a{font-family:var(--font-mono),monospace;font-size:.82rem;color:var(--ref);
  text-decoration:none;border-bottom:1px solid transparent;}
.w-spec .poc-links a:hover{border-bottom-color:var(--ref);}

/* colophon */
.w-spec .colophon{display:flex;justify-content:space-between;align-items:center;gap:1rem;
  flex-wrap:wrap;margin:4rem clamp(1rem,2.5vw,2.25rem) 0;padding-top:1.3rem;
  border-top:3px double var(--rule);font-family:var(--font-mono),monospace;font-size:.68rem;
  letter-spacing:.12em;color:var(--muted);text-transform:uppercase;}

/* reveal */
.w-spec .reveal{opacity:0;transform:translateY(14px);
  transition:opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1);}
.w-spec .reveal.in{opacity:1;transform:none;}
@media(prefers-reduced-motion:reduce){.w-spec .reveal{opacity:1;transform:none;transition:none;}}
`
