import { motion, useReducedMotion } from "framer-motion";
import { Layout, Server, Container, Wrench } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { skillGroups } from "@/data/skills";

const content = {
  en: {
    eyebrow: "toolbox",
    title: "Skills",
    subtitle: "What I use to take a product from design to production.",
  },
  pt: {
    eyebrow: "caixa de ferramentas",
    title: "Habilidades",
    subtitle: "O que uso para levar um produto do design à produção.",
  },
};

const groupIcons = {
  frontend: Layout,
  backend: Server,
  devops: Container,
  tools: Wrench,
};

const SkillsSection = () => {
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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            {t.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, i) => {
            const Icon = groupIcons[group.id];
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : i * 0.08 }}
                className="rounded-xl border border-border bg-card p-5"
              >
                <h3 className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-primary mb-4">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {group.label[language]}
                </h3>
                <ul className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <li key={skill} className="chip">
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
