import { motion, useReducedMotion } from "framer-motion";
import { Layout, Server, Container, Wrench, Sparkles, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { skillGroups } from "@/data/skills";
import type { SkillGroup } from "@/data/types";

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

// Typed against every group id: a new group without an icon rendered undefined
// and blanked the whole page, and strict is off so nothing flagged it.
const groupIcons: Record<SkillGroup["id"], LucideIcon> = {
  ai: Sparkles,
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
    <div className="p-4 sm:p-10 lg:p-14">
      <div className="max-w-6xl mx-auto">
        <motion.div {...reveal} className="mb-8 md:mb-12">
          <p className="eyebrow mb-3">{t.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            {t.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl">{t.subtitle}</p>
        </motion.div>

        {/* Five groups: 3 + 2 on a six-column grid, and the first alone on a
            row at two columns, so no card is left orphaned on its own line. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {skillGroups.map((group, i) => {
            const Icon = groupIcons[group.id];
            const span = `${i === 0 ? "sm:col-span-2" : ""} ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"}`;
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : i * 0.08 }}
                className={`rounded-xl border border-border bg-card p-5 ${span}`}
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
    </div>
  );
};

export default SkillsSection;
