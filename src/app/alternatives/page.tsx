import {
  ALTERNATIVES,
  ALTERNATIVES_URL,
  AlternativesPage,
} from '@/features/guides/alternatives-page'
import { HOME } from '@/features/landing-page/constants/links'
import { ogCopy } from '@/features/seo/app-pages'
import { breadcrumbs, JsonLd } from '@/features/seo/json-ld'
import { env } from '@/lib/env'
import { joinUrl } from '@/lib/url'
import type { Metadata } from 'next'

const title = 'OiPer vs Other Dictation Apps: Alternatives Compared (2026)'

const description =
  'Compare OiPer with Wispr Flow, Superwhisper, Dragon and other dictation apps: platforms, offline use, privacy, price and where each one is the better fit.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: ALTERNATIVES_URL },
  openGraph: {
    url: ALTERNATIVES_URL,
    siteName: 'OiPer',
    type: 'website',
    title: ogCopy(ALTERNATIVES_URL).title,
    description: ogCopy(ALTERNATIVES_URL).description,
  },
  twitter: {
    card: 'summary_large_image',
    title: ogCopy(ALTERNATIVES_URL).title,
    description: ogCopy(ALTERNATIVES_URL).description,
  },
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          '@graph': [
            breadcrumbs([
              { name: 'Home', path: HOME },
              { name: 'Alternatives', path: ALTERNATIVES_URL },
            ]),
            {
              '@type': 'ItemList',
              itemListElement: ALTERNATIVES.map(([path, guide], index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: guide.heading,
                url: joinUrl(env.BASE_URL, path),
              })),
            },
          ],
        }}
      />

      <AlternativesPage />
    </>
  )
}
