import { Certificate } from "./types";

/**
 * Course certificates. Publicly verifiable credentials come first; the
 * Rocketseat ones are PDFs served from public/certificates/.
 */
export const certificates: Certificate[] = [
  {
    title: {
      en: "Web Development Fundamentals (Module 1)",
      pt: "Fundamentos do Desenvolvimento Web (Módulo 1)",
    },
    issuer: "Trybe",
    url: "https://www.credential.net/b94dcdea-0ce4-4d09-9f81-30ff1a2f5bc2",
    verified: true,
    year: "2022",
  },
  {
    title: { en: "React Fundamentals", pt: "Fundamentos do React" },
    issuer: "Rocketseat",
    url: "/certificates/react-fundamentals.pdf",
  },
  {
    title: { en: "Advanced React Hooks", pt: "Aprofundando em Hooks" },
    issuer: "Rocketseat",
    url: "/certificates/advanced-hooks.pdf",
  },
  {
    title: { en: "React (2022 track)", pt: "React — trilha 2022" },
    issuer: "Rocketseat",
    url: "/certificates/react-2022.pdf",
  },
  {
    title: { en: "Next.js Fundamentals", pt: "Fundamentos do Next.js" },
    issuer: "Rocketseat",
    url: "/certificates/nextjs-fundamentals.pdf",
  },
  {
    title: { en: "Advanced Next.js", pt: "Aprofundando em Next.js" },
    issuer: "Rocketseat",
    url: "/certificates/advanced-nextjs.pdf",
  },
  {
    title: { en: "Node.js Fundamentals", pt: "Fundamentos do Node.js" },
    issuer: "Rocketseat",
    url: "/certificates/nodejs-fundamentals.pdf",
  },
  {
    title: { en: "DDD in Node.js", pt: "DDD no Node.js" },
    issuer: "Rocketseat",
    url: "/certificates/ddd-nodejs.pdf",
  },
  {
    title: { en: "Integrating Front End & Back End", pt: "Integrando Frontend e Backend" },
    issuer: "Rocketseat",
    url: "/certificates/frontend-backend-integration.pdf",
  },
  {
    title: { en: "HTTP & Performance", pt: "HTTP e Performance" },
    issuer: "Rocketseat",
    url: "/certificates/http-performance.pdf",
  },
  {
    title: { en: "Design System", pt: "Design System" },
    issuer: "Rocketseat",
    url: "/certificates/design-system.pdf",
  },
  {
    title: { en: "DevOps Culture Fundamentals", pt: "Fundamentos da Cultura DevOps" },
    issuer: "Rocketseat",
    url: "/certificates/devops-fundamentals.pdf",
  },
];
