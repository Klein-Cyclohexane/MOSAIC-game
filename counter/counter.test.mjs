import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import worker from './worker/index.js';

function fixture() {
  const db = new DatabaseSync(':memory:');
  db.exec(readFileSync(new URL('./drizzle/0000_play_sessions.sql', import.meta.url), 'utf8'));
  const env = { DB: { prepare(sql) {
    return { bind(...args) { return {
      run() { return db.prepare(sql).run(...args); },
      first() { return db.prepare(sql).get(...args); },
    }; } };
  } } };
  const call = (path = '/api/plays', options = {}) => worker.fetch(new Request('https://counter.test' + path, options), env);
  const post = (sessionId, path = '/api/plays') => call(path, {
    method: 'POST', headers: { Origin: 'https://klein-cyclohexane.github.io', 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId }),
  });
  return { db, call, post };
}

test('a session is counted once across retries and concurrent duplicate requests', async () => {
  const { db, call, post } = fixture();
  try {
    assert.equal((await (await call()).json()).count, 0);
    const id = '42c90db0-bb52-4b8c-8ad6-e893524a3f77';
    assert.equal((await (await post(id)).json()).count, 1);
    await Promise.all(Array.from({ length: 12 }, () => post(id)));
    assert.equal((await (await call()).json()).count, 1);
    await post('827a23b2-1d52-4025-bacf-2285ca105b52');
    assert.equal((await (await call()).json()).count, 2);
  } finally { db.close(); }
});

test('QA requests never change the public play total', async () => {
  const { db, call, post } = fixture();
  try {
    await post('42c90db0-bb52-4b8c-8ad6-e893524a3f77', '/api/test-plays');
    assert.equal((await (await call('/api/test-plays')).json()).count, 1);
    assert.equal((await (await call()).json()).count, 0);
  } finally { db.close(); }
});

test('cross-origin preflight works and invalid requests do not increment', async () => {
  const { db, call, post } = fixture();
  try {
    const response = await call('/api/plays', { method: 'OPTIONS', headers: { Origin: 'https://klein-cyclohexane.github.io' } });
    assert.equal(response.status, 204);
    assert.equal(response.headers.get('Access-Control-Allow-Origin'), 'https://klein-cyclohexane.github.io');
    assert.equal((await post('bad-id')).status, 400);
    assert.equal((await call('/api/plays', { method: 'POST', headers: { Origin: 'https://unrelated.test' } })).status, 403);
    assert.equal((await call('/api/plays', { method: 'POST' })).status, 403);
    assert.equal((await call('/api/plays', { method: 'DELETE' })).status, 405);
    assert.equal((await (await call()).json()).count, 0);
  } finally { db.close(); }
});

test('database failure returns unavailable instead of inventing a count', async () => {
  const response = await worker.fetch(new Request('https://counter.test/api/plays'), {});
  assert.equal(response.status, 503);
  assert.equal('count' in await response.json(), false);
});
