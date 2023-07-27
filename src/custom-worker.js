const STATIC_CACHE = 'STATIC_CACHE_V1'

self.addEventListener('install', event => {
  console.log('installing Custom SW ...')

  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      console.log('caching static files ...')
      cache.add('/assets/bootstrap.min.css')
    })
  )
})

self.addEventListener('activate', event => {
  console.log('installing Custom SW ...')
  return self.clients.claim();
})

self.addEventListener('fetch', event => {
  console.log('caching static files ...')
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      } else {
        return fetch(event.request)
      }
    })
  )
})
