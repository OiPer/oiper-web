const VERSION = 'v1'
const PAGES = `oiper-pages-${VERSION}`
const ASSETS = `oiper-assets-${VERSION}`
const PRECACHE = ['/', '/docs']

const NETWORK_ONLY = [
  /^\/api\//,
  /^\/auth(\/|$)/,
  /^\/account(\/|$)/,
  /^\/dev(\/|$)/,
  /^\/download\/[^/]+$/,
]

const CACHE_FIRST = [
  /^\/_next\/static\//,
  /^\/(icon|apple-icon|maskable-icon|favicon\.ico)/,
  /^\/og\//,
  /\/opengraph-image$/,
  /^\/hero-\d+\.png$/,
]

const STALE_WHILE_REVALIDATE = [
  /^\/$/,
  /^\/docs(\/|$)/,
  /^\/resources(\/(privacy-policy|security|terms-of-service))?$/,
]

const LOGO_PATH =
  'M444 222C444 163.122 420.611 106.655 378.978 65.0223C337.345 23.3892 280.878 0 222 0C163.122 0 106.655 23.3892 65.0223 65.0223C23.3892 106.655 0 163.122 0 222C0 280.878 23.3892 337.345 65.0223 378.978C106.655 420.611 163.122 444 222 444C280.878 444 337.345 420.611 378.978 378.978C420.611 337.345 444 280.878 444 222ZM298.96 222C298.96 203.342 295.285 184.866 288.145 167.628C281.005 150.39 270.539 134.728 257.346 121.534C244.152 108.341 228.49 97.8754 211.252 90.7352C194.014 83.595 175.538 79.92 156.88 79.92C138.222 79.92 119.746 83.595 102.508 90.7352C85.2704 97.8754 69.6076 108.341 56.4143 121.534C43.2209 134.728 32.7554 150.39 25.6152 167.628C18.475 184.866 14.8 203.342 14.8 222C14.8 240.658 18.475 259.134 25.6152 276.372C32.7554 293.61 43.2209 309.272 56.4143 322.466C69.6076 335.659 85.2704 346.125 102.508 353.265C119.746 360.405 138.222 364.08 156.88 364.08C175.538 364.08 194.014 360.405 211.252 353.265C228.49 346.125 244.152 335.659 257.346 322.466C270.539 309.272 281.005 293.61 288.145 276.372C295.285 259.134 298.96 240.658 298.96 222Z'

