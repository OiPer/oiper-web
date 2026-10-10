import { isDevSectionSlug } from '@/features/dev/subscription-states/dev-section-slugs'
import { DevSectionPage } from '@/features/dev/subscription-states/subscription-states-page'
import { notFound } from 'next/navigation'

export default async function DevSectionRoute(props: {
  params: Promise<{ section: string }>
}) {
  const { section } = await props.params

  if (!isDevSectionSlug(section)) notFound()

  return <DevSectionPage slug={section} />
}
