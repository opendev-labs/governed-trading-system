import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Polyscan | Prediction & Probability Intelligence',
  description: 'Advanced market intelligence for prediction markets. Trade on probabilities, not just charts.',
  keywords: ['prediction markets', 'polymarket', 'logic engine', 'probability trading'],
  metadataBase: new URL('https://polyscan.vercel.app/'),
  openGraph: {
    title: 'Polyscan | Prediction & Probability Intelligence',
    description: 'Advanced market intelligence for prediction markets. Trade on probabilities, not just charts.',
    url: 'https://polyscan.vercel.app/',
    siteName: 'Polyscan',
    images: [
      {
        url: '/logo_transparent.png',
        width: 800,
        height: 800,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Polyscan',
    description: 'Advanced market intelligence for prediction markets.',
    images: ['/logo_transparent.png'],
  },
  icons: {
    icon: [
      {
        url: '/logo_transparent.png',
        type: 'image/png',
      },
    ],
    apple: '/logo_transparent.png',
  },
}

import { Toaster } from 'sonner'
import { WorkspaceLayout } from '@/components/layout/WorkspaceLayout'
import { Providers } from '@/components/Providers'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased bg-background text-foreground h-screen overflow-hidden`}>
        <Providers>
          <WorkspaceLayout>
            {children}
          </WorkspaceLayout>
        </Providers>
        <Analytics />
        <Toaster position="bottom-right" theme="dark" richColors />
      </body>
    </html>
  )
}
