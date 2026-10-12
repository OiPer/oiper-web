'use client'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { logClick, logComplete, logError, logStart } from '@/lib/analytics'
import { cn } from '@/lib/utils'
import { Check, Copy, Download, Mic, Square, Upload } from 'lucide-react'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import type { WorkerRequest, WorkerResponse } from './transcribe-worker'

type Source = 'microphone' | 'file'
type Model = WorkerRequest['model']
type Status = 'idle' | 'recording' | 'loading' | 'transcribing'

const LOCATION = 'speech_to_text'

const MODELS: {
  value: Model
  name: string
  text: string
  gpu: string
  cpu: string
}[] = [
  {
    value: 'tiny',
    name: 'Whisper Tiny',
    text: 'Fastest, fine for clear speech',
    gpu: '~120 MB',
    cpu: '~40 MB',
  },
  {
    value: 'base',
    name: 'Whisper Base',
    text: 'Balanced speed and accuracy',
    gpu: '~205 MB',
    cpu: '~75 MB',
  },
  {
    value: 'small',
    name: 'Whisper Small',
    text: 'More accurate, handles accents better',
    gpu: '~585 MB',
    cpu: '~250 MB',
  },
  {
    value: 'large-v3-turbo',
    name: 'Whisper Large v3 Turbo',
    text: 'Most accurate, best on a fast computer',
    gpu: '~1.6 GB',
    cpu: '~1.1 GB',
  },
]

const ERRORS: Record<string, string> = {
  unsupported_browser:
    "Your browser can't run this tool. Try the latest Chrome, Edge, Firefox or Safari.",
  mic_permission_denied:
    'Microphone access was blocked. Allow it in your browser’s site settings and try again.',
  mic_not_found: 'No microphone was found. Plug one in or upload a file.',
  decode_failed:
    "We couldn't read the audio in that file. Try a different file or format (MP3, WAV, M4A, MP4, WebM).",
  no_audio: 'That recording has no audio. Try again and speak for a moment.',
  model_load_failed:
    "The speech model couldn't be downloaded. Check your connection and try again.",
  transcription_failed:
    'Transcription failed. Try again, or switch to Whisper Tiny.',
  unknown: 'Something went wrong. Please try again.',
}

function supported() {
  return (
    typeof Worker !== 'undefined' &&
    typeof WebAssembly !== 'undefined' &&
    typeof AudioContext !== 'undefined'
  )
}

async function decode(blob: Blob) {
  const context = new AudioContext({ sampleRate: 16000 })

  try {
    const buffer = await context.decodeAudioData(await blob.arrayBuffer())
    const audio = new Float32Array(buffer.length)

    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
      const data = buffer.getChannelData(channel)
      for (let i = 0; i < data.length; i++) {
        audio[i] += data[i] / buffer.numberOfChannels
      }
    }

    return audio
  } finally {
    await context.close()
  }
}

