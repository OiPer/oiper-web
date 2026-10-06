import { SecurityPage } from '@/features/account/security-page'
import { appPageMetadata } from '@/features/seo/app-pages'

export const metadata = appPageMetadata('/account/security')

export default function AccountSecurityRoute() {
  return <SecurityPage />
}
