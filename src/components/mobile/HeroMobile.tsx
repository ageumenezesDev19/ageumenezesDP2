import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, FileText, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { useLanguage } from "@/providers/language-provider";
import { useTheme } from "@/providers/theme-provider";
import { profile } from "@/data/profile";
import { useResumeShare } from "@/lib/use-resume-share";
import { OPENING, OPENING_EASE, openingRuns } from "@/lib/motion";
import { heroPhotos, heroStack, heroText } from "../hero-content";
import { NoBreakHyphens } from "../NoBreakHyphens";

/**
 * Card zero of the mobile deck. It holds the full portrait and the name; from the
 * first swipe the rail shrinks it by the same rule it shrinks every other card,
 * and the header picks up the avatar as it goes. That is the whole of "the hero
 * changes size" — no sticky, no prelude, and nothing reading `window.scrollY`,
 * which iOS Safari stops updating mid-flick.
 */
const HeroMobile = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const t = heroText[language];
  const resume = profile.resume[language];
  const shareResume = useResumeShare(resume);
  const opening = useRef(openingRuns()).current;

  const enter = (at: number) =>
    !opening || reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: at / 1000, ease: OPENING_EASE },
        };

  return (
    // Flows at its natural height instead of being squeezed into one. As a
    // `h-full` flex column on a 660 px screen the figure was crushed from 451 px
    // to 180, and since it clips, the portrait lost its chin — while the card
    // reported nothing to scroll, so there was no way to see the rest either.
    <div className="flex min-h-full flex-col justify-center gap-3.5 px-5 py-4">
      <motion.figure
        {...enter(OPENING.portrait)}
        className="relative mx-auto w-full shrink-0 overflow-hidden rounded-2xl border border-surface-mount bg-surface-mount shadow-2xl shadow-black/30"
      >
        {/* A ceiling, not a fixed size: full height where there is room, and only
            as small as a short screen forces. `aspect-ratio` carries the width
            along, so it is never cropped — at 660 px the headline needed 107 px
            that the spacing alone could not give back. */}
        <img
          src={heroPhotos[theme]}
          alt={t.photoCaption}
          width={800}
          height={1067}
          className="mx-auto aspect-[3/4] max-h-[50dvh] w-auto max-w-full object-cover object-center"
        />
        <figcaption className="flex items-center gap-2 border-t-2 border-primary px-3 py-2.5 font-mono text-xs text-surface-mount-muted">
          <span
            className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
            aria-hidden="true"
          />
          <span><NoBreakHyphens text={t.photoCaption} /></span>
        </figcaption>
      </motion.figure>

      <motion.p {...enter(OPENING.portrait)} className="eyebrow flex items-center gap-2">
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        {t.status}
      </motion.p>

      <motion.h1
        {...enter(OPENING.headline)}
        className="text-[2rem] font-bold leading-[1.05] tracking-tight"
      >
        <NoBreakHyphens text={t.headline1} />
        <br />
        <span className="text-primary">{t.headline2}</span>
      </motion.h1>

      <motion.div {...enter(OPENING.rest)} className="flex flex-col gap-2.5">
        {/* An anchor, not a handler: the rail intercepts in-page links and moves
            itself, so this and the menu take the same route. */}
        <Button size="lg" className="min-h-11 w-full font-semibold" asChild>
          <a href="#projects">
            {t.viewWork}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
        <div className="flex gap-2.5">
          <Button size="lg" variant="outline" className="min-h-11 flex-1" asChild>
            <a href={resume.url} download={resume.fileName} onClick={shareResume}>
              <FileText className="mr-2 h-4 w-4" />
              {t.downloadResume}
            </a>
          </Button>
          <Button size="lg" variant="ghost" className="min-h-11" asChild>
            <a href="#contact">
              <Mail className="h-4 w-4" />
              <span className="sr-only">{t.contact}</span>
            </a>
          </Button>
        </div>
      </motion.div>

      <motion.p
        {...enter(OPENING.rest)}
        className="font-mono text-[0.7rem] leading-relaxed text-muted-foreground"
      >
        {profile.location[language]}
        <span className="block">{heroStack.join(" · ")}</span>
      </motion.p>
    </div>
  );
};

export default HeroMobile;
