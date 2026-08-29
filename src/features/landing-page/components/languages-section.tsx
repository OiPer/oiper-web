'use client'

import { useState } from 'react'
import { Wrapper } from '../../../components/wrapper'
import { GlobeCanvas } from './globe-canvas'

const languages = [
  { name: 'English', native: 'English', code: 'gb' },
  { name: 'Spanish', native: 'Español', code: 'es' },
  { name: 'French', native: 'Français', code: 'fr' },
  { name: 'German', native: 'Deutsch', code: 'de' },
  { name: 'Italian', native: 'Italiano', code: 'it' },
  { name: 'Portuguese', native: 'Português', code: 'pt' },
  { name: 'Dutch', native: 'Nederlands', code: 'nl' },
  { name: 'Japanese', native: '日本語', code: 'jp' },
  { name: 'Chinese', native: '中文', code: 'cn' },
  { name: 'Korean', native: '한국어', code: 'kr' },
  { name: 'Russian', native: 'Русский', code: 'ru' },
  { name: 'Arabic', native: 'العربية', code: 'sa' },
  { name: 'Hindi', native: 'हिन्दी', code: 'in' },
  { name: 'Turkish', native: 'Türkçe', code: 'tr' },
  { name: 'Polish', native: 'Polski', code: 'pl' },
  { name: 'Swedish', native: 'Svenska', code: 'se' },
]

export function LanguagesSection() {
  const [globeReady, setGlobeReady] = useState(false)

  return (
    <section
      id="languages"
      className="relative overflow-hidden border-b border-white/[0.06] bg-[#0a0a0a] py-32 sm:py-40"
    >
      <div
        className={`pointer-events-none absolute top-1/2 right-0 hidden size-[520px] translate-x-1/4 -translate-y-1/2 overflow-hidden rounded-full shadow-[0_0_80px_rgba(255,255,255,0.04),inset_0_0_40px_rgba(0,0,0,0.8)] transition-opacity duration-700 ease-out select-none lg:block ${
          globeReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <GlobeCanvas onReady={() => setGlobeReady(true)} />
      </div>

      <Wrapper className="relative">
        <div className="max-w-130">
          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
            Speak your language.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/40">
            Transcribe in the language you are most comfortable with. More
            languages are added regularly.
          </p>
        </div>

        <div className="mt-16 h-px w-full bg-gradient-to-r from-white/[0.1] via-white/[0.04] to-transparent sm:mt-20" />

        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:mt-16 lg:grid-cols-4">
          {languages.map((language) => (
            <div key={language.name} className="flex items-center gap-3">
              <div className="relative h-4 w-6 shrink-0 overflow-hidden">
                <img
                  src={`https://flagcdn.com/${language.code}.svg`}
                  alt={language.name}
                  className="absolute inset-0 size-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-medium tracking-tight text-white">
                  {language.native}
                </span>
                <span className="text-xs text-white/30">{language.name}</span>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  )
}
