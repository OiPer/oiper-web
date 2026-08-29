import {
  DocumentationPage,
  getDocumentationMetadata,
  getDocumentationStaticParams,
} from '@/features/docs/docs-page'
import { docsSource } from '@/features/docs/docs-source'

interface PageProps {
  params: Promise<{ slug?: string[] }>
}

export function generateStaticParams() {
  return getDocumentationStaticParams(docsSource)
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params

  return getDocumentationMetadata(docsSource, slug)
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params

  return <DocumentationPage source={docsSource} slug={slug} />
}
