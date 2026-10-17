/**
 * Homepage v2 effects. Spec: docs/homepage-v2-spec.md.
 *
 * Every section works without this script (finished state, plain links). The
 * script switches each effect on by adding a class, and does nothing for people
 * who prefer reduced motion beyond the few controls that must still work (the
 * Outside/Inside switch, the touch row highlight, the social captions).
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

/* ---------- 03 Outside/Inside lens ---------- */
function setupLens() {
  const sec = q('[data-featured]');
  if (!sec) return;
  const items = qa('[data-lens-item]', sec);
  // The switch works in every mode, and is the only behaviour with reduced motion.
  items.forEach((item) => {
    const btn = q<HTMLButtonElement>('[data-lens-switch]', item)!;
    btn.addEventListener('click', () => {
      const on = !item.classList.contains('is-inside');
      item.classList.toggle('is-inside', on);
      btn.setAttribute('aria-pressed', String(on));
    });
  });
  if (reduce) return;

  if (fine) {
    sec.classList.add('lens-fine');
    let inView = true;
    new IntersectionObserver(([en]) => {
      inView = en.isIntersecting;
      if (!inView) items.forEach((i) => i.classList.remove('is-lens'));
    }).observe(sec);
    items.forEach((item) => {
      const media = q('[data-lens-media]', item)!;
      const inside = q('[data-lens-inside]', item)!;
      let x = 0, y = 0, tx = 0, ty = 0, last = 0, raf = 0, hovering = false;
      const loop = (t: number) => {
        const dt = last ? t - last : 16;
        last = t;
        const k = 1 - Math.exp(-dt / 80); // eases after the pointer with about 80ms lag
        x += (tx - x) * k;
        y += (ty - y) * k;
        inside.style.setProperty('--lx', `${x.toFixed(1)}px`);
        inside.style.setProperty('--ly', `${y.toFixed(1)}px`);
        if (hovering && inView && (Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3)) raf = requestAnimationFrame(loop);
        else raf = 0;
      };
      const kick = () => { if (!raf) { last = 0; raf = requestAnimationFrame(loop); } };
      media.addEventListener('pointerenter', (e) => {
        const r = media.getBoundingClientRect();
        x = tx = e.clientX - r.left;
        y = ty = e.clientY - r.top;
        hovering = true;
        inside.style.setProperty('--lx', `${x}px`);
        inside.style.setProperty('--ly', `${y}px`);
        item.classList.add('is-lens');
      });
      media.addEventListener('pointermove', (e) => {
        const r = media.getBoundingClientRect();
        tx = e.clientX - r.left;
        ty = e.clientY - r.top;
        kick();
      });
      media.addEventListener('pointerleave', () => {
        hovering = false;
        item.classList.remove('is-lens');
      });
    });
  } else {
    sec.classList.add('lens-touch');
    // The wipe runs while the image centre moves from 85% to 25% of the viewport.
    const medias = qa('[data-lens-media]', sec);
    const measure = () => medias.forEach((m) => {
      const h = m.offsetHeight, v = vh();
      m.style.setProperty('--r0', `${((0.15 * v + h / 2) / (v + h)) * 100}%`);
      m.style.setProperty('--r1', `${((0.75 * v + h / 2) / (v + h)) * 100}%`);
    });
    measure();
    onResize.push(measure);
    medias.forEach((m) => scrub({
      el: m,
      progress: () => {
        const r = m.getBoundingClientRect();
        return (0.85 * vh() - (r.top + r.height / 2)) / (0.6 * vh());
      },
    }));
  }
}

