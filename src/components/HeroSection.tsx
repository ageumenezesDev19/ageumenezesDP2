import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";

import { useLanguage } from "@/providers/language-provider";

interface HeroSectionProps {
  name?: string;
  title?: string;
  bio?: string;
  avatarUrl?: string;
  onExploreClick?: () => void;
}

const content = {
  en: {
    greeting: "Hi, I'm",
    title: "Full Stack Web Developer",
    bio: "Full Stack Web Developer passionate about technology and innovation. Specialized in React, Node.js, TypeScript, and development of modern, scalable web applications.",
    exploreButton: "Explore My Work",
  },
  pt: {
    greeting: "Olá, eu sou",
    title: "Desenvolvedor Web Full Stack",
    bio: "Desenvolvedor Web Full Stack apaixonado por tecnologia e inovação. Especializado em React, Node.js, TypeScript e desenvolvimento de aplicações web modernas e escaláveis.",
    exploreButton: "Explorar Meu Trabalho",
  },
};

const HeroSection: React.FC<HeroSectionProps> = ({
  name = "Ageu Menezes",
  avatarUrl = "https://github.com/ageumenezesDev19.png",
  onExploreClick = () => {},
}) => {
  const { language } = useLanguage();
  const t = content[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants} className="order-2 lg:order-1">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-4"
              variants={itemVariants}
            >
              {language === "pt" ? (
                <>
                  {t.greeting}
                  <br />
                  {name}
                </>
              ) : (
                <>
                  {t.greeting} {name}
                </>
              )}
            </motion.h1>
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl text-muted-foreground mb-6"
              variants={itemVariants}
            >
              {t.title}
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              {t.bio}
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button size="lg" onClick={onExploreClick} className="group">
                {t.exploreButton}
                <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96">
              <motion.img
                src={avatarUrl}
                alt={name}
                className="rounded-full shadow-2xl dark:shadow-[2px_2px_15px_#FFA500] relative z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
