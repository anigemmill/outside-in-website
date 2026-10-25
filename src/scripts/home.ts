/**
 * Homepage v3 effects. Spec: HOMEPAGE-V3-SPEC.md.
 *
 * Every section works without this script (finished state, plain links). The
 * script switches each effect on by adding a class, and does nothing for people
 * who prefer reduced motion beyond the few controls that must still work (the
 * tile Outside/Inside switches, the gallery buttons and arrow keys).
 *
 * Scroll-linked motion uses CSS scroll-driven animations where supported
 * (html.sda). Elsewhere (html.nosda) the paused CSS animations are scrubbed
 * from here by setting --p on each section; see `.scrub` in global.css.
 * Append ?sda=0 to the URL to force the fallback for testing.
 */

const root = document.documentElement;
const body = document.body;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const sda = CSS.supports('animation-timeline: view()') && new URLSearchParams(location.search).get('sda') !== '0';
root.classList.add(sda ? 'sda' : 'nosda');

const q = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => scope.querySelector<T>(sel as string) as T | null;
const qa = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => [...scope.querySelectorAll<T>(sel as string)] as T[];
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const vh = () => window.innerHeight;
const isMobile = () => window.matchMedia('(max-width: 760px)').matches;

/* ---------- Scroll plumbing: one rAF per frame for everything ---------- */
type Group = { el: HTMLElement; progress: () => number; also?: HTMLElement[] };
const groups: Group[] = []; // scrubbed only when CSS scroll-driven animations aren't available
const onFrame: (() => void)[] = []; // things that read scroll position (labels, dots)
const onResize: (() => void)[] = [];

/** Progress through a pinned (taller than the viewport) section: 0 when its top
    reaches the top of the viewport, 1 when its bottom reaches the bottom. */
const containOf = (el: HTMLElement) => () => {
  const r = el.getBoundingClientRect();
  return -r.top / Math.max(1, r.height - vh());
};
/** Progress from the element's top entering the bottom (0) to its bottom leaving the top (1). */
const coverOf = (el: HTMLElement, from = 0, to = 1) => () => {
  const r = el.getBoundingClientRect();
  return ((vh() - r.top) / (vh() + r.height) - from) / (to - from);
};
function scrub(group: Group) {
  if (!sda) groups.push(group);
}

let queued = false;
function frame() {
  queued = false;
  for (const g of groups) {
    const p = clamp(g.progress()).toFixed(4);
    g.el.style.setProperty('--p', p);
    g.also?.forEach((a) => a.style.setProperty('--p', p));
  }
  onFrame.forEach((f) => f());
}
const request = () => {
  if (!queued) { queued = true; requestAnimationFrame(frame); }
};
window.addEventListener('scroll', request, { passive: true });
let resizeTimer = 0;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => { onResize.forEach((f) => f()); request(); }, 80);
});

/* ---------- 01 Logo glide (hero → header) ---------- */
function setupGlide() {
  const hero = q('[data-hero]');
  const mark = q('[data-glide-mark]');
  const brand = q<SVGSVGElement>('.brand__mark');
  const headerBg = q('[data-header-bg]');
  if (!hero || !mark || !brand || reduce) return;
  body.classList.add('glide-live');

  let top = 0, height = 1;
  const measure = () => {
    height = hero.offsetHeight;
    top = hero.getBoundingClientRect().top + window.scrollY;
    const v = vh();
    // The glide runs from 0% to 60% of the hero scrolled, expressed as a cover range.
    body.style.setProperty('--g-r0', `${(v / (height + v)) * 100}%`);
    body.style.setProperty('--g-r1', `${((0.6 * height + v) / (height + v)) * 100}%`);
    hero.style.setProperty('--g-comp', `${0.6 * height}px`);
    // Start: the hero mark as it sits with the hero at the top of the screen.
    const m = mark.getBoundingClientRect();
    const startTop = m.top + window.scrollY - top;
    const startH = mark.offsetHeight;
    // End: the header logo slot.
    const b = brand.getBoundingClientRect();
    hero.style.setProperty('--g-dx', `${b.left - m.left}px`);
    hero.style.setProperty('--g-dy', `${b.top - startTop}px`);
    hero.style.setProperty('--g-s', `${b.height / startH}`);
  };
  measure();
  onResize.push(measure);
  document.fonts?.ready.then(measure);
  scrub({ el: hero, progress: () => (window.scrollY - top) / (0.6 * height), also: headerBg ? [headerBg] : [] });
}

