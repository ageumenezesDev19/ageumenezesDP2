import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDealt, useSuccessor } from "./DeckContext";
import { DECK, shellOf } from "./sections";
import { useDeckEnabled } from "./useDeckEnabled";
import { ARRIVAL, ARRIVAL_SPAN, CARD_ORIGIN, PERSPECTIVE, ease, handover } from "./origin";
import { remeasureScroll } from "./remeasure";
import { isProgrammaticScroll } from "@/lib/scroll";
import { useProgrammaticScrollValue } from "./useProgrammaticScroll";

/**
 * How far a spent card travels off to its side. Wider than any viewport this
 * runs on, so the card is gone rather than parked at the edge; the container
 * clips the overflow.
 */
const EXIT_TRAVEL = 1800;

/**
 * Chasing the scroll with less drag than before; still short of a bounce.
 *
 * Stiffening it to 420 was tried and reverted: near the end the spring hunts
 * around `restDelta`, and `moving` below flips with it, swapping the `style` prop
 * in and out every frame. That flickered visibly and cost Chromium 24 fps.
 */
const SPRING = { stiffness: 210, damping: 34, mass: 0.7, restDelta: 0.001 };


/**
 * How far the crossfade is pulled towards opaque while a shortcut runs. This is
 * the whole of what a shortcut changes.
 *
 * Scaling the *positions* was tried twice and cannot work: the page moves some
 * 110 px a frame under a shortcut, so a card either covers its travel in that
 * time or it does not. Scaling everything parked a spent card mid-screen and
 * then dragged it off at a crawl; weighting the scale by the live part of the
 * gesture fixed the crawl but compounded two rising curves into 1269 px jumps.
 */
const OPACITY_LIFT = 0.45;


type Props = {
  id: string;
  children: React.ReactNode;
};

/**
 * One card of the deck. It advances out of the depth into the reading position,
 * is read with no transform at all, then leaves to one side as the next card
 * takes its place.
 *
 * Leaving is not a window of its own: a card leaves on exactly the scroll that
 * brings the next one in, because it reads that card's arrival as its own exit.
 * Two windows tuned to nearly coincide came apart section by section — sections
 * run from 594 px to 1373 px, and a short one began leaving before it had landed.
 */
const SectionSlide = ({ id, children }: Props) => {
  const enabled = useDeckEnabled();
  // Navigation tracks geometry directly; only its crossfade is softened.
  const jump = useProgrammaticScrollValue();
  const ref = useRef<HTMLElement>(null);
  const dealt = useDealt(id);
  const successor = useSuccessor(id);

  // Odd cards leave to the left, even to the right, so the deck does not tic
  // in one direction all the way down.
  const index = DECK.findIndex((entry) => entry.id === id);
  const exitSign = index % 2 === 0 ? 1 : -1;

  const { scrollYProgress: entryRaw } = useScroll({
    target: ref,
    offset: [...ARRIVAL],
  });

  const never = useMotionValue(0);
  const entry = useSpring(entryRaw, SPRING);
  // Already sprung by the card that publishes it: springing it again would put
  // the two halves of one handover on different clocks.
  const exit = successor ?? never;

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

  // The hold below is a share of the viewport, so it has to be remeasured.
  const [vh, setVh] = useState(() => window.innerHeight);
  useEffect(() => {
    const sync = () => setVh(window.innerHeight);
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  // This slide arrived lazily, so its scroll offsets were computed against a
  // node that had no layout. See `remeasure.ts`.
  useEffect(() => remeasureScroll(), []);

  // Keep the motion graph attached even when the reading pose is untransformed.
  // Separate thresholds prevent spring noise from toggling the reading state.
  const [moving, setMoving] = useState(true);
  const movingRef = useRef(true);
  const settle = () => {
    const e = entry.get();
    const o = exit.get();
    const next = movingRef.current
      ? !(e >= 0.9995 && o <= 0.0005)
      : e < 0.998 || o > 0.002;
    if (next !== movingRef.current) {
      movingRef.current = next;
      setMoving(next);
    }
  };
  useMotionValueEvent(entry, "change", settle);
  useMotionValueEvent(exit, "change", settle);
  useEffect(settle, [entry, exit]);

  useEffect(() => {
    if (!dealt) return;
    // Seeded, not just subscribed: reloading half-way down the page left this at
    // 0 until the first scroll, and the card above reads it to know whether the
    // one below has arrived.
    dealt.set(entry.get());
    return entry.on("change", (v) => dealt.set(v));
  }, [dealt, entry]);

  // Distance still to travel, eased. The deck applies the same curve to the card
  // standing in for this section, so the two keep sharing one rect on the way in.
  const left = useTransform(entry, (e) => ease(1 - e));

  const z = useTransform(left, (r) => CARD_ORIGIN.z * r);
  const rotateX = useTransform(left, (r) => CARD_ORIGIN.rotateX * r);
  const enterTurn = useTransform(left, (r) => CARD_ORIGIN.rotateY * r);
  // Same curve, read the other way: slow to break away, then quick.
  const leaveTurn = useTransform(exit, (o) => ease(o) * -22 * exitSign);
  const rotateY = useTransform(
    [enterTurn, leaveTurn],
    ([a, b]: number[]) => a + b,
  );

  const enterX = useTransform(left, (r) => CARD_ORIGIN.x * r);
  const leaveX = useTransform(exit, (o) => ease(o) * exitSign * EXIT_TRAVEL);
  const x = useTransform([enterX, leaveX], ([a, b]: number[]) => a + b);

  // Gives back exactly what the scroll takes away while the card leaves, so it
  // slides aside from where it was being read. Without it the card had already
  // been carried 610 px above the viewport before the sideways move began, and
  // the whole gesture happened out of sight. Linear against the same progress
  // that drives `x`: the two halves of the move cannot fall out of phase.
  const y = useTransform(exit, (o) => o * ARRIVAL_SPAN * vh);

  // The real content fades over an opaque, congruent backing in the deck.
  // The backing is released only after this surface reaches full opacity.
  const opacity = useTransform([entry, exit, jump], ([e, o, j]: number[]) => {
    const natural = Math.min(handover(e), 1 - o * 0.9);
    return natural + (1 - natural) * j * OPACITY_LIFT;
  });

  return (
    // The id sits on the untransformed wrapper so anchor navigation always
    // measures a rect that is where the section actually is. Its padding is the
    // gap the deck's remaining cards show through.
    <section
      id={id}
      ref={ref}
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
        {/* A floor of about one viewport. It is what puts the card's top near
          the top of the screen at the moment its successor comes into range —
          which is when it starts to leave, so the sideways move happens with
          the card full in front of the reader instead of above them. `svh` on
          mobile, not `dvh`: the floor must not change size as the address bar
          collapses under a card that is mid-flight. */}
        <motion.div
          className={`w-full overflow-hidden rounded-3xl border shadow-2xl shadow-black/10 dark:shadow-black/40 lg:min-h-[92vh] ${shellOf(
            DECK[index].tone,
          )}`}
          data-deck-surface={id}
          data-deck-reading={!enabled || !moving ? "true" : "false"}
          transformTemplate={!enabled || !moving ? () => "none" : undefined}
          style={{ z, x, y, rotateX, rotateY, opacity, transformOrigin: "50% 0%" }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default SectionSlide;
