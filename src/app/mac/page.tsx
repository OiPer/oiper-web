import { GuidePage, guideMetadata } from '@/features/guides/guide-page'

export const metadata = guideMetadata('/mac')

export default function Page() {
  return <GuidePage path="/mac" />
}
