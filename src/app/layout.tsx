import { env } from '@/lib/env'
import { joinUrl } from '@/lib/url'
import '@/styles/index.css'
import '@/styles/theme.css'

import { QueryProvider } from '@/components/providers/query-provider'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/features/auth/auth-context'
import { PublicAuthModalClientNoSSR } from '@/features/auth/public-auth-modal-client'
import { DetectOSScript } from '@/features/download/download-button'
import { MacDownloadDialog } from '@/features/download/mac-download-dialog'
import { ServiceWorker } from '@/features/pwa/service-worker'
import { GoogleAnalytics } from '@/features/seo/google-analytics'
import { JsonLd, ORGANIZATION_ID, WEBSITE_ID } from '@/features/seo/json-ld'
import { ogCopy } from '@/features/seo/og-copy'
import { cn } from '@/lib/utils'
import { Metadata, Viewport } from 'next'
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

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

export const metadata: Metadata = {
  metadataBase: new URL(env.BASE_URL),
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
    title: ogCopy('/').title,
    description: ogCopy('/').description,
  },
  twitter: {
    card: 'summary_large_image',
    title: ogCopy('/').title,
    description: ogCopy('/').description,
  },
  verification: { google: env.GOOGLE_SITE_VERIFICATION },
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
        <JsonLd
          data={{
            '@graph': [
              {
                '@type': 'Organization',
                '@id': ORGANIZATION_ID,
                name: 'OiPer',
                url: joinUrl(env.BASE_URL),
                logo: joinUrl(env.BASE_URL, '/icon/512'),
                email: 'support@oiper.com',
                sameAs: ['https://github.com/OiPer'],
              },
              {
                '@type': 'WebSite',
                '@id': WEBSITE_ID,
                name: 'OiPer',
                url: joinUrl(env.BASE_URL),
                publisher: { '@id': ORGANIZATION_ID },
              },
            ],
          }}
        />

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
              <ServiceWorker />
              <Toaster richColors />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>

        {env.GA_MEASUREMENT_ID && (
          <GoogleAnalytics id={env.GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  )
}
