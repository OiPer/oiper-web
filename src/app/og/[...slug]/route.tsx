import { docsSource } from '@/features/docs/docs-source'
import { resourcesSource } from '@/features/docs/resources-source'
import { OG_SIZE, OgCard } from '@/features/seo/og-card'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'

interface RouteProps {
  params: Promise<{ slug: string[] }>
}

function getSection(name: string) {
  if (name === 'docs') return { eyebrow: 'Docs', source: docsSource }
  if (name === 'resources')
    return { eyebrow: 'Resources', source: resourcesSource }
  notFound()
}

export async function GET(_request: Request, { params }: RouteProps) {
  const [name, ...slug] = (await params).slug
  const { eyebrow, source } = getSection(name)
  const page = source.getPage(slug)

  if (!page) notFound()

  return new ImageResponse(
    <OgCard
      eyebrow={eyebrow}
      title={page.data.title}
      description={page.data.description ?? ''}
    />,
    OG_SIZE
  )
}

export function generateStaticParams() {
  return [
    ...docsSource.getPages().map((page) => ({ slug: ['docs', ...page.slugs] })),
    ...resourcesSource
      .getPages()
      .map((page) => ({ slug: ['resources', ...page.slugs] })),
  ]
}
