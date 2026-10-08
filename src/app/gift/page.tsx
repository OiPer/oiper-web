import { GiftPage } from '@/features/gifts/gift-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your gift',
  description: 'A gift of OiPer from the founders.',
  robots: { index: false, follow: false },
}

export default function GiftRoute() {
  return <GiftPage />
}
