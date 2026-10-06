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
  /^\/(icon|apple-icon|favicon\.ico)/,
  /^\/og\//,
  /\/opengraph-image$/,
  /^\/hero-\d+\.png$/,
]

const STALE_WHILE_REVALIDATE = [
  /^\/$/,
  /^\/docs(\/|$)/,
  /^\/resources(\/(privacy-policy|security|terms-of-service))?$/,
]

const OFFLINE_PAGE = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Offline | OiPer</title><style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0a0a0a;color:#fff;font-family:system-ui,sans-serif;text-align:center}p{color:rgba(255,255,255,.5)}</style></head><body><main><h1>You're offline.</h1><p>Reconnect to load this page.</p></main></body></html>`

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
  if (matches(NETWORK_ONLY, url.pathname)) return
  if (matches(CACHE_FIRST, url.pathname)) {
    return event.respondWith(cacheFirst(request))
  }

  if (request.mode !== 'navigate') return

  if (matches(STALE_WHILE_REVALIDATE, url.pathname)) {
    return event.respondWith(staleWhileRevalidate(request))
  }

  event.respondWith(networkFirst(request))
})
