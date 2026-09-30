/*
 * Service worker do portfólio — contrato offline restrito.
 *
 * O que garante: sem rede, navegações recebem /offline.html (página
 * explicativa, sem dependências externas). Foto e currículo em PDF já
 * acessados ficam disponíveis a partir do cache.
 *
 * O que NÃO faz, de propósito: não guarda HTML de rotas, respostas RSC,
 * prefetch, assets internos do Next (/_next/*), APIs nem requisições de
 * outros domínios (analytics, embeds). Assim nunca mistura páginas de
 * releases diferentes nem substitui respostas legítimas (404 inclusive).
 *
 * Atualização: ao mudar este arquivo ou o offline.html, incremente VERSION.
 * O worker novo usa skipWaiting/clients.claim e assume assim que o anterior
 * fica ocioso (no máximo quando a aba antiga fecha), sem recarregar a página:
 * como ele só serve o fallback e dois arquivos estáticos, a troca no meio do
 * uso não mistura conteúdo de versões. Só caches com o prefixo deste site
 * (e o legado portfolio-v1) são removidos.
 */
const VERSION = "v2";
const PREFIX = "renato-portfolio-";
const OFFLINE_CACHE = `${PREFIX}offline-${VERSION}`;
const ASSET_CACHE = `${PREFIX}assets-${VERSION}`;
const OFFLINE_URL = "/offline.html";

/** Caches antigos deste site que devem ser removidos (inclui o legado). */
const LEGACY_CACHES = ["portfolio-v1"];

/** Arquivos estáticos guardados sob demanda (após o primeiro acesso). */
const RUNTIME_ASSETS = new Set(["/RenatoBezerra.avif", "/Profile.pdf"]);
const MAX_ASSET_ENTRIES = RUNTIME_ASSETS.size;

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches
      .open(OFFLINE_CACHE)
      .then((cache) => cache.add(new Request(OFFLINE_URL, { cache: "reload" }))),
  );
});

self.addEventListener("activate", (event) => {
  const current = new Set([OFFLINE_CACHE, ASSET_CACHE]);
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                LEGACY_CACHES.includes(key) || (key.startsWith(PREFIX) && !current.has(key)),
            )
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

function isCacheableAsset(response) {
  // 206 (Range), opaque e erros nunca entram no cache.
  return response.status === 200 && response.type === "basic";
}

async function trimAssetCache() {
  const cache = await caches.open(ASSET_CACHE);
  const keys = await cache.keys();
  await Promise.all(keys.slice(0, Math.max(0, keys.length - MAX_ASSET_ENTRIES)).map((k) => cache.delete(k)));
}

async function handleNavigation(request) {
  try {
    // Rede primeiro; qualquer resposta HTTP (inclusive 404/500) é repassada.
    return await fetch(request);
  } catch {
    const offline = await caches.match(OFFLINE_URL, { cacheName: OFFLINE_CACHE });
    return (
      offline ??
      new Response("Sem conexão. Tente novamente quando a internet voltar.", {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      })
    );
  }
}

async function handleAsset(event) {
  const { request } = event;
  try {
    const response = await fetch(request);
    if (isCacheableAsset(response)) {
      const copy = response.clone();
      event.waitUntil(
        caches
          .open(ASSET_CACHE)
          .then((cache) => cache.put(request, copy))
          .then(trimAssetCache)
          .catch(() => {}),
      );
    }
    return response;
  } catch {
    const cached = await caches.match(request, { cacheName: ASSET_CACHE });
    // Sem cache: erro de rede real, nunca um HTML de fallback.
    return cached ?? Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(handleNavigation(request));
    return;
  }

  if (RUNTIME_ASSETS.has(url.pathname) && !url.search && !request.headers.has("range")) {
    event.respondWith(handleAsset(event));
  }
  // Todo o resto (/_next/*, RSC, prefetch, APIs, imagens otimizadas) segue
  // direto para a rede, sem passar pelo worker.
});
