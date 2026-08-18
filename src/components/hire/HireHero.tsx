import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "../ui/button";
import { handleAnchorClick } from "@/lib/scroll";
import { HireVariant } from "@/data/types";

/**
 * Opens on the outcome, not on who I am. A client arriving from a proposal is
 * deciding whether this is worth five minutes, and a name doesn't answer that.
 */
const HireHero = ({ variant }: { variant: HireVariant }) => {
  const reduceMotion = useReducedMotion();

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-background px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24">
      <motion.div
        className="max-w-3xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } } }}
      >
        <motion.p variants={item} className="eyebrow mb-6">
          {variant.eyebrow}
        </motion.p>

        <motion.h1
          variants={item}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          {variant.headline}
        </motion.h1>

        <motion.p variants={item} className="text-lg text-muted-foreground mb-10">
          {variant.subhead}
        </motion.p>

        <motion.div variants={item}>
          <Button size="lg" className="group font-semibold w-full sm:w-auto min-h-11" asChild>
            <a href="#services" onClick={handleAnchorClick}>
              What I can take on
              <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HireHero;
