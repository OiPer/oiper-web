import { GuidePage, guideMetadata } from '@/features/guides/guide-page'

export const metadata = guideMetadata('/linux/ubuntu')

export default function Page() {
  return <GuidePage path="/linux/ubuntu" />
}
