import { Project } from "@/data/types";
import { useLanguage } from "@/providers/language-provider";

/**
 * The words shared by every way a project is drawn — the card, the row and the
 * expanded panel. They live here so a label cannot drift between the three.
 */
export const projectContent = {
  en: {
    liveDemo: "live demo",
    openSource: "open source",
    building: "in progress",
    source: "Source",
    demo: "Live",
    open: "Open details",
    back: "Back to all projects",
  },
  pt: {
    liveDemo: "demo online",
    openSource: "código aberto",
    building: "em construção",
    source: "Código",
    demo: "Ver online",
    open: "Abrir detalhes",
    back: "Voltar para todos os projetos",
  },
};

export type ProjectText = (typeof projectContent)["en"];

/** Labels for one project, with its own override applied where it has one. */
export const useProjectText = (project: Project) => {
  const { language } = useLanguage();
  const t = projectContent[language];
  // A live link that is a demo over invented data says so, instead of "Live".
  const demoLabel = project.links.liveLabel?.[language];
  return {
    t,
    language,
    liveText: demoLabel ?? t.liveDemo,
    buttonText: demoLabel ?? t.demo,
  };
};

/** The dot and word that say what kind of thing this is. */
export const ProjectStatus = ({ project }: { project: Project }) => {
  const { t, liveText } = useProjectText(project);
  return (
    <p className="font-mono text-[11px] text-muted-foreground flex items-center gap-1.5">
      {project.links.live ? (
        <>
          <span className="inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" aria-hidden="true" />
          {liveText}
        </>
      ) : project.links.repo ? (
        <>
          <span className="inline-flex rounded-full h-1.5 w-1.5 bg-muted-foreground/50" aria-hidden="true" />
          {t.openSource}
        </>
      ) : (
        <>
          <span className="inline-flex rounded-full h-1.5 w-1.5 bg-amber-500/70" aria-hidden="true" />
          {t.building}
        </>
      )}
    </p>
  );
};
