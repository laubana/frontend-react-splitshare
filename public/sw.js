const CACHE_NAME = "my-cache";
const assets = ["/", "/index.html", "static/js", "offline.html"];

const self = this;
self.addEventListener("install", (e) => {
  // console.log("installing service worker");
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener("activate", (event) => {
  // console.log("Activating new service worker...");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        // eslint-disable-next-line array-callback-return
        cacheNames.map((storedCacheName) => {
          if (storedCacheName !== CACHE_NAME) {
            return caches.delete(storedCacheName);
          }
        })
      );
    })
  );
});

// self.addEventListener("fetch", (e) => {
//   console.log(`fetching ${e.request.url}`);
//   if (navigator.onLine) {
//     let fetchRequest = e.request.clone();
//     return fetch(fetchRequest).then((response) => {
//       if (!response || response.status !== 200 || response.type !== "basic") {
//         return response;
//       }
//       let responseToCache = response.clone();

//       caches.open(CACHE_NAME).then((cache) => {
//         cache.put(e.request, responseToCache);
//       });
//       return response;
//     });
//   } else {
//     e.respondWith(
//       caches.match(e.request).then((response) => {
//         if (response) {
//           return response;
//         }
//       })
//     );
//   }
// });

self.addEventListener("fetch", (event) => {
  // console.log("Fetch event for", event.request.url);

  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        //If the response is found in the cache
        if (response) {
          // console.log("Found ", event.request.url, " in cache");
          return response;
        }

        return fetch(event.request).then((response) => {
          //Caching and returning the response if it doesn't exist in the cache
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request.url, response.clone());
            return response;
          });
        });
      })
      .catch(async (error) => {
        console.log("Error, ", error);
        //If page is offline/ Network failure
        return caches.open(CACHE_NAME).then((cache) => {
          return cache.match("offline.html");
        });
      })
  );
});
