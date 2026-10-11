import { JsonLd } from '@/features/seo/json-ld'
import { logOpen } from '@/lib/analytics'
import { Minus, Plus } from 'lucide-react'
import { Wrapper } from '../../../components/wrapper'

const questions = [
  {
    id: 'offline',
    question: 'Does OiPer work offline?',
    answer:
      'Yes. In local mode, OiPer transcribes with a Whisper model downloaded to your computer, so dictation keeps working without an internet connection. Only the optional cloud and OiPer modes need to be online.',
  },
  {
    id: 'free',
    question: 'Is OiPer free?',
    answer:
      "Transcription on your machine is free and unlimited — no account required. Paid plans add OiPer's hosted transcription and formatting models for faster, more accurate results.",
  },
  {
    id: 'platforms',
    question: 'Which platforms does OiPer support?',
    answer:
      'OiPer runs on Windows, macOS (Apple Silicon and Intel) and Linux, with AppImage, .deb and .rpm packages.',
  },
  {
    id: 'audio_privacy',
    question: 'Does my audio leave my computer?',
    answer:
      "Not in local mode: audio, transcripts and history stay on your device. If you choose a cloud provider or OiPer's hosted models for a profile, that recording is sent to the service you picked to be transcribed.",
  },
  {
    id: 'apps',
    question: 'Which apps can I dictate into?',
    answer:
      'Any app where you can type. Hold your hotkey, speak, and release, and the text is inserted where your cursor is: email, documents, chat, browsers, and code editors.',
  },
  {
    id: 'hardware',
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
        <h2 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
          Questions, answered.
        </h2>
        <p className="mt-5 text-base leading-relaxed text-white/50">
          What people ask before they start dictating with OiPer.
        </p>

        <div className="mt-16 border-b border-white/6 sm:mt-20">
          {questions.map((item, index) => (
            <details
              key={item.question}
              open={index === 0}
              className="group border-t border-white/6"
            >
              <summary
                onClick={(event) => {
                  const isOpen =
                    event.currentTarget.parentElement?.hasAttribute('open')

                  if (!isOpen) logOpen('faq', 'faq', { question: item.id })
                }}
                className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-white/50 outline-none hover:text-white/90 focus-visible:ring-2 focus-visible:ring-white/30 [&::-webkit-details-marker]:hidden"
              >
                <h3 className="text-lg font-medium text-white/90">
                  {item.question}
                </h3>
                <Plus
                  className="size-5 shrink-0 group-open:hidden"
                  strokeWidth={1.5}
                />
                <Minus
                  className="hidden size-5 shrink-0 group-open:block"
                  strokeWidth={1.5}
                />
              </summary>
              <p className="max-w-180 pb-7 text-sm leading-relaxed text-white/50 sm:text-base">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Wrapper>
    </section>
  )
}
