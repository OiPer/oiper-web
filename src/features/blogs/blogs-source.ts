import { loader } from 'fumadocs-core/source'
import { pageSchema } from 'fumadocs-core/source/schema'
import { defineDocs } from 'fumadocs-mdx/macro'
import { z } from 'zod'

const blogs = defineDocs({
  dir: 'content/blogs',
  docs: {
    schema: pageSchema.extend({
      date: z.coerce.date(),
    }),
  },
})

export const blogsSource = loader({
  baseUrl: '/blog',
  source: blogs.toFumadocsSource(),
})
