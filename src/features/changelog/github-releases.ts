const RELEASES_ENDPOINT = 'https://api.github.com/repos/oiper/desktop/releases'
const RELEASES_PER_PAGE = 100
const MAX_PAGES = 10
const RECENT_RELEASES = 10
const REVALIDATE_SECONDS = 20 * 60
const NO_NOTES_PLACEHOLDER = '_No notable changes in this release._'

interface GitHubRelease {
  tag_name: string
  body: string | null
  html_url: string
  published_at: string | null
  draft: boolean
  prerelease: boolean
  assets: { name: string; browser_download_url: string; size: number }[]
}

export interface Release {
  version: string
  anchor: string
  url: string
  publishedAt: string
  notes: string
  prerelease: boolean
  assets: { name: string; url: string; size: number }[]
}

async function fetchGitHub(url: string) {
  const token = process.env.GITHUB_TOKEN

  return fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: REVALIDATE_SECONDS },
  })
}

async function fetchReleasePage(page: number, perPage = RELEASES_PER_PAGE) {
  const response = await fetchGitHub(
    `${RELEASES_ENDPOINT}?per_page=${perPage}&page=${page}`
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

function toReleases(batch: GitHubRelease[]): Release[] {
  return batch.flatMap((release) => {
    if (release.draft) return []
    if (release.published_at === null) return []

    return [
      {
        version: release.tag_name,
        anchor: toAnchor(release.tag_name),
        url: release.html_url,
        publishedAt: release.published_at,
        notes: toNotes(release.body),
        prerelease: release.prerelease,
        assets: release.assets.map((asset) => ({
          name: asset.name,
          url: asset.browser_download_url,
          size: asset.size,
        })),
      },
    ]
  })
}

export function findLatest(releases: Release[]) {
  return releases.find((release) => !release.prerelease) ?? releases.at(0)
}

export const RELEASES_PER_CHANGELOG_PAGE = 20

export async function getReleases() {
  const releases: Release[] = []

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const batch = await fetchReleasePage(page)

    releases.push(...toReleases(batch))

    if (batch.length < RELEASES_PER_PAGE) break
  }

  return releases
}

export async function getRecentReleases() {
  return toReleases(await fetchReleasePage(1, RECENT_RELEASES))
}

export async function getRelease(version: string) {
  const response = await fetchGitHub(
    `${RELEASES_ENDPOINT}/tags/${encodeURIComponent(version)}`
  )

  if (response.status === 404) return null

  if (!response.ok) {
    throw new Error(
      `GitHub responded with ${response.status} ${response.statusText} while loading release ${version}.`
    )
  }

  return toReleases([(await response.json()) as GitHubRelease]).at(0) ?? null
}
