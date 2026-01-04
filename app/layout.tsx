import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Governed Trading System | Institutional Grade',
  description: 'Professional algorithmic trading platform with multi-layer governance, real-time market scanners, and automated execution agents.',
  keywords: ['trading', 'algorithmic trading', 'fintech', 'governance', 'market scanners'],
  metadataBase: new URL('https://governed-trading-system.vercel.app'),
  openGraph: {
    title: 'Governed Trading System | Institutional Grade',
    description: 'Professional algorithmic trading platform with multi-layer governance and real-time market scanners.',
    url: 'https://governed-trading-system.vercel.app',
    siteName: 'Governed Trading System',
    images: [
      {
        url: '/icon.svg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Governed Trading System',
    description: 'Professional algorithmic trading platform with multi-layer governance.',
    images: ['/icon.svg'],
  },
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/icon.svg',
  },
}

import { Toaster } from 'sonner'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
