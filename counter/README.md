# MOSAIC play counter

The GitHub Pages frontend is in `dist/`. This directory contains the optional
persistent counter backend. GitHub Pages does not execute the Worker or provide
a writable database.

## Current state

The backend is source code only. It has not been deployed. The footer displays
an em dash until an API endpoint is configured, and sends no counting requests
while unconfigured. No historical totals have been invented or imported.

## Count definition

- Increment when a visitor makes their first Cre site choice.
- The browser keeps a random session ID in `sessionStorage`.
- Refreshing and restarting within that session use the same ID.
- The database primary key makes repeat requests idempotent.
- New browser sessions can count again; this is a play-session count, not a
  count of distinct people.
- Test traffic uses a separate `test` scope and does not affect the public total.
- The application stores only scope, random session ID, and start timestamp.
  It does not store IP addresses, names, email addresses, or browser fingerprints.

## Run tests

Use Node.js 22.13 or later:

```sh
node --test counter/counter.test.mjs
```

## Enable a persistent backend

Using an authorized Cloudflare account:

1. Create a D1 database named `mosaic-game-plays`.
2. Put its actual database ID in `counter/wrangler.jsonc` (`database_id` is
   deliberately empty until a real database exists).
3. Apply the schema and deploy the Worker:

   ```sh
   npx wrangler d1 migrations apply DB --remote --config counter/wrangler.jsonc
   npx wrangler deploy --config counter/wrangler.jsonc
   ```

4. Set the `data-endpoint` attribute on `#play-total` in `dist/index.html`
   to the deployed Worker's actual `/api/plays` URL, then publish the Pages update.

No API token should be committed or embedded in frontend JavaScript.

## API

- `GET /api/plays`: read the real public count without incrementing.
- `POST /api/plays`: accept `{ "sessionId": "a-v4-uuid" }`, insert it once,
  and return `{ "count": 123 }` using the real database value.
- `GET` / `POST /api/test-plays`: same behavior, isolated test scope.

Writes require the GitHub Pages origin `https://klein-cyclohexane.github.io`
or the backend's own origin. Database errors return HTTP 503 rather than a
fabricated number. There is no public decrement or reset operation.
