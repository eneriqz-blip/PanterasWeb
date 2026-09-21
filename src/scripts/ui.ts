const root = document.documentElement;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

function safely(init: () => void) {
  try {
    init();
  } catch (error) {
    console.error(error);
  }
}

function initReveal() {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!targets.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
  );
  targets.forEach((el) => observer.observe(el));
}

function initCounters() {
  const counters = document.querySelectorAll<HTMLElement>('[data-count]');
  if (!counters.length || reduceMotion || !('IntersectionObserver' in window)) return;

  const run = (el: HTMLElement) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix ?? '';
    const duration = 1300;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      el.textContent = `${Math.round(target * eased).toLocaleString('en-US')}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          run(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => observer.observe(el));
}

function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  let lastY = window.scrollY;
  let queued = false;

  const update = () => {
    queued = false;
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 8);

    if (!root.classList.contains('menu-open')) {
      const delta = y - lastY;
      if (y > 180 && delta > 6) header.classList.add('is-hidden');
      else if (delta < -6 || y <= 180) header.classList.remove('is-hidden');
    }
    lastY = y;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  header.addEventListener('focusin', () => header.classList.remove('is-hidden'));
  update();
}

function initMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.getElementById('site-menu');
  if (!toggle || !menu) return;

  const inertTargets = Array.from(document.querySelectorAll<HTMLElement>('main, footer'));

  const setOpen = (open: boolean, restoreFocus = false) => {
    root.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    menu.toggleAttribute('inert', !open);
    inertTargets.forEach((el) => el.toggleAttribute('inert', open));
    if (open) {
      document.querySelector<HTMLElement>('[data-header]')?.classList.remove('is-hidden');
      menu.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
    } else if (restoreFocus) {
      toggle.focus({ preventScroll: true });
    }
  };

  toggle.addEventListener('click', () => setOpen(!root.classList.contains('menu-open'), true));

  menu.addEventListener('click', (event) => {
    if ((event.target as Element).closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && root.classList.contains('menu-open')) setOpen(false, true);
  });

  matchMedia('(min-width: 861px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });

  window.addEventListener('pageshow', () => setOpen(false));
}

function initCopy() {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((button) => {
    const label = button.querySelector<HTMLElement>('[data-copy-label]');
    const original = label?.textContent ?? '';

    button.addEventListener('click', async () => {
      const value = button.dataset.copy ?? '';
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        const field = document.createElement('textarea');
        field.value = value;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.appendChild(field);
        field.select();
        document.execCommand('copy');
        field.remove();
      }
      if (label) label.textContent = 'Correo copiado';
      button.classList.add('is-done');
      window.setTimeout(() => {
        if (label) label.textContent = original;
        button.classList.remove('is-done');
      }, 2200);
    });
  });
}

function initRails() {
  document.querySelectorAll<HTMLElement>('[data-rail]').forEach((rail) => {
    const track = rail.querySelector<HTMLElement>('[data-rail-track]');
    const prev = rail.querySelector<HTMLButtonElement>('[data-rail-prev]');
    const next = rail.querySelector<HTMLButtonElement>('[data-rail-next]');
    if (!track || !prev || !next) return;

    const step = () => track.clientWidth * 0.8;
    const update = () => {
      prev.disabled = track.scrollLeft < 8;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
    };

    prev.addEventListener('click', () =>
      track.scrollBy({ left: -step(), behavior: reduceMotion ? 'auto' : 'smooth' })
    );
    next.addEventListener('click', () =>
      track.scrollBy({ left: step(), behavior: reduceMotion ? 'auto' : 'smooth' })
    );
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
}

function initGlow() {
  if (!matchMedia('(hover: hover)').matches) return;

  let frame = 0;
  document.addEventListener(
    'pointermove',
    (event) => {
      const card = (event.target as Element).closest<HTMLElement>('[data-glow]');
      if (!card || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        card.style.setProperty('--my', `${event.clientY - rect.top}px`);
      });
    },
    { passive: true }
  );
}

[initReveal, initCounters, initHeader, initMenu, initCopy, initRails, initGlow].forEach(safely);
