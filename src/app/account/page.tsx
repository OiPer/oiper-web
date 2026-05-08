import { signOut, withAuth } from '@workos-inc/authkit-nextjs'
import Link from 'next/link'

export default async function AccountPage() {
  const { user } = await withAuth()

  if (!user) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center gap-4 px-6 text-white">
        <h1 className="text-3xl font-semibold">Account Diagnostics</h1>
        <p className="text-white/70">You are not signed in.</p>
        <Link
          href="/login?returnPathname=%2Faccount"
          className="w-fit rounded border px-4 py-2"
        >
          Sign in
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center gap-4 px-6 text-white">
      <h1 className="text-3xl font-semibold">Account Diagnostics</h1>
      <div className="rounded border border-white/20 p-4">
        <p>
          <span className="text-white/60">User ID:</span> {user.id}
        </p>
        <p>
          <span className="text-white/60">Email:</span> {user.email}
        </p>
        <p>
          <span className="text-white/60">Name:</span>{' '}
          {[user.firstName, user.lastName].filter(Boolean).join(' ') || 'N/A'}
        </p>
      </div>

      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <button type="submit" className="w-fit rounded border px-4 py-2">
          Sign out
        </button>
      </form>

      <p className="text-sm text-white/60">
        Desktop sign-in entrypoint: <code>/auth/desktop/start?state=...</code>
      </p>
    </main>
  )
}