/* ---------- 02 Slice-wipe headlines ---------- */
function setupWipes() {
  const heads = qa('[data-wipe]');
  if (reduce || !heads.length) return;
  // A heading already on screen at load shows as finished.
  const pending = heads.filter((h) => h.getBoundingClientRect().top >= vh() * 0.85);
  pending.forEach((h) => h.classList.add('wipe--armed'));
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    io.unobserve(en.target);
    playWipe(en.target as HTMLElement);
  }), { rootMargin: '0px 0px -15% 0px' });
  pending.forEach((h) => io.observe(h));
}
function playWipe(h: HTMLElement) {
  const words = qa('.wipe__w', h);
  const box = h.getBoundingClientRect();
  type Line = { top: number; bottom: number; left: number; right: number; words: HTMLElement[] };
  const lines: Line[] = [];
  for (const w of words) {
    const r = w.getBoundingClientRect();
    let line = lines.find((l) => Math.abs(l.top - r.top) < r.height / 2);
    if (!line) lines.push((line = { top: r.top, bottom: r.bottom, left: r.left, right: r.right, words: [] }));
    line.left = Math.min(line.left, r.left);
    line.right = Math.max(line.right, r.right);
    line.bottom = Math.max(line.bottom, r.bottom);
    line.words.push(w);
  }
  const stagger = isMobile() ? 60 : 80;
  // In 260ms (ease-out), hold 60ms, out 300ms (ease-in-out).
  const total = 620, inEnd = 260 / total, holdEnd = 320 / total;
  const anims = lines.map((l, i) => {
    const band = document.createElement('span');
    band.className = 'wipe__band';
    band.setAttribute('aria-hidden', 'true');
    band.innerHTML = '<i></i><i></i><i></i>';
    Object.assign(band.style, {
      left: `${l.left - box.left}px`, top: `${l.top - box.top}px`,
      width: `${l.right - l.left}px`, height: `${l.bottom - l.top}px`,
    });
    h.appendChild(band);
    const delay = i * stagger;
    const a = band.animate([
      { transform: 'scaleX(0)', transformOrigin: 'left center', offset: 0, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      { transform: 'scaleX(1)', transformOrigin: 'left center', offset: inEnd },
      { transform: 'scaleX(1)', transformOrigin: 'left center', offset: holdEnd },
      { transform: 'scaleX(1)', transformOrigin: 'right center', offset: holdEnd + 0.001, easing: 'cubic-bezier(0.65, 0, 0.35, 1)' },
      { transform: 'scaleX(0)', transformOrigin: 'right center', offset: 1 },
    ], { duration: total, delay, fill: 'both' });
    // The words appear under the band once it fully covers the line.
    l.words.forEach((w) => w.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1, delay: delay + 290, fill: 'backwards' }));
    a.finished.then(() => band.remove());
    return a;
  });
  h.classList.remove('wipe--armed');
  Promise.all(anims.map((a) => a.finished)).catch(() => {});
}

/* ---------- 11 Scroll-filled statement ---------- */
function setupFill() {
  const sec = q('[data-fill]');
  if (!sec || reduce) return;
  const words = qa('.fill__w', sec);
  const text = q('.fill__text', sec)!;
  sec.classList.add('is-live');
  let last = -1;
  onFrame.push(() => {
    // From the block's top at 80% of the screen to its bottom at 40%.
    const r = text.getBoundingClientRect(), v = vh();
    const p = clamp((0.8 * v - r.top) / (0.4 * v + r.height));
    const k = Math.round(p * words.length);
    if (k === last) return;
    last = k;
    words.forEach((w, i) => {
      w.classList.toggle('is-on', i < k - 2);
      w.classList.toggle('is-edge', i >= k - 2 && i < k);
    });
  });
}

