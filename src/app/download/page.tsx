import { getReleases, type Release } from '@/features/changelog/github-releases'
import { DownloadPage } from '@/features/download/download-page'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Download',
  description: 'Download OiPer for Windows, macOS and Linux.',
}

interface PageProps {
  searchParams: Promise<{ version?: string | string[] }>
}

export default async function Page({ searchParams }: PageProps) {
  const { version: value } = await searchParams
  const version = Array.isArray(value) ? value[0] : value

  let releases: Release[] = []
  try {
    releases = await getReleases()
  } catch {
    releases = []
  }

  const release =
    version === undefined
      ? releases[0]
      : releases.find((item) => item.version === version)

  if (version !== undefined && releases.length > 0 && !release) notFound()

  return (
    <DownloadPage
      release={release}
      versions={releases.map((item) => item.version)}
    />
  )
}
