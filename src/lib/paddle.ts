import { initializePaddle, type Paddle } from '@paddle/paddle-js'

const NEXT_PUBLIC_PADDLE_CLIENT_TOKEN =
  process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN?.trim()
const NEXT_PUBLIC_PADDLE_ENVIRONMENT =
  process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT?.trim() === 'production'
    ? 'production'
    : 'sandbox'

let paddlePromise: Promise<Paddle | undefined> | null = null

export function getPaddleClient(): Promise<Paddle | undefined> {
  if (!NEXT_PUBLIC_PADDLE_CLIENT_TOKEN) {
    throw new Error('NEXT_PUBLIC_PADDLE_CLIENT_TOKEN is not configured')
  }

  paddlePromise ??= initializePaddle({
    token: NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
    environment: NEXT_PUBLIC_PADDLE_ENVIRONMENT,
  })

  return paddlePromise
}

export async function openPaddleCheckout(
  transactionId: string,
  email?: string
): Promise<void> {
  const paddle = await getPaddleClient()
  if (!paddle) {
    throw new Error('Paddle failed to initialize')
  }

  paddle.Checkout.open({
    transactionId,
    ...(email ? { customer: { email } } : {}),
  })
}