const WORDMARK_PATH =
  'M33.4 2.5Q25.1 2.5 18.9-1.2Q12.8-5 9.4-11.9Q6-18.7 6-28Q6-38.4 9.1-46.6Q12.1-54.8 17.4-60.6Q22.6-66.4 29.5-69.5Q36.4-72.5 44-72.5Q48.5-72.5 50.8-71.2Q53.1-70 53.1-67.4Q53.1-66.5 53-65.8Q52.8-65.1 52.4-64.2Q51.3-64.5 49.6-64.7Q47.8-65 46.5-65Q38.3-65 31.6-60.6Q24.8-56.1 20.8-48Q16.7-39.8 16.7-28.6Q16.7-16 21.9-9.8Q27-3.6 35.5-3.6Q39.7-3.6 44.1-5.7Q48.5-7.9 52.4-12Q56.2-16.1 59-21.8Q61.7-27.5 62.6-34.6Q56.3-37.3 54.2-41.5Q52-45.6 52-50.1Q52-53.2 53.2-55.7Q54.3-58.1 56.4-59.6Q58.4-61 61-61Q65.7-61 68.4-56.6Q71-52.2 71-44.5Q71-34.6 68.2-26.1Q65.4-17.6 60.4-11.2Q55.3-4.7 48.4-1.1Q41.5 2.5 33.4 2.5M90.5 2.5Q87.9 2.5 86.5 1.2Q85-0.1 85-3.3Q85-5.3 85.4-8.7Q85.8-12 86.8-17.6Q87.8-23.1 89.6-31.7Q91.4-40.2 94.1-52.5L90-56.6Q92-58.3 94.7-59.2Q97.3-60 99.2-60Q101.8-60 103-59Q104.2-57.9 104.2-55Q104.2-54.5 103.5-51.7Q102.8-48.8 101.8-44.5Q100.7-40.1 99.5-34.7Q98.2-29.4 97.2-23.9Q96.1-18.3 95.4-13.2Q94.7-8 94.7-4Q94.7-2.4 95.1-1.4Q95.4-0.3 96.1 0.3Q93.6 2.5 90.5 2.5M100.1-69.3Q97.3-69.3 95.7-70.7Q94-72.1 94-74.3Q94-75.9 94.9-77.4Q95.7-78.9 97.5-80Q99.2-81 101.8-81Q104.7-81 106.3-79.6Q107.9-78.2 107.9-76Q107.9-74.2 107-72.7Q106-71.1 104.3-70.2Q102.5-69.3 100.1-69.3M150.9-20.5Q144.5-20.5 139.3-22.4Q134.2-24.3 130-27.7L134.5-30.6Q137.1-28.7 140.4-27.9Q143.7-27 147-27Q154.1-27 159.1-29.8Q164.1-32.6 166.8-37.5Q169.4-42.4 169.4-48.6Q169.4-53.1 167.9-57Q166.5-60.8 163-63.2Q159.5-65.6 153.3-65.6Q149.1-65.6 144.9-63.7Q140.7-61.8 136-58.3L136-61Q139.1-64.2 142.2-66.8Q145.3-69.4 149.3-70.9Q153.3-72.4 158.9-72.4Q165.7-72.4 170.3-69.2Q174.9-66.1 177.3-61Q179.7-55.9 179.7-50Q179.7-44.2 178-38.9Q176.3-33.6 172.8-29.5Q169.2-25.3 163.8-22.9Q158.3-20.5 150.9-20.5M130.3 2.6Q127.3 2.6 125.9 1Q124.5-0.6 124.5-4.2Q124.5-7.3 124.9-11.7Q125.3-16.1 126.2-22.9Q127.1-29.7 128.7-39.7Q130.2-49.8 132.6-64.2L130-69.2Q132.6-70.8 135.2-71.7Q137.7-72.6 139.7-72.6Q143.3-72.6 143.3-68.3Q143.3-67.7 142.8-64.5Q142.4-61.4 141.6-56.7Q140.8-51.9 139.9-46.2Q139-40.4 138.1-34.5Q137.1-28.5 136.3-23.1Q135.5-17.7 135.1-13.6Q134.6-9.4 134.6-7.4Q134.6-4.9 135.2-2.9Q135.8-0.9 136.8 0.5Q133.4 2.6 130.3 2.6M211.5 2.5Q201.3 2.5 195.6-4Q189.9-10.5 189.9-21.8Q189.9-30.1 192.5-37.1Q195.2-44 200-49.2Q204.8-54.3 211.3-57.2Q217.7-60 225.3-60Q232.9-60 237.1-56.2Q241.4-52.5 241.4-45.8Q241.4-38.7 236.3-33.7Q231.1-28.7 221.3-26.1Q211.5-23.4 197.3-23.2L198.5-28.4Q214.3-28.1 223.3-33Q232.2-37.8 232.2-46.7Q232.2-50.5 230-52.8Q227.8-55.1 224-55.1Q219.2-55.1 214.9-52.5Q210.6-49.8 207.3-45.2Q204.1-40.5 202.3-34.4Q200.4-28.2 200.4-21.1Q200.4-12.9 203.5-8.1Q206.7-3.3 212.2-3.3Q219-3.3 223.3-7.5Q227.7-11.7 228.1-18.7Q231.3-18.7 233.3-17.4Q235.2-16.2 235.2-13.3Q235.2-9.3 232.1-5.7Q229-2.1 223.6 0.2Q218.3 2.5 211.5 2.5M263 2.5Q260.3 2.5 258.8 0.8Q257.4-0.9 257.4-4.8Q257.4-6.9 258.2-12Q259-17 260.3-23.7Q261.7-30.4 263.3-37.5Q265-44.6 266.7-50.9L262.5-55.2Q265-57.3 267.3-58.5Q269.5-59.6 271.3-59.6Q273.9-59.6 274.9-58.1Q275.9-56.5 275.9-54.7Q275.9-51.3 274.8-47.4Q273.6-43.5 271.6-38.8L272.6-38.3Q276-46.1 279.4-50.9Q282.9-55.7 286.3-57.9Q289.6-60.1 292.5-60.1Q295.4-60.1 296.8-59Q298.3-57.8 298.3-55.2Q298.3-52.3 295.8-50.7Q293.4-49.1 289.8-49.1Q285.6-49.1 281.6-45.2Q277.6-41.4 274.3-34.9Q271-28.4 269-20.4Q267.1-12.3 267.1-4Q267.1-0.9 268.1 0.2Q265.8 2.5 263 2.5'

