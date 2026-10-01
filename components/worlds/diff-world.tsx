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
 * THE DIFF — portfolio as a reviewed pull request. "Builds AND breaks,
 * root-cause-to-fix" made literal: red hunks remove the vulnerability,
 * green hunks add the fix. Career as commit history, skills as a lock-
 * file, projects as changed files, credentials as references, findings
 * as review threads. (seed a5f46a72 · grounded candidate 1)
 * ------------------------------------------------------------------ */

const FILES = [
  { id: "identity", name: "identity.diff", add: 6, del: 2 },
  { id: "about", name: "README.about", add: 12, del: 0 },
  { id: "capabilities", name: "capabilities.lock", add: 33, del: 0 },
  { id: "implementations", name: "implementations/", add: 5, del: 0, dir: true },
  { id: "history", name: "history.log", add: 8, del: 0 },
  { id: "references", name: "credentials.refs", add: 3, del: 0 },
  { id: "findings", name: "findings/appendix", add: 16, del: 0 },
  { id: "contact", name: "CONTACT", add: 1, del: 0 },
]

const fileSlug = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 22)

const HASHES = ["a3f29c1", "7b4e0d8", "e1c6b95", "4d9f2a0", "b85c7e3"]

export default function DiffWorld({ labs, total }: { labs: LabMeta[]; total: number }) {
  const [active, setActive] = useState("identity")
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive((e.target as HTMLElement).id)),
      { rootMargin: "-15% 0px -75% 0px" },
    )
    FILES.forEach((f) => {
      const el = document.getElementById(f.id)
      if (el) spy.observe(el)
    })

    let reveal: IntersectionObserver | null = null
    if (!prefersReduced) {
      reveal = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in")
              reveal!.unobserve(e.target)
            }
          }),
        { rootMargin: "0px 0px -10% 0px", threshold: 0.06 },
      )
      rootRef.current?.querySelectorAll(".rv").forEach((el) => reveal!.observe(el))
    } else {
      rootRef.current?.querySelectorAll(".rv").forEach((el) => el.classList.add("in"))
    }
    return () => {
      spy.disconnect()
      reveal?.disconnect()
    }
  }, [])

  return (
    <div className="diff" ref={rootRef}>
      <style>{CSS}</style>

      {/* PR header */}
      <header className="pr">
        <div className="pr-top">
          <span className="pr-state">
            <span className="pr-dot" /> Open
          </span>
          <h1 className="pr-title">
            Ship Application Security Engineer <span className="pr-num">#1</span>
          </h1>
        </div>
        <div className="pr-branch">
          <code className="br br-from">uday:learning-security</code>
          <span className="br-arrow">→</span>
          <code className="br br-to">main:application-security-engineer</code>
          <span className="pr-stat">
            <b className="add">+capabilities</b> · <b className="del">−vulnerabilities</b> · 8 files
            changed
          </span>
        </div>
      </header>

      <div className="shell">
        {/* file tree */}
        <aside className="tree" aria-label="Files changed">
          <p className="tree-head">Files changed · 8</p>
          <ul>
            {FILES.map((f) => (
              <li key={f.id}>
                <a href={`#${f.id}`} className={active === f.id ? "on" : ""}>
                  <span className="t-ico">{f.dir ? "▸" : "◆"}</span>
                  <span className="t-name">{f.name}</span>
                  <span className="t-stat">
                    <span className="add">+{f.add}</span>
                    {f.del > 0 && <span className="del">−{f.del}</span>}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a className="merge merge-side" href={`mailto:${site.emails.primary}`}>
            Merge pull request
          </a>
        </aside>

        <main className="body">
          {/* identity.diff — the hero */}
          <FileBlock id="identity" name="identity.diff" lang="diff">
            <div className="hero-id">
              <p className="hero-hand">@{site.handle}</p>
              <h2 className="hero-name">{site.name}</h2>
            </div>
            <Hunk header="@@ class UdayDogra @@">
              <Line k="del" n={1}>{`role = "a student learning web security"`}</Line>
              <Line k="del" n={2}>{`status = "someday"`}</Line>
              <Line k="add" n={1}>{`role = "Application Security Engineer"`}</Line>
              <Line k="add" n={2}>{`handle = "ud0g"   # builds AND breaks`}</Line>
              <Line k="add" n={3}>{`method = "root-cause → fix, documented"`}</Line>
              <Line k="add" n={4}>{`location = ${JSON.stringify(site.location)}`}</Line>
              <Line k="add" n={5}>{`status = ${JSON.stringify(site.availability)}`}</Line>
              <Line k="ctx" n={6}>{`# ${site.tagline}`}</Line>
            </Hunk>
            <div className="hero-actions">
              <a className="btn btn-merge" href={site.resumeUrl}>
                ↓ Download résumé
              </a>
              <a className="btn" href={`mailto:${site.emails.primary}`}>
                Review &amp; get in touch
              </a>
              <a className="btn" href={site.socials.github} target="_blank" rel="noreferrer">
                View source ↗
              </a>
            </div>
          </FileBlock>

          {/* README.about */}
          <FileBlock id="about" name="README.about" lang="markdown">
            <Hunk header="@@ +0,0 +1,12 @@ ## About">
              {aboutParagraphs.map((p, i) => (
                <Line k="add" n={i + 1} key={i} wrap>
                  {p}
                </Line>
              ))}
            </Hunk>
            <div className="todo rv">
              <p className="todo-head">// TODO — in progress</p>
              {currentFocus.map((f, i) => (
                <p className="todo-item" key={i}>
                  <span className="todo-box">[ ]</span> {f}
                </p>
              ))}
            </div>
          </FileBlock>

          {/* capabilities.lock */}
          <FileBlock id="capabilities" name="capabilities.lock" lang="lockfile">
            {skills.map((group, gi) => (
              <Hunk header={`@@ [${group.group}] @@`} key={group.group}>
                {group.items.map((item, i) => (
                  <Line k="add" n={i + 1} key={item}>
                    <span className="dep">{fileSlug(item)}</span>
                    <span className="dep-ver">
                      @{gi === 0 ? "stable" : gi === 3 ? "1.x" : "latest"}
                    </span>
                    <span className="dep-note"># {item}</span>
                  </Line>
                ))}
              </Hunk>
            ))}
          </FileBlock>

          {/* implementations */}
          <section id="implementations" className="group">
            <h2 className="group-head rv">
              <span className="g-ico">▾</span> implementations/ <span className="g-dim">· 5 files added</span>
            </h2>
            {projects.map((p) => (
              <FileBlock
                key={p.title}
                name={`implementations/${fileSlug(p.title)}.ts`}
                lang="typescript"
                nested
                badge={p.live ? "live" : p.github ? "source" : undefined}
              >
                <Hunk header={`@@ +${p.title} @@`}>
                  <Line k="add" n={1}>
                    <span className="kw-js">export const</span> project ={" "}
                    <span className="str-js">&quot;{p.title}&quot;</span>
                  </Line>
                  <Line k="add" n={2}>
                    <span className="com-js">// {p.category}</span>
                  </Line>
                </Hunk>
                <div className="review rv">
                  <div className="review-meta">
                    <span className="review-who">@{site.handle}</span>
                    <span className="review-tag">reviewed</span>
                  </div>
                  <p className="review-text">{p.description}</p>
                  <p className="review-impact">
                    <span className="impact-key">impact:</span> {p.relevance}
                  </p>
                  <div className="imports">
                    {p.tools.map((t) => (
                      <span className="imp" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="file-links">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" className="flink">
                        ↗ source
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer" className="flink flink-live">
                        ● live
                      </a>
                    )}
                  </div>
                </div>
              </FileBlock>
            ))}
          </section>

          {/* history.log */}
          <FileBlock id="history" name="history.log" lang="git-log">
            <div className="log">
              {experience.map((e, i) => (
                <div className="commit rv" key={`${e.role}-${i}`}>
                  <div className="commit-line">
                    <span className="c-word">commit</span>
                    <span className="c-hash">{HASHES[i % HASHES.length]}</span>
                    {i === 0 && <span className="c-head">(HEAD → main)</span>}
                  </div>
                  <p className="c-author">
                    Author: {site.name} · <span className="c-date">{e.period}</span>
                  </p>
                  <p className="c-msg">
                    {e.role} <span className="c-org">@ {e.org}</span>
                  </p>
                  <ul className="c-body">
                    {e.points.map((pt, j) => (
                      <li key={j}>{pt}</li>
                    ))}
                  </ul>
                  <div className="imports">
                    {e.tags.map((t) => (
                      <span className="imp" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {education.map((ed) => (
                <div className="commit rv" key={ed.degree}>
                  <div className="commit-line">
                    <span className="c-word">commit</span>
                    <span className="c-hash">0000000</span>
                    <span className="c-tag">(tag: education)</span>
                  </div>
                  <p className="c-author">
                    Author: {ed.org} · <span className="c-date">{ed.period}</span>
                  </p>
                  <p className="c-msg">{ed.degree}</p>
                  {ed.detail && <p className="c-detail">{ed.detail}</p>}
                </div>
              ))}
            </div>
          </FileBlock>

          {/* credentials.refs */}
          <FileBlock id="references" name="credentials.refs" lang="refs">
            <Hunk header="@@ +0,0 +1,3 @@ verified credentials">
              {certifications.map((c, i) => (
                <Line k="add" n={i + 1} key={c.id ?? c.name} wrap>
                  <span className="ref-name">{c.name}</span> — {c.org}, {c.date}
                  {c.id && <span className="ref-id"> · {c.id}</span>}
                </Line>
              ))}
            </Hunk>
          </FileBlock>

          {/* findings */}
          <section id="findings" className="group">
            <h2 className="group-head rv">
              <span className="g-ico">▾</span> findings/appendix{" "}
              <span className="g-dim">· {total} documented</span>
            </h2>
            <div className="findings">
              {labs.map((l) => (
                <a className="finding rv" key={l.slug} href={`/labs/${l.slug}`}>
                  <div className="f-top">
                    {l.severity && (
                      <span className={`f-sev f-${l.severity.toLowerCase()}`}>{l.severity}</span>
                    )}
                    {l.cwe?.[0] && <span className="f-cwe">{l.cwe[0]}</span>}
                  </div>
                  <p className="f-title">{l.title}</p>
                  <div className="f-tags">
                    {l.vulnerability?.slice(0, 3).map((v) => (
                      <span className="imp" key={v}>
                        {v}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
            <a className="all-link" href="/labs">
              View all {total} findings →
            </a>
          </section>

          {/* CONTACT — the merge panel */}
          <section id="contact" className="merge-panel rv">
            <div className="mp-check">
              <span className="mp-tick">✓</span>
              <div>
                <p className="mp-title">This pull request is ready to merge.</p>
                <p className="mp-sub">
                  All checks passed · {certifications.length} credentials verified · {total} findings
                  documented
                </p>
              </div>
            </div>
            <a className="btn btn-merge big" href={`mailto:${site.emails.primary}`}>
              Merge pull request → {site.emails.primary}
            </a>
            <div className="reviewers">
              <span className="rev-label">Reviewers &amp; links</span>
              <a href={site.socials.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={site.socials.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={site.socials.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a href={`mailto:${site.emails.secondary}`}>alt email</a>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

function FileBlock({
  id,
  name,
  lang,
  nested,
  badge,
  children,
}: {
  id?: string
  name: string
  lang: string
  nested?: boolean
  badge?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={`file rv${nested ? " file-nested" : ""}`}>
      <div className="file-bar">
        <span className="file-ico">◆</span>
        <code className="file-name">{name}</code>
        <span className="file-lang">{lang}</span>
        {badge && <span className={`file-badge badge-${badge}`}>{badge}</span>}
      </div>
      <div className="file-inner">{children}</div>
    </section>
  )
}

function Hunk({ header, children }: { header: string; children: React.ReactNode }) {
  return (
    <div className="hunk">
      <div className="hunk-head">{header}</div>
      <div className="hunk-lines">{children}</div>
    </div>
  )
}

function Line({
  k,
  n,
  wrap,
  children,
}: {
  k: "add" | "del" | "ctx"
  n: number
  wrap?: boolean
  children: React.ReactNode
}) {
  const sign = k === "add" ? "+" : k === "del" ? "-" : " "
  return (
    <div className={`ln ln-${k}${wrap ? " ln-wrap" : ""}`}>
      <span className="ln-no">{n}</span>
      <span className="ln-sign">{sign}</span>
      <span className="ln-code">{children}</span>
    </div>
  )
}

const CSS = `
.w-diff .diff{
  --bg:#0d1014; --bg-2:#141921; --bg-3:#1a212b; --line:#28303c;
  --fg:#d6dce4; --dim:#8a97a8; --faint:#5c6878;
  --add:#4cc85f; --add-bg:rgba(76,200,95,.11); --add-gut:rgba(76,200,95,.35);
  --del:#f0603f; --del-bg:rgba(240,96,63,.11); --del-gut:rgba(240,96,63,.4);
  --hunk:#7aa2f7; --amber:#e3b341; --merge:#2ea043; --merge-h:#3fb950;
  background:var(--bg); color:var(--fg); min-height:100vh;
  font-family:var(--font-diff),"Hanken Grotesk",system-ui,sans-serif;
}
.w-diff code,.w-diff .mono,.w-diff .ln-code,.w-diff .hunk-head,.w-diff .file-name,
.w-diff .dep,.w-diff .log,.w-diff .commit-line,.w-diff .c-msg,.w-diff .c-detail{
  font-family:var(--font-mono),ui-monospace,monospace;}
.w-diff .add{color:var(--add);} .w-diff .del{color:var(--del);}

/* PR header */
.w-diff .pr{position:sticky;top:0;z-index:30;background:rgba(13,16,20,.92);
  backdrop-filter:blur(10px);border-bottom:1px solid var(--line);
  padding:.9rem clamp(1rem,4vw,2.5rem);}
.w-diff .pr-top{display:flex;align-items:center;gap:.9rem;flex-wrap:wrap;}
.w-diff .pr-state{display:inline-flex;align-items:center;gap:.4rem;background:var(--merge);
  color:#fff;font-size:.74rem;font-weight:700;padding:.25rem .7rem;border-radius:999px;}
.w-diff .pr-dot{width:7px;height:7px;border-radius:50%;background:#fff;}
.w-diff .pr-title{font-size:clamp(1rem,2.4vw,1.35rem);font-weight:700;letter-spacing:-0.01em;}
.w-diff .pr-num{color:var(--faint);font-weight:500;}
.w-diff .pr-branch{display:flex;align-items:center;gap:.6rem;flex-wrap:wrap;margin-top:.6rem;
  font-family:var(--font-mono),monospace;font-size:.72rem;}
.w-diff .br{padding:.2rem .5rem;border-radius:4px;background:var(--bg-2);border:1px solid var(--line);}
.w-diff .br-from{color:var(--del);} .w-diff .br-to{color:var(--add);}
.w-diff .br-arrow{color:var(--faint);}
.w-diff .pr-stat{color:var(--dim);margin-left:auto;font-size:.72rem;}
@media(max-width:620px){.w-diff .pr-stat{margin-left:0;width:100%;}}

.w-diff .shell{display:grid;grid-template-columns:minmax(210px,250px) minmax(0,1fr);
  gap:clamp(1rem,3vw,2.2rem);max-width:1240px;margin:0 auto;
  padding:1.6rem clamp(1rem,4vw,2.5rem) 5rem;}
@media(max-width:860px){.w-diff .shell{grid-template-columns:1fr;}}

/* file tree */
.w-diff .tree{position:relative;}
@media(min-width:861px){.w-diff .tree ul,.w-diff .tree-head,.w-diff .merge-side{position:sticky;}}
.w-diff .tree-head{top:1.6rem;font-family:var(--font-mono),monospace;font-size:.66rem;
  letter-spacing:.1em;text-transform:uppercase;color:var(--dim);margin-bottom:.7rem;}
.w-diff .tree ul{list-style:none;margin:0;padding:0;top:3.4rem;}
.w-diff .tree a{display:flex;align-items:center;gap:.5rem;padding:.4rem .55rem;border-radius:5px;
  text-decoration:none;color:var(--dim);font-family:var(--font-mono),monospace;font-size:.76rem;
  border:1px solid transparent;transition:background .15s,color .15s,border-color .15s;}
.w-diff .tree a:hover{background:var(--bg-2);color:var(--fg);}
.w-diff .tree a.on{background:var(--bg-3);color:var(--fg);border-color:var(--line);}
.w-diff .t-ico{color:var(--faint);font-size:.7rem;}
.w-diff .t-name{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.w-diff .t-stat{display:flex;gap:.35rem;font-size:.68rem;}
.w-diff .merge-side{top:calc(100vh - 4rem);margin-top:1.2rem;}

/* file blocks */
.w-diff .file{background:var(--bg-2);border:1px solid var(--line);border-radius:8px;
  margin-bottom:1.5rem;overflow:hidden;scroll-margin-top:7.5rem;}
.w-diff .file-nested{margin-bottom:1rem;}
.w-diff .file-bar{display:flex;align-items:center;gap:.6rem;padding:.6rem .9rem;
  background:var(--bg-3);border-bottom:1px solid var(--line);}
.w-diff .file-ico{color:var(--faint);font-size:.7rem;}
.w-diff .file-name{font-size:.82rem;color:var(--fg);font-weight:500;}
.w-diff .file-lang{margin-left:auto;font-family:var(--font-mono),monospace;font-size:.62rem;
  color:var(--faint);letter-spacing:.06em;text-transform:uppercase;}
.w-diff .file-badge{font-family:var(--font-mono),monospace;font-size:.6rem;padding:.12rem .45rem;
  border-radius:3px;text-transform:uppercase;letter-spacing:.06em;}
.w-diff .badge-live{color:var(--add);background:var(--add-bg);border:1px solid var(--add-gut);}
.w-diff .badge-source{color:var(--hunk);background:rgba(122,162,247,.1);border:1px solid rgba(122,162,247,.3);}
.w-diff .file-inner{padding:.2rem 0;}

/* hunks + lines */
.w-diff .hunk{border-bottom:1px solid var(--line);}
.w-diff .hunk:last-child{border-bottom:none;}
.w-diff .hunk-head{padding:.35rem .9rem;color:var(--hunk);font-size:.72rem;
  background:rgba(122,162,247,.06);}
.w-diff .ln{display:grid;grid-template-columns:3rem 1.4rem 1fr;align-items:baseline;
  font-family:var(--font-mono),monospace;font-size:.8rem;line-height:1.55;}
.w-diff .ln-wrap .ln-code{white-space:normal;}
.w-diff .ln-code{white-space:pre-wrap;word-break:break-word;padding-right:1rem;}
.w-diff .ln-no{text-align:right;padding-right:.7rem;color:var(--faint);font-size:.7rem;
  user-select:none;border-right:1px solid var(--line);}
.w-diff .ln-sign{text-align:center;user-select:none;font-weight:700;}
.w-diff .ln-add{background:var(--add-bg);}
.w-diff .ln-add .ln-sign{color:var(--add);} .w-diff .ln-add .ln-no{box-shadow:inset 3px 0 0 var(--add-gut);}
.w-diff .ln-del{background:var(--del-bg);}
.w-diff .ln-del .ln-sign{color:var(--del);} .w-diff .ln-del .ln-no{box-shadow:inset 3px 0 0 var(--del-gut);}
.w-diff .ln-ctx .ln-code{color:var(--dim);}

/* hero */
.w-diff .hero-id{padding:1.4rem .9rem .3rem;}
.w-diff .hero-hand{font-family:var(--font-mono),monospace;color:var(--amber);font-size:.8rem;}
.w-diff .hero-name{font-size:clamp(2.1rem,6vw,3.6rem);font-weight:800;letter-spacing:-0.03em;
  line-height:1;margin-top:.3rem;color:#fff;}
.w-diff .hero-actions{display:flex;flex-wrap:wrap;gap:.6rem;padding:1rem .9rem 1.2rem;}
.w-diff .btn{font-family:var(--font-mono),monospace;font-size:.78rem;padding:.6rem 1rem;
  border-radius:6px;border:1px solid var(--line);background:var(--bg-3);color:var(--fg);
  text-decoration:none;transition:border-color .15s,transform .15s,background .15s;}
.w-diff .btn:hover{transform:translateY(-2px);border-color:var(--dim);}
.w-diff .btn-merge{background:var(--merge);border-color:var(--merge);color:#fff;font-weight:700;}
.w-diff .btn-merge:hover{background:var(--merge-h);border-color:var(--merge-h);}
.w-diff .btn-merge.big{font-size:.9rem;padding:.85rem 1.4rem;}

/* todo */
.w-diff .todo{padding:1rem .9rem 1.2rem;font-family:var(--font-mono),monospace;}
.w-diff .todo-head{color:var(--amber);font-size:.72rem;margin-bottom:.5rem;}
.w-diff .todo-item{font-size:.82rem;color:var(--fg);line-height:1.6;}
.w-diff .todo-box{color:var(--faint);}

/* lockfile */
.w-diff .dep{color:var(--add);} .w-diff .dep-ver{color:var(--amber);margin-left:.1rem;}
.w-diff .dep-note{color:var(--faint);margin-left:.8rem;}

/* group headers */
.w-diff .group{margin-bottom:1.5rem;scroll-margin-top:7.5rem;}
.w-diff .group-head{font-family:var(--font-mono),monospace;font-size:.95rem;font-weight:600;
  color:var(--fg);margin-bottom:1rem;display:flex;align-items:center;gap:.5rem;}
.w-diff .g-ico{color:var(--faint);} .w-diff .g-dim{color:var(--faint);font-size:.78rem;font-weight:400;}

/* js tokens */
.w-diff .kw-js{color:var(--hunk);} .w-diff .str-js{color:var(--add);} .w-diff .com-js{color:var(--faint);}

/* review comment */
.w-diff .review{margin:.2rem .9rem 1rem;padding:.9rem 1rem 1rem;background:var(--bg);
  border:1px solid var(--line);border-radius:8px;}
.w-diff .review-meta{display:flex;align-items:center;gap:.5rem;margin-bottom:.6rem;
  padding-bottom:.55rem;border-bottom:1px solid var(--line);}
.w-diff .review-who{font-family:var(--font-mono),monospace;font-size:.76rem;color:var(--amber);font-weight:700;
  display:inline-flex;align-items:center;gap:.45rem;}
.w-diff .review-who::before{content:"";width:1.1rem;height:1.1rem;border-radius:50%;
  background:radial-gradient(circle at 35% 30%,var(--amber),#9a7410);flex:none;}
.w-diff .review-tag{font-size:.64rem;color:var(--dim);border:1px solid var(--line);border-radius:999px;
  padding:.08rem .5rem;}
.w-diff .review-text{font-size:.92rem;line-height:1.6;color:var(--fg);}
.w-diff .review-impact{font-size:.86rem;color:var(--dim);margin-top:.5rem;}
.w-diff .impact-key{font-family:var(--font-mono),monospace;color:var(--add);font-size:.76rem;}
.w-diff .imports{display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.7rem;}
.w-diff .imp{font-family:var(--font-mono),monospace;font-size:.68rem;color:var(--dim);
  background:var(--bg-3);border:1px solid var(--line);border-radius:4px;padding:.12rem .5rem;}
.w-diff .file-links{display:flex;gap:1rem;margin-top:.8rem;}
.w-diff .flink{font-family:var(--font-mono),monospace;font-size:.74rem;color:var(--hunk);
  text-decoration:none;} .w-diff .flink:hover{text-decoration:underline;}
.w-diff .flink-live{color:var(--add);}

/* git log */
.w-diff .log{padding:.6rem .9rem;}
.w-diff .commit{padding:.9rem 0 1rem;border-bottom:1px dashed var(--line);}
.w-diff .commit:last-child{border-bottom:none;}
.w-diff .commit-line{font-size:.8rem;display:flex;gap:.5rem;flex-wrap:wrap;}
.w-diff .c-word{color:var(--amber);} .w-diff .c-hash{color:var(--amber);}
.w-diff .c-head{color:var(--add);} .w-diff .c-tag{color:var(--hunk);}
.w-diff .c-author{font-size:.76rem;color:var(--dim);margin-top:.2rem;}
.w-diff .c-date{color:var(--faint);}
.w-diff .c-msg{font-size:.95rem;color:#fff;margin:.6rem 0 .5rem;font-weight:500;}
.w-diff .c-org{color:var(--dim);} .w-diff .c-detail{color:var(--dim);font-size:.85rem;}
.w-diff .c-body{margin:.3rem 0 0;padding-left:1.1rem;font-family:var(--font-diff),sans-serif;}
.w-diff .c-body li{font-size:.9rem;line-height:1.55;color:var(--fg);margin-bottom:.3rem;}
.w-diff .c-body li::marker{color:var(--add);}

/* refs */
.w-diff .ref-name{color:var(--fg);font-weight:600;} .w-diff .ref-id{color:var(--faint);}

/* findings */
.w-diff .findings{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:.8rem;}
.w-diff .finding{display:flex;flex-direction:column;gap:.55rem;padding:.9rem;background:var(--bg-2);
  border:1px solid var(--line);border-radius:7px;text-decoration:none;color:var(--fg);
  transition:transform .16s,border-color .16s,background .16s;}
.w-diff .finding:hover{transform:translateY(-3px);border-color:var(--dim);background:var(--bg-3);}
.w-diff .f-top{display:flex;align-items:center;gap:.5rem;}
.w-diff .f-sev{font-family:var(--font-mono),monospace;font-size:.6rem;font-weight:700;
  padding:.1rem .45rem;border-radius:3px;text-transform:uppercase;letter-spacing:.06em;}
.w-diff .f-critical{color:#fff;background:#b3261e;}
.w-diff .f-high{color:#fff;background:var(--del);}
.w-diff .f-medium{color:#2a1d00;background:var(--amber);}
.w-diff .f-low{color:var(--add);background:var(--add-bg);}
.w-diff .f-cwe{font-family:var(--font-mono),monospace;font-size:.64rem;color:var(--faint);margin-left:auto;}
.w-diff .f-title{font-size:.92rem;font-weight:600;line-height:1.3;}
.w-diff .f-tags{display:flex;flex-wrap:wrap;gap:.3rem;margin-top:auto;}
.w-diff .all-link{display:inline-block;margin-top:1.2rem;font-family:var(--font-mono),monospace;
  font-size:.8rem;color:var(--hunk);text-decoration:none;}
.w-diff .all-link:hover{text-decoration:underline;}

/* merge panel */
.w-diff .merge-panel{scroll-margin-top:7.5rem;background:var(--bg-2);border:1px solid var(--merge);
  border-radius:10px;padding:1.6rem;box-shadow:0 0 0 1px rgba(46,160,67,.15),0 20px 50px -30px rgba(46,160,67,.5);}
.w-diff .mp-check{display:flex;gap:.9rem;align-items:flex-start;margin-bottom:1.2rem;}
.w-diff .mp-tick{flex:none;width:2rem;height:2rem;border-radius:50%;background:var(--merge);color:#fff;
  display:grid;place-items:center;font-weight:700;}
.w-diff .mp-title{font-size:1.1rem;font-weight:700;color:#fff;}
.w-diff .mp-sub{font-size:.82rem;color:var(--dim);margin-top:.2rem;font-family:var(--font-mono),monospace;}
.w-diff .reviewers{display:flex;align-items:center;gap:1.1rem;flex-wrap:wrap;margin-top:1.2rem;}
.w-diff .rev-label{font-family:var(--font-mono),monospace;font-size:.64rem;letter-spacing:.1em;
  text-transform:uppercase;color:var(--faint);}
.w-diff .reviewers a{font-family:var(--font-mono),monospace;font-size:.8rem;color:var(--hunk);
  text-decoration:none;} .w-diff .reviewers a:hover{text-decoration:underline;}

/* reveal */
.w-diff .rv{opacity:0;transform:translateY(12px);
  transition:opacity .55s cubic-bezier(.16,1,.3,1),transform .55s cubic-bezier(.16,1,.3,1);}
.w-diff .rv.in{opacity:1;transform:none;}
@media(prefers-reduced-motion:reduce){.w-diff .rv{opacity:1;transform:none;transition:none;}}
`
