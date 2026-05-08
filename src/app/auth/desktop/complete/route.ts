import { desktopStateSchema } from '@/lib/auth/schema'
import { createDesktopExchangeCode } from '@/lib/auth/server'
import { withAuth } from '@workos-inc/authkit-nextjs'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const state = desktopStateSchema.safeParse(url.searchParams.get('state')).data
  if (!state) return redirect('/account?error=invalid-desktop-state')

  const { user, accessToken } = await withAuth()

  if (!user || !accessToken) {
    return redirect(
      `/login?returnPathname=/auth/desktop/complete?state=${encodeURIComponent(state)}`
    )
  }

  const result = await createDesktopExchangeCode({
    state,
    workosAccessToken: accessToken,
    workosUser: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  })

  const deepLinkUrl = `oiper://auth/callback?code=${encodeURIComponent(result.code)}&state=${encodeURIComponent(state)}`

  return new Response(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Return to OiPer</title>
    <style>
      body { margin: 0; font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background: #0b0b0c; color: #f4f4f5; }
      main { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
      .card { max-width: 560px; width: 100%; background: #141416; border: 1px solid #2a2a2e; border-radius: 12px; padding: 24px; }
      h1 { font-size: 20px; margin: 0 0 12px; }
      p { margin: 0; color: #b5b5bc; line-height: 1.5; }
      a { color: #7dd3fc; }
      #fallback { margin-top: 16px; display: none; }
      #secondary { margin-top: 12px; display: none; }
    </style>
  </head>
  <body>
    <main>
      <section class="card">
        <h1>Sign-in complete</h1>
        <p>Return to OiPer. Desktop should connect automatically in a few seconds.</p>
        <p id="fallback"><a href="${deepLinkUrl}">Open OiPer</a></p>
        <p id="secondary">You can close this browser tab after desktop connects.</p>
      </section>
    </main>
    <script>
      const deepLink = ${deepLinkUrl};
      const deepLinkFrame = document.createElement('iframe');
      deepLinkFrame.style.display = 'none';
      deepLinkFrame.src = deepLink;
      document.body.appendChild(deepLinkFrame);
      window.setTimeout(() => {
        const fallback = document.getElementById('fallback');
        if (fallback) fallback.style.display = 'block';
        const secondary = document.getElementById('secondary');
        if (secondary) secondary.style.display = 'block';
      }, 1200);
    </script>
  </body>
</html>`,
    {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
      },
    }
  )
}
