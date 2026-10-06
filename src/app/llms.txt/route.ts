import { docsSource } from '@/features/docs/docs-source'
import { resourcesSource } from '@/features/docs/resources-source'
import { env } from '@/lib/env'

export const dynamic = 'force-static'

function link(page: ReturnType<typeof docsSource.getPages>[number]) {
  return `- [${page.data.title}](${env.SITE_URL}${page.url}): ${page.data.description}`
}

export function GET() {
  const body = [
    '# OiPer',
    '',
    '> OiPer is a desktop voice dictation app for Windows, macOS and Linux. Hold a global hotkey, speak, release, and the transcribed text is typed into whatever app has focus.',
    '',
    '- Transcription runs locally with Whisper models on your CPU or GPU by default; audio stays on your device.',
    "- Cloud transcription is optional: bring your own provider and API key, or use OiPer's hosted models on a paid plan.",
    '- Local transcription is free and unlimited.',
    '- Optional AI formatting cleans up, rewrites, or translates the transcript before it is inserted.',
    '- Dictionary, snippets, profiles, and history help tailor dictation to how you work.',
    '',
    '## Product',
    '',
    `- [Home](${env.SITE_URL}/): Features, privacy, languages, and pricing.`,
    `- [Download](${env.SITE_URL}/download): Installers for Windows, macOS (Apple Silicon and Intel) and Linux (AppImage, .deb, .rpm).`,
    `- [Changelog](${env.SITE_URL}/resources/changelog): Every desktop release, newest first.`,
    '',
    '## Documentation',
    '',
    ...docsSource.getPages().map(link),
    '',
    '## Policies',
    '',
    ...resourcesSource.getPages().map(link),
    '',
    '## Contact',
    '',
    '- Email: support@oiper.com',
    '- GitHub: https://github.com/OiPer/desktop',
    '',
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
