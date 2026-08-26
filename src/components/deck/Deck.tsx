import { useEffect, useLayoutEffect, useRef } from "react";
import { Shorthand } from "./Shorthand";
import { DECK, shellOf } from "./sections";
import { useDeckState } from "./DeckContext";
import { useDeckEnabled } from "./useDeckEnabled";
import {
  CARD_ORIGIN,
  DECK_FAN,
  HANDOVER,
  HERO_FAN,
  PERSPECTIVE,
  ease,
  handover,
  spread,
} from "./origin";
import { isProgrammaticScroll, subscribeToProgrammaticScroll } from "@/lib/scroll";
import { OPENING } from "@/lib/motion";
import { watchForStalls } from "./commit";
import {
  POINTER_EASE,
  POINTER_SWING,
  pointerTarget,
  trackPointer,
} from "./pointer";

type Box = { left: number; top: number; width: number; height: number };
type Slot = Box & { full: number };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * How far down the viewport a card is drawn. Sections run past 2000 px and a
 * card that tall would be absurd; what has to match at the handover is the top
 * edge, the sides and the surface, so anything below a screenful is masked away
 * instead of drawn.
 */
const CARD_SPAN = 1;

/** Share of the first section's entry spent leaving the portrait behind. */
const LEAVE_HERO = 0.35;

/** The deck dealing itself open on arrival, in ms: wait, open, one card behind
 *  the next. Timed off the wall clock — a delta accumulated across an idle gap
 *  arrives whole on the first frame and spends the whole budget at once. The
 *  wait is the shared one, so the fan opens against a settled headline. */
const INTRO = { delay: OPENING.deck, span: 780, step: 90 };

/** The shorthand is gone before the section's own heading arrives, so the two
 *  drawings never sit on top of each other mid-handover. */
const FACE_OUT = { start: 0.35, end: 0.6 };

/**
 * Past this distance from the reading position the card stops tracking the
 * section's flight path and settles back into the fan. Inside it — the whole of
 * the handover window and a margin before it — the two are the same object.
 */
const REST_FROM = 1 - HANDOVER.start;

/**
 * The deck, and there is only one. It sits behind the hero portrait, and from
 * the first scroll its box *is* the slot of the section being dealt: the card
 * takes the section's size and the section's colour on the way in, and only
 * then does its face change from shorthand to the real content. Nothing flies
 * off and nothing appears elsewhere — one rectangle, changing state.
 *
 * Everything is written straight to style in a single frame loop: at this rate
 * React state would re-render the tree for nothing.
 */
