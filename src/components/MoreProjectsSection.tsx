import { useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectRow from "./ProjectRow";
import ProjectDetail from "./ProjectDetail";
import { useLanguage } from "@/providers/language-provider";
import { useTheme } from "@/providers/theme-provider";
import { projects } from "@/data/projects";
import { remeasureScroll } from "./deck/remeasure";
import pitchfolioImg from "@/assets/projects/pitchfolio.webp";
import exactaImg from "@/assets/projects/exacta.webp";
import fitflowImg from "@/assets/projects/fitflow.webp";
import designSystemImg from "@/assets/projects/design-system.webp";
import cortexDarkImg from "@/assets/projects/cortex-dark.jpg";
import cortexLightImg from "@/assets/projects/cortex-light.jpg";

export const projectImages: Record<string, string> = {
  pitchfolio: pitchfolioImg,
  exacta: exactaImg,
  "design-system": designSystemImg,
  fitflow: fitflowImg,
};

/** The three that carry the section. This order is the order on screen. */
const FEATURED = ["cortex", "pitchfolio", "design-system"];

const content = {
  en: {
    eyebrow: "everything else",
    title: "Products and open source",
    subtitle:
      "What I build when the brief is mine — shipped apps, a design system, and tools I use every day.",
    picked: "Start here",
    everythingElse: "Also built",
  },
  pt: {
    eyebrow: "todo o resto",
    title: "Produtos e open source",
    subtitle:
      "O que construo quando o escopo é meu — apps publicados, um design system e ferramentas que uso todo dia.",
    picked: "Comece por aqui",
    everythingElse: "Também construí",
  },
};

const PANEL_ID = "project-detail-panel";

/**
 * The projects that are not the client system. They live on their own card so
 * the flagship is not read as one item in a list of five.
 *
 * Rows rather than a grid of cards: seven cards ran 1697 px, which put the
 * section half again over the deck's `92vh` floor — and a section past that floor
 * begins to leave while it is still being read. Opening one swaps the list for
 * the whole project in the space the list was using.
 */
const MoreProjectsSection = ({ compact }: { compact?: boolean } = {}) => {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const { theme } = useTheme();
  // Cortex is the one project with a shot per theme: a dark screenshot on the
  // light page reads as a different product than the one being looked at.
  const images = {
    ...projectImages,
    cortex: theme === "light" ? cortexLightImg : cortexDarkImg,
  };
  const t = content[language];
  const [openId, setOpenId] = useState<string | null>(null);

  const rest = projects.filter((p) => !p.flagship);
  const featured = FEATURED.map((id) => rest.find((p) => p.id === id)).filter(
    (p): p is (typeof rest)[number] => Boolean(p),
  );
  const others = rest.filter((p) => !FEATURED.includes(p.id));
  const open = rest.find((p) => p.id === openId);

  // Returning focus by query rather than by ref: the row is unmounted while the
  // panel is up, so any ref held across the swap is already stale.
  const close = () => {
    const id = openId;
    setOpenId(null);
    requestAnimationFrame(() =>
      document
        .querySelector<HTMLButtonElement>(`[data-project-row="${id}"]`)
        ?.focus(),
    );
  };

  const reveal = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.5 },
  };

  const rowsFor = (list: typeof rest, isFeatured: boolean) =>
    list.map((project) => (
      <ProjectRow
        key={project.id}
        project={project}
        image={images[project.id]}
        featured={isFeatured}
        panelId={PANEL_ID}
        onOpen={() => setOpenId(project.id)}
      />
    ));

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

        {compact ? (
          // The phone keeps the summary-and-dialog it already had: the rail it
          // sits in slides sideways, and an in-place expansion inside a card
          // that is itself moving reads as the card breaking.
          <div className="grid grid-cols-1 gap-4">
            {rest.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                image={images[project.id]}
                compact
              />
            ))}
          </div>
        ) : (
          // The deck measures this section on a resize and nothing else, so the
          // height change on open and on close has to announce itself.
          // MotionConfig rather than a prop per element: the morph is a layout
          // animation on children this file does not render directly.
          <MotionConfig transition={reduceMotion ? { duration: 0 } : undefined}>
            {/* `relative` is load-bearing: `popLayout` pins the leaving child with
              `position: absolute` at the `offsetTop/offsetLeft` it measured, and
              those two resolve against different ancestors once this wrapper is
              mid-animation and carries a transform. Same element for both, or the
              offset is counted twice and the child lands 261 px low, 57 px right. */}
            <motion.div
              layout
              className="relative"
              onLayoutAnimationComplete={remeasureScroll}
            >
              <AnimatePresence mode="popLayout" initial={false}>
              {open ? (
                <ProjectDetail
                  key="detail"
                  project={open}
                  image={images[open.id]}
                  id={PANEL_ID}
                  onClose={close}
                />
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2 }}
                  className="relative z-0 space-y-3"
                >
                  <p className="eyebrow">{t.picked}</p>
                  {rowsFor(featured, true)}

                  <p className="eyebrow pt-3">{t.everythingElse}</p>
                  <div className="space-y-2">{rowsFor(others, false)}</div>
                </motion.div>
              )}
              </AnimatePresence>
            </motion.div>
          </MotionConfig>
        )}
      </div>
    </div>
  );
};

export default MoreProjectsSection;