/* ---------- 12 Work grid + 03 Lens ---------- */
function setupWork() {
  const sec = q('[data-work]');
  if (!sec) return;
  const tiles = qa('[data-tile]', sec);
  // The switch works in every mode, and is the only behaviour with reduced motion.
  tiles.forEach((tile) => {
    const btn = q<HTMLButtonElement>('[data-tile-switch]', tile)!;
    btn.addEventListener('click', () => {
      const on = !tile.classList.contains('is-inside');
      tile.classList.toggle('is-inside', on);
      btn.setAttribute('aria-pressed', String(on));
    });
  });
  if (reduce) return;
  sec.classList.add('is-live');

  // Rise: once, when a tile's row reaches 90% of the screen.
  const rise = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    en.target.classList.add('is-up');
    rise.unobserve(en.target);
  }), { rootMargin: '0px 0px -10% 0px' });
  tiles.forEach((t) => {
    // A tile already on screen at load starts in place.
    if (t.getBoundingClientRect().top < vh() * 0.9) t.classList.add('is-up');
    else rise.observe(t);
  });

  // Drift fallback where CSS scroll-driven animations aren't available.
  if (!CSS.supports('animation-timeline: view()')) {
    sec.classList.add('no-sda');
    const medias = qa('[data-tile-media]', sec);
    onFrame.push(() => medias.forEach((m) => {
      const r = m.getBoundingClientRect();
      const p = clamp((vh() - r.top) / (vh() + r.height));
      m.style.setProperty('--d', (-5 + 10 * p).toFixed(2));
    }));
  }

  if (fine) {
    sec.classList.add('lens-fine');
    let inView = true;
    new IntersectionObserver(([en]) => {
      inView = en.isIntersecting;
      if (!inView) tiles.forEach((t) => t.classList.remove('is-lens'));
    }).observe(sec);
    tiles.forEach((tile) => {
      const media = q('[data-tile-media]', tile)!;
      const inside = q('[data-tile-inside]', tile)!;
      let x = 0, y = 0, tx = 0, ty = 0, last = 0, raf = 0, hovering = false;
      const loop = (t: number) => {
        const dt = last ? t - last : 16;
        last = t;
        const k = 1 - Math.exp(-dt / 80); // about 80ms lag behind the pointer
        x += (tx - x) * k;
        y += (ty - y) * k;
        inside.style.setProperty('--lx', `${x.toFixed(1)}px`);
        inside.style.setProperty('--ly', `${y.toFixed(1)}px`);
        if (hovering && inView && (Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3)) raf = requestAnimationFrame(loop);
        else raf = 0;
      };
      const kick = () => { if (!raf) { last = 0; raf = requestAnimationFrame(loop); } };
      // The inside image drifts with the outside one, so measure against the frame.
      const at = (e: PointerEvent) => { const r = media.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
      media.addEventListener('pointerenter', (e) => {
        [x, y] = at(e); tx = x; ty = y;
        hovering = true;
        inside.style.setProperty('--lx', `${x}px`);
        inside.style.setProperty('--ly', `${y}px`);
        tile.classList.add('is-lens');
      });
      media.addEventListener('pointermove', (e) => { [tx, ty] = at(e); kick(); });
      media.addEventListener('pointerleave', () => { hovering = false; tile.classList.remove('is-lens'); });
    });
  } else {
    // Touch: the slice band reveals the inside image as the tile crosses the
    // screen (its centre moving from 85% to 25% of the viewport).
    sec.classList.add('lens-touch');
    const medias = qa('[data-tile-media]', sec);
    onFrame.push(() => medias.forEach((m) => {
      const r = m.getBoundingClientRect();
      const t = clamp((0.85 * vh() - (r.top + r.height / 2)) / (0.6 * vh()));
      q('[data-tile-inside]', m)!.style.setProperty('--t', t.toFixed(3));
    }));
  }
}

/* ---------- 05 Drift field ---------- */
function setupDrift() {
  const sec = q('[data-drift]');
  if (!sec || reduce) return;
  sec.classList.add('is-live');
  scrub({ el: sec, progress: containOf(sec) });
}

/* ---------- Approach: sticky stage image ---------- */
function setupApproach() {
  const sec = q('[data-approach]');
  if (!sec || reduce) return;
  const stages = qa('[data-stage]', sec);
  const imgs = qa('[data-stage-img]', sec);
  sec.classList.add('is-live');
  const show = (i: number) => {
    stages.forEach((s, k) => s.classList.toggle('is-on', k === i));
    imgs.forEach((im, k) => im.classList.toggle('is-on', k === Math.min(i, imgs.length - 1)));
  };
  // A stage becomes current as it reaches the middle of the screen.
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) show(stages.indexOf(en.target as HTMLElement));
  }), { rootMargin: '-50% 0px -50% 0px' });
  stages.forEach((s) => io.observe(s));
}

