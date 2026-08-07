import { site } from "@/lib/site"

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-16 text-center lg:py-24" aria-label="Contact">
      <p className="mono text-sm text-[var(--accent)]">What&apos;s next?</p>
      <h2 className="mt-3 text-3xl font-bold text-[var(--lightest-slate)] sm:text-4xl">Get in touch</h2>
      <p className="mx-auto mt-4 max-w-md text-[var(--slate)]">
        I&apos;m actively interviewing for <span className="text-[var(--light-slate)]">Application
        Security</span> and <span className="text-[var(--light-slate)]">Product Security</span> roles —
        remote or on-site. Happy to talk through my projects, methodology, or a role you&apos;re hiring for.
      </p>
      <p className="mono mx-auto mt-5 flex max-w-md flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs uppercase tracking-wider text-[var(--accent)]">
        <span className="flex items-center gap-2"><span className="log-tick" /> Application Security Engineer</span>
        <span className="flex items-center gap-2"><span className="log-tick" /> Product Security Engineer</span>
        <span className="flex items-center gap-2"><span className="log-tick" /> Security Automation</span>
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
          Download résumé ↓
        </a>
        <a href={`mailto:${site.emails.primary}`} className="btn-line">
          Say hello
        </a>
      </div>
      <p className="mono mt-4 text-xs text-[var(--slate)]">
        {site.emails.primary} · {site.emails.secondary}
      </p>
    </section>
  )
}
