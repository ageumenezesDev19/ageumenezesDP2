import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/** Tailwind's `lg`: below it the page is the swipe rail, above it the deck. */
const LG = 1024;

export type DeckMode = "wide" | "compact";

/**
 * Which layout the page is in — a question about width only. Reduced motion is
 * deliberately not folded in here: it must quieten the animation, never take the
 * handheld layout away. Conflating the two once left a phone with
 * `prefers-reduced-motion` rendering the desktop tree, which does not fit it.
 */
export function useDeckMode(): DeckMode {
  // Read synchronously on first render: starting false and correcting in an
  // effect swapped the tree under `useScroll`, which then tracked a node that
  // was no longer mounted and reported a progress that never moved.
  const [wide, setWide] = useState(
    () => window.matchMedia(`(min-width: ${LG}px)`).matches,
  );

  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${LG}px)`);
    const sync = () => setWide(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return wide ? "wide" : "compact";
}

/** Whether the desktop scroll choreography runs. */
export function useDeckEnabled() {
  const mode = useDeckMode();
  const reduce = useReducedMotion();
  return mode === "wide" && !reduce;
}
