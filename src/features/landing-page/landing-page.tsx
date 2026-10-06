'use client'

import type { components } from '@/lib/api/schema'
import { Suspense } from 'react'
import { FeaturesSection } from './components/features-section'
import { FooterSection } from './components/footer-section'
import { HeroSection } from './components/hero-section'
import { LanguagesSection } from './components/languages-section'
import { PerformanceSection } from './components/performance-section'
import { PricingSection } from './components/pricing-section'
import { PrivacySection } from './components/privacy-section'
import { TestimonialsSection } from './components/testimonials-section'

export function LandingPage(props: {
  plans: components['schemas']['PricingPlan'][]
}) {
  return (
    <main
      suppressHydrationWarning
      className="min-h-screen overflow-hidden bg-[#0a0a0a] text-white"
    >
      <HeroSection />
      <FeaturesSection />
      <PerformanceSection />
      <TestimonialsSection />
      <LanguagesSection />
      <PrivacySection />
      <Suspense fallback={null}>
        <PricingSection plans={props.plans} />
      </Suspense>
      <FooterSection />
    </main>
  )
}
