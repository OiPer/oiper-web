import { JsonLd } from '@/features/seo/json-ld'
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
      className="relative overflow-hidden border-b border-white/6 bg-[#0a0a0a] py-32 sm:py-40"
    >
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
        <div className="max-w-130">
          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
            Questions, answered.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/40">
            What people ask before they start dictating with OiPer.
          </p>
        </div>

        <div className="mt-16 grid gap-x-16 gap-y-12 sm:mt-20 lg:grid-cols-2">
          {questions.map((item) => (
            <div key={item.question} className="border-t border-white/6 pt-8">
              <h3 className="text-lg font-medium text-white/90">
                {item.question}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/40 sm:text-base">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  )
}
