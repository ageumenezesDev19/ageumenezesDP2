import { Button } from "./button";
import { Languages } from "lucide-react";

interface LanguageToggleProps {
  language: "en" | "pt";
  toggleLanguage: () => void;
}

/** Names the destination, since "toggle" doesn't say which language you'd land in. */
const label = {
  en: "Mudar para português",
  pt: "Switch to English",
};

export function LanguageToggle({
  language,
  toggleLanguage,
}: LanguageToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="relative group"
    >
      <Languages aria-hidden="true" className="h-5 w-5" />
      <span className="sr-only">{label[language]}</span>
      <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        {language.toUpperCase()}
      </span>
    </Button>
  );
}
