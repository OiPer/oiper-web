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
      toast.success("You're on the list. We'll email you about new releases.")
    } catch (error) {
      logError('email_subscribe', props.location, {
        error_type: isAppErrorEnvelope(error) ? error.error.code : 'unknown',
      })

      toast.error("Couldn't subscribe. Please check the email and try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-100">
      <label
        htmlFor={`subscribe-email-${props.location}`}
        className="text-sm font-medium text-white/60"
      >
        Get release updates
      </label>
      <p className="mt-1 text-sm text-white/35">
        One short email for every new version. No spam.
      </p>

      <div className="mt-4 flex gap-2">
        <Input
          id={`subscribe-email-${props.location}`}
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={subscribeMutation.isPending}
          className="h-11 border-white/10 bg-white/3 text-white placeholder:text-white/25"
        />
        <Button
          type="submit"
          disabled={subscribeMutation.isPending}
          className="h-11 rounded bg-white px-5 text-[#0a0a0a] hover:bg-white/90"
        >
          <Loading loading={subscribeMutation.isPending}>Subscribe</Loading>
        </Button>
      </div>
    </form>
  )
}
