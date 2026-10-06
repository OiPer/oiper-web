import { docsSource } from '@/features/docs/docs-source'
import { resourcesSource } from '@/features/docs/resources-source'
import {
  CHANGELOG_URL,
  DOWNLOAD_URL,
  HOME,
} from '@/features/landing-page/constants/links'
import { env } from '@/lib/env'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    HOME,
    DOWNLOAD_URL,
    CHANGELOG_URL,
    ...docsSource.getPages().map((page) => page.url),
    ...resourcesSource.getPages().map((page) => page.url),
  ]

  return paths.map((path) => ({ url: new URL(path, env.SITE_URL).href }))
}
