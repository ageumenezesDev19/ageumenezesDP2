import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { experience, education } from "@/data/experience";

const content = {
  en: {
    eyebrow: "track record",
    title: "Experience",
    educationTitle: "Education",
  },
  pt: {
    eyebrow: "trajetória",
    title: "Experiência",
    educationTitle: "Formação",
  },
};

const ExperienceSection = () => {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const t = content[language];

  const reveal = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.5 },
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div {...reveal} className="mb-8 md:mb-12">
          <p className="eyebrow mb-3">{t.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12">
          {/* Work timeline */}
          <motion.ol {...reveal} className="relative border-l border-border ml-2 space-y-10">
            {experience.map((item, i) => (
              <li key={i} className="relative pl-8">
                <span
                  className="absolute -left-[9px] top-1 flex h-[17px] w-[17px] items-center justify-center rounded-full border border-primary bg-background"
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                <p className="font-mono text-xs text-primary mb-1.5">
                  {item.period[language]}
                </p>
                <h3 className="text-lg font-bold tracking-tight">
                  {item.title[language]}
                </h3>
                <p className="font-mono text-xs text-muted-foreground mb-3">
                  {item.organization}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {item.description[language]}
                </p>
                {item.stack && (
                  <div className="flex flex-wrap gap-1.5">
                    {item.stack.map((tech) => (
                      <span key={tech} className="chip !px-2 !py-0.5 !text-[11px]">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </motion.ol>

          {/* Education */}
          <motion.div {...reveal}>
            <h3 className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-muted-foreground mb-6">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              {t.educationTitle}
            </h3>
            <div className="space-y-4">
              {education.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h4 className="font-bold tracking-tight">{item.title}</h4>
                    <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                      {item.period[language]}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description[language]}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
