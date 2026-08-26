import { animate, motionValue } from "framer-motion";
import { useEffect, useSyncExternalStore } from "react";
import { isProgrammaticScroll, subscribeToProgrammaticScroll } from "@/lib/scroll";

/**
 * True while a nav shortcut is driving the scroll. `useSyncExternalStore` rather
 * than an effect: the flag lives outside React and flips mid-frame.
 */
export const useProgrammaticScroll = () =>
  useSyncExternalStore(
    subscribeToProgrammaticScroll,
    isProgrammaticScroll,
    () => false,
  );

/**
 * The same flag as an animation input. It has to travel through the motion graph
 * rather than through the `style` prop: swapping that prop for `undefined`
 * detaches the transform chain, which then stops recomputing and comes back
 * holding whatever it held before the shortcut started.
 */
const flag = motionValue(0);

/** Ramped, never switched. Dropping it in one frame teleported a damped card
 *  1737 px sideways while it was still on screen; easing out lets it finish the
 *  move it was already making. */
const IN = { duration: 0.2, ease: "easeOut" as const };
const OUT = { duration: 0.35, ease: "easeOut" as const };

export function useProgrammaticScrollValue() {
  useEffect(
    () =>
      subscribeToProgrammaticScroll(() => {
        const on = isProgrammaticScroll();
        animate(flag, on ? 1 : 0, on ? IN : OUT);
      }),
    [],
  );
  return flag;
}
