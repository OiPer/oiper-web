import { JsonLd } from '@/features/seo/json-ld'
import { Plus } from 'lucide-react'
import { Wrapper } from '../../../components/wrapper'

const questions = [
  {
    question: 'Does OiPer work offline?',
    answer:
      'Yes. In local mode, OiPer transcribes with a Whisper model downloaded to your computer, so dictation keeps working without an internet connection. Only the optional cloud and OiPer modes need to be online.',
  },
  {
    question: 'Is OiPer free?',
    answer:
      "Local transcription is free and unlimited, with no account required. Paid plans add OiPer's hosted transcription and formatting models for faster, more accurate results.",
  },
  {
    question: 'Which platforms does OiPer support?',
    answer:
      'OiPer runs on Windows, macOS (Apple Silicon and Intel) and Linux, with AppImage, .deb and .rpm packages.',
  },
  {
    question: 'Does my audio leave my computer?',
    answer:
      "Not in local mode: audio, transcripts and history stay on your device. If you choose a cloud provider or OiPer's hosted models for a profile, that recording is sent to the service you picked to be transcribed.",
  },
  {
    question: 'Which apps can I dictate into?',
    answer:
      'Any app where you can type. Hold your hotkey, speak, and release, and the text is inserted where your cursor is: email, documents, chat, browsers, and code editors.',
  },
  {
    question: 'Does it need a powerful computer?',
    answer:
      'No. Local models run on the CPU of any supported computer and use the GPU automatically when one is available. Smaller models like Base are fast on everyday hardware, while larger ones trade speed for accuracy.',
  },
]

export function FaqSection() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden border-b border-white/6 bg-[#0c0c0c] py-32 sm:py-40"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(255,255,255,0.03),transparent_50%)]" />
      </div>

      <JsonLd
        data={{
          '@type': 'FAQPage',
          mainEntity: questions.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }}
      />

      <Wrapper className="relative">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-24">
          <div>
            <h2 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
              Questions, answered.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/50">
              What people ask before they start dictating with OiPer.
            </p>
          </div>

          <div className="border-b border-white/6">
            {questions.map((item, index) => (
              <details
                key={item.question}
                open={index === 0}
                className="group border-t border-white/6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 outline-none focus-visible:ring-2 focus-visible:ring-white/30 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg font-medium text-white/90">
                    {item.question}
                  </h3>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/50 transition-transform duration-200 group-open:rotate-45 group-hover:border-white/20 group-hover:text-white/80">
                    <Plus className="size-4" strokeWidth={1.5} />
                  </span>
                </summary>
                <p className="max-w-160 pb-7 text-sm leading-relaxed text-white/50 sm:text-base">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Wrapper>
    </section>
  )
}
