import {
  DocumentationPage,
  getDocumentationMetadata,
  getDocumentationStaticParams,
} from '@/features/docs/docs-page'

interface PageProps {
  params: Promise<{ slug?: string[] }>
}

export function generateStaticParams() {
  return getDocumentationStaticParams()
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params

  return getDocumentationMetadata(slug)
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params

  return <DocumentationPage slug={slug} />
}
