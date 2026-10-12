import { OiPerLogoText } from '@/components/logo-text'
import { NavigationLink } from '@/components/navigation-link'
import { Wrapper } from '@/components/wrapper'
import { DownloadButton } from '@/features/download/download-button'
import { AuthNavActions } from '@/features/landing-page/components/auth-nav-actions'
import { FooterSection } from '@/features/landing-page/components/footer-section'
import { HOME } from '@/features/landing-page/constants/links'
import { ogCopy } from '@/features/seo/app-pages'
import { breadcrumbs, JsonLd, ORGANIZATION_ID } from '@/features/seo/json-ld'
import { env } from '@/lib/env'
import { joinUrl } from '@/lib/url'
import type { Metadata } from 'next'
import { SpeechToTextTool } from './speech-to-text-tool'

const PATH = '/tools/speech-to-text'
const TITLE = 'Free Speech to Text Online: Private, In-Browser | OiPer'
const DESCRIPTION =
  'Transcribe audio to text for free in your browser. Record your voice or upload an audio or video file. Whisper runs on your device, so audio never leaves it.'

export const speechToTextMetadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    url: PATH,
    siteName: 'OiPer',
    type: 'website',
    title: ogCopy(PATH).title,
    description: ogCopy(PATH).description,
  },
  twitter: {
    card: 'summary_large_image',
    title: ogCopy(PATH).title,
    description: ogCopy(PATH).description,
  },
}

const STEPS = [
  {
    title: 'Record or upload',
    text: 'Press "Record" and speak, then press "Done". Or upload an audio or video file: MP3, WAV, M4A, OGG, WebM, FLAC or MP4 all work in modern browsers.',
  },
  {
    title: 'Let Whisper transcribe it',
    text: 'The first time, your browser downloads the open-source Whisper model and caches it, so later visits start right away. Whisper detects the language on its own and works through long recordings in 30-second pieces.',
  },
  {
    title: 'Copy or download the text',
    text: 'Fix anything in the text box if you need to, then copy the transcript or save it as a .txt file.',
  },
]

const DESKTOP_FEATURES = [
  {
    title: 'Types into any app',
    text: 'Hold your hotkey, speak, and release. The text appears where your cursor is: email, docs, chat, browsers and code editors.',
  },
  {
    title: 'Free and unlimited on your computer',
    text: 'Local Whisper transcription costs nothing and needs no account. Audio, transcripts and history stay on your device.',
  },
  {
    title: 'Bigger models, faster on your GPU',
    text: 'Pick larger Whisper models for better accuracy. OiPer uses your GPU when you have one and runs on Windows, macOS and Linux.',
  },
]

const FAQ = [
  {
    question: 'Is this speech to text tool really free?',
    answer:
      'Yes. There is no account, no watermark and no limit on how often you use it. Transcription runs on your own device, so there is no server cost to pass on to you.',
  },
  {
    question: 'Is my audio uploaded anywhere?',
    answer:
      'No. Your recording or file is processed inside your browser and never leaves your device. The only download is the Whisper model itself, fetched once from Hugging Face and cached by your browser.',
  },
  {
    question: 'Which audio and video formats can I transcribe?',
    answer:
      'Anything your browser can play: MP3, WAV, M4A, AAC, OGG, WebM and FLAC, plus the audio track of most MP4 and MOV videos. If a file will not open, convert it to MP3 or WAV and try again.',
  },
  {
    question: 'Which languages does it support?',
    answer:
      'Whisper understands around 99 languages and detects the spoken language automatically. Accuracy is best for English and other widely spoken languages, and larger models are more accurate: Whisper Large v3 Turbo is the most accurate, Whisper Tiny the fastest.',
  },
  {
    question: 'How long can a recording be?',
    answer:
      'There is no fixed limit. Long audio is transcribed in 30-second pieces. Speed depends on your device: browsers with WebGPU run much faster, while on CPU an hour of audio can take a long time.',
  },
  {
    question: 'How is this different from the OiPer desktop app?',
    answer:
      'This page transcribes one recording or file at a time. The OiPer app works system-wide: hold a hotkey, speak, and the text is typed into whatever app you are using on Windows, macOS or Linux, with larger Whisper models and GPU acceleration, free and unlimited.',
  },
]

