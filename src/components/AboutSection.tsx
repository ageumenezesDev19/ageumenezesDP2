import { motion, useReducedMotion } from "framer-motion";
import {
  Award,
  ArrowUpRight,
  BadgeCheck,
  MapPin,
  Languages,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { profile } from "@/data/profile";
import { certificates } from "@/data/certificates";
import aboutPhoto from "@/assets/photos/ageu-about.webp";

const content = {
  en: {
    eyebrow: "who I am",
    title: "About",
    factsLocation: "Based in",
    factsLanguages: "Languages",
    factsLanguagesValue: "Portuguese (native) · English (professional)",
    factsInterests: "Off the clock",
    factsInterestsValue: "Sci-fi, electronic music and video editing",
    certificatesTitle: "Certificates",
    certificatesSubtitle: "Course certificates — click to open the credential.",
    verified: "verified",
    view: "View PDF",
  },
  pt: {
    eyebrow: "quem sou",
    title: "Sobre",
    factsLocation: "Base",
    factsLanguages: "Idiomas",
    factsLanguagesValue: "Português (nativo) · Inglês (profissional)",
    factsInterests: "Fora do expediente",
    factsInterestsValue: "Ficção científica, música eletrônica e edição de vídeo",
    certificatesTitle: "Certificados",
    certificatesSubtitle: "Certificados de cursos — clique para abrir a credencial.",
    verified: "verificado",
    view: "Ver PDF",
  },
};

const AboutSection = () => {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const t = content[language];

  const reveal = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.5 },
  };

  const facts = [
    { icon: MapPin, label: t.factsLocation, value: profile.location[language] },
    { icon: Languages, label: t.factsLanguages, value: t.factsLanguagesValue },
    { icon: Sparkles, label: t.factsInterests, value: t.factsInterestsValue },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div {...reveal} className="mb-12">
          <p className="eyebrow mb-3">{t.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 mb-16 items-start">
          <motion.figure {...reveal} className="max-w-xs mx-auto lg:mx-0">
            <img
              src={aboutPhoto}
              alt={profile.name}
              width={700}
              height={938}
              loading="lazy"
              decoding="async"
              className="rounded-xl border border-border grayscale w-full"
            />
          </motion.figure>

          <motion.div {...reveal}>
            <p className="text-lg leading-relaxed mb-8">{profile.bio[language]}</p>

            <ul className="space-y-4">
              {facts.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-start gap-3">
                  <Icon className="h-4 w-4 mt-1 text-primary shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {label}
                    </p>
                    <p className="text-sm">{value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div {...reveal}>
          <h3 className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-muted-foreground mb-2">
            <Award className="h-4 w-4" aria-hidden="true" />
            {t.certificatesTitle}
          </h3>
          <p className="text-sm text-muted-foreground mb-6">{t.certificatesSubtitle}</p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {certificates.map((cert) => (
              <li key={cert.url}>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-primary/50"
                >
                  <div>
                    <p className="text-sm font-medium">{cert.title[language]}</p>
                    <p className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
                      {cert.issuer}
                      {cert.year && <span>· {cert.year}</span>}
                      {cert.verified && (
                        <span className="inline-flex items-center gap-1 rounded border border-primary/40 px-1.5 py-0.5 text-[10px] text-primary">
                          <BadgeCheck className="h-3 w-3" aria-hidden="true" />
                          {t.verified}
                        </span>
                      )}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary shrink-0"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
