import { getReleases, type Release } from '@/features/changelog/github-releases'
import { DownloadPage } from '@/features/download/download-page'
import type { Metadata } from 'next'

export const revalidate = 1800

export const metadata: Metadata = {
  title: 'Download',
  description: 'Download OiPer for Windows, macOS and Linux.',
}

export default async function Page() {
  let releases: Release[] = []
  try {
    releases = await getReleases()
  } catch {
    releases = []
  }

  return <DownloadPage releases={releases} />
}
