import { getReleases, type Release } from '@/features/changelog/github-releases'
import { DownloadPage } from '@/features/download/download-page'
import { DEFAULT_OG_IMAGE } from '@/features/seo/og-card'
import type { Metadata } from 'next'

const title = 'Download OiPer for Windows, macOS and Linux'

const description =
  'Download OiPer, the private voice dictation app, for Windows, macOS (Apple Silicon and Intel) and Linux (AppImage, .deb, .rpm). Free for local use.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/download' },
  openGraph: {
    url: '/download',
    siteName: 'OiPer',
    title,
    description,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [DEFAULT_OG_IMAGE],
  },
}

interface PageProps {
  searchParams: Promise<{ version?: string | string[] }>
}

export default async function Page({ searchParams }: PageProps) {
  const { version } = await searchParams

  let releases: Release[] = []
  try {
    releases = await getReleases()
  } catch {
    releases = []
  }

  return (
    <DownloadPage
      releases={releases}
      version={Array.isArray(version) ? version[0] : version}
    />
  )
}
