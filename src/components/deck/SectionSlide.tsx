import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDealt } from "./DeckContext";
import { DECK, shellOf } from "./sections";
import { useDeckEnabled } from "./useDeckEnabled";
import { ARRIVAL, CARD_ORIGIN, PERSPECTIVE, ease, handover } from "./origin";
import { remeasureScroll } from "./remeasure";
import { OPACITY_LIFT, cssArrival, installArrival } from "./arrival";
import { isProgrammaticScroll } from "@/lib/scroll";
import { useProgrammaticScrollValue } from "./useProgrammaticScroll";

/**
 * Chasing the scroll with less drag than before; still short of a bounce.
 *
 * Stiffening it to 420 was tried and reverted: near the end the spring hunts
 * around `restDelta`, and `moving` below flips with it, swapping the `style` prop
 * in and out every frame. That flickered visibly and cost Chromium 24 fps.
 */
const SPRING = { stiffness: 210, damping: 34, mass: 0.7, restDelta: 0.001 };


type Props = {
  id: string;
  children: React.ReactNode;
};

/**
 * One card of the deck. It advances out of the depth into the reading position,
 * is read with no transform at all, and leaves by scrolling off the top like any
 * page content. A sideways exit driven by the next card's arrival faded a tall
 * section while it was still being read.
 */
const SectionSlide = ({ id, children }: Props) => {
  const enabled = useDeckEnabled();
  // Navigation tracks geometry directly; only its crossfade is softened.
  const jump = useProgrammaticScrollValue();
  const ref = useRef<HTMLElement>(null);
  const dealt = useDealt(id);
  const index = DECK.findIndex((entry) => entry.id === id);
  // Where supported the arrival is a scroll-driven CSS animation and nothing
  // below writes to the surface; the motion graph stays for older engines.
  const css = enabled && cssArrival;
  useEffect(() => {
    if (css) installArrival();
  }, [css]);

  const { scrollYProgress: entryRaw } = useScroll({
    target: ref,
    offset: [...ARRIVAL],
  });

  const entry = useSpring(entryRaw, SPRING);

  // A nav shortcut covers any distance in 900 ms. The spring cannot chase that,
  // so during one it stops chasing and tracks the scroll exactly.
  //
  // Handing over on the reader's own speed was tried and dropped: a wheel notch is
  // an instant jump, so one turned slowly reports 997 px/s against 1144 for one
  // turned fast. There is no signal there to switch on, and the firmer spring
  // below covers what that was meant to buy.
  useMotionValueEvent(entryRaw, "change", (v) => {
    if (isProgrammaticScroll()) entry.jump(v);
  });

  // This slide arrived lazily, so its scroll offsets were computed against a
  // node that had no layout. See `remeasure.ts`.
  useEffect(() => remeasureScroll(), []);

  // Keep the motion graph attached even when the reading pose is untransformed.
  // Separate thresholds prevent spring noise from toggling the reading state.
  const [moving, setMoving] = useState(true);
  const movingRef = useRef(true);
  const settle = () => {
    const e = entry.get();
    const next = movingRef.current ? e < 0.9995 : e < 0.998;
    if (next !== movingRef.current) {
      movingRef.current = next;
      setMoving(next);
    }
  };
  useMotionValueEvent(entry, "change", settle);
  useEffect(settle, [entry]);

  useEffect(() => {
    if (!dealt) return;
    // Unsprung under CSS, which follows the scroll exactly: the deck's stand-in
    // card has to read the same number as the surface it hands over to.
    const source = css ? entryRaw : entry;
    // Seeded, not just subscribed: reloading half-way down the page left this at
    // 0 until the first scroll, and the card above reads it to know whether the
    // one below has arrived.
    dealt.set(source.get());
    return source.on("change", (v) => dealt.set(v));
  }, [dealt, entry, entryRaw, css]);

  // Distance still to travel, eased. The deck applies the same curve to the card
  // standing in for this section, so the two keep sharing one rect on the way in.
  const left = useTransform(entry, (e) => ease(1 - e));

  const x = useTransform(left, (r) => CARD_ORIGIN.x * r);
  const y = useTransform(left, (r) => CARD_ORIGIN.y * r);
  const z = useTransform(left, (r) => CARD_ORIGIN.z * r);
  const rotateX = useTransform(left, (r) => CARD_ORIGIN.rotateX * r);

  // The real content fades over an opaque, congruent backing in the deck.
  // The backing is released only after this surface reaches full opacity.
  const opacity = useTransform([entry, jump], ([e, j]: number[]) => {
    const natural = handover(e);
    return natural + (1 - natural) * j * OPACITY_LIFT;
  });

  return (
    // The id sits on the untransformed wrapper so anchor navigation always
    // measures a rect that is where the section actually is. Its padding is the
    // gap the deck's remaining cards show through.
    <section
      id={id}
      ref={ref}
      data-deck-timeline={css || undefined}
      className="px-4 py-6 sm:px-8 lg:px-12 lg:py-10"
    >
      {/* Never transformed: this is the rect the deck measures to land on, and
        it carries the perspective because `perspective` only reaches a direct
        child — on the band outside it the card is a grandchild and stays flat. */}
      <div
        className={`mx-auto max-w-6xl ${
          enabled ? "[perspective-origin:50%_0%]" : ""
        }`}
        style={enabled ? { perspective: `${PERSPECTIVE}px` } : undefined}
        data-deck-slot={id}
      >
        {/* A floor of about one viewport, so a short section is still one card
          per screen and the next only starts arriving once this one is read. */}
        <motion.div
          className={`w-full overflow-hidden rounded-3xl border shadow-2xl shadow-black/10 dark:shadow-black/40 lg:min-h-[92vh] ${shellOf(
            DECK[index].tone,
          )}`}
          data-deck-surface={id}
          data-deck-arrive={css || undefined}
          data-deck-reading={css ? undefined : !enabled || !moving ? "true" : "false"}
          transformTemplate={!css && (!enabled || !moving) ? () => "none" : undefined}
          style={css ? { transformOrigin: "50% 0%" } : { z, x, y, rotateX, opacity, transformOrigin: "50% 0%" }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default SectionSlide;
