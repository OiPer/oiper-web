import { env } from '@/lib/env'
import '@/styles/index.css'
import '@/styles/theme.css'

import { QueryProvider } from '@/components/providers/query-provider'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/features/auth/auth-context'
import { PublicAuthModalClientNoSSR } from '@/features/auth/public-auth-modal-client'
import { DetectOSScript } from '@/features/download/download-button'
import { MacDownloadDialog } from '@/features/download/mac-download-dialog'
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

const title = 'OiPer: Private Voice Dictation for Windows, Mac & Linux'

const description =
  'Hold a hotkey, speak, and your words appear in any app. OiPer is fast, private voice-to-text that runs locally on Windows, macOS and Linux. Free to use.'

export const metadata: Metadata = {
  metadataBase: new URL(env.SITE_URL),
  applicationName: 'OiPer',
  title: {
    default: title,
    template: '%s | OiPer',
  },
  description,
  keywords: [
    'voice dictation',
    'voice to text',
    'speech to text',
    'dictation app',
    'offline speech to text',
    'local whisper',
    'voice typing',
    'Windows',
    'macOS',
    'Linux',
  ],
  authors: [{ name: 'OiPer', url: '/' }],
  creator: 'OiPer',
  publisher: 'OiPer',
  robots:
    env.APP_ENV === 'production'
      ? { index: true, follow: true }
      : { index: false, follow: false },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'OiPer',
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  category: 'technology',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <DetectOSScript />
      </head>
      <body className={cn('antialiased', inter.variable, firaCode.variable)}>
        <ThemeProvider
          attribute="class"
          enableSystem
          defaultTheme="dark"
          forcedTheme="dark"
        >
          <QueryProvider>
            <AuthProvider>
              <Suspense fallback={null}>{children}</Suspense>

              <PublicAuthModalClientNoSSR />
              <MacDownloadDialog />
              <Toaster richColors />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