const OFFLINE_PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#0a0a0a">
<title>You're offline | OiPer</title>
<style>
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#0a0a0a radial-gradient(ellipse at 50% 30%,rgba(255,255,255,.06),transparent 60%);color:#fff;font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;text-align:center;-webkit-font-smoothing:antialiased}
main{max-width:30rem}
.logo{display:inline-flex;align-items:center;gap:8px}
.logo .mark{width:32px;height:32px}
.logo .word{height:23px;width:auto}
h1{margin:48px 0 0;font-size:clamp(2.25rem,7vw,3rem);font-weight:600;letter-spacing:-.03em;line-height:1.1}
p{margin:20px 0 0;font-size:16px;line-height:1.6;color:rgba(255,255,255,.5)}
nav{margin-top:40px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px 20px;font-size:14px}
nav a{color:#fff;text-decoration:underline;text-underline-offset:4px}
nav a:hover{color:rgba(255,255,255,.8)}
nav span{width:1px;height:12px;background:rgba(255,255,255,.2)}
</style>
</head>
<body>
<main>
<a class="logo" href="/" aria-label="OiPer home"><svg class="mark" viewBox="0 0 444 444" aria-hidden="true"><path fill="#fff" fill-rule="evenodd" clip-rule="evenodd" d="${LOGO_PATH}"/></svg><svg class="word" viewBox="6 -81 292.3 83.6" aria-hidden="true"><path fill="#fff" d="${WORDMARK_PATH}"/></svg></a>
<h1>You're offline.</h1>
<p>Check your connection. This page loads again as soon as you're back online. Home and docs are still available.</p>
<nav>
<a href="">Try again</a><span aria-hidden="true"></span><a href="/">Home</a><span aria-hidden="true"></span><a href="/docs">Docs</a>
</nav>
</main>
<script>addEventListener('online',()=>location.reload())</script>
</body>
</html>`

function matches(patterns, path) {
  return patterns.some((pattern) => pattern.test(path))
}

function cacheable(response) {
  return response.ok && response.type === 'basic' && !response.redirected
}

async function cacheFirst(request) {
  const cached = await caches.match(request)
  if (cached) return cached

  const response = await fetch(request)
  if (cacheable(response)) {
    const cache = await caches.open(ASSETS)
    await cache.put(request, response.clone())
  }

  return response
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(PAGES)
  const cached = await cache.match(request)

  const fresh = fetch(request).then(async (response) => {
    if (cacheable(response)) await cache.put(request, response.clone())
    return response
  })

  if (cached) {
    fresh.catch(() => undefined)
    return cached
  }

  return fresh.catch(() => offline())
}

async function networkFirst(request) {
  const cache = await caches.open(PAGES)

  try {
    const response = await fetch(request)
    if (cacheable(response)) await cache.put(request, response.clone())
    return response
  } catch {
    return (await cache.match(request)) ?? offline()
  }
}

function offline() {
  return new Response(OFFLINE_PAGE, {
    status: 503,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PAGES)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== PAGES && key !== ASSETS)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (request.method !== 'GET' || url.origin !== self.location.origin) return

  if (matches(NETWORK_ONLY, url.pathname)) {
    if (request.mode !== 'navigate') return
    return event.respondWith(fetch(request).catch(() => offline()))
  }

  if (matches(CACHE_FIRST, url.pathname)) {
    return event.respondWith(cacheFirst(request))
  }

  if (request.mode !== 'navigate') return

  if (matches(STALE_WHILE_REVALIDATE, url.pathname)) {
    return event.respondWith(staleWhileRevalidate(request))
  }

  event.respondWith(networkFirst(request))
})
