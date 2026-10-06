import { env } from '@/lib/env'
import { joinUrl } from '@/lib/url'

export const ORGANIZATION_ID = joinUrl(env.BASE_URL, '/#organization')
export const WEBSITE_ID = joinUrl(env.BASE_URL, '/#website')

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: joinUrl(env.BASE_URL, item.path),
    })),
  }
}

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
