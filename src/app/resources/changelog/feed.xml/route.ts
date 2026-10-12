import { getRecentReleases } from '@/features/changelog/github-releases'
import { CHANGELOG_URL } from '@/features/landing-page/constants/links'
import { env } from '@/lib/env'
import { joinUrl } from '@/lib/url'

export const revalidate = 3600

function escape(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function GET() {
  const releases = await getRecentReleases()
  const url = joinUrl(env.BASE_URL, CHANGELOG_URL)

  const items = releases.map((release) => {
    const link = `${url}#${release.anchor}`

    return [
      '<item>',
      `<title>OiPer ${escape(release.version)}</title>`,
      `<link>${escape(link)}</link>`,
      `<guid isPermaLink="true">${escape(link)}</guid>`,
      `<pubDate>${new Date(release.publishedAt).toUTCString()}</pubDate>`,
      `<description>${escape(release.notes)}</description>`,
      '</item>',
    ].join('')
  })

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '<channel>',
    '<title>OiPer Changelog</title>',
    `<link>${escape(url)}</link>`,
    `<atom:link href="${escape(joinUrl(url, 'feed.xml'))}" rel="self" type="application/rss+xml"/>`,
    '<description>Every OiPer Desktop release: new features, fixes and improvements.</description>',
    '<language>en</language>',
    ...items,
    '</channel>',
    '</rss>',
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
