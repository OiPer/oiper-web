import { docsSource } from '@/features/docs/docs-source'
import { resourcesSource } from '@/features/docs/resources-source'
import { APP_PAGES, type AppPagePath } from '@/features/seo/app-pages'
import { OG_SIZE, OgCard } from '@/features/seo/og-card'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'

interface RouteProps {
  params: Promise<{ slug: string[] }>
}

function getCard(slug: string[]) {
  const [name, ...rest] = slug
  const path = `/${slug.join('/')}`

  if (name === 'docs' || name === 'resources') {
    const source = name === 'docs' ? docsSource : resourcesSource
    const page = source.getPage(rest)
    if (!page) notFound()

    return {
      eyebrow: name === 'docs' ? 'Docs' : 'Resources',
      title: page.data.title,
      description: page.data.description ?? '',
    }
  }

  if (Object.hasOwn(APP_PAGES, path)) {
    return { eyebrow: 'Account', ...APP_PAGES[path as AppPagePath] }
  }

  notFound()
}

export async function GET(_request: Request, { params }: RouteProps) {
  const card = getCard((await params).slug)

  return new ImageResponse(<OgCard {...card} />, OG_SIZE)
}

export const dynamicParams = false

export function generateStaticParams() {
  return [
    ...docsSource.getPages().map((page) => ({ slug: ['docs', ...page.slugs] })),
    ...resourcesSource
      .getPages()
      .map((page) => ({ slug: ['resources', ...page.slugs] })),
    ...Object.keys(APP_PAGES).map((path) => ({
      slug: path.slice(1).split('/'),
    })),
  ]
}
