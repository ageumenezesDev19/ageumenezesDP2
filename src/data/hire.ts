import { HireSlug, HireVariant } from "./types";

/**
 * Copy for the two client-facing pages. Everything a proposal links to lives
 * here, so editing what you sell never means touching a component.
 *
 * The retail work is confidential: no client name, no product or supplier, no
 * business rule, no link. Outcome and personal responsibility only — the same
 * line the public portfolio already draws.
 */

const retailSituation =
  "A retail team started every morning reconciling stock by hand across spreadsheets. " +
  "It cost about two hours a day, and by the afternoon nobody trusted the numbers anyway.";

const dev: HireVariant = {
  slug: "dev",
  eyebrow: "Software for operations",
  headline: "The manual process eating your week, replaced by something your team opens every morning.",
  subhead:
    "I build internal tools for small teams — stock, orders, reporting. Not a prototype you " +
    "have to finish yourself: software in production, used daily, with the exports and " +
    "permissions the work actually needs.",
  problems: [
    "Numbers live in three spreadsheets and none of them agree.",
    "Someone rebuilds the same report by hand every week.",
    "The tool you bought does 60% of the job and nobody will change the other 40%.",
  ],
  proof: {
    situation: retailSituation,
    change:
      "I built the system that replaced it — one place the whole team works from, with " +
      "role-based access so people see what belongs to their job.",
    result:
      "In production and used daily since 2025. The morning reconciliation is gone, and the " +
      "reports that used to be assembled by hand now export in a click.",
    built: "Next.js and TypeScript, with end-to-end tests over the flows that would hurt most if they broke.",
  },
  process: [
    {
      title: "We start from the problem, not the feature list",
      body:
        "First conversation is about what's costing you time and what 'fixed' looks like. If " +
        "software isn't the shortest path there, I'll say so.",
    },
    {
      title: "Something real in the first week",
      body:
        "I get it running end to end, however roughly, so we're looking at the thing instead " +
        "of a document. Everything after that is informed by what we learn from it.",
    },
    {
      title: "Scope written down before a fixed price",
      body:
        "I quote fixed once we both agree what's in it. Before that I'd rather work hourly " +
        "for a short discovery — it protects you from paying for my guesswork.",
    },
    {
      title: "You can reach me during your day",
      body:
        "I work from Brazil (UTC-3), which overlaps most of the US and European working day. " +
        "You get progress you can see, not a silence that ends in a surprise.",
    },
  ],
  services: [
    {
      name: "Internal tools and dashboards",
      includes: [
        "Stock, orders, production and the screens around them",
        "Role-based access so each person sees their own job",
        "XLSX and PDF exports that replace manual reporting",
      ],
    },
    {
      name: "Fixing and finishing existing software",
      includes: [
        "Taking over a codebase someone else left mid-way",
        "The missing 40% the original tool never covered",
        "Tests over the flows that cost you money when they break",
      ],
    },
    {
      name: "Integrations and reporting",
      includes: [
        "Pulling two systems into one number you can trust",
        "Scheduled reports instead of someone assembling them",
        "A migration path off the spreadsheet, without losing the history",
      ],
    },
  ],
  crossSell:
    "Some of what I build replaces work a person is doing by hand. When part of the job is " +
    "operational rather than technical, I take that side on as well.",
};

const va: HireVariant = {
  slug: "va",
  eyebrow: "Operations support",
  headline: "The recurring work off your week — and the parts that shouldn't be manual at all, removed.",
  subhead:
    "I handle the repeating operational work behind a small business: data, orders, reporting, " +
    "the follow-ups. And because I build software, the tasks that shouldn't be repeated forever " +
    "don't have to be.",
  problems: [
    "The same data gets typed into two places, every day.",
    "Reporting day costs you an afternoon you don't have.",
    "Things fall through because nobody owns the follow-up.",
  ],
  proof: {
    situation: retailSituation,
    change:
      "I took the reconciliation apart and rebuilt it as one process the team follows, then " +
      "removed the manual step entirely rather than doing it for them forever.",
    result:
      "Two hours a day back, and numbers the team stopped double-checking. Running since 2025.",
    built: "The process is backed by a system I built and still maintain, so it holds up without me watching it.",
  },
  process: [
    {
      title: "I learn your process before changing it",
      body:
        "The first pass is watching how the work is done today and writing it down. Half the " +
        "problems turn out to be steps nobody decided on, they just accumulated.",
    },
    {
      title: "Documented, so it doesn't live in my head",
      body:
        "Everything I take over gets written down as we go. If I'm away, or you bring someone " +
        "else in, the work doesn't stop with me.",
    },
    {
      title: "Repetition gets removed, not absorbed",
      body:
        "If a task runs the same way every time, paying anyone to keep doing it is the wrong " +
        "answer. I'll tell you which ones those are, and what removing them would take.",
    },
    {
      title: "You can reach me during your day",
      body:
        "I work from Brazil (UTC-3), which overlaps most of the US and European working day. " +
        "Set hours, and a written update you can read instead of a meeting.",
    },
  ],
  services: [
    {
      name: "Data and admin support",
      includes: [
        "Entry, cleanup and reconciliation across your systems",
        "Order and inventory records kept current",
        "Catching the mismatches before they reach a customer",
      ],
    },
    {
      name: "Reporting and tracking",
      includes: [
        "The weekly and monthly numbers, assembled and sent",
        "One sheet the team can actually trust",
        "Flagging what moved and what looks wrong",
      ],
    },
    {
      name: "Process cleanup and automation",
      includes: [
        "Writing down how the work is really done today",
        "Removing the steps that exist only out of habit",
        "Automating the ones that repeat identically",
      ],
    },
  ],
  crossSell:
    "When a task is better removed than repeated, I build the automation for it instead of " +
    "billing you to do it forever.",
};

export const hireVariants: Record<HireSlug, HireVariant> = { dev, va };
