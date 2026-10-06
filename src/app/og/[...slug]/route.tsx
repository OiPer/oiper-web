import { docsSource } from '@/features/docs/docs-source'
import { resourcesSource } from '@/features/docs/resources-source'
import { APP_PAGES } from '@/features/seo/app-pages'
import { ogImage } from '@/features/seo/og-card'
import { notFound } from 'next/navigation'

interface RouteProps {
  params: Promise<{ slug: string[] }>
}

function getEyebrow(slug: string[]) {
  const [name, ...rest] = slug

  if (name === 'docs') {
    if (!docsSource.getPage(rest)) notFound()
    return 'Docs'
  }

  if (name === 'resources') {
    if (!resourcesSource.getPage(rest)) notFound()
    return 'Resources'
  }

  if (Object.hasOwn(APP_PAGES, `/${slug.join('/')}`)) return 'Account'

  notFound()
}

export async function GET(_request: Request, { params }: RouteProps) {
  const { slug } = await params

  return ogImage(`/${slug.join('/')}`, getEyebrow(slug))
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
