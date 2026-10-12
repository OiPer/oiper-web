import { NotificationsPage } from '@/features/account/notifications-page'
import { appPageMetadata } from '@/features/seo/app-pages'

export const metadata = appPageMetadata('/account/notifications')

export default function AccountNotificationsRoute() {
  return <NotificationsPage />
}
