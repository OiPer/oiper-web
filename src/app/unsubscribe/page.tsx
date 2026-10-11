import { UnsubscribePage } from '@/features/notifications/unsubscribe-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Unsubscribe',
  description: 'Stop receiving OiPer product update emails.',
  robots: { index: false, follow: false },
}

type UnsubscribeRouteProps = {
  searchParams: Promise<{ token?: string }>
}

export default async function UnsubscribeRoute({
  searchParams,
}: UnsubscribeRouteProps) {
  const { token } = await searchParams

  return <UnsubscribePage token={token ?? null} />
}
