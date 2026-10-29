// ============================================
// CicloCuidar — sw.js (Service Worker)
// Cache offline · caminhos relativos (GitHub Pages)
// Versão do cache: v6 — altere este número a cada atualização!
// ============================================

const VERSAO_CACHE = "croclocuidar-v6";

// Todos os arquivos do app (caminhos RELATIVOS — obrigatório no GitHub Pages)
const ARQUIVOS = [
  "index.html",
  "manifest.json",
  "icone.png",
  "css/estilo.css",
  "js/banco.js",
  "js/ciclo.js",
  "js/violentometro.js",
  "js/app.js",
  "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap"
];

// Instala: baixa e guarda tudo no cache
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(VERSAO_CACHE).then((cache) => cache.addAll(ARQUIVOS))
  );
  self.skipWaiting(); // ativa a nova versão imediatamente
});

// Ativa: apaga caches de versões antigas
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((chaves) =>
      Promise.all(
        chaves
          .filter((c) => c.startsWith("croclocuidar-") && c !== VERSAO_CACHE)
          .map((c) => caches.delete(c))
      )
    )
  );
  self.clients.claim(); // assume o controle das abas abertas
});

// Busca: responde do cache quando offline; rede quando online
self.addEventListener("fetch", (e) => {
  // Ignora requisições de outros domínios que não sejam a fonte Quicksand
  const url = new URL(e.request.url);
  if (url.origin !== location.origin && !url.href.startsWith("https://fonts.")) return;

  e.respondWith(
    caches.match(e.request).then((resposta) => {
      if (resposta) return resposta; // tem no cache: usa
      // Não tem: busca na rede e guarda para a próxima
      return fetch(e.request).then((respostaRede) => {
        // Só cacheia respostas válidas
        if (respostaRede && respostaRede.status === 200 && respostaRede.type === "basic") {
          const copia = respostaRede.clone();
          caches.open(VERSAO_CACHE).then((cache) => cache.put(e.request, copia));
        }
        return respostaRede;
      }).catch(() => {
        // Offline e sem cache: fallback para a página principal
        return caches.match("index.html");
      });
    })
  );
});
