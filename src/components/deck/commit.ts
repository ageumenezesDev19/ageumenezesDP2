import { DECK } from './sections';
import { cancelScroll, isScrollAnimating, scrollToY, subscribeToProgrammaticScroll } from '@/lib/scroll';
import { isPageScrollInput } from '@/lib/scroll-input';
import { READ_AT } from './origin';

export const COMMIT_AT = 0.35;
const DEAD_ZONE = 0.06;
const COMMIT_MS = 450;
const QUIET_FLOOR = 350;
const QUIET_CEILING = 900;
const PACE_FACTOR = 1.7;
const SUPPRESS_UNTIL_MOVED = 40;
const INPUTS = ['wheel', 'keydown', 'touchstart', 'pointerdown'] as const;

/** Only a real document movement following user input earns one soft settle. */
export function watchForStalls() {
  let timer = 0;
  let lastY = window.scrollY;
  let lastInput = -Infinity;
  let lastScroll = -Infinity;
  let pace = 0;
  let heading = 0;
  let eligible = false;
  let armed = false;
  let disposed = false;
  let held = false;
  let ended = true;
  let suppressedAt: number | null = null;
  let cancelCommit: (() => void) | null = null;
  const hasScrollEnd = 'onscrollend' in document;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width: 1024px)');
  const quietFor = () => Math.min(Math.max(pace * PACE_FACTOR, QUIET_FLOOR), QUIET_CEILING);
  const reset = () => {
    window.clearTimeout(timer);
    armed = eligible = false;
    heading = 0;
    lastY = window.scrollY;
  };

  const settle = () => {
    if (disposed || !armed || held || isScrollAnimating() || reduce.matches || !desktop.matches) return;
    // scrollend alone is insufficient: a wheel can finish between two notches.
    if (hasScrollEnd && !ended) return;
    const remaining = Math.max(lastInput + quietFor(), lastScroll + (hasScrollEnd ? 0 : QUIET_FLOOR)) - performance.now();
    if (remaining > 0) { timer = window.setTimeout(settle, remaining); return; }
    armed = eligible = false;
    if (suppressedAt !== null) {
      if (Math.abs(window.scrollY - suppressedAt) < SUPPRESS_UNTIL_MOVED) return;
      suppressedAt = null;
    }
    for (const entry of DECK) {
      const el = document.getElementById(entry.id);
      if (!el) continue;
      const vh = window.innerHeight;
      const p = (vh - el.getBoundingClientRect().top) / (vh * (1 - READ_AT));
      if (p <= DEAD_ZONE || p >= 1 - DEAD_ZONE) continue;
      const forward = heading === 0 ? p >= COMMIT_AT : heading > 0;
      const aim = () => el.getBoundingClientRect().top - window.innerHeight * (forward ? READ_AT : 1);
      cancelCommit = scrollToY(window.scrollY + aim(), {
        duration: COMMIT_MS,
        silent: true,
        settle: aim,
        onDone: (cancelled) => {
          cancelCommit = null;
          suppressedAt = cancelled ? window.scrollY : null;
          lastY = window.scrollY;
        },
      });
      return;
    }
  };
  const arm = () => {
    window.clearTimeout(timer);
    if (eligible || armed) timer = window.setTimeout(() => {
      if (!armed && !held) eligible = false;
      settle();
    }, quietFor());
  };
  const onScroll = () => {
    const delta = window.scrollY - lastY;
    lastY = window.scrollY;
    if (!delta || isScrollAnimating() || !eligible) return;
    heading = Math.sign(delta);
    armed = true;
    ended = false;
    lastScroll = performance.now();
    arm();
  };
  const onInput = (event: Event) => {
    if (!isPageScrollInput(event)) {
      reset();
      return;
    }
    // Cancel first: its callback records the exact point at which control returns.
    cancelScroll();
    const now = performance.now();
    if (event.type === 'wheel' || event.type === 'keydown') {
      const gap = now - lastInput;
      pace = gap < QUIET_CEILING ? gap : 0;
    }
    lastInput = now;
    eligible = true;
    if (event.type === 'touchstart' || event.type === 'pointerdown' || event.type === 'keydown') held = true;
    arm();
  };
  const release = () => { held = false; arm(); };
  const onEnd = () => { ended = true; settle(); };
  const onMode = () => {
    if (reduce.matches || !desktop.matches) { reset(); cancelCommit?.(); }
  };
  // Nav-generated scroll events, including its final queued event, cannot rearm us.
  const stopNavigation = subscribeToProgrammaticScroll(reset);
  window.addEventListener('scroll', onScroll, { passive: true });
  INPUTS.forEach((type) => window.addEventListener(type, onInput, { passive: true }));
  const RELEASES = ['keyup', 'pointerup', 'pointercancel', 'touchend', 'touchcancel', 'blur'] as const;
  RELEASES.forEach((type) => window.addEventListener(type, release, { passive: true }));
  if (hasScrollEnd) document.addEventListener('scrollend', onEnd);
  reduce.addEventListener('change', onMode);
  desktop.addEventListener('change', onMode);

  return () => {
    disposed = true;
    reset();
    cancelCommit?.();
    stopNavigation();
    window.removeEventListener('scroll', onScroll);
    INPUTS.forEach((type) => window.removeEventListener(type, onInput));
    RELEASES.forEach((type) => window.removeEventListener(type, release));
    document.removeEventListener('scrollend', onEnd);
    reduce.removeEventListener('change', onMode);
    desktop.removeEventListener('change', onMode);
  };
}
