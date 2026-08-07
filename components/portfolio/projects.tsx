import { Github, ArrowUpRight } from "lucide-react"
import { projects } from "@/lib/site"

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-12 lg:py-24" aria-label="Projects">
      <h2 className="section-heading">
        <span className="num">04.</span> Projects
      </h2>

      <ol className="hl-list lg:-mx-5">
        {projects.map((p) => (
          <li key={p.title} className="hl-item lg:!grid-cols-[1fr]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mono text-[0.7rem] uppercase tracking-wider text-[var(--slate)]">
                  {p.category}
                </p>
                <h3 className="hl-title mt-1 text-lg">
                  {p.title}
                  <ArrowUpRight className="hl-arrow ml-1 inline h-4 w-4 text-[var(--accent)]" />
                </h3>
              </div>
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.title} on GitHub`}
                  className="relative z-10 text-[var(--slate)] hover:text-[var(--accent)]"
                >
                  <Github className="h-5 w-5" strokeWidth={1.5} />
                </a>
              )}
            </div>
            <p className="text-sm leading-relaxed text-[var(--slate)]">{p.description}</p>
            <p className="flex items-start gap-2.5 text-sm text-[var(--light-slate)]">
              <span className="log-tick mt-[0.35rem]" />
              <span>{p.relevance}</span>
            </p>
            <ul className="flex flex-wrap gap-2">
              {p.tools.map((t) => (
                <li key={t} className="tag">{t}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  )
}
