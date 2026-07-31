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
    id: "pitchfolio",
    category: "fullstack",
    title: "Pitchfolio",
    role: {
      en: "Creator and sole developer",
      pt: "Criador e único desenvolvedor",
    },
    description: {
      en: "An AI assistant for freelance proposals: paste a job post, and it extracts what the client actually needs, flags what's ambiguous, and drafts a reply grounded in your own case studies — then tracks which proposals get replies. Built because I needed it, so it gets used rather than demoed.",
      pt: "Assistente de IA para propostas de freelancer: você cola o anúncio da vaga e ele extrai o que o cliente realmente precisa, sinaliza o que está ambíguo e rascunha uma resposta baseada nos seus próprios cases — depois acompanha quais propostas foram respondidas. Construído porque eu precisava, então é usado de verdade, não só demonstrado.",
    },
    highlights: [
      {
        en: "Provider-agnostic AI layer: Groq streams first, Gemini takes over on rate limits, and seeded content covers the rest — the UI never dead-ends on an exhausted free tier",
        pt: "Camada de IA agnóstica: Groq como principal, Gemini assume quando o limite estoura e o conteúdo semeado cobre o resto — a interface nunca trava por cota esgotada",
      },
      {
        en: "Structured AI output validated with Zod, so the interface builds real components instead of printing a paragraph",
        pt: "Saída da IA estruturada e validada com Zod, então a interface monta componentes de verdade em vez de imprimir um parágrafo",
      },
      {
        en: "Per-user isolation with Postgres row-level security, plus a trigger that blocks privilege escalation RLS alone would allow",
        pt: "Isolamento por usuário com row-level security no Postgres, mais um trigger que bloqueia a escalação de privilégio que só o RLS permitiria",
      },
      {
        en: "Rate limiting on the shared AI quota, so one account can't exhaust the day for everyone",
        pt: "Rate limiting sobre a cota de IA compartilhada, para que uma conta não esgote o dia de todos",
      },
      {
        en: "Lighthouse 93 / 100 / 100 / 100 on the production build",
        pt: "Lighthouse 93 / 100 / 100 / 100 na build de produção",
      },
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Groq",
      "Gemini",
    ],
    links: {
      live: "https://proposal-assistant-mocha.vercel.app",
      repo: "https://github.com/ageumenezesDev19/proposal-assistant",
    },
  },
  {
    id: "exacta",
    title: "Exacta",
    category: "desktop",
    role: {
      en: "Creator and sole developer",
      pt: "Criador e único desenvolvedor",
    },
    description: {
      en: "A stock tool built around one hard question: which combination of products adds up to exactly this amount? It solves that subset-sum search over a live inventory, then writes the withdrawal back. I use it daily at a retail counter, which is how its worst bug got caught.",
      pt: "Ferramenta de estoque construída em torno de uma pergunta difícil: qual combinação de produtos soma exatamente este valor? Ela resolve essa busca de subset-sum sobre um estoque real e depois registra a baixa. Uso diariamente num balcão de varejo, e foi assim que o pior bug dela apareceu.",
    },
    highlights: [
      {
        en: "Subset-sum search over thousands of products, run in a Web Worker so the interface never blocks",
        pt: "Busca de subset-sum sobre milhares de produtos, executada em Web Worker para a interface nunca travar",
      },
      {
        en: "Found and fixed a money bug in daily use: the displayed total summed the whole combination including items already removed, claiming R$27.80 on a R$22.90 withdrawal",
        pt: "Encontrei e corrigi um bug de dinheiro no uso diário: o total exibido somava a combinação inteira incluindo itens já removidos, informando R$27,80 numa retirada de R$22,90",
      },
      {
        en: "Rebuilt the visual layer on a design token system — replacing loose SCSS, emoji-as-icons and developer copy leaking into the interface",
        pt: "Refiz a camada visual sobre um sistema de design tokens — substituindo SCSS solto, emoji no lugar de ícones e copy de desenvolvedor vazando na interface",
      },
      {
        en: "Native desktop build via Tauri (Rust), multiple profiles with backup, and offline-first persistence",
        pt: "Build desktop nativo via Tauri (Rust), múltiplos perfis com backup e persistência offline-first",
      },
    ],
    stack: ["Tauri", "React", "TypeScript", "SCSS", "i18next", "Web Workers"],
    links: {
      repo: "https://github.com/ageumenezesDev19/DesPensa-",
    },
  },
  {
    id: "design-system",
    title: "Emerald UI — Design System",
    category: "frontend",
    role: {
      en: "Creator and sole maintainer",
      pt: "Criador e único mantenedor",
    },
    description: {
      en: "A component library published to npm, versioned through a release pipeline and documented in Storybook. Nine components built on seven token scales, in a monorepo that also ships the shared ESLint and TypeScript configs the packages consume.",
      pt: "Biblioteca de componentes publicada no npm, versionada por um pipeline de release e documentada no Storybook. Nove componentes construídos sobre sete escalas de tokens, num monorepo que também publica as configurações de ESLint e TypeScript que os pacotes consomem.",
    },
    highlights: [
      {
        en: "Published as @emerald-ui/react — four releases through 2.2.0, versioned with Changesets",
        pt: "Publicado como @emerald-ui/react — quatro releases até a 2.2.0, versionado com Changesets",
      },
      {
        en: "Monorepo of five packages (react, tokens, docs, eslint-config, ts-config) orchestrated with Turborepo",
        pt: "Monorepo de cinco pacotes (react, tokens, docs, eslint-config, ts-config) orquestrado com Turborepo",
      },
      {
        en: "Design tokens as the single source of truth: colours, spacing, radii, and four typography scales",
        pt: "Design tokens como fonte única da verdade: cores, espaçamento, raios e quatro escalas tipográficas",
      },
      {
        en: "Storybook docs with the accessibility addon, over Radix primitives for the components where keyboard and ARIA behaviour is worth not reinventing",
        pt: "Documentação em Storybook com o addon de acessibilidade, sobre primitivos Radix nos componentes em que teclado e ARIA não valem a pena reinventar",
      },
    ],
    stack: [
      "React",
      "TypeScript",
      "Stitches",
      "Radix UI",
      "Storybook",
      "Turborepo",
      "Changesets",
    ],
    links: {
      live: "https://ageumenezesdev19.github.io/05-design-system/",
      repo: "https://github.com/ageumenezesDev19/05-design-system",
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
];