/* ---------- 04 Project stack ---------- */
function setupStack() {
  const sec = q('[data-stack]');
  if (!sec || reduce) return;
  sec.classList.add('is-live');
  const items = qa('[data-stack-item]', sec);
  const now = q('.stack__now', sec)!;
  const countEl = q('[data-stack-count]', sec)!;
  const clientEl = q('[data-stack-client]', sec)!;
  const typeEl = q('[data-stack-type]', sec)!;
  const progress = containOf(sec);
  const pad = (n: number) => String(n).padStart(2, '0');
  let active = -1, swapTimer = 0;
  const show = (i: number, n: number) => {
    countEl.textContent = `${pad(i + 1)} / ${pad(n)}`;
    clientEl.textContent = items[i].dataset.client ?? '';
    typeEl.textContent = items[i].dataset.type ?? '';
  };
  const update = () => {
    const mob = isMobile();
    const n = mob ? Math.min(5, items.length) : items.length;
    const T = Number(mob ? sec.dataset.tMob : sec.dataset.tDesk);
    // Card i is flat at the centre when progress × T = 0.6 × (i + 1).
    const i = clamp(Math.round((clamp(progress()) * T) / 0.6 - 1), 0, n - 1);
    if (i === active) return;
    const first = active === -1;
    active = i;
    items.forEach((it, k) => {
      it.classList.toggle('is-active', k === i);
      q('a', it)!.tabIndex = k === i ? 0 : -1;
    });
    if (first) { show(i, n); return; }
    // Labels swap with a 150ms fade.
    now.classList.add('is-swapping');
    clearTimeout(swapTimer);
    swapTimer = window.setTimeout(() => { show(active, n); now.classList.remove('is-swapping'); }, 150);
  };
  update();
  onFrame.push(update);
  onResize.push(() => { active = -1; update(); });
  scrub({ el: sec, progress });
}

/* ---------- 05 Drift field ---------- */
function setupDrift() {
  const sec = q('[data-drift]');
  if (!sec || reduce) return;
  sec.classList.add('is-live');
  scrub({ el: sec, progress: containOf(sec) });
}

/* ---------- 06 Notched cards: on touch, the row crossing the middle lights up ---------- */
function setupCards() {
  const sec = q('[data-cards]');
  if (!sec || fine) return;
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    en.target.classList.toggle('is-hot', en.isIntersecting);
  }), { rootMargin: '-50% 0px -50% 0px' });
  qa('[data-row]', sec).forEach((r) => io.observe(r));
}

/* ---------- 07 Colour card strip ---------- */
function setupStrip() {
  const sec = q('[data-strip]');
  if (!sec || reduce) return;
  const viewport = q('[data-strip-viewport]', sec)!;
  const row = q('[data-strip-row]', sec)!;
  sec.classList.add('is-live');
  if (fine) {
    sec.classList.add('strip--slide');
    const measure = () => {
      const cs = getComputedStyle(viewport);
      const visible = viewport.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      sec.style.setProperty('--overflow', `${Math.max(0, row.scrollWidth - visible)}px`);
    };
    measure();
    onResize.push(measure);
    scrub({ el: sec, progress: coverOf(sec, 0.15, 0.85) });
  } else {
    sec.classList.add('strip--swipe');
    viewport.tabIndex = 0;
    viewport.setAttribute('role', 'region');
    viewport.setAttribute('aria-label', 'How we think, scrolls sideways');
    const dots = qa('[data-strip-dots] span', sec);
    const items = [...row.children] as HTMLElement[];
    const update = () => {
      const x = viewport.scrollLeft;
      let best = 0;
      items.forEach((it, i) => { if (Math.abs(it.offsetLeft - x) < Math.abs(items[best].offsetLeft - x)) best = i; });
      dots.forEach((d, i) => d.classList.toggle('is-on', i === best));
    };
    viewport.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    update();
  }
}

