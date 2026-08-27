import { Project } from "./types";

/**
 * Featured projects, in display order. The flagship client project is
 * confidential: no repo/live links and no real data in screenshots.
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
      en: "A production web system I build and maintain for a retail client: inventory, stock movements and production tracking used daily by the company's team. I own the front-end end-to-end — from architecture and API integration to releases.",
      pt: "Sistema web em produção que construo e mantenho para um cliente do varejo: estoque, movimentações e acompanhamento de produção usados diariamente pela equipe da empresa. Sou responsável por todo o front-end — da arquitetura e integração com a API até as releases.",
    },
    highlights: [
      {
        en: "I built the whole front end against an API I don't own — including the sign-in and the rules for who gets to reach which screen",
        pt: "Construí todo o front-end sobre uma API que não é minha — incluindo o login e as regras de quem pode chegar a qual tela",
      },
      {
        en: "The team exports its day's work as spreadsheets, PDFs and documents straight from the interface. It is the part they touch most, so it is the part that could not break",
        pt: "A equipe exporta o trabalho do dia em planilha, PDF e documento direto da interface. É a parte que eles mais usam, então é a parte que não podia quebrar",
      },
      {
        en: "It goes out on a pipeline rather than by hand: end-to-end tests in Playwright, and a changelog that writes itself from the commits",
        pt: "Sobe por um pipeline em vez de na mão: testes end-to-end no Playwright e um changelog que se escreve a partir dos commits",
      },
      {
        en: "Around 230 TypeScript files across 28 routes, in production and still growing — I am the only front-end engineer on it",
        pt: "Uns 230 arquivos TypeScript em 28 rotas, em produção e ainda crescendo — sou o único engenheiro de front-end nele",
      },
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "shadcn/ui", "Playwright"],
    links: {},
  },
  {
    id: "cortex",
    title: "Cortex",
    category: "desktop",
    role: {
      en: "Creator and sole developer",
      pt: "Criador e único desenvolvedor",
    },
    description: {
      en: "A local-first knowledge base for course notes and screenshots. Every image dropped into the vault goes through OCR automatically, so searching finds the text inside a screenshot the same way it finds prose. Markdown on disk is the source of truth — the SQLite index beside it is derived and disposable.",
      pt: "Base de conhecimento local-first para anotações e prints de curso. Toda imagem que entra no vault passa por OCR automático, então a busca encontra o texto dentro do print do mesmo jeito que encontra prosa. Markdown em disco é a fonte da verdade — o índice SQLite ao lado é derivado e descartável.",
    },
    highlights: [
      {
        en: "You can open the vault from your phone — the same app answers in Safari over the tailnet. The desktop window and the phone go through one set of commands rather than two, so whatever I add on the Mac is there on the phone the same day",
        pt: "Dá para abrir o vault pelo celular — o mesmo app responde no Safari pelo tailnet. A janela do desktop e o celular passam por um único conjunto de comandos em vez de dois, então o que eu adiciono no Mac está no celular no mesmo dia",
      },
      {
        en: "Ask it a question and it answers out of your own notes, numbering the passages it used — clicking a citation jumps to that exact spot in the note rather than just opening the file",
        pt: "Você faz uma pergunta e ele responde a partir das suas próprias notas, numerando as passagens que usou — clicar numa citação salta para aquele trecho exato da nota, em vez de só abrir o arquivo",
      },
      {
        en: "It has a classifier that works out what a screenshot is about, and it scores rather than parses: OCR gets code wrong in ways you can predict, reading a lowercase 'l' as the digit '1' and a curly brace as a parenthesis. Since almost everything I paste in is a screenshot of code, anything that insisted on valid syntax would fail on exactly the images the app exists for",
        pt: "Tem um classificador que descobre do que é um screenshot, e ele pontua em vez de parsear: o OCR erra código de formas previsíveis, lendo um 'l' minúsculo como o dígito '1' e uma chave como parêntese. Como quase tudo que eu colo ali é print de código, qualquer coisa que exigisse sintaxe válida falharia justamente nas imagens que motivam o app",
      },
      {
        en: "The notes never leave the machine to be understood: the model that turns them into vectors runs inside the app, not in somebody's cloud. The one thing that does go out is a question you send to an AI provider, and even then the key stays put — it reaches the request on stdin, so it never turns up in the process list",
        pt: "As notas nunca saem da máquina para serem entendidas: o modelo que as transforma em vetores roda dentro do app, não na nuvem de alguém. A única coisa que sai é a pergunta que você manda a um provedor de IA, e mesmo aí a chave fica onde está — ela chega ao pedido pelo stdin, então nunca aparece na lista de processos",
      },
      {
        en: "It sits at 178 MB with a 243-note vault indexed and a search on screen, because it draws in the WebView macOS already ships instead of carrying its own copy of Chromium, and hands OCR to the system's text recognition rather than keeping a model in memory",
        pt: "Fica em 178 MB com um vault de 243 notas indexado e uma busca na tela, porque desenha na WebView que o macOS já traz em vez de carregar a própria cópia do Chromium, e entrega o OCR ao reconhecimento de texto do sistema em vez de manter um modelo na memória",
      },
      {
        en: "The demo you can click is the real front end with the Rust half rebuilt in the browser, and it says where it differs instead of pretending it doesn't: it splits and ranks passages the way the desktop does, but with no SQLite underneath it can order two near-ties differently",
        pt: "A demo que dá para clicar é o front-end de verdade com a metade em Rust refeita no navegador, e ela diz onde difere em vez de fingir que não difere: separa e ranqueia as passagens como o desktop, mas sem SQLite por baixo pode ordenar dois quase-empates de forma diferente",
      },
    ],
    stack: [
      "Tauri 2",
      "Rust",
      "React 19",
      "TypeScript",
      "SQLite FTS5",
      "ProseMirror",
      "axum",
      "Transformers.js",
    ],
    links: {
      live: "https://cortex-tawny-ten.vercel.app",
      liveLabel: { en: "browser demo", pt: "demo no navegador" },
      repo: "https://github.com/ageumenezesDev19/cortex",
    },
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
        en: "A golden-dataset eval suite: real job posts plus hand-written prompt-injection cases carrying a canary token, run through the same analyze path the app ships, and scored against the previous run",
        pt: "Suíte de evals com dataset dourado: anúncios reais mais casos de prompt injection escritos à mão com um token canário, rodando pelo mesmo caminho de análise que o app entrega, e pontuados contra a rodada anterior",
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
      en: "A component library with a published Storybook, built as a monorepo with a release pipeline wired end to end. Nine components on seven token scales, alongside the shared ESLint and TypeScript configs the other packages consume.",
      pt: "Biblioteca de componentes com Storybook publicado, construída como monorepo com pipeline de release configurado de ponta a ponta. Nove componentes sobre sete escalas de tokens, ao lado das configurações de ESLint e TypeScript que os outros pacotes consomem.",
    },
    highlights: [
      {
        en: "Versioned with Changesets and a Turborepo release task — the packaging is set up to publish, not bolted on afterwards",
        pt: "Versionado com Changesets e uma task de release no Turborepo — o empacotamento nasceu pronto para publicar, não foi remendado depois",
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
