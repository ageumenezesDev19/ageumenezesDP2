import { DECK } from "./sections";
import { isProgrammaticScroll, scrollToY } from "@/lib/scroll";

/**
 * Past this much of its arrival a stalled card finishes coming in; below it, it
 * goes back out. Either way it does not stay where it was left — a card parked
 * half-way is a screen with nothing readable on it.
 */
export const COMMIT_AT = 0.35;

/** Slack at both ends, so a card that has effectively arrived is left alone. */
const DEAD_ZONE = 0.06;

/** Where the arrival window closes — `ARRIVAL`'s "start 15%" in SectionSlide. */
const READ_AT = 0.15;

const COMMIT_MS = 450;

/**
 * How long the *input* has to be quiet before the gesture counts as finished —
 * not the scroll, which stops between every click of a notched wheel.
 *
 * The floor is 350 ms, but a slow hand sets its own pace: the wait stretches to
 * 1.7× the gap the reader is actually keeping. Fixed at 350, a wheel turned every
 * 400 ms had a commit in flight when the next notch landed, and the commit's own
 * `scrollTo` overwrote it in the same frame — three of six notches were swallowed.
 */
const QUIET_FLOOR = 350;
const QUIET_CEILING = 900;
const PACE_FACTOR = 1.7;

/** What the reader is driving, and the only thing that starts a gesture. */
const INPUTS = ["wheel", "keydown", "touchstart"] as const;

let running = false;
let lastInput = 0;
/** Gap between the last two inputs — how fast this particular hand is working. */
let pace = 0;
/** −1 up, 1 down, 0 unknown: the direction the reader was going. */
let heading = 0;

const quietFor = () =>
  Math.min(Math.max(pace * PACE_FACTOR, QUIET_FLOOR), QUIET_CEILING);

/**
 * Where the reader was when they interrupted a commit. Until they have moved
 * meaningfully away from it, the watcher keeps its hands off — otherwise the
 * cancel is undone by the very next idle tick and the page appears to ignore
 * them. Measured: without this, an interrupt drifted 341 px on to the target
 * anyway.
 */
let suppressedAt: number | null = null;
const SUPPRESS_UNTIL_MOVED = 40;

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * How far a section has come, straight from geometry. Deliberately not the
 * slide's own spring: that value is still in flight while the scroll rests, and
 * the decision has to be made on where the page *is*.
 */
const progressOf = (el: HTMLElement) => {
  const vh = window.innerHeight;
  return clamp01((vh - el.getBoundingClientRect().top) / (vh * (1 - READ_AT)));
};

function fly(target: number, aim: () => number) {
  running = true;
  scrollToY(target, {
    duration: COMMIT_MS,
    // The flag makes the deck stand aside and the slides swap their spring for a
    // jump — right for a nav shortcut moving ~110 px a frame, wrong here at ~15,
    // where the choreography is the whole point of the movement.
    silent: true,
    settle: aim,
    onDone: (cancelled) => {
      running = false;
      suppressedAt = cancelled ? window.scrollY : null;
    },
  });
}

/**
 * Finishes whatever the scroll started, once it stops. It animates the *page*,
 * not the transforms: carrying the scroll to the reading position drives the
 * existing spring on its own, so the card and the section cannot fall out of
 * phase. Animating progress alongside the scroll would be a second source of
 * truth for one movement.
 */
function settle() {
  if (running || isProgrammaticScroll()) return;
  // Still mid-gesture. A notched wheel turned slowly leaves real gaps between
  // clicks — Safari applies each delta at once instead of animating it, so the
  // scroll genuinely stops in between. Measured, treating that as a finished
  // gesture reversed the page: 720 px asked for downward ended 117 px *up*.
  if (performance.now() - lastInput < quietFor()) return;
  if (suppressedAt !== null) {
    if (Math.abs(window.scrollY - suppressedAt) < SUPPRESS_UNTIL_MOVED) return;
    suppressedAt = null;
  }
  for (const entry of DECK) {
    const el = document.getElementById(entry.id);
    if (!el) continue;
    const p = progressOf(el);
    if (p <= DEAD_ZONE || p >= 1 - DEAD_ZONE) continue;

    const vh = window.innerHeight;
    // Where the reader was heading decides this, and the threshold only breaks
    // ties. A page that moves against the command is a worse failure than a card
    // left half-way, so intent outranks position.
    const forward = heading === 0 ? p >= COMMIT_AT : heading > 0;
    const aim = forward
      ? () => el.getBoundingClientRect().top - vh * READ_AT
      : () => el.getBoundingClientRect().top - vh;
    fly(window.scrollY + aim(), aim);
    return;
  }
}

/** One watcher for the whole deck, not one per slide: the decision needs to see
 *  every section to pick the one actually in transit. */
export function watchForStalls() {
  let timer = 0;
  let lastY = window.scrollY;

  const arm = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(settle, quietFor());
  };

  const onScroll = () => {
    const d = window.scrollY - lastY;
    lastY = window.scrollY;
    // Only the reader's own movement sets the heading; a commit in flight must
    // not teach the watcher its own direction.
    if (!running && d) heading = Math.sign(d);
    arm();
  };

  const onInput = () => {
    const now = performance.now();
    if (lastInput) pace = now - lastInput;
    lastInput = now;
    arm();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  INPUTS.forEach((type) =>
    window.addEventListener(type, onInput, { passive: true }),
  );
  arm();

  return () => {
    window.clearTimeout(timer);
    window.removeEventListener("scroll", onScroll);
    INPUTS.forEach((type) => window.removeEventListener(type, onInput));
  };
}
