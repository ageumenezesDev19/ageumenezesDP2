import { motion, useReducedMotion } from "framer-motion";
import { Lock, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { projects } from "@/data/projects";
import { handleAnchorClick } from "@/lib/scroll";
import komerbenImg from "@/assets/projects/komerben.webp";

const content = {
  en: {
    eyebrow: "selected work",
    title: "Projects",
    subtitle:
      "Real products with real deploys — starting with the client system I maintain in production.",
    confidential: "confidential",
    inProduction: "in production",
    imageCaption: "Representative interface — client data withheld",
    confidentialNote:
      "This is client work: the code and data are confidential. I'm happy to talk through the architecture and my decisions on a call.",
    askAbout: "Ask me about this project",
  },
  pt: {
    eyebrow: "trabalhos selecionados",
    title: "Projetos",
    subtitle:
      "Produtos reais com deploys reais — começando pelo sistema do cliente que mantenho em produção.",
    confidential: "confidencial",
    inProduction: "em produção",
    imageCaption: "Interface representativa — dados do cliente omitidos",
    confidentialNote:
      "Este é um trabalho para cliente: código e dados são confidenciais. Posso falar sobre a arquitetura e minhas decisões em uma call.",
    askAbout: "Pergunte sobre este projeto",
  },
};

const ProjectsSection = () => {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const t = content[language];

  const flagship = projects.find((p) => p.flagship)!;

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

        {/* Flagship: the client system, shown without name, link or real data. */}
        <motion.article
          {...reveal}
          className="rounded-xl border border-border bg-card overflow-hidden mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-6 sm:p-10 flex flex-col">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="chip border-primary/50 text-primary">
                  <Lock className="h-3 w-3 mr-1.5" aria-hidden="true" />
                  {t.confidential}
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
                {t.confidentialNote}
              </p>

              <a
                href="#contact"
                onClick={handleAnchorClick}
                className="mt-auto inline-flex min-h-11 items-center gap-1 font-mono text-sm text-primary hover:underline underline-offset-4 w-fit"
              >
                {t.askAbout}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <figure className="relative border-t lg:border-t-0 lg:border-l border-border bg-muted/40 p-6 sm:p-10 flex flex-col justify-center">
              {/* The screenshot is of a dark interface, so it gets the same
                  navy mount as the portraits rather than a light border. */}
              <div className="rounded-xl bg-surface-deep p-2">
                <img
                  src={komerbenImg}
                  alt={t.imageCaption}
                  width={1280}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="rounded-lg w-full"
                />
              </div>
              <figcaption className="mt-3 font-mono text-xs text-muted-foreground">
                {t.imageCaption}
              </figcaption>
            </figure>
          </div>
        </motion.article>

      </div>
    </div>
  );
};

export default ProjectsSection;
