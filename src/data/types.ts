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
  /** Confidential client work: no repo/live links, generic screenshots only */
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
  /** Local PDF (/certificates/*.pdf) or an external credential URL */
  url: string;
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
  /** One resume per language: both the file and its download name differ. */
  resume: Record<Language, { url: string; fileName: string }>;
}

/**
 * The client-facing pages under /hire. English only — the marketplace they're
 * sent into is English first, and half a translation converts worse than one
 * good version.
 */
export type HireSlug = "dev" | "va";

export interface HireService {
  name: string;
  includes: string[];
}

/**
 * Told as situation → change → result, because that is the order a client
 * recognises their own problem in. `built` is the one quiet line for the
 * client who does happen to be technical.
 */
export interface HireProofCase {
  situation: string;
  change: string;
  result: string;
  built: string;
}

export interface HireProcessStep {
  title: string;
  body: string;
}

export interface HireVariant {
  slug: HireSlug;
  eyebrow: string;
  headline: string;
  subhead: string;
  /** Three pains, in the client's words rather than the trade's. */
  problems: string[];
  proof: HireProofCase;
  process: HireProcessStep[];
  services: HireService[];
  /** One line reaching into the other variant. A section here would dilute both. */
  crossSell: string;
}
