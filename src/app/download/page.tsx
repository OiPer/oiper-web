import { getReleases, type Release } from '@/features/changelog/github-releases'
import { DownloadPage } from '@/features/download/download-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Download',
  description: 'Download OiPer for Windows, macOS and Linux.',
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
      selectedVersion={Array.isArray(version) ? version[0] : version}
    />
  )
}
