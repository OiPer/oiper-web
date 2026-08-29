import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { docsSource } from './docs-source'
import { getMdxComponents } from './mdx-components'

interface DocumentationPageProps {
  slug?: string[]
}

export function DocumentationPage({ slug }: DocumentationPageProps) {
  const page = docsSource.getPage(slug)

  if (!page) notFound()

  const MdxContent = page.data.body

  return (
    <DocsPage toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MdxContent
          components={getMdxComponents({
            a: createRelativeLink(docsSource, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  )
}

export function getDocumentationMetadata(slug?: string[]): Metadata {
  const page = docsSource.getPage(slug)

  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: page.url,
    },
  }
}

export function getDocumentationStaticParams() {
  return docsSource.generateParams()
}
