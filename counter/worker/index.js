const GAME_ORIGIN = 'https://klein-cyclohexane.github.io';
const GAME_URL = GAME_ORIGIN + '/MOSAIC-game/';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/') return Response.redirect(GAME_URL, 302);
    const scope = url.pathname === '/api/plays' ? 'plays' : url.pathname === '/api/test-plays' ? 'test' : null;
    if (!scope) return new Response('Not found', { status: 404 });
    const origin = request.headers.get('Origin');
    const allowed = origin === GAME_ORIGIN || origin === url.origin;
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Vary': 'Origin',
      ...(allowed ? { 'Access-Control-Allow-Origin': origin } : {}),
    };
    const json = (body, status = 200) => Response.json(body, { status, headers });
    if (origin && !allowed) return json({ error: 'Origin not allowed' }, 403);
    if (request.method === 'OPTIONS') {
      if (!allowed) return json({ error: 'Origin required' }, 403);
      return new Response(null, { status: 204, headers: {
        ...headers, 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400',
      } });
    }
    if (!['GET', 'POST'].includes(request.method)) return json({ error: 'Method not allowed' }, 405);
    try {
      if (request.method === 'POST') {
        if (!allowed) return json({ error: 'Origin required' }, 403);
        if (!request.headers.get('Content-Type')?.startsWith('application/json')) return json({ error: 'JSON required' }, 415);
        const body = await request.text();
        if (body.length > 256) return json({ error: 'Request too large' }, 413);
        let data;
        try { data = JSON.parse(body); } catch { return json({ error: 'Invalid JSON' }, 400); }
        if (!UUID.test(data?.sessionId || '')) return json({ error: 'Invalid session' }, 400);
        await env.DB.prepare('INSERT OR IGNORE INTO play_sessions (scope, session_id, started_at) VALUES (?, ?, ?)')
          .bind(scope, data.sessionId, Date.now()).run();
      }
      const result = await env.DB.prepare('SELECT COUNT(*) AS count FROM play_sessions WHERE scope = ?').bind(scope).first();
      return json({ count: result.count });
    } catch {
      return json({ error: 'Counter temporarily unavailable' }, 503);
    }
  },
};
