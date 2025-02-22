import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ui/theme-toggle";
import { LanguageToggle } from "./ui/language-toggle";
import { useTheme } from "@/providers/theme-provider";
import { useLanguage } from "@/providers/language-provider";
import { Button } from "./ui/button";

interface NavItem {
  label: string;
  href: string;
}

interface NavigationProps {
  items?: NavItem[];
  onNavClick?: (href: string) => void;
}

const content = {
  en: {
    home: "Home",
    about: "About",
    contact: "Contact",
  },
  pt: {
    home: "Início",
    about: "Sobre",
    contact: "Contato",
  },
};

const Navigation = ({
  items = [
    { label: "Home", href: "#hero" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
  onNavClick = (href) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  },
}: NavigationProps) => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = content[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 bg-background ${isScrolled ? "shadow-md" : ""}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-primary cursor-pointer"
            onClick={() => onNavClick("#hero")}
          >
            Portfolio
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {items.map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => onNavClick(item.href)}
              >
                {item.label}
              </motion.button>
            ))}
            <div className="flex items-center gap-2">
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              <LanguageToggle
                language={language}
                toggleLanguage={toggleLanguage}
              />
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 right-0 bg-background shadow-lg py-4"
          >
            <div className="flex flex-col space-y-4 px-4">
              {items.map((item, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-muted-foreground hover:text-primary transition-colors text-left py-2"
                  onClick={() => {
                    onNavClick(item.href);
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </motion.button>
              ))}

              <div className="border-t border-muted pt-4 flex items-center gap-4">
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                <LanguageToggle
                  language={language}
                  toggleLanguage={toggleLanguage}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navigation;
