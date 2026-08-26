import { lazy, Suspense, useEffect } from "react";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import { scrollToSection } from "@/lib/scroll";
import { useLanguage } from "@/providers/language-provider";
import SectionSlide from "./deck/SectionSlide";
import { DeckProvider } from "./deck/DeckContext";
import Deck from "./deck/Deck";
import { useDeckMode } from "./deck/useDeckEnabled";
import MobileDeck from "./mobile/MobileDeck";
import HeroMobile from "./mobile/HeroMobile";

const skipLabel = {
  en: "Skip to main content",
  pt: "Pular para o conteúdo principal",
};

// Below-the-fold sections are split out of the initial bundle
const ProjectsSection = lazy(() => import("./ProjectsSection"));
const MoreProjectsSection = lazy(() => import("./MoreProjectsSection"));
const ExperienceSection = lazy(() => import("./ExperienceSection"));
const AboutSection = lazy(() => import("./AboutSection"));
const SkillsSection = lazy(() => import("./SkillsSection"));
const ContactSection = lazy(() => import("./ContactSection"));
const Footer = lazy(() => import("./Footer"));

const Home = () => {
  const handleScroll = (sectionId: string) => scrollToSection(sectionId);
  const { language } = useLanguage();
  const mode = useDeckMode();
  const handheld = mode === "compact";

  useEffect(() => {
    const root = document.documentElement;
    // The rail owns the whole viewport, so the document must not scroll behind
    // it — that is also what stops the Safari toolbar collapsing mid-gesture and
    // changing the height under the choreography.
    if (handheld) {
      root.style.overflow = "hidden";
      root.style.overscrollBehavior = "none";
    }
    // Snapping is gone from the desktop too: the slides now commit themselves
    // past a threshold, and two mechanisms pulling at the same scroll position
    // fight. `proximity` was already the fallback after `mandatory` pinned the
    // scroll inside Projects — 0 px of travel on a 200 px wheel — so what it
    // bought was small and the commit is both more precise and cancellable.
    root.style.scrollPaddingTop = "64px";
    return () => {
      root.style.removeProperty("overflow");
      root.style.removeProperty("overscroll-behavior");
      root.style.removeProperty("scroll-padding-top");
    };
  }, [handheld]);

  const skipLink = (
    // First thing in the tab order, and invisible until it has focus: without
    // it a keyboard user walks the whole nav before reaching any content.
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]
      focus:rounded-md focus:border focus:border-border focus:bg-background
      focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-foreground"
    >
      {skipLabel[language]}
    </a>
  );

  if (handheld) {
    const cards = [
      { id: "hero", label: "Ageu Menezes", node: <HeroMobile /> },
      { id: "projects", label: "Projects", node: <ProjectsSection /> },
      { id: "work", label: "Open source", node: <MoreProjectsSection compact /> },
      { id: "experience", label: "Experience", node: <ExperienceSection /> },
      { id: "about", label: "About", node: <AboutSection /> },
      { id: "skills", label: "Skills", node: <SkillsSection /> },
      { id: "contact", label: "Contact", node: <ContactSection /> },
    ];
    return (
      <>
        {skipLink}
        <main id="main-content" tabIndex={-1}>
          <Suspense fallback={null}>
            <MobileDeck cards={cards} />
          </Suspense>
        </main>
      </>
    );
  }

  return (
    <DeckProvider>
      <div className="bg-background min-h-screen overflow-x-clip">
        {skipLink}

        <Navigation onNavClick={handleScroll} />

        <main id="main-content" tabIndex={-1}>
        <Deck />
          <section id="hero">
            <HeroSection onExploreClick={() => handleScroll("#projects")} />
          </section>

          <Suspense fallback={null}>
            <SectionSlide id="projects">
              <ProjectsSection />
            </SectionSlide>

            <SectionSlide id="work">
              <MoreProjectsSection />
            </SectionSlide>

            <SectionSlide id="experience">
              <ExperienceSection />
            </SectionSlide>

            <SectionSlide id="about">
              <AboutSection />
            </SectionSlide>

            <SectionSlide id="skills">
              <SkillsSection />
            </SectionSlide>

            <SectionSlide id="contact">
              <ContactSection />
            </SectionSlide>
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </DeckProvider>
  );
};

export default Home;
