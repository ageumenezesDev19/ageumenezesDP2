import { EducationItem, ExperienceItem } from "./types";

export const experience: ExperienceItem[] = [
  {
    title: {
      en: "Freelance Front-End Developer — Inventory and Orders System",
      pt: "Desenvolvedor Front-End Freelancer — Sistema de Estoque e Pedidos",
    },
    organization: "Retail client (contract)",
    period: {
      en: "2025 — Present",
      pt: "2025 — Presente",
    },
    description: {
      en: "Sole front-end developer on an inventory and orders system used every day by 15 employees. I rebuilt the visits and orders flow for mobile, the one the team uses most, and filling it in now takes about half the time. I write the API contracts the back-end developer implements, cover the flows with Playwright end-to-end tests, and maintain the reports the team exports every day as spreadsheets, PDFs and documents.",
      pt: "Único dev front-end de um sistema de estoque e pedidos usado todo dia por 15 funcionários. Adaptei para o celular o fluxo de visitas e pedidos, o que a equipe mais usa, e o preenchimento passou a levar cerca de metade do tempo. Escrevo os contratos da API que o dev back-end implementa, cubro os fluxos com testes end-to-end no Playwright e mantenho os relatórios que a equipe exporta todo dia em planilha, PDF e documento.",
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
      en: "Web applications for clients and my own products. One of the main ones is Exacta, which took the tax workflow at another company's stores from 1–1.5 hours down to 30 minutes, with more accurate values.",
      pt: "Aplicações web para clientes e produtos próprios. Um dos principais é o Exacta, que levou o fluxo do fiscal nas lojas de outra empresa de 1h–1h30 para 30 minutos, com valores mais precisos.",
    },
    stack: ["React", "Next.js", "TypeScript", "Node.js"],
  },
];

export const education: EducationItem[] = [
  {
    title: "Rocketseat",
    period: {
      en: "2024 — Present",
      pt: "2024 — Presente",
    },
    description: {
      en: "Ongoing specialization: React, Next.js, Node.js (incl. DDD), design systems and DevOps fundamentals — 11 course certificates.",
      pt: "Especialização contínua: React, Next.js, Node.js (incl. DDD), design systems e fundamentos de DevOps — 11 certificados de cursos.",
    },
  },
  {
    title: "Trybe — Web Development",
    period: {
      en: "2021 — 2022",
      pt: "2021 — 2022",
    },
    description: {
      en: "Intensive web development program. Certified in the Web Development Fundamentals module: Unix & Bash, Git & GitHub, HTML & CSS, JavaScript, DOM and unit testing.",
      pt: "Programa intensivo de desenvolvimento web. Certificado no módulo de Fundamentos do Desenvolvimento Web: Unix & Bash, Git & GitHub, HTML & CSS, JavaScript, DOM e testes unitários.",
    },
  },
];
