/**
 * Site-wide behaviour. Small, dependency-free, and safe to run on every page.
 */

const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ---------- Outside / Inside view ---------- */
function setView(view: 'outside' | 'inside', persist = true) {
  root.dataset.view = view;
  document.querySelectorAll<HTMLButtonElement>('[data-view-toggle]').forEach((btn) => {
    btn.setAttribute('aria-checked', String(view === 'inside'));
  });
  const meta = document.querySelector('meta[name="theme-color"]');
  meta?.setAttribute('content', view === 'inside' ? '#1f1a29' : '#ffffff');
  if (persist) {
    try { localStorage.setItem('oi-view', view); } catch { /* storage unavailable: fine */ }
  }
  document.dispatchEvent(new CustomEvent('oi:view', { detail: view }));
}
setView(root.dataset.view === 'inside' ? 'inside' : 'outside', false);

document.addEventListener('click', (e) => {
  const t = (e.target as HTMLElement).closest('[data-view-toggle], [data-view-flip], [data-view-set]');
  if (!t) return;
  const wanted = t.getAttribute('data-view-set') as 'outside' | 'inside' | null;
  setView(wanted ?? (root.dataset.view === 'inside' ? 'outside' : 'inside'));
});

/* ---------- Header state ---------- */
const header = document.querySelector<HTMLElement>('[data-header]');
const hero = document.querySelector<HTMLElement>('[data-hero]');
const onScroll = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 8);
  // Homepage: reveal the header logo once the hero logo has scrolled away.
  if (hero) header?.classList.toggle('is-past-hero', window.scrollY > hero.offsetHeight * 0.55);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- Mobile menu ---------- */
const menuBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
const menu = document.querySelector<HTMLElement>('[data-menu]');

function closeMenu(returnFocus = true) {
  if (!menu || !menuBtn || menu.hidden) return;
  menu.hidden = true;
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.querySelector('.menu-btn__label')!.textContent = 'Menu';
  document.body.style.overflow = '';
  if (returnFocus) menuBtn.focus();
}
function openMenu() {
  if (!menu || !menuBtn) return;
  menu.hidden = false;
  menuBtn.setAttribute('aria-expanded', 'true');
  menuBtn.querySelector('.menu-btn__label')!.textContent = 'Close';
  document.body.style.overflow = 'hidden';
  menu.querySelector<HTMLAnchorElement>('a')?.focus();
}
menuBtn?.addEventListener('click', () => (menu?.hidden ? openMenu() : closeMenu()));
menu?.addEventListener('click', (e) => {
  if ((e.target as HTMLElement).closest('a')) closeMenu(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
  // Keep keyboard focus inside the open menu (button + menu contents).
  if (e.key === 'Tab' && menu && !menu.hidden && menuBtn) {
    const items = [menuBtn, ...menu.querySelectorAll<HTMLElement>('a, button')];
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});
window.matchMedia('(min-width: 961px)').addEventListener('change', (m) => m.matches && closeMenu(false));

/* ---------- Reveal on scroll ---------- */
const revealables = document.querySelectorAll<HTMLElement>('[data-reveal]');
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  revealables.forEach((el) => io.observe(el));
} else {
  revealables.forEach((el) => el.classList.add('is-in'));
}

/* ---------- Slice headlines: close, then shift into place when seen ---------- */
const slices = document.querySelectorAll<HTMLElement>('[data-slice]');
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const so = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) {
      setTimeout(() => en.target.classList.add('is-open'), 200);
      so.unobserve(en.target);
    }
  }), { threshold: 0.4 });
  slices.forEach((s) => so.observe(s));
} else {
  slices.forEach((s) => s.classList.add('is-open'));
}

/* ---------- Interactive logo (hero) ----------
   1. Plays the intro (CSS), then hands control to the pointer.
   2. The slice follows the pointer across the hero.
   3. While idle and on screen, it gives a short "blink" every few seconds. */
document.querySelectorAll<SVGSVGElement>('[data-logo="interactive"]').forEach((logo) => {
  const zone = logo.closest<HTMLElement>('[data-logo-zone]') ?? logo.parentElement!;
  let introDone = false;
  const release = () => { if (!introDone) { introDone = true; logo.classList.remove('oi-logo--load'); } };
  logo.querySelector('.oi-slice--i')?.addEventListener('animationend', release, { once: true });
  setTimeout(release, 2200);
  if (reduceMotion.matches) return;

  let raf = 0;
  let lastMove = 0;
  const update = (clientX: number) => {
    lastMove = Date.now();
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const r = zone.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
      // 0 at the far left (letters whole), 1 in the middle (the real logo), 1.8 far right.
      logo.style.setProperty('--oi-k', (p * 1.8).toFixed(3));
    });
  };
  const reset = () => logo.style.setProperty('--oi-k', '1');
  if (window.matchMedia('(pointer: fine)').matches) {
    zone.addEventListener('pointermove', (e) => update(e.clientX));
    zone.addEventListener('pointerleave', reset);
  } else {
    zone.addEventListener('touchmove', (e) => update(e.touches[0].clientX), { passive: true });
    zone.addEventListener('touchend', reset);
  }

  // Idle pulse, only while visible and nobody is steering it.
  let visible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(logo);
  }
  // If the hero has colour pairs, the background flips to the next pair at the
  // moment the slices are whole (40% into the blink), so the change feels cut-in.
  const heroEl = logo.closest<HTMLElement>('[data-pair]');
  const pairs = 4;
  const pulse = () => {
    if (!introDone || !visible || document.hidden || Date.now() - lastMove < 1500) return;
    logo.style.setProperty('--oi-k', '1');
    logo.classList.add('oi-logo--pulse');
    logo.querySelector('.oi-slice--i')?.addEventListener('animationend', () => logo.classList.remove('oi-logo--pulse'), { once: true });
    if (heroEl) {
      window.setTimeout(() => {
        heroEl.dataset.pair = String((Number(heroEl.dataset.pair ?? 0) + 1) % pairs);
      }, 170);
    }
  };
  // One colour change every 1.6s: fast, but well under the three-flashes-a-second safety limit.
  window.setInterval(pulse, 1600);
});

export {};
