import { docsSource } from '@/features/docs/docs-source'
import { resourcesSource } from '@/features/docs/resources-source'
import { ALTERNATIVES_URL } from '@/features/guides/alternatives-page'
import { GUIDES } from '@/features/guides/guides'
import {
  CHANGELOG_URL,
  DOWNLOAD_URL,
  HOME,
  PRICING_URL,
} from '@/features/landing-page/constants/links'
import { env } from '@/lib/env'
import { joinUrl } from '@/lib/url'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; lastModified?: string | Date }[] = [
    { path: HOME },
    { path: DOWNLOAD_URL },
    { path: PRICING_URL },
    { path: '/tools/speech-to-text' },
    { path: CHANGELOG_URL },
    { path: ALTERNATIVES_URL },
    ...Object.entries(GUIDES).map(([path, guide]) => ({
      path,
      lastModified: guide.updated,
    })),
    ...[...docsSource.getPages(), ...resourcesSource.getPages()].map(
      (page) => ({ path: page.url, lastModified: page.data.lastModified })
    ),
  ]

  return pages.map((page) => ({
    url: joinUrl(env.WEB_URL, page.path),
    lastModified: page.lastModified,
  }))
}
