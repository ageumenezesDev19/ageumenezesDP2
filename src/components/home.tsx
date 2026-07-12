import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection";
import ExperienceSection from "./ExperienceSection";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

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
      </main>

      <Footer />
    </div>
  );
};

export default Home;
