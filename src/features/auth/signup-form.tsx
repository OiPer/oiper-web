'use client'

import { useAuth } from '@/features/auth/auth-context'
import { logComplete, logError, logSubmit } from '@/lib/analytics'
import { getAppErrorCode } from '@/lib/api/error'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AuthCard } from './auth-card'
import {
  AuthFormError,
  AuthInput,
  AuthPasswordInput,
  AuthSubmitButton,
} from './auth-form-input'
import {
  buildAuthUrl,
  getCallbackUrl,
  getPasswordPolicyMessage,
} from './auth-form-utils'

const signUpSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required'),
    email: z.string().trim().email('Enter a valid email address'),
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

type SignUpSchema = z.infer<typeof signUpSchema>

export function SignUpForm(props: { checkout?: ReactNode }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { signUp } = useAuth()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const callbackUrl = getCallbackUrl(searchParams)

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: searchParams.get('email') ?? '',
      password: '',
      confirmPassword: '',
    },
  })

  async function handleSignUp(values: SignUpSchema) {
    setErrorMessage(null)
    logSubmit('signup', 'auth')

    try {
      const result = await signUp({
        name: values.name,
        email: values.email,
        password: values.password,
      })

      if ('type' in result && result.type === 'email_verification') {
        logComplete('signup', 'auth', { outcome: 'email_verification' })
        return router.push(
          buildAuthUrl('verify-email', {
            callbackUrl: searchParams.get('callbackUrl'),
            email: result.email,
            pat: result.pat,
            evid: result.evid,
          })
        )
      }

      if ('authenticated' in result && !result.authenticated) {
        logError('signup', 'auth', { error_type: 'not_authenticated' })
        return setErrorMessage('Something went wrong')
      }

      logComplete('signup', 'auth')
      router.push(callbackUrl)
    } catch (error) {
      const code = getAppErrorCode<'post', '/v1/auth/web/sign-up/password'>(
        error
      )
      logError('signup', 'auth', { error_type: code ?? 'unknown' })

      switch (code) {
        case 'AUTH_EMAIL_ALREADY_EXISTS':
          return setErrorMessage('An account already exists with this email')
        case 'AUTH_PASSWORD_POLICY_FAILED':
          return form.setError('password', {
            message: getPasswordPolicyMessage(error),
          })
        default:
          return setErrorMessage('Something went wrong')
      }
    }
  }

  return (
    <AuthCard
      checkout={props.checkout}
      page="signup"
      title="Create an account"
      description="Sign up to start using OiPer."
    >
      <form
        onSubmit={form.handleSubmit(handleSignUp)}
        className="flex flex-col gap-4"
      >
        <AuthInput
          type="text"
          label="Name"
          autoComplete="name"
          {...form.register('name')}
          error={form.formState.errors.name?.message}
        />

        <AuthInput
          type="email"
          label="Email"
          autoComplete="email"
          {...form.register('email')}
          error={form.formState.errors.email?.message}
        />

        <AuthPasswordInput
          label="Password"
          autoComplete="new-password"
          {...form.register('password')}
          error={form.formState.errors.password?.message}
        />

        <AuthPasswordInput
          label="Confirm password"
          autoComplete="new-password"
          {...form.register('confirmPassword')}
          error={form.formState.errors.confirmPassword?.message}
        />

        <AuthFormError message={errorMessage} />

        <AuthSubmitButton loading={form.formState.isSubmitting}>
          Sign up
        </AuthSubmitButton>
      </form>
    </AuthCard>
  )
}
