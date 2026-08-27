import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Project } from "@/data/types";
import { useLanguage } from "@/providers/language-provider";
import { ProjectStatus, useProjectText } from "./project-labels";

type Props = {
  project: Project;
  image?: string;
  /** One of the three that carry the section: same row, more room. */
  featured?: boolean;
  panelId: string;
  onOpen: () => void;
};

/**
 * A project at rest. The whole row is the control, so the target is the size of
 * the row rather than a link inside it, and the image stays — the section is
 * scanned by screenshot before it is read.
 */
const ProjectRow = ({ project, image, featured, panelId, onOpen }: Props) => {
  const { language } = useLanguage();
  const { t } = useProjectText(project);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      data-project-row={project.id}
      layoutId={`project-${project.id}`}
      // Position only. A shared `layoutId` interpolates size with `scaleY`, and
      // between a 134 px row and an 856 px panel that meant every glyph rendered
      // at 14 % height and stretching back out over 350 ms.
      layout="position"
      aria-expanded={false}
      aria-controls={panelId}
      className={`group flex w-full items-center gap-4 overflow-hidden rounded-xl border
        border-border bg-card text-left transition-colors hover:border-primary/50
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        ${featured ? "p-4" : "p-3"}`}
    >
      {image ? (
        <img
          src={image}
          alt=""
          width={1280}
          height={800}
          loading="lazy"
          decoding="async"
          className={`shrink-0 rounded-lg border border-border object-cover object-top
            ${featured ? "h-[100px] w-40" : "h-[72px] w-[115px]"}`}
        />
      ) : (
        <span
          className={`flex shrink-0 items-center justify-center rounded-lg border border-border
            bg-muted/40 font-mono text-[10px] text-primary
            ${featured ? "h-[100px] w-40" : "h-[72px] w-[115px]"}`}
          aria-hidden="true"
        >
          $ stack
        </span>
      )}

      <span className="min-w-0 flex-1">
        <ProjectStatus project={project} />
        <span
          className={`mt-1 block truncate font-bold tracking-tight
            ${featured ? "text-lg" : "text-base"}`}
        >
          {project.title}
        </span>
        {/* No `block` beside it: `line-clamp` needs the `-webkit-box` display it
            sets, and a display utility next to it wins. */}
        {/* Capped measure: the row runs the width of the card, and at 2316 px
            that is 180 characters to a line. */}
        <span
          className={`mt-0.5 max-w-3xl text-xs text-muted-foreground
            ${featured ? "line-clamp-2" : "line-clamp-1"}`}
        >
          {project.description[language]}
        </span>
      </span>

      <ChevronRight
        className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
        aria-hidden="true"
      />
      <span className="sr-only">{t.open}</span>
    </motion.button>
  );
};

export default ProjectRow;
