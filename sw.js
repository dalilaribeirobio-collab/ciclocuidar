// CicloCuidar — sw.js
const VERSAO_CACHE = "croclocuidar-v1";

const ARQUIVOS = [
  "index.html", "manifest.json", "icone.png",
  "css/estilo.css",
  "js/banco.js", "js/ciclo.js", "js/violentometro.js", "js/quiz.js", "js/app.js",
  "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSAO_CACHE).then((c) => c.addAll(ARQUIVOS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((chaves) =>
      Promise.all(chaves.filter((c) => c.startsWith("croclocuidar-") && c !== VERSAO_CACHE)
        .map((c) => caches.delete(c)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin && !url.href.startsWith("https://fonts.")) return;
  e.respondWith(
    caches.match(e.request).then((resposta) => {
      if (resposta) return resposta;
      return fetch(e.request).then((respostaRede) => {
        if (respostaRede && respostaRede.status === 200 && respostaRede.type === "basic") {
          const copia = respostaRede.clone();
          caches.open(VERSAO_CACHE).then((cache) => cache.put(e.request, copia));
        }
        return respostaRede;
      }).catch(() => caches.match("index.html"));
    })
  );
});
