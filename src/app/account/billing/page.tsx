import { BillingPage } from '@/features/account/billing-page'
import { appPageMetadata } from '@/features/seo/app-pages'

export const metadata = appPageMetadata('/account/billing')

export default function AccountBillingRoute() {
  return <BillingPage />
}
