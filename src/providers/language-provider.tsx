import { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "pt";

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
};

type LanguageProviderState = {
  language: Language;
  toggleLanguage: () => void;
};

const initialState: LanguageProviderState = {
  language: "en",
  toggleLanguage: () => null,
};

const LanguageProviderContext =
  createContext<LanguageProviderState>(initialState);

export function LanguageProvider({
  children,
  defaultLanguage = "en",
  storageKey = "portfolio-language",
  ...props
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem(storageKey) as Language) || defaultLanguage,
  );

  useEffect(() => {
    localStorage.setItem(storageKey, language);
  }, [language, storageKey]);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "pt" : "en";
    setLanguage(newLanguage);
  };

  const value = {
    language,
    toggleLanguage,
  };

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider");

  return context;
};
