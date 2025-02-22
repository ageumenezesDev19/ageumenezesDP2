import React from "react";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";
import ContactSection from "./ContactSection";
import AboutSection from "./AboutSection";
import { motion } from "framer-motion";

const Home = () => {
  const handleScroll = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-background min-h-screen">
      <Navigation onNavClick={handleScroll} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <section id="hero">
          <HeroSection onExploreClick={() => handleScroll("#projects")} />
        </section>

        <section id="projects">
          <ProjectsSection />
        </section>

        <section id="about">
          <AboutSection />
        </section>

        <section id="skills">
          <SkillsSection />
        </section>

        <section id="contact">
          <ContactSection
            onSubmit={(data) => {
              // Handle form submission
              console.log("Form submitted:", data);
            }}
          />
        </section>
      </motion.main>
    </div>
  );
};

export default Home;
