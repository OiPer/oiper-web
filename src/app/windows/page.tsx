import { GuidePage, guideMetadata } from '@/features/guides/guide-page'

export const metadata = guideMetadata('/windows')

export default function Page() {
  return <GuidePage path="/windows" />
}
