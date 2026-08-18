import { Check } from "lucide-react";
import { HireVariant } from "@/data/types";

/**
 * Scope, deliberately without prices. The bid attached to the proposal already
 * carries the number, and a second one here either undercuts it or makes the
 * bid look expensive next to it.
 */
const HireServices = ({ variant }: { variant: HireVariant }) => (
  <section
    id="services"
    className="bg-surface-mount text-surface-mount-foreground px-4 sm:px-6 lg:px-8 py-16 sm:py-20 scroll-mt-16"
  >
    <div className="max-w-3xl mx-auto">
      <p className="eyebrow mb-8">What I can take on</p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {variant.services.map((service) => (
          <article
            key={service.name}
            className="rounded-xl border border-border bg-card text-card-foreground p-5"
          >
            <h3 className="font-semibold mb-4">{service.name}</h3>
            <ul className="space-y-2.5">
              {service.includes.map((line) => (
                <li key={line} className="flex gap-2.5 text-sm leading-relaxed">
                  <Check className="h-4 w-4 shrink-0 mt-0.5 text-primary" aria-hidden="true" />
                  <span className="text-muted-foreground">{line}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {/* One line reaching into the other variant. A section here would blur
          the page's answer to "what do you do". */}
      <p className="mt-8 text-sm leading-relaxed text-surface-mount-muted">{variant.crossSell}</p>
    </div>
  </section>
);

export default HireServices;
