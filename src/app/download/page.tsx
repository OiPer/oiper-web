import { getReleases, type Release } from '@/features/changelog/github-releases'
import { DownloadPage } from '@/features/download/download-page'
import { DOWNLOAD_URL, HOME } from '@/features/landing-page/constants/links'
import { ogCopy } from '@/features/seo/app-pages'
import { breadcrumbs, JsonLd } from '@/features/seo/json-ld'
import type { Metadata } from 'next'

const title = 'Download OiPer for Windows, macOS and Linux'

const description =
  'Download OiPer for Windows, macOS and Linux (AppImage, .deb, .rpm). Hold a hotkey, speak, and your words appear in any app. Free forever on your machine.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/download' },
  openGraph: {
    url: '/download',
    siteName: 'OiPer',
    type: 'website',
    title: ogCopy('/download').title,
    description: ogCopy('/download').description,
  },
  twitter: {
    card: 'summary_large_image',
    title: ogCopy('/download').title,
    description: ogCopy('/download').description,
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
    <>
      <JsonLd
        data={breadcrumbs([
          { name: 'Home', path: HOME },
          { name: 'Download', path: DOWNLOAD_URL },
        ])}
      />

      <DownloadPage
        releases={releases}
        version={Array.isArray(version) ? version[0] : version}
      />
    </>
  )
}
