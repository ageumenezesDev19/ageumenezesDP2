import { Fragment } from "react";

/** Wraps at spaces but never at a hyphen, so "Front-End" can't split into "Front-" / "End". */
export const NoBreakHyphens = ({ text }: { text: string }) => (
  <>
    {text.split(" ").map((word, i) => (
      <Fragment key={i}>
        {i > 0 && " "}
        {word.includes("-") ? <span className="whitespace-nowrap">{word}</span> : word}
      </Fragment>
    ))}
  </>
);
