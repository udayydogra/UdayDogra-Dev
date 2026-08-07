import { ArrowUpRight } from "lucide-react"
import { experience, education, certifications } from "@/lib/site"

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-12 lg:py-24" aria-label="Experience">
      <h2 className="section-heading">
        <span className="num">03.</span> Experience &amp; Education
      </h2>

      <ol className="hl-list lg:-mx-5">
        {experience.map((job) => (
          <li key={job.role + job.org} className="hl-item">
            <div className="hl-date">{job.period}</div>
            <div>
              <h3 className="hl-title">
                {job.role} · <span className="text-[var(--accent)]">{job.org}</span>
                <ArrowUpRight className="hl-arrow ml-1 inline h-4 w-4 text-[var(--accent)]" />
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm text-[var(--slate)]">
                {job.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <span className="log-tick mt-[0.4rem]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-3 flex flex-wrap gap-2">
                {job.tags.map((t) => (
                  <li key={t} className="tag">{t}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="mono text-sm uppercase tracking-widest text-[var(--accent)]">Education</h3>
          <ul className="mt-4 space-y-4">
            {education.map((e) => (
              <li key={e.degree}>
                <p className="font-semibold text-[var(--lightest-slate)]">{e.degree}</p>
                <p className="text-sm text-[var(--slate)]">{e.org}</p>
                <p className="mono text-xs text-[var(--slate)]">
                  {e.period}{e.detail ? ` · ${e.detail}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mono text-sm uppercase tracking-widest text-[var(--accent)]">Certifications</h3>
          <ul className="mt-4 space-y-4">
            {certifications.map((c) => (
              <li key={c.name}>
                <p className="font-semibold text-[var(--lightest-slate)]">{c.name}</p>
                <p className="text-sm text-[var(--slate)]">{c.org} · {c.date}</p>
                {c.id && <p className="mono text-[0.7rem] text-[var(--slate)]/70">ID: {c.id}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
