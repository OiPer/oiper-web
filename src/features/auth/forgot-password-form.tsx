'use client'

import { logComplete, logError, logSubmit } from '@/lib/analytics'
import { $api } from '@/lib/api/client'
import { getAppErrorCode } from '@/lib/api/error'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { AuthCard } from './auth-card'
import {
  AuthFormError,
  AuthInput,
  AuthPasswordInput,
  AuthSubmitButton,
} from './auth-form-input'
import { buildAuthUrl, getPasswordPolicyMessage } from './auth-form-utils'

const RESET_CALLBACK_KEY = 'oiper:reset-callback-url'

const requestResetSchema = z.object({
  email: z.string().trim().email('Enter a valid email address'),
})

const resetWithTokenSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export function ForgotPasswordForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const requestResetMutation = $api.useMutation(
    'post',
    '/v1/auth/web/password-reset/request'
  )
  const confirmResetMutation = $api.useMutation(
    'post',
    '/v1/auth/web/password-reset/confirm'
  )

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
    },
  })

  const token = searchParams.get('token')

  function goToSignIn() {
    let callbackUrl = searchParams.get('callbackUrl')

    try {
      callbackUrl ??= localStorage.getItem(RESET_CALLBACK_KEY)
      localStorage.removeItem(RESET_CALLBACK_KEY)
    } catch {}

    router.push(buildAuthUrl('signin', { callbackUrl }))
  }

  async function handlePasswordResetRequest(
    values: z.infer<typeof requestResetSchema>
  ) {
    setErrorMessage(null)
    logSubmit('password_reset_request', 'auth')

    try {
      await requestResetMutation.mutateAsync({
        body: {
          email: values.email,
        },
      })

      logComplete('password_reset_request', 'auth')
      toast.success('Password reset email sent')

      const callbackUrl = searchParams.get('callbackUrl')

      try {
        if (callbackUrl) localStorage.setItem(RESET_CALLBACK_KEY, callbackUrl)
      } catch {}
    } catch (error) {
      const code = getAppErrorCode<
        'post',
        '/v1/auth/web/password-reset/request'
      >(error)
      logError('password_reset_request', 'auth', {
        error_type: code ?? 'unknown',
      })
      setErrorMessage("Couldn't send the reset email")
    }
  }

  async function handlePasswordReset(
    values: z.infer<typeof resetWithTokenSchema>
  ) {
    logSubmit('password_reset_confirm', 'auth')

    if (!token) {
      logError('password_reset_confirm', 'auth', {
        error_type: 'missing_token',
      })
      return setErrorMessage('Missing reset token')
    }

    setErrorMessage(null)

    try {
      await confirmResetMutation.mutateAsync({
        body: {
          token,
          newPassword: values.password,
        },
      })

      logComplete('password_reset_confirm', 'auth')
      toast.success('Password updated, redirecting to sign in')
      window.setTimeout(() => goToSignIn(), 600)
    } catch (error) {
      const code = getAppErrorCode<
        'post',
        '/v1/auth/web/password-reset/confirm'
      >(error)
      logError('password_reset_confirm', 'auth', {
        error_type: code ?? 'unknown',
      })

      switch (code) {
        case 'AUTH_REQUEST_REJECTED':
          return setErrorMessage('Invalid or expired reset link')
        case 'AUTH_PASSWORD_POLICY_FAILED':
          return resetWithTokenForm.setError('password', {
            message: getPasswordPolicyMessage(error),
          })
        default:
          return setErrorMessage('Something went wrong')
      }
    }
  }

  return (
    <AuthCard
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
          onSubmit={requestResetForm.handleSubmit(handlePasswordResetRequest)}
          className="flex flex-col gap-4"
        >
          <AuthInput
            type="email"
            label="Email"
            autoComplete="email"
            {...requestResetForm.register('email')}
            error={requestResetForm.formState.errors.email?.message}
          />

          <AuthSubmitButton
            loading={
              requestResetForm.formState.isSubmitting ||
              requestResetMutation.isPending
            }
          >
            Send reset email
          </AuthSubmitButton>
        </form>
      ) : (
        <form
          onSubmit={resetWithTokenForm.handleSubmit(handlePasswordReset)}
          className="flex flex-col gap-4"
        >
          <AuthPasswordInput
            label="New password"
            autoComplete="new-password"
            {...resetWithTokenForm.register('password')}
            error={resetWithTokenForm.formState.errors.password?.message}
          />

          <AuthSubmitButton
            loading={
              resetWithTokenForm.formState.isSubmitting ||
              confirmResetMutation.isPending
            }
          >
            Update password
          </AuthSubmitButton>
        </form>
      )}

      <AuthFormError message={errorMessage} className="mt-4" />
    </AuthCard>
  )
}
