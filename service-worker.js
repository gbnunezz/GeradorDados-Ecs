// Nome da versão do cache (altere ao atualizar recursos)
const CACHE_NAME = 'ecosintese-cache-v1';

// Quais URLs devem ser cacheadas na instalação
const urlsToCache = [
  '/',                 // index.html
  '/index.html',
  '/style.css',
  '/js/funcoes.js',
  '/js/comunicacao.js',
  '/js/main.js'
];

// Durante a instalação, abre o cache e adiciona as URLs
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Ao ativar o novo Service Worker, limpa caches antigas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Intercepta todas as requisições de rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Se já estiver no cache, retorna direto
      if (cachedResponse) {
        return cachedResponse;
      }
      // Senão, busca na rede e adiciona ao cache
      return fetch(event.request).then(networkResponse => {
        // Se a requisição não for GET ou não der certo, apenas retorna a resposta
        if (!event.request.url.startsWith(self.location.origin) || networkResponse.status !== 200 || event.request.method !== 'GET') {
          return networkResponse;
        }
        // Clona a resposta para adicionar ao cache
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        return networkResponse;
      }).catch(() => {
        // Se falhar a requisição (por exemplo, offline), você pode retornar
        // uma página offline genérica ou imagem de fallback aqui, 
        // caso tenha algo específico para exibir.
      });
    })
  );
});
