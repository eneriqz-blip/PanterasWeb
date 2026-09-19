/// <reference types="@cloudflare/workers-types" />

export interface Env {
  ASSETS: Fetcher;
  SITE_URL: string;
  SITE_ENV: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/health') {
      return Response.json({ ok: true, env: env.SITE_ENV });
    }

    return env.ASSETS.fetch(request);
  },
};
