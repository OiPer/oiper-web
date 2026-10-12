import { UsagePage } from '@/features/account/usage-page'
import { appPageMetadata } from '@/features/seo/app-pages'

export const metadata = appPageMetadata('/account/usage')

export default function AccountUsageRoute() {
  return <UsagePage />
}
