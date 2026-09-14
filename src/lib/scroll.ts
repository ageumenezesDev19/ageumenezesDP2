import { isPageScrollInput } from './scroll-input';

const NAV_OFFSET = 64;
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

type CancelScroll = () => void;
let active: { cancel: CancelScroll } | null = null;
let generation = 0;
let programmatic = false;
const listeners = new Set<() => void>();

function setProgrammatic(value: boolean) {
  if (programmatic === value) return;
  programmatic = value;
  listeners.forEach((notify) => notify());
}

/** Navigation shortcuts bypass the deck spring; soft settling does not. */
export const isProgrammaticScroll = () => programmatic;
export const isScrollAnimating = () => active !== null;
export const cancelScroll = () => active?.cancel();

export function subscribeToProgrammaticScroll(notify: () => void) {
  listeners.add(notify);
  return () => { listeners.delete(notify); };
}

type ScrollOptions = {
  duration?: number;
  silent?: boolean;
  /** Remaining distance to a destination whose layout can change during flight. */
  settle?: () => number;
  onDone?: (cancelled: boolean) => void;
};

/** One owner for every animated document scroll. Cancellation is idempotent. */
export function scrollToY(target: number, options: ScrollOptions = {}): CancelScroll {
  const request = ++generation;
  active?.cancel();
  // A completion callback may itself request a newer destination.
  if (request !== generation) {
    options.onDone?.(true);
    return () => {};
  }
  const { duration = 900, silent = false, settle, onDone } = options;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width: 1024px)');
  const startedWide = desktop.matches;
  const start = window.scrollY;
  const clamp = (y: number) => Math.max(0, Math.min(y, Math.max(0, document.documentElement.scrollHeight - window.innerHeight)));
  const to = clamp(Number.isFinite(target) ? target : start);
  let frame = 0;
  let done = false;

  const complete = (cancelled: boolean) => {
    if (done) return;
    done = true;
    cancelAnimationFrame(frame);
    ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach((type) => window.removeEventListener(type, interrupt));
    window.removeEventListener('pagehide', cancel);
    reduce.removeEventListener('change', preferenceChanged);
    desktop.removeEventListener('change', modeChanged);
    if (active === owner) {
      active = null;
      setProgrammatic(false);
    }
    onDone?.(cancelled);
  };
  const cancel = () => complete(true);
  const interrupt = (event: Event) => { if (isPageScrollInput(event)) cancel(); };
  const preferenceChanged = () => { if (reduce.matches) cancel(); };
  const modeChanged = () => { if (startedWide && !desktop.matches) cancel(); };
  const owner = { cancel };
  active = owner;
  setProgrammatic(!silent);
  ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach((type) => window.addEventListener(type, interrupt, { passive: true }));
  window.addEventListener('pagehide', cancel);
  reduce.addEventListener('change', preferenceChanged);
  desktop.addEventListener('change', modeChanged);

  const startTime = performance.now();
  const immediate = reduce.matches || duration <= 0;
  const step = (now: number) => {
    if (done) return;
    const progress = immediate ? 1 : Math.min((now - startTime) / duration, 1);
    // Read before writing; lazy content and expanded rows can move the target.
    const destination = settle ? clamp(window.scrollY + settle()) : to;
    window.scrollTo(0, start + (destination - start) * easeInOutCubic(progress));
    if (progress < 1) frame = requestAnimationFrame(step);
    else complete(false);
  };
  if (immediate) {
    window.scrollTo(0, to);
    // Keep completion asynchronous so every caller can first retain its cancel handle.
  }
  frame = requestAnimationFrame(step);
  return cancel;
}

export function scrollToSection(selector: string, duration = 900) {
  const element = document.querySelector(selector);
  if (!element) return;
  return scrollToY(window.scrollY + element.getBoundingClientRect().top - NAV_OFFSET, {
    duration,
    settle: () => element.getBoundingClientRect().top - NAV_OFFSET,
  });
}

export function handleAnchorClick(event: React.MouseEvent<HTMLAnchorElement>) {
  const href = event.currentTarget.getAttribute('href');
  if (!href?.startsWith('#')) return;
  event.preventDefault();
  scrollToSection(href);
  history.replaceState(null, '', href);
}
