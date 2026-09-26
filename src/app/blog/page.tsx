import { blogsSource } from '@/features/blogs/blogs-source'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'News and notes from OiPer.',
  alternates: { canonical: '/blog' },
}

export default function Page() {
  const posts = blogsSource
    .getPages()
    .sort(
      (first, second) => second.data.date.getTime() - first.data.date.getTime()
    )

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
      <header className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Blogs
        </h1>
        <p className="text-fd-muted-foreground mt-4 text-lg">
          News and notes from OiPer.
        </p>
      </header>
      <section aria-label="Blogs" className="mt-16 text-left">
        {posts.length === 0 && (
          <p className="border-fd-border text-fd-muted-foreground border-t py-8">
            No posts yet. Check back soon.
          </p>
        )}
        <ul className="divide-fd-border divide-y">
          {posts.map((post) => (
            <li key={post.url}>
              <Link href={post.url} className="block py-8">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {post.data.title}
                </h2>
                <time
                  dateTime={post.data.date.toISOString()}
                  className="text-fd-muted-foreground mt-2 block text-sm"
                >
                  {post.data.date.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    timeZone: 'UTC',
                  })}
                </time>
                {post.data.description && (
                  <p className="text-fd-muted-foreground mt-4 leading-relaxed">
                    {post.data.description}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
