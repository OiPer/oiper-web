import { AccountLayoutClientWrapper } from '@/features/account/components/layout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AccountLayoutClientWrapper>{children}</AccountLayoutClientWrapper>
}
