import { EducationItem, ExperienceItem } from "./types";

export const experience: ExperienceItem[] = [
  {
    title: {
      en: "Freelance Front-End Developer — Inventory Management System",
      pt: "Desenvolvedor Front-End Freelancer — Sistema de Gestão de Estoque",
    },
    organization: "Retail client (contract)",
    period: {
      en: "2025 — Present",
      pt: "2025 — Presente",
    },
    description: {
      en: "Sole front-end engineer for a production inventory and production-tracking system used daily by a retail company. Own the full front-end lifecycle: architecture, API integration with role-based auth, XLSX/PDF/DOCX reporting, Playwright e2e tests and versioned releases.",
      pt: "Único engenheiro front-end de um sistema de estoque e acompanhamento de produção usado diariamente por uma empresa do varejo. Responsável por todo o ciclo do front-end: arquitetura, integração com API com autenticação por papéis, relatórios XLSX/PDF/DOCX, testes e2e com Playwright e releases versionadas.",
    },
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Playwright"],
  },
  {
    title: {
      en: "Freelance Web Developer",
      pt: "Desenvolvedor Web Freelancer",
    },
    organization: "Self-employed",
    period: {
      en: "2022 — Present",
      pt: "2022 — Presente",
    },
    description: {
      en: "Building web applications for clients and personal products with React, Next.js and TypeScript — from landing pages to full applications with authentication, dashboards and deploys on Vercel.",
      pt: "Desenvolvimento de aplicações web para clientes e produtos próprios com React, Next.js e TypeScript — de landing pages a aplicações completas com autenticação, dashboards e deploys na Vercel.",
    },
    stack: ["React", "Next.js", "TypeScript", "Node.js"],
  },
];

export const education: EducationItem[] = [
  {
    title: "Rocketseat",
    period: {
      en: "2023 — Present",
      pt: "2023 — Presente",
    },
    description: {
      en: "Ongoing specialization: React, Next.js, Node.js (incl. DDD), design systems and DevOps fundamentals — 11 course certificates.",
      pt: "Especialização contínua: React, Next.js, Node.js (incl. DDD), design systems e fundamentos de DevOps — 11 certificados de cursos.",
    },
  },
  {
    title: "Trybe — Full Stack Web Development",
    period: {
      en: "2022 — 2023",
      pt: "2022 — 2023",
    },
    description: {
      en: "1500-hour intensive program covering front-end, back-end (Node.js, SQL), computer science fundamentals and agile teamwork on real projects.",
      pt: "Programa intensivo de 1500 horas cobrindo front-end, back-end (Node.js, SQL), fundamentos de ciência da computação e trabalho ágil em projetos reais.",
    },
  },
];