/* ---------- 13 Curved social gallery ---------- */
function setupSocial() {
  const sec = q('[data-social]');
  if (!sec) return;
  const stage = q('[data-social-stage]', sec)!;
  const posts = qa('[data-social-post]', sec);
  const caption = q('[data-social-caption]', sec)!;
  const pauseBtn = q<HTMLButtonElement>('[data-social-pause]', sec)!;
  const pauseLabel = q('[data-social-pause-label]', sec)!;
  const n = posts.length;
  sec.classList.add('is-live');

  let pos = 0;          // the post at the centre (fractional while moving)
  let target = 0;       // where a glide is heading
  let raf = 0, inView = false, paused = reduce, hoverPause = false, dragging = false;
  let lifted: HTMLElement | null = null;

  const wrap = (o: number) => ((o % n) + n + n / 2) % n - n / 2;
  const render = () => {
    const visible = isMobile() ? 2 : 3;
    posts.forEach((p, i) => {
      const o = wrap(i - pos);
      const a = Math.abs(o);
      p.style.setProperty('--o', o.toFixed(3));
      p.style.setProperty('--a', a.toFixed(3));
      p.style.setProperty('--zi', String(Math.round(a * 2)));
      p.style.setProperty('--vis', a <= visible + 0.5 ? '1' : String(clamp(visible + 1 - a)));
      p.setAttribute('aria-hidden', a > visible + 0.5 ? 'true' : 'false');
    });
  };
  const centre = () => posts[((Math.round(pos) % n) + n) % n];
  const setCaption = (p: HTMLElement | null) => { caption.textContent = p?.dataset.caption ?? ' '; };

  // A short glide towards `target`.
  const glide = () => {
    const d = target - pos;
    if (Math.abs(d) < 0.002) { pos = target; render(); raf = 0; return; }
    pos += d * 0.14;
    render();
    raf = requestAnimationFrame(glide);
  };
  const go = (t: number) => { target = t; if (!raf) raf = requestAnimationFrame(glide); };
  const step = (dir: number) => { go(Math.round(target) + dir); setCaption(null); };

  q('[data-social-prev]', sec)!.addEventListener('click', () => step(-1));
  q('[data-social-next]', sec)!.addEventListener('click', () => step(1));
  stage.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
  });

  // Drag (pointer) turns it directly; release glides to the nearest post.
  let startX = 0, startPos = 0, stepPx = 1;
  stage.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    dragging = true; sec.classList.add('is-dragging');
    startX = e.clientX; startPos = pos;
    stepPx = posts[0].getBoundingClientRect().width * 1.02 || 200;
    stage.setPointerCapture(e.pointerId);
    cancelAnimationFrame(raf); raf = 0;
  });
  stage.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    pos = startPos - (e.clientX - startX) / stepPx;
    target = pos;
    render();
  });
  const endDrag = () => { if (!dragging) return; dragging = false; sec.classList.remove('is-dragging'); go(Math.round(pos)); };
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);
  // Horizontal wheel only: vertical page scroll is never captured.
  stage.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    go(target + e.deltaX / 240);
    clearTimeout(wheelTimer);
    wheelTimer = window.setTimeout(() => go(Math.round(target)), 140);
  }, { passive: false });
  let wheelTimer = 0;

  // Hover pauses the turn and lifts the post, with its client and campaign below.
  if (fine) posts.forEach((p) => {
    p.addEventListener('pointerenter', () => {
      if (dragging) return;
      hoverPause = true; lifted?.classList.remove('is-lift'); lifted = p; p.classList.add('is-lift'); setCaption(p);
    });
    p.addEventListener('pointerleave', () => { hoverPause = false; p.classList.remove('is-lift'); lifted = null; setCaption(null); });
  });

  // Auto-turn: one post every 4s, only while in view and not paused.
  if (!reduce) {
    pauseBtn.hidden = false;
    pauseBtn.addEventListener('click', () => {
      paused = !paused;
      pauseBtn.setAttribute('aria-pressed', String(paused));
      pauseLabel.textContent = paused ? 'Play' : 'Pause';
    });
    new IntersectionObserver(([en]) => { inView = en.isIntersecting; }, { threshold: 0.25 }).observe(stage);
    stage.addEventListener('focusin', () => { hoverPause = true; });
    stage.addEventListener('focusout', () => { hoverPause = false; });
    window.setInterval(() => {
      if (inView && !paused && !hoverPause && !dragging && !document.hidden) go(Math.round(target) + 1);
    }, 4000);
  }
  onResize.push(render);
  render();
  setCaption(null);
  void centre;
}

/* ---------- 10 Corner-square call to action ---------- */
function setupCta() {
  const sec = q('[data-cta]');
  if (!sec || reduce) return;
  sec.classList.add('is-live');
  const io = new IntersectionObserver(([en]) => {
    if (en.isIntersecting) { sec.classList.add('is-in'); io.disconnect(); }
  }, { rootMargin: '0px 0px -25% 0px' });
  io.observe(q('.cta', sec)!);
}

setupGlide();
setupWipes();
setupFill();
setupWork();
setupDrift();
setupApproach();
setupSocial();
setupCta();
frame();

export {};
