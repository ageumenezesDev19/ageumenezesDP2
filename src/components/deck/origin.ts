/**
 * The one attitude an undealt card has: where it waits in the deck, and where a
 * section flies in from. Both sides read these numbers, so the card leaving the
 * deck and the section arriving occupy the same place by construction rather
 * than by tuning two sets of values against each other.
 *
 * Desktop only. The handheld layout is a swipe rail with its own geometry — a
 * second profile of these numbers was tried and the effect never read at 430 px,
 * because the card is as wide as the portrait covering it and there is no pointer
 * to parallax against.
 */
export const CARD_ORIGIN = {
  x: 260,
  z: -900,
  rotateX: -9,
  rotateY: 18,
};

/** Fan of the waiting cards behind the portrait, in pixels. */
export const HERO_FAN = { x: -20, y: 18, z: -48 };

/**
 * Behind a section the fan is a share of the card, not a fixed step: the same
 * offsets that read behind a 307 px portrait vanish inside a 1152 px section,
 * and a card nobody can see is not a deck.
 */
export const DECK_FAN = { x: -0.05, y: 0.036, z: -0.026 };

export const PERSPECTIVE = 1600;

/** How much of a step each card in the fan adds over the one in front of it. */
const FAN_DECAY = 0.74;

/**
 * Spread of the d-th card in the fan, diminishing so the tail bunches instead of
 * drifting. A linear step meant the fan grew every time the deck gained a card,
 * and splitting Projects in two pushed the last card 156 px off the portrait.
 */
export const spread = (d: number) => (1 - FAN_DECAY ** d) / (1 - FAN_DECAY);

/**
 * The window, in entry progress, where the card dissolves and the section takes
 * over. Everything else — size, position, surface colour — is already settled
 * when it opens, so all that happens inside it is the face changing.
 */
export const HANDOVER = { start: 0.55, end: 0.9 };

/** Progress of the ramp, 0 before the window and 1 after it. Linear on purpose:
 *  the card fades by exactly what the section gains, and the two must sum to 1. */
export const handover = (entry: number) => {
  const t = (entry - HANDOVER.start) / (HANDOVER.end - HANDOVER.start);
  return t < 0 ? 0 : t > 1 ? 1 : t;
};

/**
 * The curve both halves of a handover ride: read on the way in as the distance
 * still to travel, so the card decelerates into the slot, and on the way out as
 * the distance already given up, so the spent card holds its place a moment and
 * then whips off. Linear, it left the frame before its successor had landed.
 *
 * The deck and the section both read it. Easing one side alone silently breaks
 * the rect the two are supposed to share.
 */
export const ease = (t: number) => {
  const d = t < 0 ? 0 : t > 1 ? 1 : t;
  return d * d;
};
