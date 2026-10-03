import { SubscriptionStatesPage } from '@/features/dev/subscription-states/subscription-states-page'
import { notFound } from 'next/navigation'

export default function DevSubscriptionStatesRoute() {
  if (process.env.NEXT_PUBLIC_APP_ENV === 'production') notFound()

  return <SubscriptionStatesPage />
}
