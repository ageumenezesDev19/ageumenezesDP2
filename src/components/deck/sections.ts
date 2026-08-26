/**
 * The sections the deck holds, in the order they are dealt. The ids match the
 * anchors the navigation scrolls to, so the deck and the nav cannot drift apart.
 *
 * `tone` is the alternating ground the page had as full-width bands. It lives
 * here because the deck has to paint the arriving card in the section's own
 * surface — a card that hands over to a ground it does not share flashes.
 */
export type DeckEntry = {
  id: string;
  shorthand: "grid" | "timeline" | "blocks" | "chips" | "form";
  tone: "muted" | "plain";
};

export const DECK: DeckEntry[] = [
  { id: "projects", shorthand: "blocks", tone: "muted" },
  { id: "work", shorthand: "grid", tone: "plain" },
  { id: "experience", shorthand: "timeline", tone: "muted" },
  { id: "about", shorthand: "blocks", tone: "plain" },
  { id: "skills", shorthand: "chips", tone: "muted" },
  { id: "contact", shorthand: "form", tone: "plain" },
];

/** The section shell, shared by the card and the section it becomes. */
export const shellOf = (tone: DeckEntry["tone"]) =>
  tone === "muted" ? "bg-muted border-border" : "bg-background border-border";
