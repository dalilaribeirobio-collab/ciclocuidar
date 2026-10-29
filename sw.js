// sw.js — funciona 100% offline após o primeiro acesso
const ARQUIVOS = ["/", "/index.html", "/css/estilo.css", "/js/banco.js",
                  "/js/ciclo.js", "/js/violentometro.js", "/js/app.js"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open("v3").then((c) => c.addAll(ARQUIVOS)));
});
self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
