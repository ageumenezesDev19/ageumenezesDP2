import { forwardRef, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Project } from "@/data/types";
import { useLanguage } from "@/providers/language-provider";
import { ProjectStatus, useProjectText } from "./project-labels";

type Props = {
  project: Project;
  image?: string;
  id: string;
  onClose: () => void;
};

/**
 * One project with everything it has, in the space the whole list was using.
 *
 * The height is capped and the panel scrolls inside itself: a section taller
 * than the deck's `92vh` floor starts leaving while it is still being read, and
 * `overscroll-contain` is what stops the scroll at the end of the panel turning
 * into page scroll that advances the deck.
 */
// forwardRef because AnimatePresence's `popLayout` measures its child, and a
// plain function component gives it nothing to measure.
const ProjectDetail = forwardRef<HTMLDivElement, Props>(function ProjectDetail(
  { project, image, id, onClose },
  ref,
) {
  const { language } = useLanguage();
  const { t, buttonText } = useProjectText(project);
  const backRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    backRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      ref={ref}
      layoutId={`project-${project.id}`}
      // Position only. A shared `layoutId` interpolates size with `scaleY`, and
      // between a 134 px row and an 856 px panel that meant every glyph rendered
      // at 14 % height and stretching back out over 350 ms.
      layout="position"
      id={id}
      // z-10: `popLayout` drops the leaving child out of flow without a layer.
      className="relative z-10 max-h-[72vh] overflow-y-auto overscroll-contain
        rounded-xl border border-border bg-card p-5 md:p-7"
    >
      <button
        ref={backRef}
        type="button"
        onClick={onClose}
        className="mb-5 inline-flex min-h-11 items-center gap-2 font-mono text-xs
          text-muted-foreground transition-colors hover:text-primary
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          rounded-md"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t.back}
      </button>

      <div className="grid gap-6 md:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
        {image && (
          <img
            src={image}
            alt={`${project.title} — screenshot`}
            width={1280}
            height={800}
            decoding="async"
            className="h-auto w-full rounded-lg border border-border object-cover object-top"
          />
        )}

        <div className="min-w-0">
          <ProjectStatus project={project} />
          <h3 className="mt-1 text-2xl font-bold tracking-tight">{project.title}</h3>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {project.role[language]}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            {project.description[language]}
          </p>
        </div>
      </div>

      <ul className="mt-6 max-w-3xl space-y-2.5">
        {project.highlights.map((h, i) => (
          <li key={i} className="flex gap-3 text-sm">
            <span className="text-primary font-mono shrink-0" aria-hidden="true">
              →
            </span>
            <span>{h[language]}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span key={tech} className="chip !px-2 !py-0.5 !text-[11px]">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-border pt-4">
        {project.links.repo && (
          <a
            href={project.links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 font-mono text-xs
              text-muted-foreground transition-colors hover:text-primary"
          >
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
            {t.source}
          </a>
        )}
        {project.links.extraRepos?.map((r) => (
          <a
            key={r.url}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 font-mono text-xs
              text-muted-foreground transition-colors hover:text-primary"
          >
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
            {r.label}
          </a>
        ))}
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 font-mono text-xs
              text-primary hover:underline underline-offset-4"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            {buttonText}
          </a>
        )}
      </div>
    </motion.div>
  );
});

export default ProjectDetail;
