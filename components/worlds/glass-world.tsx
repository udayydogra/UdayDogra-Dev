"use client"

import { useEffect, useRef } from "react"
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
 * THE GLASS PARTITION — a glazier's steel-framed glass wall. Matte-black
 * glazing bars, mostly clear seeded-white panes at rest, a few saturated
 * panes (cobalt / amber / oxblood) lit from behind for what matters now:
 * availability, the flagship build, the live product, the contact.
 * The wall elevation is the map; hover backlights a pane.
 * (seed a5f46a72 · challenger: craft-making-glazier-colorfield-partition)
 * ------------------------------------------------------------------ */

type Tint = "cobalt" | "amber" | "oxblood" | ""

export default function GlassWorld({ labs, total }: { labs: LabMeta[]; total: number }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const glassEl = rootRef.current
    const panes = glassEl?.querySelectorAll<HTMLElement>(".pane")
    if (!panes || !glassEl) return
    // Enable the hide-then-brighten entrance only once JS is running, so the
    // wall stays fully visible if scripts never execute.
    glassEl.classList.add("anim")
    if (prefersReduced) {
      panes.forEach((p) => p.classList.add("lit-in"))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement
            const delay = Number(el.dataset.delay ?? 0)
            setTimeout(() => el.classList.add("lit-in"), delay)
            io.unobserve(el)
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    )
    panes.forEach((p) => io.observe(p))
    return () => io.disconnect()
  }, [])

  const sev = (s: string | null): Tint =>
    s === "Critical" || s === "High" ? "oxblood" : s === "Medium" ? "amber" : ""

  return (
    <div className="glass" ref={rootRef}>
      <style>{CSS}</style>

      <div className="wall">
        {/* corridor label */}
        <div className="plinth">
          <span className="plinth-id">UD0G · GLAZED ELEVATION</span>
          <span className="plinth-dim">{site.location}</span>
        </div>

        {/* HERO BAY */}
        <section className="bay bay-hero" aria-label="Introduction">
          <Pane tint="" span="s4" className="p-name" delay={0}>
            <p className="eyebrow">{site.role}</p>
            <h1 className="name">{site.name}</h1>
            <p className="tagline">{site.tagline}</p>
          </Pane>
          <Pane tint="cobalt" span="s2" className="p-avail" delay={120}>
            <span className="pane-kicker">Status</span>
            <p className="avail-text">{site.availability}</p>
            <span className="pulse" />
          </Pane>
          <Pane tint="amber" span="s2" className="p-cta" delay={200} href={site.resumeUrl}>
            <span className="pane-kicker dark">Action</span>
            <p className="cta-text">Download résumé</p>
            <span className="cta-arrow">↓</span>
          </Pane>
          <Pane tint="" span="s2" className="p-contact-cta" delay={240} href={`mailto:${site.emails.primary}`}>
            <span className="pane-kicker">Reach out</span>
            <p className="cta-text light">Get in touch</p>
            <span className="cta-arrow">→</span>
          </Pane>
          <Pane tint="" span="s2" className="p-handle" delay={280}>
            <span className="pane-kicker">Handle</span>
            <p className="handle-text">{site.handle}</p>
            <span className="pane-foot">India · remote</span>
          </Pane>
        </section>

        {/* ABOUT BAY */}
        <BayHead n="01" title="Who" />
        <section className="bay bay-about" aria-label="About">
          <Pane tint="" span="s4" className="p-about" delay={0}>
            {aboutParagraphs.map((p, i) => (
              <p className="about-p" key={i}>
                {p}
              </p>
            ))}
          </Pane>
          <Pane tint="" span="s2" className="p-focus" delay={120}>
            <span className="pane-kicker">In progress</span>
            <ul className="focus-list">
              {currentFocus.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </Pane>
        </section>

        {/* CAPABILITIES BAY */}
        <BayHead n="02" title="Capabilities" />
        <section className="bay bay-skills" aria-label="Capabilities">
          {skills.map((group, gi) => (
            <Pane tint="" span="s3" className="p-skill" delay={gi * 90} key={group.group}>
              <span className="pane-kicker">{group.group}</span>
              <div className="skill-tags">
                {group.items.map((it) => (
                  <span className="stag" key={it}>
                    {it}
                  </span>
                ))}
              </div>
            </Pane>
          ))}
        </section>

        {/* WORK BAY */}
        <BayHead n="03" title="Work" />
        <section className="bay bay-work" aria-label="Projects">
          {projects.map((p, i) => {
            const tint: Tint = i === 0 ? "cobalt" : p.live ? "amber" : ""
            const span = i === 0 ? "s4" : "s2"
            return (
              <Pane tint={tint} span={span} className="p-proj" delay={i * 90} key={p.title}>
                <span className={`pane-kicker${tint === "amber" ? " dark" : ""}`}>{p.category}</span>
                <h3 className={`proj-title${tint === "amber" ? " dark" : ""}`}>{p.title}</h3>
                <p className={`proj-desc${tint === "amber" ? " dark" : ""}`}>{p.description}</p>
                <div className="proj-foot">
                  <div className="proj-tools">
                    {p.tools.slice(0, 5).map((t) => (
                      <span className={`stag${tint ? " on-lit" : ""}`} key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="proj-links">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" className={`plink${tint ? " on-lit" : ""}`}>
                        Source ↗
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer" className={`plink${tint ? " on-lit" : ""}`}>
                        Live ●
                      </a>
                    )}
                  </div>
                </div>
              </Pane>
            )
          })}
        </section>

        {/* HISTORY BAY */}
        <BayHead n="04" title="History" />
        <section className="bay bay-hist" aria-label="Experience">
          {experience.map((e, i) => (
            <Pane tint="" span="s3" className="p-exp" delay={i * 80} key={`${e.role}-${i}`}>
              <span className="pane-kicker">{e.period}</span>
              <h3 className="exp-title">
                {e.role} <span className="exp-org">· {e.org}</span>
              </h3>
              <ul className="exp-list">
                {e.points.map((pt, j) => (
                  <li key={j}>{pt}</li>
                ))}
              </ul>
            </Pane>
          ))}
          {education.map((ed) => (
            <Pane tint="" span="s3" className="p-exp" delay={240} key={ed.degree}>
              <span className="pane-kicker">{ed.period}</span>
              <h3 className="exp-title">
                {ed.degree} <span className="exp-org">· {ed.org}</span>
              </h3>
              {ed.detail && <p className="exp-detail">{ed.detail}</p>}
            </Pane>
          ))}
        </section>

        {/* REFERENCES BAY */}
        <BayHead n="05" title="Credentials" />
        <section className="bay bay-cert" aria-label="Certifications">
          {certifications.map((c, i) => (
            <Pane tint="" span="s2" className="p-cert" delay={i * 80} key={c.id ?? c.name}>
              <h3 className="cert-name">{c.name}</h3>
              <p className="cert-org">{c.org}</p>
              <span className="pane-foot">
                {c.date}
                {c.id ? ` · ${c.id}` : ""}
              </span>
            </Pane>
          ))}
        </section>

        {/* FINDINGS BAY */}
        <BayHead n="06" title="Findings" sub={`${total} documented`} />
        <section className="bay bay-find" aria-label="Lab findings">
          {labs.map((l, i) => (
            <Pane tint={sev(l.severity)} span="s2" className="p-find" delay={i * 70} key={l.slug} href={`/labs/${l.slug}`}>
              <div className="find-top">
                {l.severity && <span className="find-sev">{l.severity}</span>}
                {l.cwe?.[0] && <span className="find-cwe">{l.cwe[0]}</span>}
              </div>
              <h3 className={`find-title${sev(l.severity) === "amber" ? " dark" : ""}`}>{l.title}</h3>
              <div className="find-tags">
                {l.vulnerability?.slice(0, 2).map((v) => (
                  <span className={`stag${sev(l.severity) ? " on-lit" : ""}`} key={v}>
                    {v}
                  </span>
                ))}
              </div>
            </Pane>
          ))}
          <Pane tint="" span="s2" className="p-allfind" delay={labs.length * 70} href="/labs">
            <p className="allfind-text">View all {total} findings</p>
            <span className="cta-arrow light">→</span>
          </Pane>
        </section>

        {/* CONTACT BAY */}
        <BayHead n="07" title="Contact" />
        <section className="bay bay-contact" aria-label="Contact">
          <Pane tint="cobalt" span="s4" className="p-poc" delay={0} href={`mailto:${site.emails.primary}`}>
            <span className="pane-kicker">Point of contact</span>
            <p className="poc-mail">{site.emails.primary}</p>
            <span className="cta-arrow">→</span>
          </Pane>
          <Pane tint="" span="s2" className="p-social" delay={120}>
            <span className="pane-kicker">Elsewhere</span>
            <div className="social-links">
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
          </Pane>
        </section>

        <div className="plinth plinth-end">
          <span className="plinth-id">END OF ELEVATION · {site.name}</span>
          <span className="plinth-dim">{site.handle}</span>
        </div>
      </div>
    </div>
  )
}

function BayHead({ n, title, sub }: { n: string; title: string; sub?: string }) {
  return (
    <div className="bayhead">
      <span className="bayhead-n">{n}</span>
      <span className="bayhead-title">{title}</span>
      {sub && <span className="bayhead-sub">{sub}</span>}
      <span className="bayhead-rule" />
    </div>
  )
}

function Pane({
  tint,
  span,
  className = "",
  delay = 0,
  href,
  children,
}: {
  tint: Tint
  span: string
  className?: string
  delay?: number
  href?: string
  children: React.ReactNode
}) {
  const cls = `pane ${span} ${tint ? `lit lit-${tint}` : ""} ${className}`.trim()
  if (href) {
    return (
      <a
        className={`${cls} pane-link`}
        data-delay={delay}
        href={href}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </a>
    )
  }
  return (
    <div className={cls} data-delay={delay}>
      {children}
    </div>
  )
}

const CSS = `
.w-glass .glass{
  --frame:#09090b; --void:#0e0f13; --void-2:#121419;
  --glass:rgba(255,255,255,.045); --glass-2:rgba(255,255,255,.085);
  --edge:rgba(255,255,255,.14);
  --fg:#eef1f4; --dim:#9aa3af; --faint:#6b7480;
  --cobalt:#2458e6; --cobalt-deep:#1636a8;
  --amber:#e8a81c; --amber-deep:#b57c00;
  --oxblood:#8f2531; --oxblood-deep:#5e141d;
  --mull:3px; --mull-bay:7px;
  background:var(--frame); min-height:100vh;
  font-family:var(--font-glass),"Schibsted Grotesk",system-ui,sans-serif;
  color:var(--fg);
}
.w-glass .wall{max-width:1280px;margin:0 auto;background:var(--frame);
  padding:var(--mull-bay);display:flex;flex-direction:column;gap:var(--mull-bay);}

/* plinth / corridor labels */
.w-glass .plinth{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;
  padding:.5rem .3rem;font-family:var(--font-mono),monospace;font-size:.62rem;
  letter-spacing:.2em;text-transform:uppercase;color:var(--faint);}
.w-glass .plinth-end{padding-top:1rem;border-top:var(--mull) solid #17181c;margin-top:.3rem;}

/* bays */
.w-glass .bay{display:grid;grid-template-columns:repeat(6,1fr);gap:var(--mull);
  background:var(--frame);}
.w-glass .bay-hero{background:
    radial-gradient(120% 90% at 78% 10%,rgba(36,88,230,.16),transparent 55%),
    var(--frame);
  padding:var(--mull);border-radius:2px;}
.w-glass .s2{grid-column:span 2;} .w-glass .s3{grid-column:span 3;}
.w-glass .s4{grid-column:span 4;} .w-glass .s6{grid-column:span 6;}
@media(max-width:1000px){
  .w-glass .bay{grid-template-columns:repeat(2,1fr);}
  .w-glass .s3,.w-glass .s4,.w-glass .s6{grid-column:1/-1;}
}
@media(max-width:600px){
  .w-glass .bay{grid-template-columns:1fr;}
  .w-glass .pane{grid-column:auto!important;}
}

/* bay heads */
.w-glass .bayhead{display:flex;align-items:center;gap:.9rem;padding:1.4rem .3rem .3rem;}
.w-glass .bayhead-n{font-family:var(--font-mono),monospace;font-size:.7rem;color:var(--faint);
  letter-spacing:.1em;}
.w-glass .bayhead-title{font-size:1.15rem;font-weight:700;letter-spacing:-0.01em;color:var(--fg);}
.w-glass .bayhead-sub{font-family:var(--font-mono),monospace;font-size:.66rem;color:var(--faint);
  letter-spacing:.08em;}
.w-glass .bayhead-rule{flex:1;height:1px;background:linear-gradient(90deg,#2a2c32,transparent);}

/* the glass pane */
.w-glass .pane{position:relative;overflow:hidden;min-height:118px;padding:1.3rem 1.4rem;
  display:flex;flex-direction:column;gap:.5rem;
  background:
    linear-gradient(155deg,var(--glass-2),var(--glass) 42%,rgba(255,255,255,.015)),
    radial-gradient(130% 80% at 15% 0%,rgba(255,255,255,.06),transparent 60%);
  box-shadow:inset 0 1px 0 var(--edge),inset 0 0 0 1px rgba(255,255,255,.03);
  color:var(--fg);text-decoration:none;isolation:isolate;
  transition:background .5s ease,box-shadow .5s ease,transform .35s cubic-bezier(.16,1,.3,1);
}
.w-glass .pane::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:-1;
  background-image:radial-gradient(rgba(255,255,255,.05) 0.5px,transparent 0.6px);
  background-size:6px 6px;opacity:.5;mix-blend-mode:overlay;}
.w-glass .pane-link{cursor:pointer;}
.w-glass .pane-link:hover{transform:translateY(-3px);}
.w-glass .pane:hover{background:
    linear-gradient(155deg,rgba(255,255,255,.13),var(--glass-2) 45%,rgba(255,255,255,.03)),
    radial-gradient(130% 80% at 15% 0%,rgba(255,255,255,.09),transparent 60%);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.22),inset 0 0 0 1px rgba(255,255,255,.05),
    0 24px 50px -30px rgba(0,0,0,.8);}

/* lit (backlit colour) panes */
.w-glass .lit{color:#fff;}
.w-glass .lit-cobalt{background:
    linear-gradient(155deg,rgba(48,104,248,.95),rgba(28,66,196,.78) 55%,rgba(20,46,150,.82));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.35),inset 0 0 90px rgba(70,120,255,.45),
    0 0 50px -12px rgba(36,88,230,.7);}
.w-glass .lit-cobalt:hover{background:linear-gradient(155deg,rgba(66,120,255,1),rgba(34,74,210,.86) 55%,rgba(24,52,170,.9));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.45),inset 0 0 110px rgba(80,130,255,.55),
    0 26px 60px -28px rgba(36,88,230,.85);}
.w-glass .lit-amber{background:linear-gradient(160deg,rgba(232,168,28,.82),rgba(181,124,0,.55));
  color:#20170a;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.5),inset 0 0 70px rgba(232,168,28,.5),
    0 0 46px -14px rgba(232,168,28,.6);}
.w-glass .lit-amber:hover{background:linear-gradient(160deg,rgba(247,186,52,.92),rgba(200,140,10,.62));}
.w-glass .lit-oxblood{background:linear-gradient(155deg,rgba(168,46,60,.95),rgba(120,28,38,.8) 55%,rgba(86,18,26,.85));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.26),inset 0 0 90px rgba(190,60,74,.4),
    0 0 50px -12px rgba(143,37,49,.65);}
.w-glass .lit-oxblood:hover{background:linear-gradient(155deg,rgba(190,56,72,1),rgba(136,32,44,.88) 55%,rgba(98,22,30,.92));}

/* reveal: slow brightening (only after JS adds .anim, so no-JS stays visible) */
.w-glass .pane{transition:background .5s ease,box-shadow .5s ease,transform .35s cubic-bezier(.16,1,.3,1),opacity .8s ease;}
.w-glass .glass.anim .pane{opacity:0;}
.w-glass .glass.anim .pane.lit-in{opacity:1;}
@media(prefers-reduced-motion:reduce){.w-glass .glass.anim .pane{opacity:1;transition:none;}}

/* type inside panes */
.w-glass .pane-kicker{font-family:var(--font-mono),monospace;font-size:.6rem;letter-spacing:.16em;
  text-transform:uppercase;color:var(--faint);}
.w-glass .lit .pane-kicker{color:rgba(255,255,255,.7);}
.w-glass .pane-kicker.dark{color:rgba(32,23,10,.7);}
.w-glass .pane-foot{font-family:var(--font-mono),monospace;font-size:.62rem;color:var(--faint);
  margin-top:auto;letter-spacing:.06em;}

/* hero */
.w-glass .p-name{min-height:230px;justify-content:center;}
.w-glass .eyebrow{font-family:var(--font-mono),monospace;font-size:.72rem;letter-spacing:.18em;
  text-transform:uppercase;color:var(--cobalt);}
.w-glass .name{font-size:clamp(2.4rem,6.5vw,4.6rem);font-weight:800;line-height:.95;
  letter-spacing:-0.04em;color:#fff;margin:.2rem 0;}
.w-glass .tagline{font-size:.98rem;line-height:1.55;color:var(--dim);max-width:46ch;margin-top:.4rem;}
.w-glass .p-avail{justify-content:center;}
.w-glass .avail-text{font-size:1.05rem;font-weight:600;line-height:1.35;}
.w-glass .pulse{position:absolute;top:1.3rem;right:1.4rem;width:9px;height:9px;border-radius:50%;
  background:#fff;box-shadow:0 0 0 0 rgba(255,255,255,.6);animation:gpulse 2.4s ease-out infinite;}
@keyframes gpulse{0%{box-shadow:0 0 0 0 rgba(255,255,255,.5);}70%{box-shadow:0 0 0 12px rgba(255,255,255,0);}100%{box-shadow:0 0 0 0 rgba(255,255,255,0);}}
@media(prefers-reduced-motion:reduce){.w-glass .pulse{animation:none;}}
.w-glass .cta-text{font-size:1.2rem;font-weight:700;letter-spacing:-0.01em;}
.w-glass .cta-text.light{color:var(--fg);}
.w-glass .cta-arrow{font-size:1.5rem;margin-top:auto;font-weight:400;}
.w-glass .cta-arrow.light{color:var(--fg);}
.w-glass .p-cta{justify-content:space-between;} .w-glass .p-contact-cta,.w-glass .p-handle{justify-content:space-between;}
.w-glass .handle-text{font-family:var(--font-mono),monospace;font-size:1.5rem;font-weight:700;color:var(--fg);}

/* about */
.w-glass .about-p{font-size:.98rem;line-height:1.62;color:var(--dim);margin-bottom:.8rem;}
.w-glass .about-p:last-child{margin-bottom:0;}
.w-glass .about-p:first-child{color:var(--fg);}
.w-glass .focus-list{list-style:none;margin:.4rem 0 0;padding:0;display:flex;flex-direction:column;gap:.6rem;}
.w-glass .focus-list li{font-size:.9rem;line-height:1.45;color:var(--fg);padding-left:1rem;position:relative;}
.w-glass .focus-list li::before{content:"";position:absolute;left:0;top:.5rem;width:5px;height:5px;
  background:var(--cobalt);border-radius:50%;}

/* skills */
.w-glass .skill-tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.5rem;}
.w-glass .stag{font-family:var(--font-mono),monospace;font-size:.72rem;color:var(--fg);
  background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:3px;
  padding:.2rem .55rem;}
.w-glass .stag.on-lit{background:rgba(255,255,255,.16);border-color:rgba(255,255,255,.25);color:#fff;}
.w-glass .lit-amber .stag.on-lit{background:rgba(32,23,10,.16);border-color:rgba(32,23,10,.25);color:#20170a;}

/* projects */
.w-glass .p-proj{min-height:150px;}
.w-glass .proj-title{font-size:1.25rem;font-weight:700;letter-spacing:-0.02em;color:#fff;margin:.1rem 0;}
.w-glass .proj-title.dark{color:#20170a;}
.w-glass .proj-desc{font-size:.86rem;line-height:1.5;color:var(--dim);
  display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;}
.w-glass .lit .proj-desc{color:rgba(255,255,255,.82);}
.w-glass .proj-desc.dark{color:rgba(32,23,10,.78);}
.w-glass .proj-foot{margin-top:auto;display:flex;flex-direction:column;gap:.7rem;padding-top:.8rem;}
.w-glass .proj-tools{display:flex;flex-wrap:wrap;gap:.35rem;}
.w-glass .proj-links{display:flex;gap:1rem;}
.w-glass .plink{font-family:var(--font-mono),monospace;font-size:.74rem;color:var(--cobalt);
  text-decoration:none;font-weight:600;} .w-glass .plink:hover{text-decoration:underline;}
.w-glass .plink.on-lit{color:#fff;} .w-glass .lit-amber .plink.on-lit{color:#20170a;}

/* experience */
.w-glass .exp-title{font-size:1.02rem;font-weight:700;letter-spacing:-0.01em;color:var(--fg);}
.w-glass .exp-org{color:var(--dim);font-weight:500;}
.w-glass .exp-list{list-style:none;margin:.5rem 0 0;padding:0;display:flex;flex-direction:column;gap:.45rem;}
.w-glass .exp-list li{font-size:.84rem;line-height:1.45;color:var(--dim);padding-left:.95rem;position:relative;}
.w-glass .exp-list li::before{content:"";position:absolute;left:0;top:.55rem;width:4px;height:4px;
  background:var(--faint);border-radius:50%;}
.w-glass .exp-detail{font-size:.86rem;color:var(--dim);}

/* certs */
.w-glass .cert-name{font-size:.98rem;font-weight:700;line-height:1.25;color:var(--fg);}
.w-glass .cert-org{font-size:.82rem;color:var(--dim);margin-top:.2rem;}

/* findings */
.w-glass .find-top{display:flex;align-items:center;gap:.5rem;}
.w-glass .find-sev{font-family:var(--font-mono),monospace;font-size:.6rem;font-weight:700;
  letter-spacing:.08em;text-transform:uppercase;padding:.1rem .45rem;border-radius:2px;
  background:rgba(255,255,255,.14);color:#fff;}
.w-glass .lit-amber .find-sev{background:rgba(32,23,10,.2);color:#20170a;}
.w-glass .find-cwe{font-family:var(--font-mono),monospace;font-size:.64rem;color:var(--faint);margin-left:auto;}
.w-glass .lit .find-cwe{color:rgba(255,255,255,.7);}
.w-glass .find-title{font-size:.92rem;font-weight:700;line-height:1.3;color:var(--fg);
  display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}
.w-glass .lit .find-title{color:#fff;} .w-glass .find-title.dark{color:#20170a;}
.w-glass .find-tags{display:flex;flex-wrap:wrap;gap:.3rem;margin-top:auto;padding-top:.6rem;}
.w-glass .p-allfind{justify-content:space-between;min-height:118px;}
.w-glass .allfind-text{font-size:1rem;font-weight:700;color:var(--fg);}

/* contact */
.w-glass .p-poc{min-height:150px;justify-content:center;}
.w-glass .poc-mail{font-size:clamp(1.1rem,2.6vw,1.7rem);font-weight:700;letter-spacing:-0.02em;
  word-break:break-word;}
.w-glass .social-links{display:flex;flex-direction:column;gap:.5rem;margin-top:.4rem;}
.w-glass .social-links a{font-family:var(--font-mono),monospace;font-size:.86rem;color:var(--fg);
  text-decoration:none;} .w-glass .social-links a:hover{color:var(--cobalt);}
`
