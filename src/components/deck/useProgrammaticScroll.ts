import { animate, motionValue } from 'framer-motion';
import { useEffect, useSyncExternalStore } from 'react';
import { isProgrammaticScroll, subscribeToProgrammaticScroll } from '@/lib/scroll';

export const useProgrammaticScroll = () =>
  useSyncExternalStore(subscribeToProgrammaticScroll, isProgrammaticScroll, () => false);

const flag = motionValue(0);
let consumers = 0;
let unsubscribe: (() => void) | undefined;
const IN = { duration: 0.2, ease: 'easeOut' as const };
const OUT = { duration: 0.35, ease: 'easeOut' as const };

/** All slides share one subscription and one animation; the last unmount cleans up. */
export function retainProgrammaticScrollValue() {
  if (consumers++ === 0) {
    flag.jump(isProgrammaticScroll() ? 1 : 0);
    unsubscribe = subscribeToProgrammaticScroll(() => {
      const on = isProgrammaticScroll();
      flag.stop();
      animate(flag, on ? 1 : 0, on ? IN : OUT);
    });
  }
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--consumers === 0) {
      unsubscribe?.();
      unsubscribe = undefined;
      flag.jump(0);
    }
  };
}

export function useProgrammaticScrollValue() {
  useEffect(retainProgrammaticScrollValue, []);
  return flag;
}
