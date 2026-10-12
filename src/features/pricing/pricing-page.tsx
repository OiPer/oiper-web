import { OiPerLogoText } from '@/components/logo-text'
import { NavigationLink } from '@/components/navigation-link'
import { Wrapper } from '@/components/wrapper'
import { AuthNavActions } from '@/features/landing-page/components/auth-nav-actions'
import { FooterSection } from '@/features/landing-page/components/footer-section'
import { PricingSection } from '@/features/landing-page/components/pricing-section'
import { HOME } from '@/features/landing-page/constants/links'
import type { components } from '@/lib/api/schema'

type PricingPlan = components['schemas']['PricingPlan']

export const PRICING_FAQ = [
  {
    question: 'Is OiPer free?',
    answer:
      'Yes. Local transcription on your own computer is free and unlimited on Windows, macOS and Linux, with no account and no word limit. Using your own API key is free in OiPer too; you only pay your provider.',
  },
  {
    question: 'What do the paid plans add?',
    answer:
      'Pro and Max add OiPer’s hosted speech and formatting models, so you get fast, accurate cloud transcription without setting up a provider or an API key. Pro includes 180 minutes of cloud transcription a day and Max is unlimited with fair use safeguards.',
  },
  {
    question: 'Can I use my own OpenAI or Groq API key instead of a plan?',
    answer:
      'Yes, on the free plan. Add a key for OpenAI, Groq, OpenRouter or any OpenAI-compatible endpoint, for transcription, formatting or both. Your provider bills you directly.',
  },
  {
    question: 'Do I need an account to use OiPer?',
    answer:
      'No. Download the app, pick a local model and start dictating. An account is only needed for OiPer’s hosted models on a paid plan.',
  },
  {
    question: 'Does the free plan work offline?',
    answer:
      'Yes. Local Whisper models run on your CPU or GPU, so dictation keeps working without an internet connection and your audio never leaves your device.',
  },
  {
    question: 'Can I mix free and paid modes?',
    answer:
      'Yes. Each profile has its own hotkey and transcription mode, so one shortcut can use a local model while another uses your API key or OiPer’s hosted models.',
  },
]

const MODES = [
  {
    title: 'Local',
    price: 'Free, unlimited',
    text: 'Whisper models from Tiny to Large v3 Turbo run on your own CPU or GPU. Works offline, no account, and audio never leaves your computer.',
  },
  {
    title: 'Your own API key',
    price: 'Free in OiPer, you pay your provider',
    text: 'Connect OpenAI, Groq, OpenRouter or any OpenAI-compatible endpoint for transcription and AI formatting. Keys are stored apart from your settings.',
  },
  {
    title: 'OiPer cloud',
    price: 'Pro and Max plans',
    text: 'Hosted speech and formatting models that are managed for you. No provider to set up and no key to manage, just sign in and dictate.',
  },
]

export function PricingPage(props: { plans: PricingPlan[] }) {
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
            OiPer pricing
          </h1>
          <p className="mt-6 text-[clamp(0.95rem,4vw,1.125rem)] leading-relaxed text-white/50">
            Dictation on your own computer is free and unlimited on Windows,
            macOS and Linux. Bring your own API key at no extra cost, or pick a
            plan for OiPer’s hosted models with nothing to set up.
          </p>
        </Wrapper>
      </section>

      <section className="border-b border-white/6 py-24 sm:py-32">
        <Wrapper>
          <h2 className="max-w-180 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
            Three ways to transcribe
          </h2>
          <p className="mt-5 max-w-180 text-base leading-relaxed text-white/50">
            Every plan includes the full app. What changes is where your speech
            is turned into text.
          </p>
          <div className="mt-14 flex flex-col gap-10 sm:mt-16">
            {MODES.map((mode) => (
              <div key={mode.title}>
                <h3 className="text-lg font-medium text-white/90">
                  {mode.title}
                  <span className="text-white/50"> · {mode.price}</span>
                </h3>
                <p className="mt-2 max-w-180 text-sm leading-relaxed text-white/50 sm:text-base">
                  {mode.text}
                </p>
              </div>
            ))}
          </div>
        </Wrapper>
      </section>

      <PricingSection plans={props.plans} location="pricing_page" />

      <section className="border-b border-white/6 py-24 sm:py-32">
        <Wrapper>
          <h2 className="max-w-180 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
            Questions, answered
          </h2>
          <div className="mt-14 flex flex-col gap-10 sm:mt-16">
            {PRICING_FAQ.map((item) => (
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
        </Wrapper>
      </section>

      <FooterSection />
    </main>
  )
}