/* ---------- 08 Line-by-line statements + tag trail ---------- */
function setupSay() {
  const sec = q('[data-say]');
  if (!sec || reduce) return;
  sec.classList.add('is-live');
  const list = q('[data-say-list]', sec)!;
  const io = new IntersectionObserver(([en]) => {
    if (en.isIntersecting) { sec.classList.add('is-in'); io.disconnect(); }
  }, { rootMargin: '0px 0px -30% 0px' });
  io.observe(list);
  if (!fine) return;

  sec.classList.add('has-trail');
  const trail = q('[data-trail]', sec)!;
  const words: [string, string][] = JSON.parse(sec.dataset.trailWords || '[]');
  let inView = false, lastX = 0, lastY = 0, travelled = 0, next = 0, primed = false;
  new IntersectionObserver(([en]) => { inView = en.isIntersecting; }).observe(sec);
  sec.addEventListener('pointerleave', () => { primed = false; });
  sec.addEventListener('pointermove', (e) => {
    if (!inView) return;
    const r = sec.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    if (!primed) { primed = true; lastX = x; lastY = y; return; }
    travelled += Math.hypot(x - lastX, y - lastY);
    lastX = x; lastY = y;
    // A tag every 60px of pointer travel; at most 8 on screen.
    while (travelled >= 60) {
      travelled -= 60;
      const [word, colour] = words[next++ % words.length];
      const tag = document.createElement('span');
      tag.className = 'say__trail-tag';
      tag.textContent = word;
      tag.style.setProperty('--c', `var(--${colour})`);
      tag.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      tag.addEventListener('animationend', () => tag.remove(), { once: true });
      trail.appendChild(tag);
      while (trail.children.length > 8) trail.firstElementChild!.remove();
    }
  });
}

/* ---------- 09 Social fan ---------- */
function setupFan() {
  const sec = q('[data-fan]');
  if (!sec) return;
  const deck = q('[data-fan-deck]', sec)!;
  const cards = qa<HTMLButtonElement>('[data-fan-card]', sec);
  const caption = q('[data-fan-caption]', sec)!;
  const n = cards.length, mid = (n - 1) / 2;
  // Position k in the fan for each card (DOM order to start with).
  const order = cards.map((_, i) => i);
  const layout = () => order.forEach((cardIndex, k) => {
    cards[cardIndex].style.setProperty('--o', String(k - mid));
    cards[cardIndex].style.setProperty('--i', String(k));
  });

  const lift = (card: HTMLButtonElement | null) => {
    const k = card ? order.indexOf(cards.indexOf(card)) : -1;
    cards.forEach((c) => {
      const kc = order.indexOf(cards.indexOf(c));
      c.classList.toggle('is-lift', c === card);
      c.style.setProperty('--lean', !card || reduce || c === card ? '0' : String(Math.sign(kc - k)));
    });
    caption.textContent = card ? card.dataset.caption ?? '' : ' ';
  };
  cards.forEach((c) => {
    c.addEventListener('focus', () => lift(c));
    c.addEventListener('blur', () => lift(null));
    if (fine) {
      c.addEventListener('pointerenter', () => lift(c));
      c.addEventListener('pointerleave', () => lift(document.activeElement && cards.includes(document.activeElement as HTMLButtonElement) ? document.activeElement as HTMLButtonElement : null));
    }
  });

  if (!fine) {
    // Touch: tapping or swiping the top card flicks it to the back.
    const flick = () => {
      order.unshift(order.pop()!);
      layout();
      const top = cards[order[order.length - 1]];
      caption.textContent = top.dataset.caption ?? ' ';
    };
    let startX = 0, swiped = 0;
    deck.addEventListener('pointerdown', (e) => { startX = e.clientX; });
    deck.addEventListener('pointerup', (e) => {
      if (Math.abs(e.clientX - startX) > 40) { swiped = Date.now(); flick(); }
    });
    cards.forEach((c) => c.addEventListener('click', () => { if (Date.now() - swiped > 400) flick(); }));
  }

  if (reduce) return;
  deck.classList.add('is-live', 'is-piled');
  const io = new IntersectionObserver(([en]) => {
    if (!en.isIntersecting) return;
    io.disconnect();
    deck.classList.remove('is-piled');
    window.setTimeout(() => deck.classList.add('is-dealt'), 600 + 60 * n + 100);
  }, { rootMargin: '0px 0px -30% 0px' });
  io.observe(deck);
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
setupLens();
setupStack();
setupDrift();
setupCards();
setupStrip();
setupSay();
setupFan();
setupCta();
frame();

export {};
