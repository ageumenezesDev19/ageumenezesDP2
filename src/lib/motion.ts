/**
 * The arrival, on one clock. The hero's stagger and the deck's fan each counted
 * from their own zero, so the cards opened against a headline still on its way in.
 */
export const OPENING = {
  /** The portrait is the anchor of the shot; everything else times off it. */
  portrait: 80,
  headline: 260,
  deck: 420,
  /** Desktop only — on mobile these belong to the scroll prelude, not the clock. */
  rest: 620,
};

export const OPENING_SPAN = 0.7;

export const OPENING_EASE = [0.22, 1, 0.36, 1] as const;

/** A reload half-way down the page must not replay the arrival. */
export const openingRuns = () => window.scrollY < 4;

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
