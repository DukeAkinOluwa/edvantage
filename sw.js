const cacheData = "edvantageData";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      return cache.addAll([
        '/static/js/main.chunk.js',
        '/static/js/0.chunk.js',
        '/static/js/bundle.js',
        '/index.html',
        '/',
        '/manifest.json',
        '/static/media/*',
        'https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;500&display=swap'
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Try to fetch the resource from the network if not found in the cache
      return (
        cachedResponse ||
        fetch(event.request).then((networkResponse) => {
          // Cache the fetched resource for future use
          return caches.open(cacheData).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
      );
    })
  );
});


// this.addEventListener("fetch", (event)=>{
//     if(!navigator.onLine){
//         event.respondWith(
//             caches.match(event.request).then((resp)=>{
//                 if(resp){
//                     return resp
//                 }
//             })
//         )
//         let requestUrl = event.request.clone();
//         fetch(requestUrl)
//     }
// })