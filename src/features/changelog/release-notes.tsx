import Markdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

const NOTE_COMPONENTS: Components = {
  h1: 'h3',
  h2: 'h3',
  h3: 'h4',
  h4: 'h5',
  h5: 'h6',
  h6: 'h6',
}

interface ReleaseNotesProps {
  notes: string
}

export function ReleaseNotes({ notes }: ReleaseNotesProps) {
  return (
    <Markdown remarkPlugins={[remarkGfm]} components={NOTE_COMPONENTS}>
      {notes}
    </Markdown>
  )
}
