import { site } from "@/lib/site"
import SocialLinks from "./social-links"

export default function SiteFooter() {
  return (
    <footer className="py-10 text-center">
      <SocialLinks className="justify-center lg:hidden" />
      <p className="mono mt-6 text-xs text-[var(--slate)]">
        Designed &amp; built by {site.name} · © {new Date().getFullYear()}
      </p>
      <p className="mono mt-1 text-[0.7rem] text-[var(--slate)]/60">
        Built with Next.js &amp; Tailwind · content from Notion
      </p>
    </footer>
  )
}
