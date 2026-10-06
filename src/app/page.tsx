import { LandingPage } from '@/features/landing-page/landing-page'
import { api } from '@/lib/api/client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default async function Page() {
  const { data } = await api.GET('/v1/pricing')

  return <LandingPage plans={data?.plans ?? []} />
}
