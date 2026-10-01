import { CARD_ORIGIN, ease, handover } from "./origin";
import { isProgrammaticScroll, subscribeToProgrammaticScroll } from "@/lib/scroll";

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
export const OPACITY_LIFT = 0.45;

/**
 * Whether the arrival can run as a scroll-driven CSS animation. Driven from
 * script it trails the browser's own scrolling by a frame or more and judders;
 * Safari 26.4+ and Chromium resolve these with the scroll itself.
 */
export const cssArrival =
  typeof CSS !== "undefined" &&
  CSS.supports("animation-timeline: view()") &&
  CSS.supports("view-timeline-name: --deck-arrive") &&
  CSS.supports("animation-range: cover 0% cover 85vh");

const STEP = 5;

/** Sampled from the same constants and curves the script path reads, so the
 *  two paths and the deck's stand-in card cannot drift apart. */
const keyframes = (name: string, lift: number) => {
  const stops: string[] = [];
  for (let p = 0; p <= 100; p += STEP) {
    const r = ease(1 - p / 100);
    const n = handover(p / 100);
    const transform =
      r === 0
        ? "none"
        : `translate3d(${CARD_ORIGIN.x * r}px, ${CARD_ORIGIN.y * r}px, ${CARD_ORIGIN.z * r}px) ` +
          `rotateX(${CARD_ORIGIN.rotateX * r}deg)`;
    stops.push(`${p}% { transform: ${transform}; opacity: ${n + (1 - n) * lift}; }`);
  }
  return `@keyframes ${name} { ${stops.join(" ")} }`;
};

/* The timeline spans `ARRIVAL`: section top at the viewport's foot to 15 % down.
   `animation` resets the timeline, so the longhands come after it. */
const css = `
${keyframes("deck-arrive", 0)}
${keyframes("deck-arrive-lift", OPACITY_LIFT)}
[data-deck-timeline] { view-timeline-name: --deck-arrive; }
[data-deck-arrive] {
  animation: deck-arrive linear both;
  animation-timeline: --deck-arrive;
  animation-range: cover 0% cover 85vh;
}
:root[data-deck-jump] [data-deck-arrive] { animation-name: deck-arrive-lift; }
`;

let installed = false;

/** Injects the keyframes once and mirrors nav shortcuts onto `<html>`. */
export function installArrival() {
  if (installed || !cssArrival) return;
  installed = true;
  const style = document.createElement("style");
  style.dataset.deck = "arrival";
  style.textContent = css;
  document.head.appendChild(style);
  const sync = () =>
    document.documentElement.toggleAttribute("data-deck-jump", isProgrammaticScroll());
  subscribeToProgrammaticScroll(sync);
  sync();
}
