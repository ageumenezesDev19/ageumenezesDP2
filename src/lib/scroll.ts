/** Height of the fixed navigation bar (h-16 = 64px). */
const NAV_OFFSET = 64;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

let activeAnimation: number | null = null;
let programmatic = false;
const listeners = new Set<() => void>();

function setProgrammatic(value: boolean) {
  if (programmatic === value) return;
  programmatic = value;
  listeners.forEach((notify) => notify());
}

/**
 * Whether a nav shortcut is driving the scroll right now. 900 ms covers any
 * distance, so a shortcut moves the page by hundreds of pixels a frame — far
 * more than the deck's choreography was ever meant to follow. It stands down
 * while this is true.
 */
export const isProgrammaticScroll = () => programmatic;

/** Kept framework-agnostic so this file owes nothing to the animation library. */
export function subscribeToProgrammaticScroll(notify: () => void) {
  listeners.add(notify);
  return () => {
    listeners.delete(notify);
  };
}

/** Anything the reader does with the page outranks an animation of it. */
const INTERRUPTS = ["wheel", "touchstart", "keydown"] as const;

type ScrollOptions = {
  duration?: number;
  /**
   * Leaves the programmatic flag down. That flag makes the deck stand aside and
   * the slides swap their spring for a jump, which is right for a nav shortcut
   * moving ~110 px a frame and wrong for a commit moving ~15 — there the
   * choreography is the whole point and must keep running.
   */
  silent?: boolean;
  /** Re-read at the end: lazy sections shift the layout mid-flight. */
  settle?: () => number;
  /** `cancelled` is true when the reader interrupted; a caller that would
   *  otherwise start the same animation again needs to know the difference. */
  onDone?: (cancelled: boolean) => void;
};

/**
 * Scrolls to an absolute y with a longer, eased animation. The native
 * `behavior: "smooth"` uses a fixed browser duration that feels abrupt on short
 * distances, so we animate manually.
 */
export function scrollToY(target: number, options: ScrollOptions = {}) {
  const { duration = 900, silent = false, settle, onDone } = options;
  const start = window.scrollY;
  const to = Math.max(0, target);

  const finish = () => {
    activeAnimation = null;
    const drift = settle?.() ?? 0;
    if (Math.abs(drift) > 4) window.scrollTo(0, window.scrollY + drift);
    if (!silent) setProgrammatic(false);
    stop();
    onDone?.(false);
  };

  // `onDone` fires here too: a caller holding a "one at a time" lock would keep
  // it forever if the reader interrupted the only path that released it.
  const abort = () => {
    if (activeAnimation !== null) cancelAnimationFrame(activeAnimation);
    activeAnimation = null;
    if (!silent) setProgrammatic(false);
    stop();
    onDone?.(true);
  };

  const stop = () =>
    INTERRUPTS.forEach((type) => window.removeEventListener(type, abort));

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    if (!silent) setProgrammatic(true);
    window.scrollTo(0, to);
    requestAnimationFrame(() => {
      if (!silent) setProgrammatic(false);
      onDone?.(false);
    });
    return;
  }

  if (activeAnimation !== null) cancelAnimationFrame(activeAnimation);
  if (!silent) setProgrammatic(true);
  INTERRUPTS.forEach((type) =>
    window.addEventListener(type, abort, { passive: true, once: true }),
  );

  const distance = to - start;
  const startTime = performance.now();

  const step = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));
    if (progress < 1) {
      activeAnimation = requestAnimationFrame(step);
      return;
    }
    finish();
  };

  activeAnimation = requestAnimationFrame(step);
}

/** Scrolls to a section, leaving its top under the fixed navigation. */
export function scrollToSection(selector: string, duration = 900) {
  const element = document.querySelector(selector);
  if (!element) return;

  scrollToY(window.scrollY + element.getBoundingClientRect().top - NAV_OFFSET, {
    duration,
    settle: () => element.getBoundingClientRect().top - NAV_OFFSET,
  });
}

/** Click handler for in-page anchor links (`href="#section"`). */
export function handleAnchorClick(event: React.MouseEvent<HTMLAnchorElement>) {
  const href = event.currentTarget.getAttribute("href");
  if (!href?.startsWith("#")) return;

  event.preventDefault();
  scrollToSection(href);
  history.replaceState(null, "", href);
}
