import '@/styles/index.css'
import '@/styles/theme.css'

import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/features/auth/auth-context'
import { PublicAuthModalClientNoSSR } from '@/features/auth/public-auth-modal-client'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Fira_Code, Inter } from 'next/font/google'
import { PropsWithChildren, Suspense } from 'react'

const inter = Inter({
  subsets: ['latin'],
  variable: '--next-font-inter',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--next-font-fira-code',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://desktop.oiper.com'),
  title: {
    default: 'OiPer | Privacy-First Voice-to-Text',
    template: '%s | OiPer',
  },
  description:
    'OiPer is a privacy-first desktop application that transforms your voice into text with elegance and precision. Hold a hotkey, speak, release — and watch your words appear. Free for macOS, Windows & Linux.',
  keywords: [
    'voice to text',
    'speech to text',
    'transcription',
    'privacy',
    'desktop app',
    'macOS',
    'Windows',
    'Linux',
    'local transcription',
    'voice recognition',
  ],
  authors: [{ name: 'OiPer', url: 'https://desktop.oiper.com' }],
  creator: 'OiPer',
  publisher: 'OiPer',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://desktop.oiper.com',
    siteName: 'OiPer',
    title: 'OiPer | Privacy-First Voice-to-Text',
    description:
      'Privacy-first desktop app that transforms your voice into text. Hold a hotkey, speak, release. Free for macOS, Windows & Linux.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'OiPer | Privacy-First Voice-to-Text',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OiPer | Privacy-First Voice-to-Text',
    description:
      'Privacy-first desktop app that transforms your voice into text. Free for macOS, Windows & Linux.',
    images: ['/og.png'],
  },
  alternates: {
    canonical: 'https://desktop.oiper.com',
  },
  category: 'technology',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/manifest.json',
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('antialiased', inter.variable, firaCode.variable)}>
        <ThemeProvider attribute="class" enableSystem>
          <AuthProvider>
            <Suspense fallback={null}>{children}</Suspense>

            <PublicAuthModalClientNoSSR />
            <Toaster richColors />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
