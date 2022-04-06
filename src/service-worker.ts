/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim, setCacheNameDetails } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { version as VERSION } from '../package.json';

const PWA_BUILD = process.env.REACT_APP_PWA_BUILD;
const VERSION_STR = `ENJ-SW: ${VERSION}.${PWA_BUILD || ''}`;
console.log(VERSION_STR);
const CACHE_VARIABLE = btoa(VERSION_STR);

setCacheNameDetails({
  prefix: 'import',
  suffix: CACHE_VARIABLE
});

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }: { request: Request; url: URL }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    }

    // If this is a URL that starts with /_, skip.
    if (url.pathname.startsWith('/_')) {
      return false;
    }

    // If this looks like a URL for a resource, because it contains
    // a file extension, skip.
    if (fileExtensionRegexp.exec(url.pathname)) {
      return false;
    }

    // Return true to signal that we want to use the handler.
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
  // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 })
    ]
  })
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    void self.skipWaiting();
  }
  if (event.data && event.data.type === 'SKIP_WAITING_WHEN_SOLO') {
    void self.clients.matchAll({ includeUncontrolled: true }).then(clients => {
      if (clients.length < 2) void self.skipWaiting();
    });
  }

  if (event.data && event.data.type === 'PREPARE_CACHES_FOR_UPDATE') void prepareCachesForUpdate().then();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    getCacheStorageNames().then(({ outdatedCacheNames }) =>
      outdatedCacheNames.map(cacheName => caches.delete(cacheName))
    )
  );
});

const getCacheStorageNames = async () => {
  const cacheNames = (await caches.keys()) || [];
  let latestCacheName;
  const outdatedCacheNames = [];
  for (const cacheName of cacheNames) {
    if (cacheName.includes(CACHE_VARIABLE)) {
      latestCacheName = cacheName;
    } else if (cacheName !== 'images') {
      outdatedCacheNames.push(cacheName);
    }
  }
  return { latestCacheName, outdatedCacheNames };
};

const prepareCachesForUpdate = async () => {
  const { latestCacheName, outdatedCacheNames } = await getCacheStorageNames();
  if (!latestCacheName || !outdatedCacheNames?.length) return null;

  const latestCache = await caches?.open(latestCacheName);
  const latestCacheKeys = (await latestCache?.keys())?.map(c => c.url) || [];
  const latestCacheMainKey = latestCacheKeys?.find(url => url.includes('/index.html'));
  const latestCacheMainKeyResponse = latestCacheMainKey ? await latestCache.match(latestCacheMainKey) : null;

  const latestCacheOtherKeys = latestCacheKeys.filter(url => url !== latestCacheMainKey) || [];

  const cachePromises = outdatedCacheNames.map(cacheName => {
    const getCacheDone = async () => {
      const cache = await caches?.open(cacheName);
      const cacheKeys = (await cache?.keys())?.map(c => c.url) || [];
      const cacheMainKey = cacheKeys?.find(url => url.includes('/index.html'));
      if (cacheMainKey && latestCacheMainKeyResponse) {
        await cache.put(cacheMainKey, latestCacheMainKeyResponse.clone());
      }

      return Promise.all(
        latestCacheOtherKeys
          .filter(key => !cacheKeys.includes(key))
          .map(url => cache.add(url).catch(r => console.error(r)))
      );
    };
    return getCacheDone();
  });

  return Promise.all(cachePromises);
};
// Any other custom service worker logic can go here.
