import { OiPerLogoText } from '@/components/logo-text'
import { NavigationLink } from '@/components/navigation-link'
import {
  DOCS_URL,
  DOWNLOAD_URL,
  HOME,
} from '@/features/landing-page/constants/links'
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

      <NavigationLink href={HOME} location="not_found" destination="home">
        <OiPerLogoText className="text-[2rem]" />
      </NavigationLink>

      <h1 className="mt-12 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
        Page not found.
      </h1>
      <p className="mt-5 max-w-110 text-base leading-relaxed text-white/50">
        The page you are looking for doesn&apos;t exist or has moved.
      </p>

      <nav className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm">
        {links.map((link, index) => (
          <Fragment key={link.href}>
            {index > 0 && (
              <span
                aria-hidden="true"
                className="bg-muted-foreground/20 h-3 w-px"
              />
            )}
            <NavigationLink
              href={link.href}
              location="not_found"
              destination={link.label}
              className="text-foreground hover:text-foreground/80 underline underline-offset-4"
            >
              {link.label}
            </NavigationLink>
          </Fragment>
        ))}
      </nav>
    </main>
  )
}
