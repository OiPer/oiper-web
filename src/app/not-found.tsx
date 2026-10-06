import { OiPerLogoText } from '@/components/logo-text'
import {
  DOCS_URL,
  DOWNLOAD_URL,
  HOME,
} from '@/features/landing-page/constants/links'
import Link from 'next/link'
import { Fragment } from 'react'

const links = [
  { label: 'Home', href: HOME },
  { label: 'Download', href: DOWNLOAD_URL },
  { label: 'Docs', href: DOCS_URL },
]

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6 text-center text-white">
      <title>Page not found | OiPer</title>
      <meta
        name="description"
        content="This page doesn't exist. Head back to OiPer, private voice dictation for Windows, macOS and Linux."
      />

      <Link href={HOME}>
        <OiPerLogoText className="text-[2rem]" />
      </Link>

      <h1 className="mt-12 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
        Page not found.
      </h1>
      <p className="mt-5 max-w-110 text-base leading-relaxed text-white/50">
        The page you are looking for doesn&apos;t exist or has moved.
      </p>

      <nav className="mt-8 flex flex-wrap items-center justify-center gap-x-2.5 text-sm text-white/50">
        {links.map((link, index) => (
          <Fragment key={link.href}>
            {index > 0 && (
              <span
                aria-hidden="true"
                className="h-2.5 rounded-full border-l-2 border-current/50"
              />
            )}
            <Link
              href={link.href}
              className="underline-offset-4 hover:text-white/80 hover:underline"
            >
              {link.label}
            </Link>
          </Fragment>
        ))}
      </nav>
    </main>
  )
}
