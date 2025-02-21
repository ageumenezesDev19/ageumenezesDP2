import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";
import styled from "styled-components";

interface HeroSectionProps {
  name?: string;
  title?: string;
  bio?: string;
  avatarUrl?: string;
  onExploreClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  name = "Ageu Menezes",
  title = "Full Stack Web Developer",
  bio = "Full Stack Web Developer passionate about technology and innovation. Specialized in React, Node.js, TypeScript, and development of modern, scalable web applications.",
  avatarUrl = "https://github.com/ageumenezesDev19.png",
  onExploreClick = () => {},
}) => {
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
              Hi, I'm {name}
            </motion.h1>
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl text-muted-foreground mb-6"
              variants={itemVariants}
            >
              {title}
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              {bio}
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button size="lg" onClick={onExploreClick} className="group">
                Explore My Work
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
