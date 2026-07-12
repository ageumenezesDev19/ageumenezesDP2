import { Project } from "./types";

/**
 * Featured projects, in display order. The flagship client project is
 * confidential (NDA): no repo/live links and no real data in screenshots.
 */
export const projects: Project[] = [
  {
    id: "komerben",
    title: "Inventory & Production Management System",
    flagship: true,
    confidential: true,
    category: "fullstack",
    role: {
      en: "Freelance developer — sole front-end engineer for a retail client",
      pt: "Desenvolvedor freelancer — único engenheiro front-end para um cliente do varejo",
    },
    description: {
      en: "A production web system I build and maintain for a retail client: inventory, stock movements and production tracking used daily by the company's team. I own the front end end-to-end — from architecture and API integration to releases.",
      pt: "Sistema web em produção que construo e mantenho para um cliente do varejo: estoque, movimentações e acompanhamento de produção usados diariamente pela equipe da empresa. Sou responsável por todo o front end — da arquitetura e integração com a API até as releases.",
    },
    highlights: [
      {
        en: "Role-based authentication and protected routes against an external API",
        pt: "Autenticação com papéis/permissões e rotas protegidas integradas a uma API externa",
      },
      {
        en: "Rich reporting: XLSX, PDF and DOCX exports for daily operations",
        pt: "Relatórios completos: exportação em XLSX, PDF e DOCX para a operação diária",
      },
      {
        en: "Playwright end-to-end tests, conventional commits and automated changelog releases",
        pt: "Testes end-to-end com Playwright, conventional commits e releases com changelog automatizado",
      },
      {
        en: "~230 TypeScript files across 28 app routes, shipped and evolving in production",
        pt: "~230 arquivos TypeScript em 28 rotas, em produção e em evolução contínua",
      },
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "shadcn/ui", "Playwright"],
    links: {},
  },
  {
    id: "despensa",
    title: "DesPensa",
    category: "desktop",
    role: {
      en: "Creator and sole developer",
      pt: "Criador e único desenvolvedor",
    },
    description: {
      en: "A cross-platform desktop app for personal inventory management, built with Tauri. Supports multiple profiles with backup, withdrawal history, dark mode and offline-first persistence.",
      pt: "Aplicativo desktop multiplataforma para gestão de estoque pessoal, construído com Tauri. Suporta múltiplos perfis com backup, histórico de retiradas, dark mode e persistência offline-first.",
    },
    highlights: [
      {
        en: "Native desktop build via Tauri (Rust) with a React front end",
        pt: "Build desktop nativo via Tauri (Rust) com front end em React",
      },
      {
        en: "Multi-profile support with backup and restore",
        pt: "Suporte a múltiplos perfis com backup e restauração",
      },
    ],
    stack: ["Tauri", "React", "TypeScript", "SCSS"],
    links: {
      live: "https://des-pensa.vercel.app",
      repo: "https://github.com/ageumenezesDev19/DesPensa-",
    },
  },
  {
    id: "fitflow",
    title: "FitFlow",
    category: "fullstack",
    role: {
      en: "Creator and sole developer",
      pt: "Criador e único desenvolvedor",
    },
    description: {
      en: "A productivity app that combines the Pomodoro technique with physical exercise reminders, helping developers stay focused and healthy during long coding sessions.",
      pt: "App de produtividade que combina a técnica Pomodoro com lembretes de exercícios físicos, ajudando devs a manter foco e saúde em longas sessões de código.",
    },
    highlights: [
      {
        en: "Custom timer engine with configurable focus/exercise cycles",
        pt: "Timer com ciclos configuráveis de foco e exercício",
      },
    ],
    stack: ["Next.js", "React", "TypeScript"],
    links: {
      live: "https://fitflow-taupe.vercel.app",
      repo: "https://github.com/ageumenezesDev19/fitflow",
    },
  },
  {
    id: "habits",
    title: "Habits — Full-Stack Tracker",
    category: "fullstack",
    role: {
      en: "Full-stack developer (web, API and mobile)",
      pt: "Desenvolvedor full-stack (web, API e mobile)",
    },
    description: {
      en: "A habit tracker built as three applications sharing one API: a React web app, a Node.js server and a React Native mobile app — the same product across platforms.",
      pt: "Um rastreador de hábitos construído como três aplicações sobre a mesma API: web em React, servidor Node.js e app mobile em React Native — o mesmo produto em todas as plataformas.",
    },
    highlights: [
      {
        en: "One REST API consumed by both web and mobile clients",
        pt: "Uma única API REST consumida pelos clientes web e mobile",
      },
      {
        en: "Node.js server with Prisma ORM and SQLite",
        pt: "Servidor Node.js com Prisma ORM e SQLite",
      },
    ],
    stack: ["React", "React Native", "Node.js", "TypeScript", "Prisma"],
    links: {
      repo: "https://github.com/ageumenezesDev19/habits-web",
      extraRepos: [
        { label: "Server", url: "https://github.com/ageumenezesDev19/habits-server" },
        { label: "Mobile", url: "https://github.com/ageumenezesDev19/habits-mobile" },
      ],
    },
  },
  {
    id: "chrono-track",
    title: "ChronoTrack",
    category: "frontend",
    role: {
      en: "Creator and sole developer",
      pt: "Criador e único desenvolvedor",
    },
    description: {
      en: "A time-management app with cycle timers, session history and validated forms — built to practice robust form handling and state management patterns.",
      pt: "App de gestão de tempo com ciclos, histórico de sessões e formulários validados — construído para praticar padrões robustos de formulários e gerenciamento de estado.",
    },
    highlights: [
      {
        en: "Form validation with Zod + React Hook Form",
        pt: "Validação de formulários com Zod + React Hook Form",
      },
    ],
    stack: ["React", "Vite", "TypeScript", "styled-components", "Zod"],
    links: {
      repo: "https://github.com/ageumenezesDev19/chrono-track",
    },
  },
  {
    id: "ignite-shop",
    title: "Ignite Shop",
    category: "fullstack",
    role: {
      en: "Developer",
      pt: "Desenvolvedor",
    },
    description: {
      en: "An e-commerce storefront with a real Stripe checkout flow, server-side rendering and product catalog managed through the Stripe API.",
      pt: "Loja e-commerce com fluxo real de checkout via Stripe, renderização no servidor e catálogo de produtos gerenciado pela API da Stripe.",
    },
    highlights: [
      {
        en: "Stripe integration: products, prices and checkout sessions",
        pt: "Integração com Stripe: produtos, preços e sessões de checkout",
      },
    ],
    stack: ["Next.js", "TypeScript", "Stripe"],
    links: {
      live: "https://04-ignite-shop-roan.vercel.app",
      repo: "https://github.com/ageumenezesDev19/04-ignite-shop",
    },
  },
];
