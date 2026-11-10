// Lift Log offline support. Bump VERSION whenever you upload changed files.
const VERSION = "liftlog-v1";
const ASSETS = [
  "./", "./index.html", "./manifest.webmanifest",
  "./chart.umd.js", "./xlsx.full.min.js",
  "./icon-180.png", "./icon-192.png", "./icon-512.png",
  "./barlow-latin-400-normal.woff2", "./barlow-latin-600-normal.woff2",
  "./barlow-condensed-latin-600-normal.woff2", "./barlow-condensed-latin-700-normal.woff2"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// The page itself: try the network for up to 3 seconds (so updates arrive),
// otherwise use the saved copy (so it opens with no signal).
async function pageRequest(req) {
  const cache = await caches.open(VERSION);
  const net = fetch(req).then((res) => {
    if (res.ok) cache.put("./index.html", res.clone());
    return res;
  });
  try {
    const res = await Promise.race([net, new Promise((r) => setTimeout(() => r(null), 3000))]);
    if (res) return res;
  } catch (_) {}
  const cached = await cache.match("./index.html");
  if (cached) { net.catch(() => {}); return cached; }
  return net;
}

// Everything else (scripts, fonts, icons): saved copy first, network as backup.
async function assetRequest(req) {
  const cache = await caches.open(VERSION);
  const cached = await cache.match(req);
  if (cached) return cached;
  const res = await fetch(req);
  if (res.ok) cache.put(req, res.clone());
  return res;
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(req.mode === "navigate" ? pageRequest(req) : assetRequest(req));
});
