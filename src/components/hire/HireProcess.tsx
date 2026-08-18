import { HireVariant } from "@/data/types";

/**
 * What a client hiring someone with no history on the platform is actually
 * worried about: will this person manage themselves, and will I hear from them.
 * Process answers that better than any list of skills.
 */
const HireProcess = ({ variant }: { variant: HireVariant }) => (
  <section className="bg-background px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
    <div className="max-w-3xl mx-auto">
      <p className="eyebrow mb-8">How I work</p>

      <ol className="space-y-8">
        {variant.process.map((step, index) => (
          <li key={step.title} className="flex gap-4 sm:gap-6">
            <span
              className="font-mono text-sm text-primary pt-1 shrink-0 tabular-nums"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-semibold mb-1.5">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default HireProcess;
