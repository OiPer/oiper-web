import { formatDate } from '@/lib/format'
import { DocsBody, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page'
import { ArrowDown, ArrowUp, History } from 'lucide-react'
import Link from 'next/link'
import type { Release } from './github-releases'
import { ReleaseNotes } from './release-notes'

interface ChangelogPageProps {
  releases: Release[]
  newerUrl: string | null
  olderUrl: string | null
}

export function ChangelogPage({
  releases,
  newerUrl,
  olderUrl,
}: ChangelogPageProps) {
  return (
    <DocsPage
      toc={releases.map((release) => ({
        title: release.version,
        url: `#${release.anchor}`,
        depth: 2,
      }))}
      tableOfContent={{
        header:
          newerUrl === null ? null : (
            <Link
              className="bg-fd-secondary/50 mb-4 flex items-center justify-between rounded-md border px-3 py-2 text-sm font-medium no-underline"
              href={newerUrl}
            >
              <span>Newer releases</span>
              <ArrowUp className="size-4" />
            </Link>
          ),
        footer:
          olderUrl === null ? null : (
            <Link
              className="border-fd-border/60 text-fd-muted-foreground mt-4 flex items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm font-medium no-underline"
              href={olderUrl}
            >
              <span>Older releases</span>
              <ArrowDown className="size-4" />
            </Link>
          ),
      }}
      tableOfContentPopover={{
        header:
          newerUrl === null ? null : (
            <Link
              className="bg-fd-secondary/50 mx-4 mt-3 flex items-center justify-between rounded-md border px-3 py-2 text-sm font-medium no-underline"
              href={newerUrl}
            >
              <span>Newer releases</span>
              <ArrowUp className="size-4" />
            </Link>
          ),
        footer:
          olderUrl === null ? null : (
            <Link
              className="border-fd-border/60 text-fd-muted-foreground mx-4 mb-3 flex items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm font-medium no-underline"
              href={olderUrl}
            >
              <span>Older releases</span>
              <ArrowDown className="size-4" />
            </Link>
          ),
      }}
      footer={{ enabled: false }}
    >
      <DocsTitle className="flex items-center gap-3">
        <History
          aria-hidden="true"
          className="text-fd-muted-foreground size-7"
        />
        Changelog
      </DocsTitle>
      <DocsBody>
        {releases.map((release) => (
          <section
            key={release.version}
            className="border-border mt-10 border-t pt-10 first:mt-0 first:border-t-0 first:pt-0"
          >
            <h2 id={release.anchor} className="mt-0! mb-1! scroll-mt-8">
              <a href={`#${release.anchor}`}>{release.version}</a>
            </h2>
            <p className="text-muted-foreground mt-0! text-sm">
              <time dateTime={release.publishedAt}>
                {formatDate(release.publishedAt)}
              </time>
            </p>
            <ReleaseNotes notes={release.notes} />
          </section>
        ))}

        <nav
          aria-label="Changelog navigation"
          className="border-border mt-12 grid grid-cols-3 items-center gap-4 border-t pt-6 text-sm"
        >
          {newerUrl === null ? (
            <span />
          ) : (
            <Link href={newerUrl}>Newer releases</Link>
          )}
          <span className="text-muted-foreground text-center">
            {releases.length} releases
          </span>
          {olderUrl === null ? (
            <span />
          ) : (
            <Link className="text-right" href={olderUrl}>
              Older releases
            </Link>
          )}
        </nav>
      </DocsBody>
    </DocsPage>
  )
}
