(() => {
  const output = document.getElementById('play-total');
  if (!output) return;
  const endpoint = output.dataset.endpoint || '';
  if (!endpoint) {
    output.textContent = '—';
    output.title = 'Play count is not enabled yet';
    return;
  }
  const storageKey = 'mosaic-play-session-v1';
  let session;
  let pending = false;
  let displayed = -1;
  try { session = JSON.parse(sessionStorage.getItem(storageKey)); } catch {}
  if (!session || typeof session.id !== 'string') {
    const id = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() :
      '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, digit =>
        (Number(digit) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(digit) / 4).toString(16));
    session = { id, counted: false };
  }
  function save() {
    try { sessionStorage.setItem(storageKey, JSON.stringify(session)); } catch {}
  }
  save();
  function render(data) {
    if (!Number.isSafeInteger(data.count) || data.count < 0) throw new Error('Invalid count');
    displayed = Math.max(displayed, data.count);
    output.textContent = new Intl.NumberFormat('en').format(displayed);
    output.removeAttribute('title');
  }
  async function request(options) {
    const response = await fetch(endpoint, {
      mode: 'cors', credentials: 'omit', cache: 'no-store',
      signal: AbortSignal.timeout(8000), ...options,
    });
    if (!response.ok) throw new Error('Count unavailable');
    return response.json();
  }
  async function recordPlay() {
    if (pending || session.counted) return;
    pending = true;
    try {
      const data = await request({ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: session.id }) });
      render(data);
      session.counted = true;
      save();
    } catch {
      output.title = 'Play count is temporarily unavailable';
    } finally { pending = false; }
  }
  window.addEventListener('mosaic:state', event => {
    if (event.detail === 'CRE_RECOMBINATION') recordPlay();
  });
  // Retry with the same idempotency key if connectivity recovers.
  window.addEventListener('online', () => {
    if (window.MOSAIC_ALLPRINCIPLE?.getState().selectedLox) recordPlay();
  });
  request().then(render).catch(() => {
    if (displayed < 0) output.textContent = '—';
    output.title = 'Play count is temporarily unavailable';
  });
})();
