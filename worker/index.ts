/// <reference types="@cloudflare/workers-types" />

export interface Env {
  ASSETS: Fetcher;
  SITE_URL: string;
  SITE_ENV: string;
}

const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy':
    "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; " +
    "font-src 'self'; script-src 'self'; base-uri 'self'; frame-ancestors 'none'",
};

function cacheControlFor(pathname: string): string {
  if (/\.(?:js|css|woff2?|ttf|otf)$/.test(pathname)) {
    return 'public, max-age=31536000, immutable';
  }
  if (/\.(?:png|jpg|jpeg|webp|avif|svg|gif|ico)$/.test(pathname)) {
    return 'public, max-age=604800, stale-while-revalidate=86400';
  }
  if (pathname.endsWith('.html') || pathname === '/' || !pathname.includes('.')) {
    return 'public, max-age=0, must-revalidate';
  }
  return 'public, max-age=3600';
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/health') {
      return Response.json({ ok: true, env: env.SITE_ENV }, { status: 200 });
    }

    const assetResponse = await env.ASSETS.fetch(request);
    const response = new Response(assetResponse.body, assetResponse);

    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      response.headers.set(key, value);
    }
    response.headers.set('Cache-Control', cacheControlFor(url.pathname));
    response.headers.set('X-Powered-By', 'Nexus Labs · Universidad Panamericana');

    return response;
  },
};
