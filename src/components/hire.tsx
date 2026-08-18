import { useEffect } from "react";
import HireHero from "./hire/HireHero";
import HireProblem from "./hire/HireProblem";
import HireProof from "./hire/HireProof";
import HireProcess from "./hire/HireProcess";
import HireServices from "./hire/HireServices";
import HireContact, { HireContactMode } from "./hire/HireContact";
import { hireVariants } from "@/data/hire";
import { profile } from "@/data/profile";
import { HireSlug } from "@/data/types";

/**
 * The client-facing page, sent as a link inside a proposal. Two variants share
 * this composition and differ only in data — duplicating the page would have
 * let them drift apart on the first edit.
 *
 * There is no Navigation and no Footer: both link back to the recruiter-facing
 * portfolio, and keeping the two apart is the whole point.
 */
const Hire = ({
  slug,
  contact = "upwork",
}: {
  slug: HireSlug;
  contact?: HireContactMode;
}) => {
  const variant = hireVariants[slug];

  // robots.txt covers crawlers that read it; this covers the ones that only
  // look at the page. Set here rather than in index.html so the recruiter
  // portfolio at / stays indexable.
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);

    // Short: this is a tab label and a link preview, not a second headline.
    const previousTitle = document.title;
    document.title = `${variant.eyebrow} — ${profile.name}`;

    return () => {
      meta.remove();
      document.title = previousTitle;
    };
  }, [variant]);

  return (
    <div className="bg-background min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]
          focus:rounded-md focus:border focus:border-border focus:bg-background
          focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-foreground"
      >
        Skip to main content
      </a>

      <main id="main-content" tabIndex={-1}>
        <HireHero variant={variant} />
        <HireProblem variant={variant} />
        <HireProof variant={variant} />
        <HireProcess variant={variant} />
        <HireServices variant={variant} />
        <HireContact mode={contact} />
      </main>
    </div>
  );
};

export default Hire;
