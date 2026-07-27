import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, FileText, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/providers/language-provider";
import { profile } from "@/data/profile";
import { handleAnchorClick } from "@/lib/scroll";
import { useResumeShare } from "@/lib/use-resume-share";

const heroPhoto = "/photos/ageu-hero.webp";

const content = {
  en: {
    status: "available for freelance work",
    headline1: "Front-end developer",
    headline2: "who ships full products.",
    viewWork: "View work",
    downloadResume: "Download resume",
    contact: "Contact",
    photoCaption: "Ageu Menezes — front-end developer",
  },
  pt: {
    status: "disponível para freelas",
    headline1: "Dev front-end",
    headline2: "que entrega produtos completos.",
    viewWork: "Ver projetos",
    downloadResume: "Baixar currículo",
    contact: "Contato",
    photoCaption: "Ageu Menezes — desenvolvedor front-end",
  },
};

interface HeroSectionProps {
  onExploreClick?: () => void;
}

const HeroSection = ({ onExploreClick = () => {} }: HeroSectionProps) => {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const t = content[language];
  const resume = profile.resume[language];
  const shareResume = useResumeShare(resume);

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.12 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    // dvh keeps the hero from being clipped by mobile browser toolbars
    <section className="min-h-screen supports-[min-height:100dvh]:min-h-[100dvh] flex items-center bg-background px-4 sm:px-6 lg:px-8 pt-24 pb-12 lg:pt-20 lg:pb-0">
      <motion.div
        className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div>
          {/* Mobile identity row: the face shows up before the fold. The full
              badge card below takes over from lg: up. */}
          <motion.div variants={item} className="flex items-center gap-3 mb-6 lg:hidden">
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

          <motion.p variants={item} className="eyebrow hidden lg:flex items-center gap-2 mb-6">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            {t.status}
          </motion.p>

          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6"
          >
            {t.headline1}
            <br />
            <span className="text-primary">{t.headline2}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg text-muted-foreground max-w-xl mb-8"
          >
            {profile.tagline[language]}
          </motion.p>

          <motion.div
            variants={item}
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
              <a
                href={resume.url}
                download={resume.fileName}
                onClick={shareResume}
              >
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
            variants={item}
            className="font-mono text-xs text-muted-foreground leading-relaxed"
          >
            {profile.location[language]}
            <span className="hidden sm:inline"> · </span>
            <span className="block sm:inline">
              React · Next.js · TypeScript · Node.js
            </span>
          </motion.p>
        </div>

        {/* Badge card is desktop-only; mobile shows the compact avatar above. */}
        <div className="hidden lg:flex justify-center lg:justify-end">
          <figure className="w-64 sm:w-72 lg:w-80 rounded-xl border border-border bg-card overflow-hidden shadow-2xl shadow-black/30">
            <img
              src={heroPhoto}
              alt={t.photoCaption}
              width={800}
              height={1067}
              className="object-cover aspect-[4/5] w-full"
            />
            <figcaption className="flex items-center gap-2 border-t-2 border-primary px-4 py-3 font-mono text-xs text-muted-foreground">
              <span className="inline-flex rounded-full h-1.5 w-1.5 bg-primary shrink-0" aria-hidden="true" />
              {t.photoCaption}
            </figcaption>
          </figure>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
