import { HireVariant } from "@/data/types";

/**
 * Three sentences a client should recognise as their own. It comes before any
 * claim about me, because someone who doesn't see their problem here isn't the
 * right fit and both of us are better off knowing early.
 */
const HireProblem = ({ variant }: { variant: HireVariant }) => (
  <section className="bg-surface-deep text-surface-deep-foreground px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
    <div className="max-w-3xl mx-auto">
      {/* .eyebrow takes its colour from the theme's primary, but this band is
          dark in both themes — in light that pairing measured 3.46:1 at 12px.
          surface-deep-muted is the token meant for text on this surface. */}
      <p className="eyebrow !text-surface-deep-muted mb-8">Sound familiar?</p>

      <ul className="space-y-6">
        {variant.problems.map((problem) => (
          <li key={problem} className="flex gap-4">
            <span
              className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl leading-relaxed">{problem}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default HireProblem;
