import { SubscriptionStatesPage } from '@/features/dev/subscription-states/subscription-states-page'
import { notFound } from 'next/navigation'

export default function DevSubscriptionStatesRoute() {
  if (process.env.NODE_ENV === 'production') notFound()

  return <SubscriptionStatesPage />
}
