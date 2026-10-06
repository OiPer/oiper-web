import { DOWNLOAD_URL } from '@/features/landing-page/constants/links'
import { LandingPage } from '@/features/landing-page/landing-page'
import { JsonLd, ORGANIZATION_ID } from '@/features/seo/json-ld'
import { api } from '@/lib/api/client'
import { env } from '@/lib/env'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
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
    url: `${env.SITE_URL}/#pricing`,
  }))

  return (
    <>
      <JsonLd
        data={{
          '@graph': [
            {
              '@type': 'SoftwareApplication',
              name: 'OiPer',
              description:
                'Private voice dictation for Windows, macOS and Linux. Hold a hotkey, speak, and your words appear in any app. Transcription runs locally by default.',
              url: env.SITE_URL,
              downloadUrl: `${env.SITE_URL}${DOWNLOAD_URL}`,
              image: `${env.SITE_URL}/opengraph-image`,
              applicationCategory: 'UtilitiesApplication',
              operatingSystem: 'Windows, macOS, Linux',
              publisher: { '@id': ORGANIZATION_ID },
              ...(offers.length > 0 && { offers }),
            },
          ],
        }}
      />

      <LandingPage plans={plans} />
    </>
  )
}
