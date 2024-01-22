import type { Metadata } from 'next'
import './globals.scss'

export const metadata: Metadata = {
  title: 'Sample Project - OMDB Movies',
  description: 'A project that displays movie information leveraging the OMDB API. Browse movies and view details about your favorite movies. Built with Next.js and TypeScript. Deployed with Vercel. Implemented by Alexi Vuckovich.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
