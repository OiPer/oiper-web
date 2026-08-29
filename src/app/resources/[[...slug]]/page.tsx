import {
  DocumentationPage,
  getDocumentationMetadata,
  getDocumentationStaticParams,
} from '@/features/docs/docs-page'
import { resourcesSource } from '@/features/docs/resources-source'

interface PageProps {
  params: Promise<{ slug?: string[] }>
}

export function generateStaticParams() {
  return getDocumentationStaticParams(resourcesSource)
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params

  return getDocumentationMetadata(resourcesSource, slug)
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params

  return <DocumentationPage source={resourcesSource} slug={slug} />
}
