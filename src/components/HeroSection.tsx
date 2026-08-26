import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, FileText, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/providers/language-provider";
import { useTheme } from "@/providers/theme-provider";
import { profile } from "@/data/profile";
import { handleAnchorClick } from "@/lib/scroll";
import { useResumeShare } from "@/lib/use-resume-share";
import { OPENING, OPENING_EASE, openingRuns } from "@/lib/motion";
import { heroPhotos, heroText } from "./hero-content";

/**
 * The desktop hero. Below `lg` the page renders `MobileDeck` instead, which
 * carries its own hero — the two layouts share content, not markup, because one
 * file holding both had 23 branches in it and every mobile change risked this one.
 */
const HeroSection = ({ onExploreClick = () => {} }: { onExploreClick?: () => void }) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const t = heroText[language];
  const resume = profile.resume[language];
  const shareResume = useResumeShare(resume);
  const heroPhoto = heroPhotos[theme];

  // Whether the arrival plays: a reload half-way down the page must not replay it.
  const opening = useRef(openingRuns()).current;

  /**
   * One clock for the arrival, shared with the deck's fan. The stagger stays
   * tight: LCP is recorded on the first frame the <h1> has any opacity, so it is
   * the delay that would cost, never the duration.
   */
  const enter = (at: number) =>
    !opening || reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay: at / 1000, ease: OPENING_EASE },
        };

  return (
    // dvh keeps the hero from being clipped by mobile browser toolbars
    <section className="min-h-screen supports-[min-height:100dvh]:min-h-[100dvh] flex items-center bg-background px-4 sm:px-6 lg:px-8 pt-24 pb-12 lg:pt-20 lg:pb-0">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
        <div>
          {/* Mobile identity row: the face shows up before the fold. The full
              badge card below takes over from lg: up. */}
          <motion.div
            {...enter(OPENING.portrait)}
            className="flex items-center gap-3 mb-6 lg:hidden"
          >
            <img
              src={heroPhoto}
              alt={t.photoCaption}
              width={800}
              height={1067}
              className="h-14 w-14 rounded-full border border-border object-cover object-top shrink-0"
            />
            <p className="eyebrow flex items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              {t.status}
            </p>
          </motion.div>

          <motion.p
            {...enter(OPENING.portrait)}
            className="eyebrow hidden lg:flex items-center gap-2 mb-6"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            {t.status}
          </motion.p>

          <motion.h1
            {...enter(OPENING.headline)}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6"
          >
            {t.headline1}
            <br />
            <span className="text-primary">{t.headline2}</span>
          </motion.h1>

          <motion.p
            {...enter(OPENING.rest)}
            className="text-lg text-muted-foreground max-w-xl mb-8"
          >
            {profile.tagline[language]}
          </motion.p>

          <motion.div
            {...enter(OPENING.rest)}
            className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-10"
          >
            <Button
              size="lg"
              onClick={onExploreClick}
              className="group font-semibold w-full sm:w-auto min-h-11"
            >
              {t.viewWork}
              <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto min-h-11" asChild>
              <a href={resume.url} download={resume.fileName} onClick={shareResume}>
                <FileText className="mr-2 h-4 w-4" />
                {t.downloadResume}
              </a>
            </Button>
            <Button size="lg" variant="ghost" className="w-full sm:w-auto min-h-11" asChild>
              <a href="#contact" onClick={handleAnchorClick}>
                <Mail className="mr-2 h-4 w-4" />
                {t.contact}
              </a>
            </Button>
          </motion.div>

          <motion.p
            {...enter(OPENING.rest)}
            className="font-mono text-xs text-muted-foreground leading-relaxed"
          >
            {profile.location[language]}
            <span className="hidden sm:inline"> · </span>
            <span className="block sm:inline">
              React · Next.js · TypeScript · Node.js
            </span>
          </motion.p>
        </div>

        {/* Badge card is desktop-only; mobile shows the compact avatar above.
            It carries the same variant as the text: without one it was the only
            piece of the hero that arrived already finished. */}
        <motion.div
          {...enter(OPENING.portrait)}
          className="hidden lg:flex justify-center lg:justify-end"
        >
          {/* The deck measures this box to sit itself behind the portrait. */}
          <div className="relative w-64 sm:w-72 lg:w-80" data-deck-anchor>
            {/* One mount token that follows the portrait of the current theme, so
                the frame reads the same in both: a soft edge around the picture
                rather than a card the picture was placed on. The shadow is scaled
                per theme because weight that vanishes on navy turns the same card
                into a sticker on off-white. */}
            <figure className="relative w-full rounded-xl border border-surface-mount bg-surface-mount p-2 pb-0 overflow-hidden shadow-lg shadow-black/5 dark:shadow-2xl dark:shadow-black/30">
              <img
                src={heroPhoto}
                alt={t.photoCaption}
                width={800}
                height={1067}
                className="object-cover aspect-[4/5] w-full rounded-lg"
              />
              <figcaption className="mt-2 flex items-center gap-2 border-t-2 border-primary px-2 py-3 font-mono text-xs text-surface-mount-muted">
                <span
                  className="inline-flex rounded-full h-1.5 w-1.5 bg-primary shrink-0"
                  aria-hidden="true"
                />
                {t.photoCaption}
              </figcaption>
            </figure>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
