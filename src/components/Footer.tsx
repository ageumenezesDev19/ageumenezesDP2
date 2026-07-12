import { Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { profile } from "@/data/profile";

const content = {
  en: { built: "Built with React + Vite · Deployed on Vercel" },
  pt: { built: "Feito com React + Vite · Deploy na Vercel" },
};

const iconById = { github: Github, linkedin: Linkedin, email: Mail } as const;

const Footer = () => {
  const { language } = useLanguage();
  const t = content[language];
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted-foreground">
          © {year} {profile.name}
        </p>
        <p className="font-mono text-xs text-muted-foreground">{t.built}</p>
        <ul className="flex items-center gap-4">
          {profile.socials
            .filter((s): s is typeof s & { id: keyof typeof iconById } => s.id in iconById)
            .map((social) => {
              const Icon = iconById[social.id];
              return (
                <li key={social.id}>
                  <a
                    href={social.url}
                    target={social.id === "email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
