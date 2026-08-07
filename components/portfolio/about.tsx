import { aboutParagraphs, currentFocus } from "@/lib/site"

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-12 lg:py-24" aria-label="About">
      <h2 className="section-heading lg:sr-only">
        <span className="num">01.</span> About
      </h2>
      <div className="space-y-4 text-[var(--slate)] leading-relaxed">
        {aboutParagraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="mt-8">
        <p className="mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Currently</p>
        <ul className="mt-3 space-y-2">
          {currentFocus.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[var(--light-slate)]">
              <span className="log-tick mt-[0.4rem]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