const H2_CLASS_NAME = 'text-3xl font-semibold tracking-[-0.03em] sm:text-5xl'
const H3_CLASS_NAME = 'text-lg font-medium text-white/90'
const TEXT_CLASS_NAME =
  'mt-2 max-w-180 text-sm leading-relaxed text-white/50 sm:text-base'

export function SpeechToTextPage() {
  const url = joinUrl(env.BASE_URL, PATH)

  return (
    <main className="min-h-screen overflow-hidden bg-[#0a0a0a] text-pretty text-white">
      <JsonLd
        data={{
          '@graph': [
            {
              '@type': 'WebApplication',
              name: 'OiPer Speech to Text',
              url,
              description: DESCRIPTION,
              applicationCategory: 'MultimediaApplication',
              operatingSystem: 'Any (web browser)',
              browserRequirements: 'Requires JavaScript and WebAssembly',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              publisher: { '@id': ORGANIZATION_ID },
            },
            breadcrumbs([
              { name: 'Home', path: HOME },
              { name: 'Speech to text', path: PATH },
            ]),
            {
              '@type': 'FAQPage',
              mainEntity: FAQ.map((item) => ({
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
            Free speech to text, right in your browser
          </h1>
          <p className="mt-6 text-[clamp(0.95rem,4vw,1.125rem)] leading-relaxed text-white/50">
            Turn your voice, voice notes and recordings into text with the
            open-source Whisper model running on your own device. No sign-up, no
            uploads, no limits.
          </p>

          <div className="mt-12 w-full">
            <SpeechToTextTool />
          </div>

          <p className="mt-6 text-sm leading-relaxed text-white/40">
            Your audio never leaves your browser. Only the Whisper model files
            are downloaded from Hugging Face, once, and cached on your device.
          </p>
        </Wrapper>
      </section>

      <section className="border-b border-white/6 py-24 sm:py-32">
        <Wrapper>
          <h2 className={`max-w-180 ${H2_CLASS_NAME}`}>
            How to transcribe audio to text
          </h2>
          <p className="mt-5 max-w-180 text-base leading-relaxed text-white/50">
            Voice to text in three steps, for a quick voice memo, an interview
            or a lecture recording.
          </p>
          <ol className="mt-14 flex flex-col gap-10 sm:mt-16">
            {STEPS.map((step, index) => (
              <li key={step.title}>
                <h3 className={H3_CLASS_NAME}>
                  {index + 1}. {step.title}
                </h3>
                <p className={TEXT_CLASS_NAME}>{step.text}</p>
              </li>
            ))}
          </ol>
        </Wrapper>
      </section>

      <section className="border-b border-white/6 py-24 sm:py-32">
        <Wrapper>
          <h2 className={`max-w-180 ${H2_CLASS_NAME}`}>
            Want this in every app?
          </h2>
          <p className="mt-5 max-w-180 text-base leading-relaxed text-white/50">
            This page is great for a single recording. If you’d rather talk than
            type all day, OiPer is a free desktop app that turns speech into
            text wherever you’re writing.
          </p>
          <div className="mt-14 flex flex-col gap-10 sm:mt-16">
            {DESKTOP_FEATURES.map((item) => (
              <div key={item.title}>
                <h3 className={H3_CLASS_NAME}>{item.title}</h3>
                <p className={TEXT_CLASS_NAME}>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-14">
            <DownloadButton
              location="speech_to_text"
              className="inline-flex h-12 items-center gap-2.5 rounded-md bg-white px-7 text-base font-medium text-[#0a0a0a] hover:bg-white/90"
              iconClassName="size-5"
            />
          </div>
        </Wrapper>
      </section>

      <section className="border-b border-white/6 py-24 sm:py-32">
        <Wrapper>
          <h2 className={`max-w-180 ${H2_CLASS_NAME}`}>Questions, answered</h2>
          <p className="mt-5 max-w-180 text-base leading-relaxed text-white/50">
            What people ask before they transcribe audio in the browser.
          </p>
          <div className="mt-14 flex flex-col gap-10 sm:mt-16">
            {FAQ.map((item) => (
              <div key={item.question}>
                <h3 className={H3_CLASS_NAME}>{item.question}</h3>
                <p className={TEXT_CLASS_NAME}>{item.answer}</p>
              </div>
            ))}
          </div>
        </Wrapper>
      </section>

      <FooterSection />
    </main>
  )
}
