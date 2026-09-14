/**
 * Pointer position normalised to -1..1 from the centre of the viewport. Ported
 * from the WebGL version this replaced, easing and amplitude included — those
 * numbers were already calibrated against the same deck.
 */
const POINTER_EASE = 0.06;
/** Preserve the 60 Hz response independently of the display refresh rate. */
export const pointerBlend = (elapsedMs: number) =>
  1 - Math.pow(1 - POINTER_EASE, Math.min(Math.max(elapsedMs, 0), 64) / (1000 / 60));
export const POINTER_SWING = { x: 5, y: 8 };

export const pointerTarget = { x: 0, y: 0 };

/** Coarse pointers have no hover to parallax against, and no cursor to follow. */
export function parallaxAvailable() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function trackPointer() {
  pointerTarget.x = pointerTarget.y = 0;
  if (!parallaxAvailable()) return () => {};

  const handle = (event: PointerEvent) => {
    pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointerTarget.y = (event.clientY / window.innerHeight) * 2 - 1;
  };

  window.addEventListener("pointermove", handle, { passive: true });
  return () => window.removeEventListener("pointermove", handle);
}
