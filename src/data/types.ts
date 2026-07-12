export type Language = "en" | "pt";

export interface LocalizedString {
  en: string;
  pt: string;
}

export type ProjectCategory = "fullstack" | "frontend" | "desktop" | "mobile";

export interface Project {
  id: string;
  title: string;
  /** Short role played on the project, e.g. "Sole developer" */
  role: LocalizedString;
  description: LocalizedString;
  highlights: LocalizedString[];
  stack: string[];
  category: ProjectCategory;
  links: {
    live?: string;
    repo?: string;
    /** Extra repos (e.g. server/mobile of a multi-repo project) */
    extraRepos?: { label: string; url: string }[];
  };
  /** Resolved image URL (imported asset), wired in the components layer */
  image?: string;
  /** Client work under NDA: no repo/live links, generic screenshots only */
  confidential?: boolean;
  flagship?: boolean;
}

export interface ExperienceItem {
  title: LocalizedString;
  organization: string;
  period: LocalizedString;
  description: LocalizedString;
  stack?: string[];
}

export interface EducationItem {
  title: string;
  period: LocalizedString;
  description: LocalizedString;
}

export interface SkillGroup {
  id: "frontend" | "backend" | "devops" | "tools";
  label: LocalizedString;
  skills: string[];
}

export interface Certificate {
  title: LocalizedString;
  issuer: string;
  /** Path under public/, e.g. /certificates/react-fundamentals.pdf */
  file: string;
}

export interface SocialLink {
  id: "github" | "linkedin" | "email" | "whatsapp";
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  location: LocalizedString;
  headline: LocalizedString;
  tagline: LocalizedString;
  bio: LocalizedString;
  email: string;
  socials: SocialLink[];
  resumeUrl: string;
}
