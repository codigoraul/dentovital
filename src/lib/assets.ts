import type { AstroGlobal } from 'astro';

const BASE = '/prueba';

export function resolveAsset(Astro: AstroGlobal, path: string) {
  if (/^https?:\/\//.test(path)) {
    return path;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${normalized}`;
}

export function resolveRoute(Astro: AstroGlobal, path = '') {
  if (!path || path === '' || path === '/') {
    return `${BASE}/`;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${normalized}`;
}

export function getAssetBase(Astro: AstroGlobal) {
  return BASE;
}
