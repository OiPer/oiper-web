'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { AuthPageShell } from './auth-page-shell'
import { EmailVerificationForm } from './email-verification-form'
import { ForgotPasswordForm } from './forgot-password-form'
import { SignInForm } from './signin-form'
import { SignUpForm } from './signup-form'
import { useAuthSearchParams } from './use-auth-search-params'

export function PublicAuthModal() {
  const [searchParams, setSearchParams] = useAuthSearchParams()

  const authPage = searchParams.get('auth-page')
  const isSignInOpen = authPage === 'signin'
  const isSignUpOpen = authPage === 'signup'
  const isForgotPasswordOpen = authPage === 'forgot-password'
  const isVerifySignInOpen = authPage === 'verify-signin'
  const isVerifySignUpOpen = authPage === 'verify-signup'
  const isOpen =
    isSignInOpen ||
    isSignUpOpen ||
    isForgotPasswordOpen ||
    isVerifySignInOpen ||
    isVerifySignUpOpen

  function closeModal() {
    setSearchParams.remove('auth-page')
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeModal()
        }
      }}
    >
      <DialogContent
        className="h-full w-full! max-w-full! overflow-auto rounded-none border-none bg-transparent! p-0 shadow-none ring-0 outline-none"
        showCloseButton={false}
      >
        <AuthPageShell
          mode="modal"
          includeBackground={false}
          onOutsideClick={closeModal}
        >
          {isSignInOpen ? <SignInForm mode="modal" /> : null}
          {isSignUpOpen ? <SignUpForm mode="modal" /> : null}
          {isForgotPasswordOpen ? <ForgotPasswordForm mode="modal" /> : null}
          {isVerifySignInOpen ? (
            <EmailVerificationForm mode="modal" type="signin" />
          ) : null}
          {isVerifySignUpOpen ? (
            <EmailVerificationForm mode="modal" type="signup" />
          ) : null}
        </AuthPageShell>
      </DialogContent>
    </Dialog>
  )
}
