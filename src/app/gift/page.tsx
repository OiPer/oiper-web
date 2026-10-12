import { OiPerLogoText } from '@/components/logo-text'
import { NavigationLink } from '@/components/navigation-link'
import { Wrapper } from '@/components/wrapper'
import { GiftPage } from '@/features/gifts/gift-page'
import { AuthNavActions } from '@/features/landing-page/components/auth-nav-actions'
import { FooterSection } from '@/features/landing-page/components/footer-section'
import { HOME } from '@/features/landing-page/constants/links'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your gift',
  description: 'A gift of OiPer from the founders.',
  robots: { index: false, follow: false },
}

export default function GiftRoute() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0a0a0a] text-white">
      <Wrapper className="relative z-10">
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

      <GiftPage />

      <FooterSection />
    </main>
  )
}
