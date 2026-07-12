import { lazy, Suspense } from "react";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";

// Below-the-fold sections are split out of the initial bundle
const ProjectsSection = lazy(() => import("./ProjectsSection"));
const ExperienceSection = lazy(() => import("./ExperienceSection"));
const AboutSection = lazy(() => import("./AboutSection"));
const SkillsSection = lazy(() => import("./SkillsSection"));
const ContactSection = lazy(() => import("./ContactSection"));
const Footer = lazy(() => import("./Footer"));

const Home = () => {
  const handleScroll = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-background min-h-screen">
      <Navigation onNavClick={handleScroll} />

      <main>
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
