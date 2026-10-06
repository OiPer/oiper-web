import { ogCopy } from '@/features/seo/app-pages'
import {
  breadcrumbs,
  JsonLd,
  ORGANIZATION_ID,
  WEBSITE_ID,
} from '@/features/seo/json-ld'
import { env } from '@/lib/env'
import { joinUrl } from '@/lib/url'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { DocumentationSource } from './docs-source'
import { getMdxComponents } from './mdx-components'

interface DocumentationPageProps {
  source: DocumentationSource
  slug?: string[]
}

export function DocumentationPage({ source, slug }: DocumentationPageProps) {
  const page = source.getPage(slug)

  if (!page) notFound()

  const MdxContent = page.data.body

  const trail = page.slugs
    .map((_, index) => source.getPage(page.slugs.slice(0, index)))
    .filter((item) => item !== undefined)
    .concat(page)

  return (
    <DocsPage toc={page.data.toc}>
      <JsonLd
        data={{
          '@graph': [
            {
              '@type': page.url.startsWith('/docs') ? 'TechArticle' : 'WebPage',
              name: page.data.title,
              headline: page.data.title,
              description: page.data.description,
              url: joinUrl(env.BASE_URL, page.url),
              image: joinUrl(env.BASE_URL, '/og', page.url),
              publisher: { '@id': ORGANIZATION_ID },
              isPartOf: { '@id': WEBSITE_ID },
            },
            breadcrumbs(
              trail.map((item) => ({ name: item.data.title, path: item.url }))
            ),
          ],
        }}
      />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MdxContent
          components={getMdxComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  )
}

export function getDocumentationMetadata(
  source: DocumentationSource,
  slug?: string[]
): Metadata {
  const page = source.getPage(slug)

  if (!page) notFound()

  const og = ogCopy(page.url)
  const image = {
    url: `/og${page.url}`,
    width: 1200,
    height: 630,
    alt: og.title,
  }

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: page.url,
    },
    openGraph: {
      type: 'article',
      siteName: 'OiPer',
      url: page.url,
      title: og.title,
      description: og.description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: og.title,
      description: og.description,
      images: [image],
    },
  }
}

export function getDocumentationStaticParams(source: DocumentationSource) {
  return source.generateParams()
}
