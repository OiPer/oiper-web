import { getRecentReleases } from '@/features/changelog/github-releases'
import { pickDownloadRelease } from '@/features/download/platforms'
import { DOWNLOAD_URL } from '@/features/landing-page/constants/links'
import { LandingPage } from '@/features/landing-page/landing-page'
import { JsonLd, ORGANIZATION_ID, SOFTWARE_ID } from '@/features/seo/json-ld'
import { api } from '@/lib/api/client'
import { env } from '@/lib/env'
import { joinUrl } from '@/lib/url'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default async function Page() {
  const { data } = await api.GET('/v1/pricing')
  const plans = data?.plans ?? []

  let version: string | undefined

  try {
    version = pickDownloadRelease(await getRecentReleases())?.version
  } catch {
    version = undefined
  }

  const offers = plans.map((plan) => ({
    '@type': 'Offer',
    name: plan.interval
      ? `${plan.displayName} (${plan.interval.toLowerCase()})`
      : plan.displayName,
    price: (plan.priceAmountCents / 100).toFixed(2),
    priceCurrency: 'USD',
    url: joinUrl(env.BASE_URL, '/#pricing'),
  }))

  return (
    <>
      <JsonLd
        data={{
          '@graph': [
            {
              '@type': 'SoftwareApplication',
              '@id': SOFTWARE_ID,
              name: 'OiPer',
              description:
                'Hold a hotkey, speak, and your words appear in any app. OiPer runs locally by default on Windows, macOS and Linux, and the app is free forever.',
              url: joinUrl(env.BASE_URL),
              downloadUrl: joinUrl(env.BASE_URL, DOWNLOAD_URL),
              image: joinUrl(env.BASE_URL, '/opengraph-image'),
              screenshot: [1, 2, 3, 4, 5].map((index) =>
                joinUrl(env.BASE_URL, `/hero-${index}.png`)
              ),
              softwareVersion: version,
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
