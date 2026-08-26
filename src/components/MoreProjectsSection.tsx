import { motion, useReducedMotion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useLanguage } from "@/providers/language-provider";
import { projects } from "@/data/projects";
import pitchfolioImg from "@/assets/projects/pitchfolio.webp";
import exactaImg from "@/assets/projects/exacta.webp";
import fitflowImg from "@/assets/projects/fitflow.webp";
import designSystemImg from "@/assets/projects/design-system.webp";

export const projectImages: Record<string, string> = {
  pitchfolio: pitchfolioImg,
  exacta: exactaImg,
  "design-system": designSystemImg,
  fitflow: fitflowImg,
};

const content = {
  en: {
    eyebrow: "everything else",
    title: "Products and open source",
    subtitle:
      "What I build when the brief is mine — shipped apps, a design system, and tools I use every day.",
  },
  pt: {
    eyebrow: "todo o resto",
    title: "Produtos e open source",
    subtitle:
      "O que construo quando o escopo é meu — apps publicados, um design system e ferramentas que uso todo dia.",
  },
};

/**
 * The projects that are not the client system. They live on their own card so
 * the flagship is not read as one item in a list of five.
 */
const MoreProjectsSection = ({ compact }: { compact?: boolean } = {}) => {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const t = content[language];

  const rest = projects.filter((p) => !p.flagship);

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

        {/* Swipeable row on phones, grid from md: up. The stagger is driven by
            the track (not per card) — with whileInView on each card, the ones
            off-screen horizontally would stay invisible and the swipe
            affordance would be lost. */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } },
          }}
          // Stacked on a phone, not a swipe strip: the handheld layout puts this
          // inside a card that already slides sideways, and two carousels on the
          // same axis fought for the same thumb. Only the base changes — `md` and
          // up keep the grid they always had.
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
        >
          {rest.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <ProjectCard
                project={project}
                image={projectImages[project.id]}
                compact={compact}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MoreProjectsSection;
