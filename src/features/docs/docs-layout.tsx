import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { RootProvider } from 'fumadocs-ui/provider/next'
import type { PropsWithChildren } from 'react'
import { docsSource } from './docs-source'

export function DocumentationLayout({ children }: PropsWithChildren) {
  return (
    <RootProvider theme={{ enabled: false }}>
      <DocsLayout
        tree={docsSource.getPageTree()}
        githubUrl="https://github.com/oiper/desktop"
        nav={{ title: 'OiPer', url: '/' }}
        sidebar={{ defaultOpenLevel: 1 }}
        tabs={false}
      >
        {children}
      </DocsLayout>
    </RootProvider>
  )
}
