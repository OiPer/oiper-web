import { ChangelogPage } from '@/features/changelog/changelog-page'
import {
  getReleases,
  RELEASES_PER_CHANGELOG_PAGE,
} from '@/features/changelog/github-releases'
import { CHANGELOG_URL } from '@/features/landing-page/constants/links'
import { DEFAULT_OG_IMAGE } from '@/features/seo/og-card'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PageProps {
  searchParams: Promise<{ cursor?: string | string[] }>
}

function parseCursor(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function getCursorUrl(cursor: string) {
  return `${CHANGELOG_URL}?cursor=${encodeURIComponent(cursor)}`
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { cursor: value } = await searchParams
  const cursor = parseCursor(value)
  const title = cursor === undefined ? 'Changelog' : `Changelog after ${cursor}`
  const url = cursor === undefined ? CHANGELOG_URL : getCursorUrl(cursor)

  const description =
    'Every OiPer Desktop release, newest first: new features, fixes, and improvements to the voice-to-text app for Windows, macOS and Linux.'

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      url,
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
}

export default async function Page({ searchParams }: PageProps) {
  const { cursor: value } = await searchParams
  const cursor = parseCursor(value)
  const releases = await getReleases()
  const cursorIndex =
    cursor === undefined
      ? -1
      : releases.findIndex((release) => release.version === cursor)

  if (cursor !== undefined && cursorIndex === -1) notFound()

  const start = cursorIndex + 1
  const pageReleases = releases.slice(
    start,
    start + RELEASES_PER_CHANGELOG_PAGE
  )

  if (pageReleases.length === 0) notFound()

  const newerStart = Math.max(0, start - RELEASES_PER_CHANGELOG_PAGE)
  let newerUrl = null

  if (start > 0) {
    newerUrl =
      newerStart === 0
        ? CHANGELOG_URL
        : getCursorUrl(releases[newerStart - 1].version)
  }

  const olderUrl =
    start + pageReleases.length === releases.length
      ? null
      : getCursorUrl(pageReleases[pageReleases.length - 1].version)

  return (
    <ChangelogPage
      releases={pageReleases}
      newerUrl={newerUrl}
      olderUrl={olderUrl}
    />
  )
}
