import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Uday Dogra | Application Security Researcher',
  description: 'Uday Dogra — Application Security Enthusiast, Bug Bounty Hunter, Web Security Researcher. Finding real-world vulnerabilities in modern web applications.',
  keywords: 'AppSec, application security, bug bounty, penetration tester, web security, SSRF, XSS, IDOR, ethical hacking',
  authors: [{ name: 'Uday Dogra' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
    <head>
      <title>Uday Dogra | AppSec Researcher</title>
      <meta name="theme-color" content="#030712" />
    </head>
      <body className="bg-[#030712]">{children}</body>
    </html>
  )
}
