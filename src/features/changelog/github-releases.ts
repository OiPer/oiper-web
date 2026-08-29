const RELEASES_ENDPOINT = 'https://api.github.com/repos/oiper/desktop/releases'
const RELEASES_PER_PAGE = 100
const MAX_PAGES = 10
const REVALIDATE_SECONDS = 3600
const NO_NOTES_PLACEHOLDER = '_No notable changes in this release._'

interface GitHubRelease {
  tag_name: string
  body: string | null
  html_url: string
  published_at: string | null
  draft: boolean
}

export interface Release {
  version: string
  anchor: string
  url: string
  publishedAt: string
  notes: string
}

async function fetchReleasePage(page: number) {
  const token = process.env.GITHUB_TOKEN

  const response = await fetch(
    `${RELEASES_ENDPOINT}?per_page=${RELEASES_PER_PAGE}&page=${page}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: REVALIDATE_SECONDS },
    }
  )

  if (!response.ok) {
    throw new Error(
      `GitHub responded with ${response.status} ${response.statusText} while loading release page ${page}.`
    )
  }

  return response.json() as Promise<GitHubRelease[]>
}

function toNotes(body: string | null) {
  if (body === null) return NO_NOTES_PLACEHOLDER
  if (body.trim().length === 0) return NO_NOTES_PLACEHOLDER

  return body
}

function toAnchor(version: string) {
  return version.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')
}

export const RELEASES_PER_CHANGELOG_PAGE = 20

export async function getReleases() {
  const releases: Release[] = []

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const batch = await fetchReleasePage(page)

    for (const release of batch) {
      if (release.draft) continue
      if (release.published_at === null) continue

      releases.push({
        version: release.tag_name,
        anchor: toAnchor(release.tag_name),
        url: release.html_url,
        publishedAt: release.published_at,
        notes: toNotes(release.body),
      })
    }

    if (batch.length < RELEASES_PER_PAGE) break
  }

  return releases
}
