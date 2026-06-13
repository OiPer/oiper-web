'use client'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import {
  confirmWebPasswordReset,
  requestWebPasswordReset,
} from '@/lib/auth-api'
import { wrap } from '@/utils/promise'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { AuthCard } from './auth-card'
import { AuthInput, AuthPasswordInput } from './auth-form-input'
import { buildAuthUrl } from './auth-form-utils'
import { getAuthErrorMessage } from './workos-auth-error'

const requestResetSchema = z.object({
  email: z.string().trim().email('Enter a valid email address'),
})

const resetWithTokenSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .superRefine((values, context) => {
    if (values.confirmPassword && values.password !== values.confirmPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })

type ForgotPasswordFormProps = {
  mode: 'modal' | 'page'
}

export function ForgotPasswordForm({ mode }: ForgotPasswordFormProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const currentSearch = new URLSearchParams(searchParams.toString())

  const requestResetForm = useForm<z.infer<typeof requestResetSchema>>({
    resolver: zodResolver(requestResetSchema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const resetWithTokenForm = useForm<z.infer<typeof resetWithTokenSchema>>({
    resolver: zodResolver(resetWithTokenSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const token = searchParams.get('token')

  function goToSignIn() {
    router.push(
      buildAuthUrl({
        mode,
        pathname,
        searchParams: currentSearch,
        page: 'signin',
      })
    )
  }

  async function submitResetRequest(
    values: z.infer<typeof requestResetSchema>
  ) {
    setErrorMessage(null)

    await wrap(requestWebPasswordReset({ email: values.email }), {
      onError: (error) => setErrorMessage(getAuthErrorMessage(error)),
      onSuccess: () => toast.success('Password reset email sent'),
    })
  }

  async function submitPasswordReset(
    values: z.infer<typeof resetWithTokenSchema>
  ) {
    if (!token) return setErrorMessage('Missing reset token')
    setErrorMessage(null)

    await wrap(
      confirmWebPasswordReset({
        token,
        newPassword: values.password,
      }),
      {
        onError: (error) => setErrorMessage(getAuthErrorMessage(error)),
        onSuccess: () => {
          toast.success('Password updated, redirecting to sign in')
          window.setTimeout(() => goToSignIn(), 600)
        },
      }
    )
  }

  return (
    <AuthCard
      mode={mode}
      showOAuth={false}
      page="forgot-password"
      title={token ? 'Set new password' : 'Reset password'}
      description={
        token
          ? 'Create a new password for your account.'
          : 'We will send a reset link to your email address.'
      }
    >
      {!token ? (
        <form
          onSubmit={requestResetForm.handleSubmit(submitResetRequest)}
          className="flex flex-col gap-4"
        >
          <AuthInput
            type="email"
            label="Email"
            autoComplete="email"
            {...requestResetForm.register('email')}
            error={requestResetForm.formState.errors.email?.message}
          />

          <Button
            type="submit"
            className="h-9 bg-white text-black hover:bg-white/90"
            disabled={requestResetForm.formState.isSubmitting}
          >
            {requestResetForm.formState.isSubmitting ? (
              <Spinner />
            ) : (
              'Send reset email'
            )}
          </Button>
        </form>
      ) : (
        <form
          onSubmit={resetWithTokenForm.handleSubmit(submitPasswordReset)}
          className="flex flex-col gap-4"
        >
          <AuthPasswordInput
            label="New password"
            autoComplete="new-password"
            {...resetWithTokenForm.register('password')}
            error={resetWithTokenForm.formState.errors.password?.message}
          />

          <AuthPasswordInput
            label="Confirm new password"
            autoComplete="new-password"
            {...resetWithTokenForm.register('confirmPassword')}
            error={resetWithTokenForm.formState.errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            className="h-9 bg-white text-black hover:bg-white/90"
            disabled={resetWithTokenForm.formState.isSubmitting}
          >
            {resetWithTokenForm.formState.isSubmitting ? (
              <Spinner />
            ) : (
              'Update password'
            )}
          </Button>
        </form>
      )}

      {errorMessage ? (
        <p className="mt-4 rounded-md border border-red-300/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {errorMessage}
        </p>
      ) : null}
    </AuthCard>
  )
}
