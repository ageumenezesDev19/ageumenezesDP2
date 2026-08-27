import { Github, ExternalLink, Maximize2 } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { Project } from "@/data/types";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ProjectStatus, useProjectText } from "./project-labels";


interface ProjectCardProps {
  project: Project;
  image?: string;
  /** Summary that opens the full card in a dialog. On a phone the whole card is
   *  a long vertical scroll inside a card that already scrolls; the summary keeps
   *  the section skimmable and puts the detail one tap away. */
  compact?: boolean;
}

/** Typographic fallback for projects without a screenshot yet: a stack manifest panel. */
const StackManifest = ({ project }: { project: Project }) => (
  <div
    className="h-44 bg-muted/40 border-b border-border p-5 font-mono text-xs leading-relaxed overflow-hidden"
    aria-hidden="true"
  >
    <p className="text-primary mb-2">$ cat stack.txt</p>
    {project.stack.map((tech) => (
      <p key={tech} className="text-muted-foreground">
        <span className="text-primary/60">-</span> {tech}
      </p>
    ))}
  </div>
);


const ProjectCard = ({ project, image, compact }: ProjectCardProps) => {
  const { language } = useLanguage();
  const { t, buttonText } = useProjectText(project);

  if (compact) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="group flex w-full items-center gap-3 rounded-xl border border-border
              bg-card p-3 text-left transition-colors hover:border-primary/50
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {image ? (
              <img
                src={image}
                alt=""
                width={1280}
                height={800}
                loading="lazy"
                decoding="async"
                className="h-16 w-20 shrink-0 rounded-lg border border-border object-cover object-top"
              />
            ) : (
              <span
                className="flex h-16 w-20 shrink-0 items-center justify-center rounded-lg
                  border border-border bg-muted/40 font-mono text-[10px] text-primary"
                aria-hidden="true"
              >
                $ stack
              </span>
            )}
            <span className="min-w-0 flex-1">
              <ProjectStatus project={project} />
              <span className="mt-1 block truncate font-bold tracking-tight">
                {project.title}
              </span>
              {/* No `block` beside it: `line-clamp` needs the `-webkit-box`
                  display it sets, and a display utility next to it wins. */}
              <span className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                {project.description[language]}
              </span>
            </span>
            <Maximize2
              className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
              aria-hidden="true"
            />
            <span className="sr-only">{t.open}</span>
          </button>
        </DialogTrigger>

        {/* The rail behind it keeps its shape; the blur is what says the card is
            on top of the page rather than part of it. */}
        <DialogContent
          className="max-h-[85dvh] w-[92vw] max-w-lg overflow-y-auto overscroll-contain
            rounded-2xl p-0 sm:max-w-lg"
        >
          <DialogTitle className="sr-only">{project.title}</DialogTitle>
          <ProjectCard project={project} image={image} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <article className="group h-full flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-colors hover:border-primary/50">
      {image ? (
        <div className="h-44 overflow-hidden border-b border-border">
          <img
            src={image}
            alt={`${project.title} — screenshot`}
            width={1280}
            height={800}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <StackManifest project={project} />
      )}

      <div className="p-5 flex flex-col flex-1">
        {/* Three states, because "open source" with no repo link to show for it
            is a claim the card can't back up. */}
        <div className="mb-2">
          <ProjectStatus project={project} />
        </div>

        <h3 className="text-lg font-bold tracking-tight mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-1">
          {project.description[language]}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.map((tech) => (
            <span key={tech} className="chip !px-2 !py-0.5 !text-[11px]">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-border">
          {project.links.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
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
              className="inline-flex min-h-11 items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
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
              className="inline-flex min-h-11 items-center gap-1.5 font-mono text-xs text-primary hover:underline underline-offset-4"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              {buttonText}
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
