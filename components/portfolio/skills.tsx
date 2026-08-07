import { skills } from "@/lib/site"

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-12 lg:py-24" aria-label="Skills">
      <h2 className="section-heading">
        <span className="num">02.</span> Skills
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((s) => (
          <div key={s.group} className="card-panel p-5">
            <h3 className="mono text-sm font-semibold text-[var(--lightest-slate)]">{s.group}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {s.items.map((item) => (
                <li key={item} className="tag">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
