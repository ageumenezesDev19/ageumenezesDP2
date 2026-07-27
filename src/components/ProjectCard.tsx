import { Github, ExternalLink } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { Project } from "@/data/types";

const content = {
  en: { liveDemo: "live demo", openSource: "open source", source: "Source", demo: "Live" },
  pt: { liveDemo: "demo online", openSource: "código aberto", source: "Código", demo: "Ver online" },
};

interface ProjectCardProps {
  project: Project;
  image?: string;
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

const ProjectCard = ({ project, image }: ProjectCardProps) => {
  const { language } = useLanguage();
  const t = content[language];

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
        <p className="font-mono text-[11px] text-muted-foreground mb-2 flex items-center gap-1.5">
          {project.links.live ? (
            <>
              <span className="inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" aria-hidden="true" />
              {t.liveDemo}
            </>
          ) : (
            <>
              <span className="inline-flex rounded-full h-1.5 w-1.5 bg-muted-foreground/50" aria-hidden="true" />
              {t.openSource}
            </>
          )}
        </p>

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
              {t.demo}
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
