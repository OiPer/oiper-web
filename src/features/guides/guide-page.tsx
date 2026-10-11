import { OiPerLogoText } from '@/components/logo-text'
import { NavigationLink } from '@/components/navigation-link'
import { Wrapper } from '@/components/wrapper'
import { DownloadButton } from '@/features/download/download-button'
import { OSIcon } from '@/features/download/os-icons'
import { OS_LABELS } from '@/features/download/platforms'
import { AuthNavActions } from '@/features/landing-page/components/auth-nav-actions'
import { FooterSection } from '@/features/landing-page/components/footer-section'
import {
  DOCS_URL,
  DOWNLOAD_URL,
  HOME,
} from '@/features/landing-page/constants/links'
import { ogCopy } from '@/features/seo/app-pages'
import { breadcrumbs, JsonLd } from '@/features/seo/json-ld'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { GUIDES, type Guide, type GuidePath } from './guides'

const DOWNLOAD_CLASS_NAME =
  'inline-flex h-12 items-center gap-2.5 rounded-md bg-white px-7 text-base font-medium text-[#0a0a0a] hover:bg-white/90'

export function guideMetadata(path: GuidePath): Metadata {
  const guide: Guide = GUIDES[path]
  const og = ogCopy(path)

  return {
    title: { absolute: guide.title },
    description: guide.description,
    alternates: { canonical: path },
    openGraph: {
      url: path,
      siteName: 'OiPer',
      type: 'website',
      title: og.title,
      description: og.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: og.title,
      description: og.description,
    },
  }
}

function Section(props: { title: string; intro: string; children: ReactNode }) {
  return (
    <section className="border-b border-white/6 py-24 sm:py-32">
      <Wrapper>
        <h2 className="max-w-180 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
          {props.title}
        </h2>
        <p className="mt-5 max-w-180 text-base leading-relaxed text-white/50">
          {props.intro}
        </p>
        <div className="mt-14 sm:mt-16">{props.children}</div>
      </Wrapper>
    </section>
  )
}

export function GuidePage({ path }: { path: GuidePath }) {
  const guide: Guide = GUIDES[path]
  const blocks: { title: string; intro: string; children: ReactNode }[] = [
    ...guide.sections.map((section) => ({
      title: section.title,
      intro: section.intro,
      children: (
        <div className="flex flex-col gap-10">
          {section.items.map((item) => (
            <div key={item.title}>
              <h3 className="text-lg font-medium text-white/90">
                {item.title}
              </h3>
              <p className="mt-2 max-w-180 text-sm leading-relaxed text-white/50 sm:text-base">
                {item.text}
              </p>
              {item.docs && (
                <NavigationLink
                  href={item.docs}
                  aria-label={`Learn more: ${item.title}`}
                  location="guide"
                  destination={
                    item.docs.startsWith(DOCS_URL) ? 'docs' : 'resources'
                  }
                  className="mt-3 inline-block text-sm text-white/70 underline underline-offset-4 hover:text-white"
                >
                  Learn more
                </NavigationLink>
              )}
            </div>
          ))}
        </div>
      ),
    })),
  ]

  if (guide.comparison) {
    blocks.push({
      title: guide.comparison.title,
      intro: guide.comparison.intro,
      children: (
        <div className="overflow-x-auto text-left">
          <table className="w-full text-sm sm:text-base">
            <thead>
              <tr className="border-b border-white/10 text-white/90">
                <th className="py-4 pr-4 font-medium" />
                <th className="py-4 pr-4 font-medium">OiPer</th>
                <th className="py-4 font-medium">
                  {guide.comparison.competitor}
                </th>
              </tr>
            </thead>
            <tbody>
              {guide.comparison.rows.map((row) => (
                <tr key={row.label} className="border-b border-white/6">
                  <th className="py-4 pr-4 font-medium text-white/90">
                    {row.label}
                  </th>
                  <td className="py-4 pr-4 text-white/70">{row.oiper}</td>
                  <td className="py-4 text-white/50">{row.competitor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    })
  }

  blocks.push({
    title: 'Questions, answered',
    intro: 'What people ask before they start dictating with OiPer.',
    children: (
      <div className="flex flex-col gap-10">
        {guide.faq.map((item) => (
          <div key={item.question}>
            <h3 className="text-lg font-medium text-white/90">
              {item.question}
            </h3>
            <p className="mt-2 max-w-180 text-sm leading-relaxed text-white/50 sm:text-base">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    ),
  })

  return (
    <main className="min-h-screen overflow-hidden bg-[#0a0a0a] text-pretty text-white">
      <JsonLd
        data={{
          '@graph': [
            breadcrumbs([
              { name: 'Home', path: HOME },
              { name: guide.label, path },
            ]),
            {
              '@type': 'FAQPage',
              mainEntity: guide.faq.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer },
              })),
            },
          ],
        }}
      />

      <Wrapper>
        <nav className="flex h-20 items-center justify-between">
          <NavigationLink
            href={HOME}
            location="header"
            destination="home"
            className="flex items-center gap-3"
          >
            <OiPerLogoText className="text-[2rem]" />
          </NavigationLink>
          <AuthNavActions />
        </nav>
      </Wrapper>

      <section className="border-b border-white/6">
        <Wrapper
          maxWidth="48rem"
          className="flex flex-col items-center pt-14 pb-24 text-center sm:pt-24 sm:pb-32"
        >
          <h1 className="text-[clamp(2rem,8vw,4rem)] leading-[1.05] font-semibold tracking-[-0.04em]">
            {guide.heading}
          </h1>
          <p className="mt-6 text-[clamp(0.95rem,4vw,1.125rem)] leading-relaxed text-white/50">
            {guide.intro}
          </p>
          <div className="mt-10 flex flex-col items-center gap-5">
            {guide.platform ? (
              <NavigationLink
                href={`${DOWNLOAD_URL}?platform=${guide.platform}`}
                location="guide"
                destination="download"
                className={DOWNLOAD_CLASS_NAME}
              >
                <OSIcon os={guide.platform} className="size-5" />
                Download for {OS_LABELS[guide.platform]}
              </NavigationLink>
            ) : (
              <DownloadButton
                location="guide"
                className={DOWNLOAD_CLASS_NAME}
                iconClassName="size-5"
              />
            )}
            <NavigationLink
              href={DOCS_URL}
              location="guide"
              destination="docs"
              className="text-sm text-white/70 underline underline-offset-4 hover:text-white"
            >
              Read the docs
            </NavigationLink>
          </div>
        </Wrapper>
      </section>

      {blocks.map((block) => (
        <Section key={block.title} {...block} />
      ))}

      <FooterSection />
    </main>
  )
}
