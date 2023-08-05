const STATIC_CACHE = 'STATIC_CACHE_V2';
const DYNAMIC_CACHE = 'DYNAMIC_CACHE_V1';

self.addEventListener('install', event => {
  console.log('installing Custom SW ...')

  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      console.log('caching static files ...')
      cache.addAll([
        '/assets/bootstrap.min.css',
        '/assets/icons/icon-72x72.png',
        '/assets/icons/icon-96x96.png',
        '/assets/icons/icon-144x144.png',
      ])
    })
  )
})

self.addEventListener('activate', event => {
  console.log('activating Custom SW ...')
  event.waitUntil(
    caches.keys().then(allKeys => Promise.all(allKeys.map(key => {
      if(key !== STATIC_CACHE){
        console.log('Removing old caches: ', key)
        return caches.delete(key)
      }
    })))
  )
  return self.clients.claim();
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        console.log('load from cache:', event.request)
        return cachedResponse;
      } else {
        return fetch(event.request).then(response => {
          return caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(event.request.url, response.clone());
            return response;
          })
        })
      }
    })
  )
})
