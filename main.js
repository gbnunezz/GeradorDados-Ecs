if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Como o sw está na raiz, usamos '/service-worker.js'
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(reg => console.log('Service Worker registrado!', reg))
      .catch(err => console.error('Erro ao registrar o Service Worker:', err));
  });
}
