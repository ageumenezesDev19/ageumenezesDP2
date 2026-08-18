import { HireVariant } from "@/data/types";

/**
 * One case, told as situation → change → result.
 *
 * The client's system is confidential, so there is no name, no link, no
 * screenshot and no business rule here — only what changed and what I was
 * responsible for. That limit is worth saying out loud rather than leaving as a
 * gap: a client reading this is about to trust me with their own numbers.
 */
const HireProof = ({ variant }: { variant: HireVariant }) => {
  const { situation, change, result, built } = variant.proof;

  return (
    <section className="bg-background px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-3xl mx-auto">
        <p className="eyebrow mb-8">Work I've done</p>

        <article className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <dl className="space-y-6">
            <div>
              <dt className="eyebrow mb-2">Before</dt>
              <dd className="text-base leading-relaxed text-muted-foreground">{situation}</dd>
            </div>
            <div>
              <dt className="eyebrow mb-2">What I did</dt>
              <dd className="text-base leading-relaxed">{change}</dd>
            </div>
            <div>
              <dt className="eyebrow mb-2">Where it stands</dt>
              <dd className="text-base leading-relaxed font-medium">{result}</dd>
            </div>
          </dl>

          {/* For the client who happens to be technical. One line, so it never
              gets in the way of the one who isn't. */}
          <p className="mt-6 border-t border-border pt-5 font-mono text-xs leading-relaxed text-muted-foreground">
            {built}
          </p>
        </article>

        <p className="mt-5 text-sm text-muted-foreground">
          It's a client's internal system, so details, links and screenshots stay
          private. Happy to walk through the architecture and my part in it on a call.
        </p>
      </div>
    </section>
  );
};

export default HireProof;
