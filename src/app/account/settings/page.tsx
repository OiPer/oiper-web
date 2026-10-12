import { SettingsPage } from '@/features/account/settings-page'
import { appPageMetadata } from '@/features/seo/app-pages'

export const metadata = appPageMetadata('/account/settings')

export default function AccountSettingsRoute() {
  return <SettingsPage />
}
