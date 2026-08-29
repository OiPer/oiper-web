'use client'

import { Quote } from 'lucide-react'
import { Wrapper } from '../../../components/wrapper'

const testimonials = [
  {
    quote:
      'OiPer replaced three separate tools I was using. The local transcription is incredibly accurate and feels instant.',
    author: 'Sarah Chen',
    role: 'Product Manager',
    initials: 'SC',
  },
  {
    quote:
      'I write thousands of words a day. Being able to dictate privately without sending audio to the cloud is a game changer.',
    author: 'Marcus Okafor',
    role: 'Technical Writer',
    initials: 'MO',
  },
  {
    quote:
      'The hotkey workflow is seamless. I hold a key, speak, and my words appear exactly where my cursor is. Zero friction.',
    author: 'Elena Rossi',
    role: 'Software Engineer',
    initials: 'ER',
  },
]

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative border-b border-white/[0.06] bg-[#0c0c0c] py-32 sm:py-40"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.03),transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 h-150 w-225 -translate-x-1/2 -translate-y-1/3 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02),transparent_70%)]" />
      </div>

      <Wrapper className="relative">
        <div className="mx-auto max-w-140 text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
            Loved by users.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/40">
            Here is what people are saying about using OiPer every day.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 sm:p-10"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
              <Quote
                className="absolute top-6 right-6 size-24 text-white/[0.03]"
                strokeWidth={1}
              />

              <p className="relative text-lg leading-relaxed text-white/80">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="relative mt-8 h-px bg-gradient-to-r from-white/[0.08] to-transparent" />

              <div className="relative mt-6 flex items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-xs font-medium text-white/50">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-white/90">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-white/35">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  )
}
