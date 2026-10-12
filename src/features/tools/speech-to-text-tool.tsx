'use client'

import { logClick, logComplete, logError, logStart } from '@/lib/analytics'
import { Check, Copy, Download, Mic, Square, Upload } from 'lucide-react'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import type { WorkerRequest, WorkerResponse } from './transcribe-worker'

type Source = 'microphone' | 'file'
type Model = WorkerRequest['model']
type Status = 'idle' | 'recording' | 'decoding' | 'loading' | 'transcribing'

const LOCATION = 'speech_to_text'

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
    'Transcription failed. Try again, or switch to the Tiny model.',
  unknown: 'Something went wrong. Please try again.',
}

const BUTTON_CLASS_NAME =
  'inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40'

const PRIMARY_CLASS_NAME = `${BUTTON_CLASS_NAME} bg-white text-[#0a0a0a] hover:bg-white/90`

const SECONDARY_CLASS_NAME = `${BUTTON_CLASS_NAME} border border-white/10 text-white/80 hover:bg-white/5`

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

  const worker = useRef<Worker | null>(null)
  const recorder = useRef<MediaRecorder | null>(null)

  useEffect(() => {
    return () => {
      worker.current?.terminate()
      recorder.current?.stream.getTracks().forEach((track) => track.stop())
    }
  }, [])

  const busy = status !== 'idle'

  function fail(source: Source, code: string) {
    setStatus('idle')
    setError(code)
    logError('transcription', LOCATION, { source, error_type: code })
  }

  async function transcribe(blob: Blob, source: Source) {
    setError('')
    setStatus('decoding')

    let audio: Float32Array

    try {
      audio = await decode(blob)
    } catch {
      return fail(source, 'decode_failed')
    }

    if (audio.length === 0) return fail(source, 'no_audio')

    if (!worker.current) {
      worker.current = new Worker(
        new URL('./transcribe-worker.ts', import.meta.url),
        { type: 'module' }
      )
    }

    logStart('transcription', LOCATION, { source, model })
    setProgress(0)
    setStatus('loading')

    worker.current.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const message = event.data

      if (message.status === 'loading' || message.status === 'transcribing') {
        setStatus(message.status)
        return setProgress(message.progress)
      }

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

  const label = {
    idle: '',
    recording: 'Recording… press Stop when you’re done.',
    decoding: 'Reading audio…',
    loading: `Downloading the speech model (first time only)… ${Math.round(progress)}%`,
    transcribing: `Transcribing… ${Math.round(progress)}%`,
  }[status]

  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/2 p-5 text-left sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {status === 'recording' ? (
          <button
            type="button"
            className={PRIMARY_CLASS_NAME}
            onClick={() => recorder.current?.stop()}
          >
            <Square className="size-4 fill-current" aria-hidden="true" />
            Stop recording
          </button>
        ) : (
          <button
            type="button"
            className={PRIMARY_CLASS_NAME}
            disabled={busy}
            onClick={record}
          >
            <Mic className="size-4" aria-hidden="true" />
            Record from microphone
          </button>
        )}

        <label
          className={`${SECONDARY_CLASS_NAME} cursor-pointer has-disabled:cursor-not-allowed has-disabled:opacity-40`}
        >
          <Upload className="size-4" aria-hidden="true" />
          Upload audio or video
          <input
            type="file"
            accept="audio/*,video/*"
            className="sr-only"
            disabled={busy}
            onChange={upload}
          />
        </label>

        <label className="flex items-center gap-2 text-sm text-white/50 sm:ml-auto">
          Model
          <select
            value={model}
            disabled={busy}
            onChange={(event) => setModel(event.target.value as Model)}
            className="h-11 rounded-md border border-white/10 bg-[#0a0a0a] px-3 text-white/80 disabled:opacity-40"
          >
            <option value="base">Base (more accurate)</option>
            <option value="tiny">Tiny (faster)</option>
          </select>
        </label>
      </div>

      <div className="mt-5 min-h-6" aria-live="polite">
        {error && (
          <p role="alert" className="text-sm text-red-400">
            {ERRORS[error] ?? ERRORS.unknown}
          </p>
        )}
        {!error && busy && (
          <div>
            <p className="text-sm text-white/70">{label}</p>
            {(status === 'loading' || status === 'transcribing') && (
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-white"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Your transcript appears here."
        aria-label="Transcript"
        rows={8}
        className="mt-4 w-full resize-y rounded-md border border-white/10 bg-[#0a0a0a] p-4 text-base leading-relaxed text-white/90 placeholder:text-white/30 focus:border-white/30 focus:outline-none"
      />

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          className={SECONDARY_CLASS_NAME}
          disabled={!text}
          onClick={copy}
        >
          {copied ? (
            <Check className="size-4" aria-hidden="true" />
          ) : (
            <Copy className="size-4" aria-hidden="true" />
          )}
          {copied ? 'Copied' : 'Copy'}
        </button>
        <button
          type="button"
          className={SECONDARY_CLASS_NAME}
          disabled={!text}
          onClick={download}
        >
          <Download className="size-4" aria-hidden="true" />
          Download .txt
        </button>
      </div>
    </div>
  )
}