export function SpeechToTextTool() {
  const [status, setStatus] = useState<Status>('idle')
  const [progress, setProgress] = useState(0)
  const [model, setModel] = useState<Model>('base')
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [gpu, setGpu] = useState(false)

  const worker = useRef<Worker | null>(null)
  const recorder = useRef<MediaRecorder | null>(null)
  const run = useRef(0)

  useEffect(() => {
    const navigatorGpu = (
      navigator as Navigator & { gpu?: { requestAdapter(): Promise<unknown> } }
    ).gpu

    navigatorGpu
      ?.requestAdapter()
      .then((adapter) => setGpu(Boolean(adapter)))
      .catch(() => setGpu(false))
  }, [])

  useEffect(() => {
    return () => {
      worker.current?.terminate()
      recorder.current?.stream.getTracks().forEach((track) => track.stop())
    }
  }, [])

  const busy = status !== 'idle'
  const processing = status === 'loading' || status === 'transcribing'

  function cancel() {
    run.current++
    worker.current?.terminate()
    worker.current = null
    setStatus('idle')
  }

  function fail(source: Source, code: string) {
    setStatus('idle')
    setError(code)
    logError('transcription', LOCATION, { source, error_type: code })
  }

  async function transcribe(blob: Blob, source: Source) {
    const id = ++run.current

    setError('')
    setStatus('transcribing')

    let audio: Float32Array

    try {
      audio = await decode(blob)
    } catch {
      if (id !== run.current) return
      return fail(source, 'decode_failed')
    }

    if (id !== run.current) return

    if (audio.length === 0) return fail(source, 'no_audio')

    if (!worker.current) {
      worker.current = new Worker(
        new URL('./transcribe-worker.ts', import.meta.url),
        { type: 'module' }
      )
    }

    logStart('transcription', LOCATION, { source, model })
    setProgress(0)

    worker.current.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const message = event.data

      if (message.status === 'loading') {
        setStatus('loading')
        return setProgress(message.progress)
      }

      if (message.status === 'transcribing') return setStatus('transcribing')

      if (message.status === 'error') return fail(source, message.error)

      if (message.status === 'done') {
        setText(message.text)
        setStatus('idle')
        logComplete('transcription', LOCATION, {
          source,
          model,
          device: message.device,
        })
        return
      }

      throw new Error('Unknown worker message')
    }

    worker.current.onerror = () => fail(source, 'unknown')

    const request: WorkerRequest = { audio, model }
    worker.current.postMessage(request, [audio.buffer])
  }

  async function record() {
    if (processing) cancel()

    setError('')

    if (
      !supported() ||
      !navigator.mediaDevices?.getUserMedia ||
      typeof MediaRecorder === 'undefined'
    ) {
      return fail('microphone', 'unsupported_browser')
    }

    let stream: MediaStream

    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch (err) {
      const name = err instanceof DOMException ? err.name : ''
      if (name === 'NotAllowedError' || name === 'SecurityError') {
        return fail('microphone', 'mic_permission_denied')
      }
      if (name === 'NotFoundError') return fail('microphone', 'mic_not_found')
      return fail('microphone', 'unknown')
    }

    const parts: Blob[] = []
    const media = new MediaRecorder(stream)

    media.ondataavailable = (event) => parts.push(event.data)
    media.onstop = () => {
      stream.getTracks().forEach((track) => track.stop())
      recorder.current = null
      transcribe(new Blob(parts, { type: media.mimeType }), 'microphone')
    }

    recorder.current = media
    media.start()
    setStatus('recording')
  }

  function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return
    if (processing) cancel()
    if (!supported()) return fail('file', 'unsupported_browser')

    transcribe(file, 'file')
  }

  async function copy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    logClick('transcript_copy', LOCATION)
  }

  function download() {
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain' }))
    const link = document.createElement('a')

    link.href = url
    link.download = 'transcript.txt'
    link.click()
    URL.revokeObjectURL(url)

    logClick('transcript_download', LOCATION)
  }

  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/2 p-4 text-left sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          onClick={
            status === 'recording' ? () => recorder.current?.stop() : record
          }
        >
          {status === 'recording' ? (
            <Square className="fill-current" />
          ) : (
            <Mic />
          )}

          <span className="grid">
            <span
              className={cn(
                'col-start-1 row-start-1',
                status === 'recording' && 'invisible'
              )}
            >
              Record
            </span>
            <span
              className={cn(
                'col-start-1 row-start-1',
                status !== 'recording' && 'invisible'
              )}
            >
              Done
            </span>
          </span>
        </Button>

        <Button
          asChild
          variant="outline"
          className="cursor-pointer has-disabled:pointer-events-none has-disabled:opacity-50"
        >
          <label>
            <Upload />
            Upload file
            <input
              type="file"
              accept="audio/*,video/*"
              className="sr-only"
              disabled={status === 'recording'}
              onChange={upload}
            />
          </label>
        </Button>

        <Select
          value={model}
          disabled={busy}
          onValueChange={(value) => setModel(value as Model)}
        >
          <SelectTrigger aria-label="Model" className="ml-auto">
            <SelectValue>
              {MODELS.find((item) => item.value === model)?.name}
            </SelectValue>
          </SelectTrigger>
          <SelectContent position="popper" align="end" className="w-80">
            {MODELS.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className="py-2 [&>span:last-child]:flex-1"
              >
                <div className="flex w-full flex-col gap-0.5">
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground text-xs tabular-nums">
                      {gpu ? item.gpu : item.cpu}
                    </span>
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {item.text}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div aria-live="polite">
        {error && (
          <p role="alert" className="text-destructive mt-4 text-sm">
            {ERRORS[error] ?? ERRORS.unknown}
          </p>
        )}

        {status === 'loading' && (
          <div className="mt-4">
            <p className="text-muted-foreground text-sm">
              Downloading the speech model (first time only)…{' '}
              {Math.round(progress)}%
            </p>

            <Progress value={progress} className="mt-2 h-1" />
          </div>
        )}
      </div>

      <div className="border-input dark:bg-input/30 focus-within:border-ring focus-within:ring-ring/50 relative mt-4 overflow-hidden rounded-lg border focus-within:ring-[3px]">
        {processing && (
          <div className="pointer-events-none absolute inset-x-0 top-0 bottom-11 flex items-center justify-center">
            <Spinner className="text-muted-foreground size-6" />
          </div>
        )}

        <Textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={processing ? undefined : 'Your transcript appears here.'}
          aria-label="Transcript"
          readOnly={busy}
          tabIndex={busy ? -1 : undefined}
          className={cn(
            'max-h-[60vh] min-h-56 resize-none rounded-none border-0 bg-transparent p-4 text-base leading-relaxed shadow-none focus-visible:ring-0 md:text-base dark:bg-transparent',
            busy && 'pointer-events-none'
          )}
        />

        <div className="flex justify-end gap-1 border-t p-1.5">
          <Button variant="ghost" size="sm" disabled={!text} onClick={copy}>
            {copied ? <Check /> : <Copy />}
            {copied ? 'Copied' : 'Copy'}
          </Button>

          <Button variant="ghost" size="sm" disabled={!text} onClick={download}>
            <Download />
            Download
          </Button>
        </div>
      </div>
    </div>
  )
}
