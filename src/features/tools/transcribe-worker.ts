import {
  ModelRegistry,
  pipeline,
  Tensor,
  type AutomaticSpeechRecognitionOutput,
  type AutomaticSpeechRecognitionPipeline,
} from '@huggingface/transformers'

export type WorkerRequest = {
  audio: Float32Array
  model: 'tiny' | 'base' | 'small' | 'large-v3-turbo'
}

export type WorkerResponse =
  | { status: 'loading'; progress: number }
  | { status: 'transcribing' }
  | { status: 'done'; text: string; device: 'webgpu' | 'wasm' }
  | { status: 'error'; error: string }

const SAMPLE_RATE = 16000
const CHUNK_S = 30
const STRIDE_S = 5

let current: {
  model: string
  device: 'webgpu' | 'wasm'
  pipe: AutomaticSpeechRecognitionPipeline
} | null = null

function post(message: WorkerResponse) {
  self.postMessage(message)
}

async function hasWebGPU() {
  const gpu = (
    navigator as Navigator & { gpu?: { requestAdapter(): Promise<unknown> } }
  ).gpu

  if (!gpu) return false

  try {
    return Boolean(await gpu.requestAdapter())
  } catch {
    return false
  }
}

async function create(model: string, device: 'webgpu' | 'wasm') {
  const id = `onnx-community/whisper-${model}`
  const dtype =
    device === 'webgpu'
      ? {
          encoder_model:
            model === 'large-v3-turbo' ? ('fp16' as const) : ('fp32' as const),
          decoder_model_merged: 'q4' as const,
        }
      : 'q8'

  const cached = await ModelRegistry.is_pipeline_cached(
    'automatic-speech-recognition',
    id,
    { device, dtype }
  )

  return await pipeline('automatic-speech-recognition', id, {
    device,
    dtype,
    progress_callback: (info) => {
      if (!cached && info.status === 'progress_total') {
        post({ status: 'loading', progress: info.progress })
      }
    },
  })
}

async function detect(
  pipe: AutomaticSpeechRecognitionPipeline,
  audio: Float32Array
) {
  const config = pipe.model.generation_config as unknown as {
    decoder_start_token_id: number
    lang_to_id: Record<string, number>
  }

  const { input_features: features } = await pipe.processor(
    audio.subarray(0, CHUNK_S * SAMPLE_RATE)
  )

  const { logits } = await pipe.model({
    input_features: features,
    decoder_input_ids: new Tensor(
      'int64',
      [BigInt(config.decoder_start_token_id)],
      [1, 1]
    ),
  })

  const scores = logits.data as Float32Array
  const [token] = Object.entries(config.lang_to_id).reduce((best, entry) =>
    scores[entry[1]] > scores[best[1]] ? entry : best
  )

  return token.slice(2, -2)
}

async function load(model: string) {
  if (current?.model === model) return current

  await current?.pipe.dispose()
  current = null

  let device: 'webgpu' | 'wasm' = (await hasWebGPU()) ? 'webgpu' : 'wasm'
  let pipe: AutomaticSpeechRecognitionPipeline

  try {
    pipe = await create(model, device)
  } catch (error) {
    if (device === 'wasm') throw error
    device = 'wasm'
    pipe = await create(model, device)
  }

  current = { model, device, pipe }
  return current
}

self.onmessage = async (event: MessageEvent<WorkerRequest>) => {
  const { audio, model } = event.data

  let loaded: Awaited<ReturnType<typeof load>>

  try {
    loaded = await load(model)
  } catch {
    return post({ status: 'error', error: 'model_load_failed' })
  }

  post({ status: 'transcribing' })

  try {
    const output = (await loaded.pipe(audio, {
      task: 'transcribe',
      language: await detect(loaded.pipe, audio),
      chunk_length_s: CHUNK_S,
      stride_length_s: STRIDE_S,
    })) as AutomaticSpeechRecognitionOutput

    post({ status: 'done', text: output.text.trim(), device: loaded.device })
  } catch {
    post({ status: 'error', error: 'transcription_failed' })
  }
}
