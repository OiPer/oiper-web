import { blogsSource } from '@/features/blogs/blogs-source'
import { getMdxComponents } from '@/features/docs/mdx-components'
import { BLOGS_URL } from '@/features/landing-page/constants/links'
import {
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string[] }>
}

export function generateStaticParams() {
  return blogsSource.generateParams()
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const post = blogsSource.getPage(params.slug)

  if (!post) notFound()

  return {
    title: post.data.title,
    description: post.data.description,
    alternates: { canonical: post.url },
    openGraph: {
      type: 'article',
      title: post.data.title,
      description: post.data.description,
      url: post.url,
      publishedTime: post.data.date.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.data.title,
      description: post.data.description,
    },
  }
}

export default async function Page(props: PageProps) {
  const params = await props.params
  const post = blogsSource.getPage(params.slug)

  if (!post) notFound()

  const MdxContent = post.data.body

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <header className="text-center">
        <DocsTitle className="text-4xl tracking-tight sm:text-5xl">
          {post.data.title}
        </DocsTitle>
        <time
          dateTime={post.data.date.toISOString()}
          className="text-fd-muted-foreground mt-4 block text-sm"
        >
          {post.data.date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            timeZone: 'UTC',
          })}
        </time>
        <DocsDescription className="mt-6 mb-0">
          {post.data.description}
        </DocsDescription>
      </header>
      <DocsBody className="mt-12 text-left">
        <MdxContent
          components={getMdxComponents({
            a: createRelativeLink(blogsSource, post),
          })}
        />
      </DocsBody>
      <footer className="border-fd-border mt-12 border-t pt-8 text-center">
        <Link href={BLOGS_URL} className="text-sm underline underline-offset-4">
          Back to blogs
        </Link>
      </footer>
    </article>
  )
}
