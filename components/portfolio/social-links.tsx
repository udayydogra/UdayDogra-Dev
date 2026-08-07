import { Github, Linkedin, Instagram, Twitter, Target, Shield } from "lucide-react"
import { site } from "@/lib/site"

const links = [
  { href: site.socials.github, label: "GitHub", Icon: Github },
  { href: site.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: site.socials.instagram, label: "Instagram", Icon: Instagram },
  { href: site.socials.twitter, label: "Twitter / X", Icon: Twitter },
  { href: site.socials.hackerone, label: "HackerOne", Icon: Target },
  { href: site.socials.hackthebox, label: "Hack The Box", Icon: Shield },
]

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-5 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="text-[var(--light-slate)] hover:text-[var(--accent)] transition-colors hover:-translate-y-1 inline-block"
          >
            <Icon className="h-5 w-5" strokeWidth={1.5} />
          </a>
        </li>
      ))}
    </ul>
  )
}
