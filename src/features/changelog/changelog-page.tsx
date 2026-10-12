import { BuildLink } from '@/features/download/build-link'
import { getBuilds } from '@/features/download/download-page'
import { OSIcon } from '@/features/download/os-icons'
import { formatPaddedDate } from '@/lib/format'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page'
import { ArrowDown, ArrowUp, ChevronRight } from 'lucide-react'
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
      <DocsTitle>Changelog</DocsTitle>
      <DocsDescription>
        Every OiPer Desktop release, newest first: new features, fixes, and
        improvements, with installers for Windows, macOS and Linux.
      </DocsDescription>
      <DocsBody>
        {releases.map((release) => (
          <section
            key={release.version}
            className="before:via-border relative mt-8 grid gap-x-6 pt-8 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:to-transparent first:mt-0 first:pt-0 first:before:hidden lg:grid-cols-[7rem_1fr]"
          >
            <div className="lg:sticky lg:top-8 lg:self-start">
              <h2 id={release.anchor} className="mt-0! mb-1! scroll-mt-8">
                <a href={`#${release.anchor}`}>{release.version}</a>
              </h2>
              <p className="text-muted-foreground -ms-px mt-0! text-sm">
                <time dateTime={release.publishedAt}>
                  {formatPaddedDate(release.publishedAt)}
                </time>
              </p>
            </div>

            <div className="min-w-0 lg:[&>*:first-child]:mt-0">
              <ReleaseNotes notes={release.notes} />
              <ReleaseDownloads release={release} />
            </div>
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

function ReleaseDownloads({ release }: { release: Release }) {
  const builds = getBuilds(release)

  if (builds.length === 0) return null

  const platforms = [...new Set(builds.map(({ pkg }) => pkg.os))]

  return (
    <details className="group not-prose border-border mt-6 rounded-xl border">
      <summary className="text-muted-foreground hover:text-foreground flex cursor-pointer list-none items-center gap-2 px-4 py-2.5 text-sm [&::-webkit-details-marker]:hidden">
        <ChevronRight className="size-4 transition-transform group-open:rotate-90" />
        <span className="flex-1">Downloads</span>
        {platforms.map((os) => (
          <OSIcon key={os} os={os} className="size-3.5" />
        ))}
      </summary>

      <ul className="border-border border-t px-1 py-1">
        {builds.map(({ pkg, asset }) => (
          <li key={pkg.id} className="hover:bg-muted rounded-lg">
            <BuildLink
              pkg={pkg}
              url={asset.url}
              macAltUrl={
                builds.find(
                  (build) => build.pkg.os === 'macos' && build.pkg !== pkg
                )?.asset.url ?? null
              }
              size={asset.size}
              location="changelog"
            />
          </li>
        ))}
      </ul>
    </details>
  )
}
