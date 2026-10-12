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
  const paths = [
    HOME,
    DOWNLOAD_URL,
    PRICING_URL,
    '/tools/speech-to-text',
    CHANGELOG_URL,
    ALTERNATIVES_URL,
    ...Object.keys(GUIDES),
    ...docsSource.getPages().map((page) => page.url),
    ...resourcesSource.getPages().map((page) => page.url),
  ]

  return paths.map((path) => ({ url: joinUrl(env.BASE_URL, path) }))
}
