import { type DeckEntry } from "./sections";

/**
 * A few marks standing for the section's own layout — a grid for projects, a
 * timeline for experience. Enough to tell the cards apart, faint enough that the
 * stack still reads as one object.
 *
 * Sized in percentages and pinned to the top: the same card is 320 px wide
 * behind the portrait and 1152 px wide when it arrives as a section, and the
 * marks have to survive both without stretching over the whole face.
 */
export const Shorthand = ({ entry }: { entry: DeckEntry }) => (
  <div className="absolute inset-x-[7%] top-[7%] h-[44%] opacity-70">
    {entry.shorthand === "grid" && (
      <div className="grid h-full grid-cols-2 grid-rows-3 gap-[3%]">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="rounded bg-foreground/25" />
        ))}
      </div>
    )}

    {entry.shorthand === "timeline" && (
      <div className="relative h-full pl-[4%]">
        <span className="absolute left-[1%] top-0 h-full w-px bg-foreground/35" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="relative mb-[9%]">
            <span className="absolute -left-[3%] top-1 h-2 w-2 rounded-full bg-primary/70" />
            <div className="mb-[2%] h-[6%] min-h-[6px] w-2/3 rounded bg-foreground/30" />
            <div className="h-[6%] min-h-[6px] w-1/2 rounded bg-foreground/20" />
          </div>
        ))}
      </div>
    )}

    {entry.shorthand === "blocks" && (
      <div className="flex h-full gap-[4%]">
        <div className="h-2/3 w-1/3 rounded bg-foreground/25" />
        <div className="flex flex-1 flex-col justify-start gap-[5%]">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[7%] min-h-[6px] rounded bg-foreground/20"
              style={{ width: `${90 - i * 12}%` }}
            />
          ))}
        </div>
      </div>
    )}

    {entry.shorthand === "chips" && (
      <div className="flex h-full flex-wrap content-start gap-[1.6%]">
        {[13, 9, 16, 8, 12, 14, 9, 10, 15].map((w, i) => (
          <div
            key={i}
            className="h-[8%] min-h-[10px] rounded-full bg-foreground/25"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
    )}

    {entry.shorthand === "form" && (
      <div className="flex h-full flex-col gap-[4%]">
        {[0, 1].map((i) => (
          <div key={i} className="h-[14%] min-h-[14px] rounded bg-foreground/20" />
        ))}
        <div className="h-[38%] rounded bg-foreground/20" />
        <div className="h-[14%] min-h-[14px] w-1/3 rounded bg-primary/60" />
      </div>
    )}
  </div>
);
