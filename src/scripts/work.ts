/**
 * Work page behaviour (src/pages/projects/index.astro).
 * - Filter chips: show tiles and More-work rows for one discipline (?filter= in the URL).
 * - Pause motion: one button stops the marquee, the spinning wheel, the films
 *   and the flight. Nothing moves at all with reduced motion.
 * - Wings for Life: the character flies once when its tile is fully in view,
 *   and again from "Release the runs" (which turns into "Stop the runs").
 */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;

/* ---------- Filters ---------- */
const filters = document.querySelector<HTMLElement>('[data-filters]');
if (filters) {
  const grid = document.querySelector<HTMLElement>('[data-work-grid]')!;
  const items = [...document.querySelectorAll<HTMLElement>('[data-tile], [data-row]')];
  const buttons = [...filters.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const status = document.querySelector<HTMLElement>('[data-filter-status]')!;
  const empty = document.querySelector<HTMLElement>('[data-empty]')!;
  filters.hidden = false;

  const apply = (id: string, announce = true) => {
    let shown = 0;
    items.forEach((el) => {
      const match = id === 'all' || (el.dataset.categories ?? '').split(' ').includes(id);
      el.hidden = !match;
      if (match) shown++;
    });
    grid.classList.toggle('is-filtered', id !== 'all');
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === id)));
    empty.hidden = shown > 0;
    if (announce) {
      const label = buttons.find((b) => b.dataset.filter === id)?.textContent?.trim() ?? '';
      status.textContent = `${shown} project${shown === 1 ? '' : 's'} shown${id === 'all' ? '' : ` for ${label}`}.`;
    }
    const url = new URL(location.href);
    if (id === 'all') url.searchParams.delete('filter'); else url.searchParams.set('filter', id);
    history.replaceState(null, '', url);
  };
  buttons.forEach((b) => b.addEventListener('click', () => apply(b.dataset.filter!)));
  document.querySelector('[data-filter-reset]')?.addEventListener('click', () => apply('all'));
  const initial = new URL(location.href).searchParams.get('filter');
  if (initial && buttons.some((b) => b.dataset.filter === initial)) apply(initial, false);
}

/* ---------- Pause motion ---------- */
let paused = false;
const stopFlight: Array<() => void> = [];
const pauseBtn = document.querySelector<HTMLButtonElement>('[data-motion-pause]');
if (!reduce) {
  root.classList.add('motion-live');
  if (pauseBtn) {
    const label = pauseBtn.querySelector<HTMLElement>('[data-motion-pause-label]')!;
    pauseBtn.hidden = false;
    pauseBtn.addEventListener('click', () => {
      paused = !paused;
      root.classList.toggle('motion-paused', paused);
      pauseBtn.setAttribute('aria-pressed', String(paused));
      label.textContent = paused ? 'Play motion' : 'Pause motion';
      document.dispatchEvent(new CustomEvent('oi:motion', { detail: { paused } }));
      if (paused) stopFlight.forEach((f) => f());
    });
  }
}

/* ---------- Wings for Life flight ---------- */
const poster = document.querySelector<HTMLElement>('[data-poster-poop]');
const flyer = document.querySelector<HTMLElement>('[data-flyer]');
const runs = document.querySelector<HTMLButtonElement>('[data-runs]');
if (poster && flyer && !reduce && 'animate' in flyer) {
  const runsLabel = runs?.querySelector<HTMLElement>('[data-runs-label]');
  let flight: Animation | null = null;
  let hide: Animation | null = null;

  const setLabel = () => { if (runsLabel) runsLabel.textContent = flight ? 'Stop the runs' : 'Release the runs'; };
  const stop = () => { flight?.cancel(); hide?.cancel(); };
  stopFlight.push(stop);

  const fly = (asked = false) => {
    if (flight || (paused && !asked)) return;
    const r = poster.getBoundingClientRect();
    const W = window.innerWidth, H = window.innerHeight, w = r.width, h = w * 1.6;
    flyer.style.width = `${w}px`;
    const cx = (f: number) => Math.max(10, Math.min(W - w * 1.8, f * W));
    const cy = (f: number) => Math.max(10, Math.min(H - h * 1.8, f * H));
    const at = (x: number, y: number, s: number, rot: number): Keyframe => ({ transform: `translate(${x}px,${y}px) scale(${s}) rotate(${rot}deg)`, opacity: 1 });
    const sx = r.left, sy = r.top;
    const P = [[sx, sy], [sx - 10, sy - Math.min(200, H * 0.22)], [cx(0.68), cy(0.14)], [cx(0.8), cy(0.42)], [cx(0.48), cy(0.56)], [cx(0.16), cy(0.32)], [cx(0.34), cy(0.1)], [sx + 20, sy - 140], [sx, sy]];
    const pts = [P[0], ...P, P[P.length - 1]];
    const segs = P.length - 1;
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    const N = 220;
    const frames: Keyframe[] = [];
    let prevX = sx, tilt = 0;
    for (let i = 0; i <= N; i++) {
      const g = i / N, u = ease(g) * segs, k = Math.min(Math.floor(u), segs - 1), t = u - k;
      const [a, b, c, d] = [pts[k], pts[k + 1], pts[k + 2], pts[k + 3]];
      // Catmull-Rom spline through the points.
      const cr = (A: number, B: number, C: number, D: number) => 0.5 * (2 * B + (-A + C) * t + (2 * A - 5 * B + 4 * C - D) * t * t + (-A + 3 * B - 3 * C + D) * t * t * t);
      const x = cr(a[0], b[0], c[0], d[0]), y = cr(a[1], b[1], c[1], d[1]);
      const target = Math.max(-8, Math.min(8, (x - prevX) * 0.5));
      tilt = tilt * 0.85 + target * 0.15;
      prevX = x;
      frames.push(at(x, y, 1 + 0.4 * Math.sin(Math.PI * g), tilt));
    }
    frames[frames.length - 1] = at(sx, sy, 1, 0);
    const duration = 16000;
    hide = poster.animate([{ opacity: 0 }, { opacity: 0 }], { duration });
    flight = flyer.animate(frames, { duration, easing: 'linear' });
    const done = () => { flight = null; hide = null; setLabel(); };
    flight.onfinish = done;
    flight.oncancel = done;
    setLabel();
  };

  if (runs) {
    runs.hidden = false;
    runs.addEventListener('click', () => (flight ? stop() : fly(true)));
  }
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { io.disconnect(); window.setTimeout(() => fly(), 700); }
    }, { threshold: 1 });
    io.observe(poster);
  }
}
