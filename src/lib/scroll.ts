/** Height of the fixed navigation bar (h-16 = 64px). */
const NAV_OFFSET = 64;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

let activeAnimation: number | null = null;

/**
 * Scrolls to a section with a longer, eased animation.
 * The native `scrollIntoView({ behavior: "smooth" })` uses a fixed browser
 * duration that feels abrupt on short distances, so we animate manually.
 */
export function scrollToSection(selector: string, duration = 900) {
  const element = document.querySelector(selector);
  if (!element) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const start = window.scrollY;
  const target = Math.max(
    0,
    start + element.getBoundingClientRect().top - NAV_OFFSET,
  );

  if (prefersReducedMotion) {
    window.scrollTo(0, target);
    return;
  }

  if (activeAnimation !== null) cancelAnimationFrame(activeAnimation);

  const distance = target - start;
  const startTime = performance.now();

  const step = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));

    if (progress < 1) {
      activeAnimation = requestAnimationFrame(step);
      return;
    }

    activeAnimation = null;

    // Lazy-loaded sections can shift the layout mid-animation; correct any drift.
    const drift = element.getBoundingClientRect().top - NAV_OFFSET;
    if (Math.abs(drift) > 4) {
      window.scrollTo({ top: window.scrollY + drift, behavior: "smooth" });
    }
  };

  activeAnimation = requestAnimationFrame(step);
}

/** Click handler for in-page anchor links (`href="#section"`). */
export function handleAnchorClick(event: React.MouseEvent<HTMLAnchorElement>) {
  const href = event.currentTarget.getAttribute("href");
  if (!href?.startsWith("#")) return;

  event.preventDefault();
  scrollToSection(href);
  history.replaceState(null, "", href);
}
