import { env } from '@/lib/env'
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  if (env.APP_ENV === 'development') {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/account', '/auth', '/api', '/dev'],
    },
    sitemap: `${env.SITE_URL}/sitemap.xml`,
  }
}
