importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

if (workbox) {
  console.log('Workbox loaded');

  workbox.core.setCacheNameDetails({ prefix: 'word-game-pwa' });

  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'script' || request.destination === 'style' || request.destination === 'document',
    new workbox.strategies.NetworkFirst()
  );

  workbox.routing.setCatchHandler(async ({ event }) => {
    if (event.request.destination === 'document') {
      return caches.match('/index.html');
    }
    return Response.error();
  });
} else {
  console.error('Workbox failed to load');
}
