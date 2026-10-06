import { env } from '@/lib/env'

export const ORGANIZATION_ID = `${env.SITE_URL}/#organization`
export const WEBSITE_ID = `${env.SITE_URL}/#website`

export function JsonLd(props: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          ...props.data,
        }).replace(/</g, '\\u003c'),
      }}
    />
  )
}
