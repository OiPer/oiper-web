'use client'

import { Loading } from '@/components/shared/loading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { logComplete, logError, logSubmit } from '@/lib/analytics'
import { $api } from '@/lib/api/client'
import { isAppErrorEnvelope } from '@/lib/api/error'
import { useState } from 'react'
import { toast } from 'sonner'

export function SubscribeForm(props: { location: string }) {
  const [email, setEmail] = useState('')
  const [focused, setFocused] = useState(false)
  const subscribeMutation = $api.useMutation(
    'post',
    '/v1/notifications/subscribe'
  )

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    logSubmit('email_subscribe', props.location)

    try {
      await subscribeMutation.mutateAsync({
        body: { email, topic: 'product-releases' },
      })

      logComplete('email_subscribe', props.location)
      setEmail('')
      toast.success("You're subscribed to OiPer updates")
    } catch (error) {
      logError('email_subscribe', props.location, {
        error_type: isAppErrorEnvelope(error) ? error.error.code : 'unknown',
      })

      toast.error("Couldn't subscribe, please try again")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-0 min-w-full">
      <div className="relative">
        <Input
          id={`subscribe-email-${props.location}`}
          type="email"
          required
          autoComplete="email"
          aria-label="Email address"
          placeholder={focused ? 'you@example.com' : 'Stay Connected'}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={subscribeMutation.isPending}
          className="h-13 rounded-md border-white/10 bg-white/3 pr-28 text-white placeholder:text-white/25"
        />

        <Button
          type="submit"
          disabled={subscribeMutation.isPending}
          className="absolute inset-y-1 right-1 h-auto rounded-md bg-white/5 px-4 text-sm font-medium text-white hover:bg-white/10"
        >
          <Loading loading={subscribeMutation.isPending}>Subscribe</Loading>
        </Button>
      </div>
    </form>
  )
}
