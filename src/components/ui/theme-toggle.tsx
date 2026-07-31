import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { motion } from "framer-motion";

interface ThemeToggleProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  language: "en" | "pt";
}

/**
 * The label names what the click will do, not the current state — "dark theme"
 * alone leaves a screen reader user guessing whether it reports or switches.
 * It has to be spoken text: the sun and moon are decorative to a screen
 * reader, so without this the button announced only "button".
 */
const label = {
  en: { toLight: "Switch to light theme", toDark: "Switch to dark theme" },
  pt: { toLight: "Mudar para o tema claro", toDark: "Mudar para o tema escuro" },
};

export function ThemeToggle({ theme, toggleTheme, language }: ThemeToggleProps) {
  const t = label[language];

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative"
    >
      <Sun
        aria-hidden="true"
        className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        aria-hidden="true"
        className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">{theme === "dark" ? t.toLight : t.toDark}</span>
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{
          backgroundColor:
            theme === "dark" ? "rgba(255,255,255,0.1)" : "transparent",
        }}
        transition={{ duration: 0.2 }}
      />
    </Button>
  );
}
