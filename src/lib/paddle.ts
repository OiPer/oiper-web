import { env } from '@/lib/env'
import {
  CheckoutEventNames,
  initializePaddle,
  type Paddle,
} from '@paddle/paddle-js'

let paddlePromise: Promise<Paddle | undefined> | null = null

export function getPaddleClient(): Promise<Paddle | undefined> {
  paddlePromise ??= initializePaddle({
    token: env.PADDLE_CLIENT_TOKEN,
    environment: env.PADDLE_ENVIRONMENT,
  })

  return paddlePromise
}

export async function openPaddleCheckout(
  transactionId: string,
  email: string | undefined,
  onCompleted: () => void
): Promise<void> {
  const paddle = await getPaddleClient()
  if (!paddle) throw new Error('Paddle failed to initialize')

  paddle.Update({
    eventCallback: (event) => {
      if (event.name === CheckoutEventNames.CHECKOUT_COMPLETED) onCompleted()
    },
  })

  paddle.Checkout.open({
    transactionId,
    ...(email ? { customer: { email } } : {}),
  })
}
