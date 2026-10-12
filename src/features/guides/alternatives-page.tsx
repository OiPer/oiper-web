import { OiPerLogoText } from '@/components/logo-text'
import { NavigationLink } from '@/components/navigation-link'
import { Wrapper } from '@/components/wrapper'
import { AuthNavActions } from '@/features/landing-page/components/auth-nav-actions'
import { FooterSection } from '@/features/landing-page/components/footer-section'
import { HOME } from '@/features/landing-page/constants/links'
import { GUIDES, type Guide } from './guides'

export const ALTERNATIVES_URL = '/alternatives'

export const ALTERNATIVES = Object.entries(GUIDES).filter(([path]) =>
  path.startsWith(`${ALTERNATIVES_URL}/`)
) as [string, Guide][]

export function AlternativesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0a0a0a] text-pretty text-white">
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
            OiPer compared with other dictation apps
          </h1>
          <p className="mt-6 text-[clamp(0.95rem,4vw,1.125rem)] leading-relaxed text-white/50">
            Honest, feature-by-feature comparisons with the dictation and speech
            to text apps people switch from, including where each one is the
            better fit.
          </p>
        </Wrapper>
      </section>

      <section className="border-b border-white/6 py-24 sm:py-32">
        <Wrapper>
          <h2 className="max-w-180 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
            Pick the app you use today
          </h2>
          <div className="mt-14 flex flex-col gap-10 sm:mt-16">
            {ALTERNATIVES.map(([path, guide]) => (
              <div key={path}>
                <h3 className="text-lg font-medium text-white/90">
                  <NavigationLink
                    href={path}
                    location="alternatives"
                    destination={guide.destination}
                    className="underline-offset-4 hover:underline"
                  >
                    {guide.heading}
                  </NavigationLink>
                </h3>
                <p className="mt-2 max-w-180 text-sm leading-relaxed text-white/50 sm:text-base">
                  {guide.description}
                </p>
              </div>
            ))}
          </div>
        </Wrapper>
      </section>

      <FooterSection />
    </main>
  )
}
