import { loader } from 'fumadocs-core/source'
import { defineDocs } from 'fumadocs-mdx/macro'

const resources = defineDocs({
  dir: 'content/resources',
  docs: { lastModified: true },
})

export const resourcesSource = loader({
  baseUrl: '/resources',
  source: resources.toFumadocsSource(),
})
