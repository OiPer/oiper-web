import { AccountLayoutClientWrapper } from '@/features/account/components/layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Account',
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AccountLayoutClientWrapper>{children}</AccountLayoutClientWrapper>
}
