import { HOME, PRICING_URL } from '@/features/landing-page/constants/links'
import { PRICING_FAQ, PricingPage } from '@/features/pricing/pricing-page'
import { ogCopy } from '@/features/seo/app-pages'
import {
  breadcrumbs,
  JsonLd,
  ORGANIZATION_ID,
  SOFTWARE_ID,
} from '@/features/seo/json-ld'
import { api } from '@/lib/api/client'
import { env } from '@/lib/env'
import { joinUrl } from '@/lib/url'
import type { Metadata } from 'next'

const title = 'OiPer Pricing: Free Local Dictation, Your Own Key or Cloud'

const description =
  'OiPer is free and unlimited on your own computer for Windows, macOS and Linux. Use your own API key at no extra cost, or a paid plan for hosted models.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: PRICING_URL },
  openGraph: {
    url: PRICING_URL,
    siteName: 'OiPer',
    type: 'website',
    title: ogCopy(PRICING_URL).title,
    description: ogCopy(PRICING_URL).description,
  },
  twitter: {
    card: 'summary_large_image',
    title: ogCopy(PRICING_URL).title,
    description: ogCopy(PRICING_URL).description,
  },
}

export default async function Page() {
  const { data } = await api.GET('/v1/pricing')
  const plans = data?.plans ?? []

  const offers = plans.map((plan) => ({
    '@type': 'Offer',
    name: plan.interval
      ? `${plan.displayName} (${plan.interval.toLowerCase()})`
      : plan.displayName,
    price: (plan.priceAmountCents / 100).toFixed(2),
    priceCurrency: 'USD',
    url: joinUrl(env.WEB_URL, PRICING_URL),
  }))

  return (
    <>
      <JsonLd
        data={{
          '@graph': [
            breadcrumbs([
              { name: 'Home', path: HOME },
              { name: 'Pricing', path: PRICING_URL },
            ]),
            {
              '@type': 'SoftwareApplication',
              '@id': SOFTWARE_ID,
              name: 'OiPer',
              url: joinUrl(env.WEB_URL),
              applicationCategory: 'UtilitiesApplication',
              operatingSystem: 'Windows, macOS, Linux',
              publisher: { '@id': ORGANIZATION_ID },
              ...(offers.length > 0 && { offers }),
            },
            {
              '@type': 'FAQPage',
              mainEntity: PRICING_FAQ.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer },
              })),
            },
          ],
        }}
      />

      <PricingPage plans={plans} />
    </>
  )
}
