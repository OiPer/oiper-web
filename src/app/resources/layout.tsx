import { DocumentationLayout } from '@/features/docs/docs-layout'
import { resourcesSource } from '@/features/docs/resources-source'
import type { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <DocumentationLayout
      source={resourcesSource}
      searchApi="/api/resources/search"
      tabs={false}
    >
      {children}
    </DocumentationLayout>
  )
}