const Deck = () => {
  const enabled = useDeckEnabled();
  const state = useDeckState();
  const root = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const solids = useRef<(HTMLDivElement | null)[]>([]);
  const faces = useRef<(HTMLDivElement | null)[]>([]);
  const swing = useRef({ x: 0, y: 0 });

  // One watcher for the whole deck: a card left half-way finishes on its own.
  // Desktop only — on a phone the deck is a swipe rail with the system's own
  // momentum, and taking the scroll back from a finger mid-flick is exactly the
  // thing that made the handheld version feel wrong.
  useEffect(() => (enabled ? watchForStalls() : undefined), [enabled]);

  useLayoutEffect(() => {
    if (!enabled || !state) return;
    const progress = DECK.map((entry) => state.dealt[entry.id]);

    // The portrait's place in the document, measured on layout changes only.
    let anchor: Box = { left: 0, top: 0, width: 320, height: 400 };
    const measure = () => {
      const el = document.querySelector<HTMLElement>("[data-deck-anchor]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      anchor = {
        left: r.left,
        top: r.top + window.scrollY,
        width: r.width,
        height: r.height,
      };
    };

    measure();

    // Sections mount lazily, so the lookup retries until the node is there.
    const nodes = new Map<number, HTMLElement>();
    const slotNode = (i: number) => {
      const cached = nodes.get(i);
      if (cached?.isConnected) return cached;
      const el = document.querySelector<HTMLElement>(
        `[data-deck-slot="${DECK[i].id}"]`,
      );
      if (el) nodes.set(i, el);
      return el;
    };

    const slot = (i: number, vh: number): Slot | null => {
      const el = slotNode(i);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        left: r.left,
        top: r.top,
        width: r.width,
        height: Math.min(r.height, vh * CARD_SPAN),
        full: r.height,
      };
    };

    const stopPointer = trackPointer();
    const born = performance.now();
    let frame = 0;
    let lastMask = "";

    const draw = () => {
      frame = 0;
      const layer = root.current;
      const g = group.current;
      if (!layer || !g) return;
      const vh = window.innerHeight;

      // The first card that has not finished arriving is the one being dealt.
      let target = DECK.length;
      for (let i = 0; i < DECK.length; i += 1) {
        if (progress[i].get() < 0.999) {
          target = i;
          break;
        }
      }
      if (target === DECK.length) {
        layer.style.opacity = "0";
        return;
      }
      // Dimmed, not hidden, while a shortcut runs: the ghosts gliding past are
      // half of what makes the trip worth watching, and cutting them left the
      // click with nothing to show.
      layer.style.opacity = isProgrammaticScroll() ? "0.3" : "1";

      const entry = progress[target].get();
      // Continuous across the change of target: as entry reaches 1 the next card
      // takes over at 0 and `dealt` carries straight on.
      const dealt = target + entry;
      // Below this the deck still belongs to the portrait, above it to the sections.
      const hero = target === 0 ? clamp01(entry / LEAVE_HERO) : 1;
      // Size, place and colour are all settled by the time the handover window
      // opens. Landing them on `entry` instead meant the card was still 100 px
      // narrower than the section at the moment it was supposed to be it.
      const seat = clamp01(entry / HANDOVER.start);

      const held = { ...anchor, top: anchor.top - window.scrollY };
      const to = slot(target, vh);
      const from =
        target === 0
          ? held && { ...held, full: held.height }
          : slot(target - 1, vh);
      const box =
        from && to
          ? {
              left: lerp(from.left, to.left, seat),
              top: lerp(from.top, to.top, seat),
              width: lerp(from.width, to.width, seat),
              height: lerp(from.height, to.height, seat),
            }
          : (to ?? from);
      if (!box) return;

      g.style.left = `${box.left}px`;
      g.style.top = `${box.top}px`;
      g.style.width = `${box.width}px`;
      g.style.height = `${box.height}px`;

      // A section shrinks toward the top of its own slot. The deck has to use
      // the same vanishing point or the two projections diverge by hundreds of
      // pixels exactly where they are meant to coincide.
      layer.style.perspectiveOrigin = `50% ${lerp(vh / 2, box.top, hero)}px`;

      const age = performance.now() - born;

      const s = swing.current;
      s.x += (pointerTarget.x - s.x) * POINTER_EASE;
      s.y += (pointerTarget.y - s.y) * POINTER_EASE;
      // Any swing still on the group at the handover breaks the coincidence, so
      // it dies as the front card lands and returns for the cards behind it.
      const sway = clamp01(1 - entry);
      g.style.transform =
        `rotateX(${-s.y * POINTER_SWING.x * sway}deg) ` +
        `rotateY(${s.x * POINTER_SWING.y * sway}deg)`;

      // A fixed step reads behind the portrait and disappears inside a section,
      // so the fan is pixels there and a share of the card here.
      const fan = {
        x: lerp(HERO_FAN.x, DECK_FAN.x * box.width, hero),
        y: lerp(HERO_FAN.y, DECK_FAN.y * box.height, hero),
        z: lerp(HERO_FAN.z, DECK_FAN.z * box.width, hero),
      };

      // Only a card cut short by a tall section needs its bottom edge hidden.
      // Never on mobile: a mask over a 3-D layer is expensive in WebKit, and the
      // shell's own `overflow:hidden` already trims the same edge.
      const cut = to ? to.height < to.full - 1 : false;
      const mask = `linear-gradient(to bottom, #000 ${lerp(100, cut ? 84 : 100, hero)}%, transparent)`;
      const maskChanged = mask !== lastMask;
      lastMask = mask;

      const fade = 1 - handover(entry);
      for (let i = 0; i < DECK.length; i += 1) {
        const card = cards.current[i];
        if (!card) continue;
        if (i < target) {
          card.style.opacity = "0";
          continue;
        }

        // Distance from the reading position: 0 is the section itself, 1 is the
        // next card waiting, and it counts up into the depth from there.
        const d = i - dealt + 1;
        // Past the profile's depth the card is not drawn at all. On a phone that
        // is three composited layers instead of six, which is the difference
        // between the fan being free and it costing frames.
        card.style.willChange = d <= 2 ? "transform" : "auto";
        const near = ease(d);

        // Dealing itself open: the cards start gathered behind the portrait and
        // fan out one behind the next.
        const t = clamp01((age - INTRO.delay - i * INTRO.step) / INTRO.span);
        const open = t * t * (3 - 2 * t);
        // Near the handover the card is on the section's own path; further back
        // it has to sit outside the section's footprint or it is simply hidden
        // behind an opaque card and the deck stops reading as a deck.
        const rest = Math.max(
          clamp01((d - REST_FROM) / (1 - REST_FROM)),
          1 - hero,
        );

        const step = spread(d) * open;
        card.style.transform =
          `translate3d(${lerp(CARD_ORIGIN.x * near, fan.x * step, rest)}px, ` +
          `${lerp(0, fan.y * step, rest)}px, ` +
          `${lerp(CARD_ORIGIN.z * near, fan.z * step, rest)}px) ` +
          `rotateX(${CARD_ORIGIN.rotateX * near * (1 - rest)}deg) ` +
          `rotateY(${CARD_ORIGIN.rotateY * near * (1 - rest)}deg)`;

        // Steeper than it was behind the portrait: the same card is 320 px
        // wide there and a screenful here, and at that size a bright ghost is
        // clutter rather than the edge of a deck.
        const dim = Math.max(1 - Math.max(d - 1, 0) * lerp(0.16, 0.3, hero), 0.1);
        card.style.opacity = String((i === target ? fade : 1) * dim * open);

        const solid = solids.current[i];
        if (solid) solid.style.opacity = i === target ? String(seat) : "0";

        // The shorthand is the face of the card that is arriving. On the ones
        // still waiting it strikes right through the section's own text, which
        // is the opposite of reading as a deck behind it.
        const face = faces.current[i];
        if (face) {
          const out =
            i === target
              ? 1 - clamp01((entry - FACE_OUT.start) / (FACE_OUT.end - FACE_OUT.start))
              : 1;
          face.style.opacity = String(lerp(1, clamp01(1.2 - d * 0.8), hero) * out);
        }

        if (maskChanged) {
          card.style.maskImage = mask;
          card.style.webkitMaskImage = mask;
        }
      }

      // The easing asks for another frame only while it is still catching up:
      // a loop that never sleeps has cost this project a frame budget twice.
      const settled =
        Math.abs(s.x - pointerTarget.x) < 0.0005 &&
        Math.abs(s.y - pointerTarget.y) < 0.0005;
      const opening = age < INTRO.delay + INTRO.step * DECK.length + INTRO.span;
      if (!settled || opening) wake();
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const relayout = () => {
      measure();
      wake();
    };

    draw();
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("pointermove", wake, { passive: true });
    window.addEventListener("resize", relayout);
    // The springs keep moving after the last scroll event, and the deck has to
    // keep pace with them or it lands before the section does.
    const stops = progress.map((value) => value.on("change", wake));
    // One frame when the shortcut releases: at that instant there may be no
    // scroll event left to ask for it, and the layer would stay hidden.
    const stopFlag = subscribeToProgrammaticScroll(wake);

    return () => {
      stopPointer();
      window.removeEventListener("scroll", wake);
      window.removeEventListener("pointermove", wake);
      window.removeEventListener("resize", relayout);
      stops.forEach((stop) => stop());
      stopFlag();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled, state]);

  if (!enabled) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 [transition:opacity_180ms_ease]"
      style={{ perspective: `${PERSPECTIVE}px` }}
    >
      <div
        ref={group}
        className="absolute [transform-style:preserve-3d]"
        style={{ transformOrigin: "50% 0%" }}
      >
        {DECK.map((entry, i) => (
          <div
            key={entry.id}
            ref={(node) => {
              cards.current[i] = node;
            }}
            className="absolute inset-0"
            style={{ transformOrigin: "50% 0%" }}
          >
            <div
              className="absolute inset-0 rounded-3xl border border-foreground/15 bg-foreground/[0.05]
                dark:border-foreground/20 dark:bg-foreground/[0.07]"
            />
            {/* The section's own surface, brought up as the card comes forward:
                a card that hands over to a different ground flashes. */}
            <div
              ref={(node) => {
                solids.current[i] = node;
              }}
              className={`absolute inset-0 rounded-3xl border shadow-2xl shadow-black/10
                dark:shadow-black/40 ${shellOf(entry.tone)}`}
              style={{ opacity: 0 }}
            />
            <div
              ref={(node) => {
                faces.current[i] = node;
              }}
              className="absolute inset-0"
            >
              <Shorthand entry={entry} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deck;
