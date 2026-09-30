'use client'

import { $api } from '@/lib/api/client'
import { getAppErrorCode } from '@/lib/api/error'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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
import { buildAuthUrl } from './auth-form-utils'

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
  const requestResetMutation = $api.useMutation(
    'post',
    '/v1/auth/web/password-reset/request'
  )
  const confirmResetMutation = $api.useMutation(
    'post',
    '/v1/auth/web/password-reset/confirm'
  )
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

  async function handlePasswordResetRequest(
    values: z.infer<typeof requestResetSchema>
  ) {
    setErrorMessage(null)

    try {
      await requestResetMutation.mutateAsync({
        body: {
          email: values.email,
        },
      })

      toast.success('Password reset email sent')
    } catch {
      setErrorMessage("Couldn't send the reset email")
    }
  }

  async function handlePasswordReset(
    values: z.infer<typeof resetWithTokenSchema>
  ) {
    if (!token) return setErrorMessage('Missing reset token')
    setErrorMessage(null)

    try {
      await confirmResetMutation.mutateAsync({
        body: {
          token,
          newPassword: values.password,
        },
      })

      toast.success('Password updated, redirecting to sign in')
      window.setTimeout(() => goToSignIn(), 600)
    } catch (error) {
      const code = getAppErrorCode<
        'post',
        '/v1/auth/web/password-reset/confirm'
      >(error)
      switch (code) {
        case 'AUTH_REQUEST_REJECTED':
          return setErrorMessage('Invalid or expired reset link')
        default:
          return setErrorMessage('Something went wrong')
      }
    }
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

          <AuthPasswordInput
            label="Confirm new password"
            autoComplete="new-password"
            {...resetWithTokenForm.register('confirmPassword')}
            error={resetWithTokenForm.formState.errors.confirmPassword?.message}
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
