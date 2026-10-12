import { DocumentationLayout } from '@/features/docs/docs-layout'
import { docsSource } from '@/features/docs/docs-source'
import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: { template: '%s | OiPer Docs', default: 'OiPer Docs' },
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <DocumentationLayout
      source={docsSource}
      searchApi="/api/search"
      tabs={[
        {
          title: 'Desktop',
          description: 'The voice-to-text app',
          url: '/docs/desktop',
        },
        {
          title: 'Snippets',
          description: 'Snippet expansion library',
          url: '/docs/snippets',
        },
      ]}
    >
      {children}
    </DocumentationLayout>
  )
}
