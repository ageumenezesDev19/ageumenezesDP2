import { motion, useReducedMotion } from "framer-motion";
import { Lock, ArrowUpRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { useLanguage } from "@/providers/language-provider";
import { projects } from "@/data/projects";
import { handleAnchorClick } from "@/lib/scroll";
import komerbenImg from "@/assets/projects/komerben.webp";
import despensaImg from "@/assets/projects/despensa.webp";
import fitflowImg from "@/assets/projects/fitflow.webp";
import igniteShopImg from "@/assets/projects/ignite-shop.webp";

export const projectImages: Record<string, string> = {
  komerben: komerbenImg,
  despensa: despensaImg,
  fitflow: fitflowImg,
  "ignite-shop": igniteShopImg,
};

const content = {
  en: {
    eyebrow: "selected work",
    title: "Projects",
    subtitle:
      "Real products with real deploys — starting with the client system I maintain in production.",
    underNda: "under NDA",
    inProduction: "in production",
    imageCaption: "Representative interface — client data withheld",
    ndaNote:
      "This is client work: the code and data are confidential. I'm happy to talk through the architecture and my decisions on a call.",
    askAbout: "Ask me about this project",
  },
  pt: {
    eyebrow: "trabalhos selecionados",
    title: "Projetos",
    subtitle:
      "Produtos reais com deploys reais — começando pelo sistema de cliente que mantenho em produção.",
    underNda: "sob NDA",
    inProduction: "em produção",
    imageCaption: "Interface representativa — dados do cliente omitidos",
    ndaNote:
      "Este é um trabalho para cliente: código e dados são confidenciais. Posso falar sobre a arquitetura e minhas decisões em uma call.",
    askAbout: "Pergunte sobre este projeto",
  },
};

const ProjectsSection = () => {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const t = content[language];

  const flagship = projects.find((p) => p.flagship)!;
  const rest = projects.filter((p) => !p.flagship);

  const reveal = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.5 },
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div {...reveal} className="mb-12">
          <p className="eyebrow mb-3">{t.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            {t.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl">{t.subtitle}</p>
        </motion.div>

        {/* Flagship: confidential client work presented as an NDA dossier */}
        <motion.article
          {...reveal}
          className="rounded-xl border border-border bg-card overflow-hidden mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-6 sm:p-10 flex flex-col">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="chip border-primary/50 text-primary">
                  <Lock className="h-3 w-3 mr-1.5" aria-hidden="true" />
                  {t.underNda}
                </span>
                <span className="chip">
                  <span
                    className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 mr-1.5"
                    aria-hidden="true"
                  />
                  {t.inProduction}
                </span>
                <span className="chip">2025 —</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                {flagship.title}
              </h3>
              <p className="font-mono text-xs text-primary mb-4">
                {flagship.role[language]}
              </p>
              <p className="text-muted-foreground mb-6">
                {flagship.description[language]}
              </p>

              <ul className="space-y-2.5 mb-6">
                {flagship.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="text-primary font-mono shrink-0" aria-hidden="true">
                      →
                    </span>
                    <span>{h[language]}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-6">
                {flagship.stack.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>

              <p className="text-xs text-muted-foreground border-l-2 border-primary/40 pl-3 mb-6">
                {t.ndaNote}
              </p>

              <a
                href="#contact"
                onClick={handleAnchorClick}
                className="mt-auto inline-flex items-center gap-1 font-mono text-sm text-primary hover:underline underline-offset-4 w-fit"
              >
                {t.askAbout}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <figure className="relative border-t lg:border-t-0 lg:border-l border-border bg-muted/40 p-6 sm:p-10 flex flex-col justify-center">
              <img
                src={komerbenImg}
                alt={t.imageCaption}
                width={1280}
                height={800}
                loading="lazy"
                decoding="async"
                className="rounded-lg border border-border w-full"
              />
              <figcaption className="mt-3 font-mono text-xs text-muted-foreground">
                {t.imageCaption}
              </figcaption>
            </figure>
          </div>
        </motion.article>

        {/* Remaining projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: reduceMotion ? 0 : (i % 3) * 0.08 }}
            >
              <ProjectCard project={project} image={projectImages[project.id]} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
