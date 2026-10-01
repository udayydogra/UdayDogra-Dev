import type { Metadata } from "next"
import { Schibsted_Grotesk } from "next/font/google"

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-glass",
  display: "swap",
})

export const metadata: Metadata = {
  title: "The Wall · Uday Dogra",
  description:
    "Uday Dogra's portfolio as a glazier's glass partition: a wall of panes, mostly clear, a few lit for what matters now.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/glass" },
}

export default function GlassLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${schibsted.variable} w-glass`}>{children}</div>
}
