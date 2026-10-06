import { env } from '@/lib/env'
import { joinUrl } from '@/lib/url'
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  if (env.APP_ENV === 'development') {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  if (env.APP_ENV === 'production') {
    return {
      rules: { userAgent: '*', allow: '/', disallow: ['/api', '/dev'] },
      sitemap: joinUrl(env.BASE_URL, '/sitemap.xml'),
    }
  }

  throw new Error(`Unknown APP_ENV: ${env.APP_ENV}`)
}
