import { lazy, Suspense } from "react";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import { scrollToSection } from "@/lib/scroll";
import { useLanguage } from "@/providers/language-provider";

const skipLabel = {
  en: "Skip to main content",
  pt: "Pular para o conteúdo principal",
};

// Below-the-fold sections are split out of the initial bundle
const ProjectsSection = lazy(() => import("./ProjectsSection"));
const ExperienceSection = lazy(() => import("./ExperienceSection"));
const AboutSection = lazy(() => import("./AboutSection"));
const SkillsSection = lazy(() => import("./SkillsSection"));
const ContactSection = lazy(() => import("./ContactSection"));
const Footer = lazy(() => import("./Footer"));

const Home = () => {
  const handleScroll = (sectionId: string) => scrollToSection(sectionId);
  const { language } = useLanguage();

  return (
    <div className="bg-background min-h-screen">
      {/* First thing in the tab order, and invisible until it has focus: without
          it a keyboard user walks the whole nav before reaching any content. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]
          focus:rounded-md focus:border focus:border-border focus:bg-background
          focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-foreground"
      >
        {skipLabel[language]}
      </a>

      <Navigation onNavClick={handleScroll} />

      <main id="main-content" tabIndex={-1}>
        <section id="hero">
          <HeroSection onExploreClick={() => handleScroll("#projects")} />
        </section>

        <Suspense fallback={null}>
          <section id="projects">
            <ProjectsSection />
          </section>

          <section id="experience">
            <ExperienceSection />
          </section>

          <section id="about">
            <AboutSection />
          </section>

          <section id="skills">
            <SkillsSection />
          </section>

          <section id="contact">
            <ContactSection />
          </section>
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;
