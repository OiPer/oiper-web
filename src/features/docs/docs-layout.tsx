import { OiPerLogoText } from '@/components/logo-text'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { RootProvider } from 'fumadocs-ui/provider/next'
import type { PropsWithChildren } from 'react'
import type { DocumentationSource } from './docs-source'

interface DocumentationLayoutProps extends PropsWithChildren {
  source: DocumentationSource
  searchApi: string
}

export function DocumentationLayout({
  source,
  searchApi,
  children,
}: DocumentationLayoutProps) {
  return (
    <RootProvider
      theme={{ enabled: false }}
      search={{ options: { api: searchApi } }}
    >
      <DocsLayout
        tree={source.getPageTree()}
        githubUrl="https://github.com/oiper/desktop"
        nav={{ title: <OiPerLogoText className="text-xl" />, url: '/' }}
        sidebar={{ defaultOpenLevel: 1 }}
        tabs={false}
      >
        {children}
      </DocsLayout>
    </RootProvider>
  )
}
