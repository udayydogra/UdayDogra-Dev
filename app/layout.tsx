import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Uday Dogra',
  description: 'My Portfolio',
  generator: 'Lets Work',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
