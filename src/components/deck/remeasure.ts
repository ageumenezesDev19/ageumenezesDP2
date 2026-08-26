let pending = 0;

/**
 * Makes `useScroll` measure its target again, once, on the frame after a slide
 * mounts. The sections are lazy, so when the hook first runs its target has no
 * layout yet — WebKit then reported every section fully arrived at scrollY 0 and
 * the deck loaded parked three cards in, over a section instead of the portrait.
 * Chromium happened to measure late enough to be right, which is why this went
 * unseen. A resize is the only thing framer remeasures on, and one covers all six.
 */
export function remeasureScroll() {
  if (pending) return;
  pending = requestAnimationFrame(() => {
    pending = 0;
    window.dispatchEvent(new Event("resize"));
  });
}
