import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, FileText, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/providers/language-provider";
import { profile } from "@/data/profile";
import heroPhoto from "@/assets/photos/ageu-hero.webp";

const content = {
  en: {
    status: "available for freelance work",
    headline1: "Front-end developer",
    headline2: "who ships full products.",
    viewWork: "View work",
    downloadCV: "Download CV",
    contact: "Contact",
    photoCaption: "Ageu Menezes — front-end developer",
  },
  pt: {
    status: "disponível para freelas",
    headline1: "Dev front-end",
    headline2: "que entrega produtos completos.",
    viewWork: "Ver projetos",
    downloadCV: "Baixar CV",
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
    <section className="min-h-screen flex items-center bg-background px-4 sm:px-6 lg:px-8 pt-20">
      <motion.div
        className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div>
          <motion.p variants={item} className="eyebrow flex items-center gap-2 mb-6">
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

          <motion.div variants={item} className="flex flex-wrap gap-3 mb-10">
            <Button size="lg" onClick={onExploreClick} className="group font-semibold">
              {t.viewWork}
              <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={profile.resumeUrl} download="Ageu-Menezes-Resume.pdf">
                <FileText className="mr-2 h-4 w-4" />
                {t.downloadCV}
              </a>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <a href="#contact">
                <Mail className="mr-2 h-4 w-4" />
                {t.contact}
              </a>
            </Button>
          </motion.div>

          <motion.p variants={item} className="font-mono text-xs text-muted-foreground">
            {profile.location[language]} · React · Next.js · TypeScript · Node.js
          </motion.p>
        </div>

        <motion.div variants={item} className="flex justify-center lg:justify-end">
          <figure className="relative w-64 sm:w-72 lg:w-80">
            <div
              className="absolute -inset-3 rounded-xl border border-primary/40 translate-x-3 translate-y-3"
              aria-hidden="true"
            />
            <img
              src={heroPhoto}
              alt={t.photoCaption}
              width={800}
              height={1067}
              fetchPriority="high"
              className="relative rounded-xl border border-border object-cover aspect-[4/5] w-full"
            />
            <figcaption className="mt-3 font-mono text-xs text-muted-foreground text-right">
              {t.photoCaption}
            </figcaption>
          </figure>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
