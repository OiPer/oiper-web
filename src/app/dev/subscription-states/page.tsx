import { SubscriptionStatesPage } from '@/features/dev/subscription-states/subscription-states-page'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Subscription states',
  robots: { index: false, follow: false },
}

export default function DevSubscriptionStatesRoute() {
  if (process.env.NEXT_PUBLIC_APP_ENV === 'production') notFound()

  return <SubscriptionStatesPage />
}
