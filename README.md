# Portfolio Ageu Menezes

Portfolio profissional em React, TypeScript, Vite e Tailwind CSS para apresentar projetos, servicos, certificados e canais de contato de Ageu Menezes.

Este README tambem funciona como guia de planejamento: ele consolida o contexto do projeto e os dados importantes extraidos dos materiais do Bootcamp Dev na Gringa.

## Objetivo do projeto

Transformar o portfolio em uma vitrine clara, confiavel e bilingue para:

- Gerar indicacoes e oportunidades no Brasil.
- Apoiar candidaturas para vagas e contratos internacionais.
- Preparar um experimento controlado em Upwork/freelance.
- Mostrar capacidade pratica em React, TypeScript, Node.js, interfaces web, dashboards, APIs e automacoes simples.
- Comecar a pegar jobs pequenos na Upwork, inicialmente entre US$100 e US$300, para construir reputacao com reviews boas.

Mensagem central recomendada:

> Desenvolvimento web para negocios que precisam vender, organizar ou automatizar processos.

Mensagem internacional recomendada:

> I help fix and improve React/Next.js business systems, including admin panels, dashboards, order flows, inventory tools, API integrations, and PDF/Excel exports.

## Stack atual

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- Framer Motion
- Lucide React
- Supabase client configurado em `src/lib/supabase.ts`

## Comandos

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Estrutura principal

- `src/components/HeroSection.tsx`: primeira impressao, headline, bio e CTA.
- `src/components/AboutSection.tsx`: historia, experiencia, educacao e certificados.
- `src/components/ProjectsSection.tsx`: lista de projetos por idioma/categoria.
- `src/components/SkillsSection.tsx`: tecnologias e habilidades.
- `src/components/ContactSection.tsx`: contato e chamada para acao.
- `src/providers/language-provider.tsx`: alternancia PT/EN.
- `src/providers/theme-provider.tsx`: tema claro/escuro.

## Contexto extraido do Bootcamp Dev na Gringa

Fontes recebidas:

- `Documentos do Bootcamp Dev na Gringa.pdf`
- `Resumo.pages`

Principais aprendizados para este projeto:

- LinkedIn esta integrando IA na busca, recrutamento e validacao de skills. O portfolio e o perfil precisam usar palavras-chave claras, projetos bem descritos e provas objetivas.
- O material cita crescimento de vagas mencionando IA e maior uso de busca semantica. Isso reforca a importancia de escrever o portfolio para humanos e para mecanismos de busca/recrutamento.
- A estrategia de busca deve combinar LinkedIn, publicacoes, queries booleanas, lista de RHs/recrutadores e rotina diaria de candidaturas.
- Ativar no LinkedIn as preferencias de procura por emprego, compartilhamento de perfil ao clicar em candidatar-se e indicacao de interesse a recrutadores.
- Usar `Open to Work` de forma estrategica, especialmente para recrutadores e oportunidades internacionais.
- Candidatar-se quando houver aproximadamente 60-70% de aderencia aos requisitos, sem esperar match perfeito.
- Para vagas internacionais, escrever materiais em ingles e destacar disponibilidade, comunicacao, nivel de ingles e capacidade de entregar remoto.
- Abordar recrutadores com mensagem curta e contextualizada, usando dados do perfil/vaga e evitando texto generico.
- O portfolio deve funcionar como prova rapida: quem abrir precisa entender em ate 30 segundos o que Ageu faz, que problemas resolve, que projetos sustentam isso e como entrar em contato.

## Queries booleanas para LinkedIn

Usar na busca do LinkedIn e filtrar por publicacoes.

### Vagas nacionais

```text
"Sua_tecnologia" AND "Oportunidade" AND ("Jr" OR "Junior" OR "Entry")
"Sua_tecnologia" AND "Vaga" AND NOT ("Pleno" OR "Mid" OR "Senior" OR "Sr")
```

### Vagas internacionais

```text
"Sua_tecnologia" AND "hiring" AND "Latam" AND ("Junior" OR "Jr")
"Sua_tecnologia" AND "oportunidade" AND "Internacional" AND "Jr"
"Sua_tecnologia" AND "vaga" AND "Internacional" AND "Jr"
```

### React / Front-end

```text
"React" AND "Front"
"React" AND "Front" AND NOT ("Senior" OR "SR" OR "Pleno" OR "Mid" OR "Lead")
"React" AND NOT ("Senior" OR "SR" OR "SSR" OR "Lead" OR "Brasil")
"React" AND "Trainee" AND NOT ("Senior" OR "SR" OR "SSR" OR "Lead" OR "Brasil")
```

### Filtros por senioridade

```text
"Junior" OR "Jr" OR "Entry"
"Pleno" OR "Pl" OR "Mid"
"Senior" OR "SR" OR "Senior"
```

## Links de apoio citados no material

- Artigo sobre vagas mencionando IA: https://www.hiringlab.org/2026/01/22/january-labor-market-update-jobs-mentioning-ai-are-growing-amid-broader-hiring-weakness/
- Busca semantica no LinkedIn: https://www.linkedin.com/blog/engineering/search/reimagining-linkedins-search-stack
- LinkedIn Hiring Assistant: https://www.computerweekly.com/news/366638878/LinkedIn-touts-agentic-AI-to-slash-recruitment-time
- LinkedIn Verified Skills: https://news.linkedin.com/2026/Professional_Edge_Skills_Verified
- Agente de IA para a regra das 10 vagas: https://chatgpt.com/share/697d44f6-c7a4-8005-92d6-80bc3da8e776
- Lista de RHs: https://docs.google.com/spreadsheets/d/1hWYFVWiIysynyEVXM01X03ad1U5dJnbnSnLhbgzB00c/edit?usp=sharing
- Resultados da Operacao Codigo de Ouro: https://operacaocodigodeouro.com.br/resultados

## Diagnostico do posicionamento atual

O portfolio e o LinkedIn nao devem parecer uma base de estudante ou um catalogo de tecnologias soltas. O caminho mais profissional e transformar tudo em uma narrativa unica:

- Quem e Ageu.
- Que tipo de sistema ele melhora.
- Que problemas de negocio ele resolve.
- Que tecnologias sustentam essa entrega.
- Que provas existem: projetos, certificados, experiencias, cases e links.

O posicionamento mais forte neste momento nao e "dev full stack generico". E:

> Desenvolvedor React/Next.js focado em corrigir, melhorar e evoluir sistemas web existentes, especialmente dashboards, paineis administrativos, fluxos operacionais, pedidos, estoque, integracoes com API e exportacoes PDF/Excel.

Esse angulo e melhor porque conversa com jobs pequenos e objetivos, principalmente na Upwork. Em vez de vender "eu sei React", a mensagem vira "eu entro em um sistema real, entendo regra de negocio, encontro o problema e entrego uma correcao focada sem quebrar o resto".

## Estrutura recomendada para o LinkedIn

Os prints do bootcamp mostram que o LinkedIn deve ser montado por SEO interno e por leitura humana. As secoes principais precisam repetir palavras-chave importantes de forma natural.

### Headline

A headline deve mostrar funcao, stack e tipo de problema resolvido.

Opcoes em portugues:

```text
Desenvolvedor React/Next.js | Dashboards, Admin Panels, APIs e Sistemas Operacionais
Desenvolvedor Web Full Stack | React, TypeScript, Next.js, APIs e Dashboards
React/Next.js Developer | Sistemas internos, correcoes, integracoes e relatorios
```

Opcao em ingles para Upwork/internacional:

```text
React/Next.js Developer for Admin Panels, Dashboards, Bug Fixes and API Integrations
```

### Sobre

O Sobre deve seguir uma estrutura simples:

1. Abertura: quem e voce e onde atua.
2. Especialidade: React/Next.js, TypeScript, dashboards, admin panels, APIs e sistemas internos.
3. Diferencial: entrar em codigo existente, entender regra de negocio e corrigir fluxos sem quebrar o sistema.
4. Provas: projetos, certificados, entregas reais, sistemas de pedidos/estoque/relatorios.
5. Chamada: aberto a jobs pequenos, freelance, contratos remotos e oportunidades internacionais.

Modelo base em portugues:

```text
Sou desenvolvedor web com foco em React, Next.js e TypeScript, ajudando a corrigir, melhorar e evoluir sistemas web existentes.

Meu foco principal e trabalhar em dashboards, paineis administrativos, fluxos operacionais, formularios, tabelas, integracoes com APIs e exportacoes PDF/Excel. Gosto de entrar em bases de codigo reais, entender a regra de negocio, rastrear bugs e entregar melhorias focadas sem alterar partes desnecessarias do sistema.

Tenho experiencia com interfaces React, consumo de APIs REST, ajustes de payload frontend/backend, normalizacao de dados, componentes reutilizaveis, responsividade e fluxos com regras de negocio. Tambem estudo e aplico fundamentos de Node.js, Next.js, DDD, performance, testes e design system.

Atualmente estou direcionando meu portfolio e meu perfil para projetos pequenos e objetivos, especialmente correcoes, melhorias em admin panels, dashboards, sistemas de pedidos/estoque, CRM interno e relatorios operacionais.
```

Modelo base em ingles:

```text
I am a React/Next.js developer focused on fixing and improving existing web business systems.

I work with admin panels, dashboards, forms, tables, API integrations, order flows, inventory logic, and PDF/Excel exports. I am comfortable jumping into existing codebases, understanding business rules, tracking bugs, and delivering focused fixes without changing unrelated parts of the application.

My background includes React, TypeScript, Next.js, REST APIs, frontend/backend payload mapping, responsive UI, reusable components, and operational workflows. I also study and apply Node.js, performance, testing, DDD, and design system concepts.

I am currently looking for small, clear freelance jobs where I can help teams improve real systems quickly and reliably.
```

### Experiencias

Cada experiencia deve evitar texto generico. Usar este formato:

- Contexto: tipo de empresa/projeto.
- Responsabilidade: o que voce fazia.
- Stack: tecnologias principais.
- Impacto: melhoria, correcao, fluxo, entrega, automacao ou aprendizado aplicado.

Mesmo experiencias pequenas podem ser descritas como trabalho real se houver regra de negocio, cliente, prazo, manutencao, deploy, integracao ou suporte.

### Projetos

Projetos pessoais tambem precisam ser escritos com palavras-chave e contexto. Estrutura recomendada:

- Nome do projeto.
- Problema que ele simula ou resolve.
- Funcionalidades principais.
- Stack.
- O que esse projeto prova para um cliente/recrutador.
- Link demo e GitHub quando fizer sentido.

Projetos que devem virar cases ou cards melhores:

- Inventory and Order Management Dashboard.
- PDF and Excel Operational Reports.
- Bug Fixes in Existing React App.
- Design System.
- FitFlow.
- Pizzashop / Delivery App.
- Store Manager.
- Blogs API.

### Competencias

Priorizar competencias que ajudam LinkedIn, Upwork e portfolio a contarem a mesma historia:

- React
- Next.js
- TypeScript
- JavaScript
- Node.js
- REST APIs
- Admin Panels
- Dashboards
- Forms
- Tables
- API Integration
- Bug Fixing
- Frontend Development
- Responsive Web Design
- PDF Export
- Excel Export
- Git
- GitHub
- Tailwind CSS
- PostgreSQL ou MySQL, se houver projeto real usando

### Secoes primarias e secundarias

Primarias:

- Titulo/headline.
- Aba Sobre.
- Experiencias.
- Projetos.
- Competencias.

Secundarias:

- Destaques.
- Cursos.
- Formacao academica.
- Licencas e certificacoes.
- Reconhecimentos e premios, se houver.
- Recomendacoes em texto.
- Idiomas.

### Destaques

Usar os Destaques para colocar os links mais importantes:

- Portfolio.
- GitHub.
- Melhor projeto/case.
- Curriculo PDF.
- Certificados principais, se ficarem bem apresentados.

## Certificados no projeto

Os certificados em PDF ja estao em `src/assets/`. Eles devem ser usados com curadoria, nao como lista gigante sem hierarquia.

Arquivos atuais:

- `src/assets/Certificate_React - 2022.pdf`
- `src/assets/Certificate_Aprofundando em Next.js.pdf`
- `src/assets/Certificate_Fundamentos do Next.js.pdf`
- `src/assets/Certificate_Integrando Frontend e Backend.pdf`
- `src/assets/Certificate_Design System.pdf`
- `src/assets/Certificado_Design System.pdf`
- `src/assets/Certificate_DDD no Node.js.pdf`
- `src/assets/Certificate_Fundamentos do Node.js.pdf`
- `src/assets/Certificate_Fundamentos do React.pdf`
- `src/assets/Certificate_Aprofundando em Hooks.pdf`
- `src/assets/Certificate_HTTP e Performance.pdf`
- `src/assets/Certificate_Fundamentos da Cultura DevOps.pdf`

Prioridade para portfolio e LinkedIn:

1. React - certificado principal para reforcar base front-end.
2. Aprofundando em Next.js - importante para internacional e Upwork.
3. Integrando Frontend e Backend - muito alinhado com dashboards, APIs, cache, tabelas e testes.
4. Design System - reforca componentes, Storybook e maturidade visual.
5. DDD no Node.js - mostra base de arquitetura/back-end.
6. HTTP e Performance - apoio para confianca tecnica.

No portfolio, os certificados devem aparecer como uma secao compacta, com nome, emissor, carga horaria quando houver, foco tecnico e link para o PDF. Evitar imagens placeholder.

## Perfil Upwork recomendado

Objetivo inicial:

- Pegar jobs pequenos e claros entre US$100 e US$300.
- Conseguir 3 a 5 reviews positivas antes de buscar projetos maiores.
- Priorizar reputacao, clareza e entrega rapida.

Headline:

```text
React/Next.js Developer for Admin Panels, Dashboards, Bug Fixes and API Integrations
```

Descricao curta:

```text
I help fix and improve React/Next.js business systems, including admin panels, dashboards, inventory tools, order flows, API integrations, and PDF/Excel exports. I am comfortable jumping into existing codebases, understanding business rules, and delivering focused fixes quickly.
```

Pitch base para propostas:

```text
Hi, I can help with this. I work with React/Next.js dashboards and internal business systems, including forms, tables, API integrations, order flows, inventory logic, and PDF/Excel exports. I can inspect the issue, identify the cause, and deliver a focused fix without changing unrelated parts of the app.
```

Tipos de jobs para buscar:

- Bug fix em React/Next.js: US$100 a US$250.
- Pequena feature em dashboard/admin panel: US$150 a US$300.
- Integracao ou ajuste de API: US$150 a US$300.
- PDF/Excel/report export: US$150 a US$400.
- Internal business tools: US$200 a US$500.

Evitar no inicio:

- Projetos grandes sem escopo claro.
- Cliente pedindo app completo por valor muito baixo.
- Descricoes vagas demais.
- Disputa de preco com muitos freelancers baratos.
- Jobs muito longe de React, Next.js, TypeScript, dashboard, admin panel ou API.

Priorizar:

- Vagas recentes.
- Descricao clara.
- Bug ou feature pequena.
- Cliente com historico de pagamento.
- Projeto React, Next.js, TypeScript, dashboard ou admin panel.
- Jobs onde seja possivel citar experiencia parecida.

## Case atual para transformar em portfolio

O JSON enviado aponta um case forte para portfolio, mesmo que anonimizado:

### Inventory and Order Management Dashboard

Descricao:

> Sistema interno com pedidos, estoque, entregas, conferencias, tabelas administrativas e regras de negocio complexas.

O que destacar:

- Fluxos de pedido e estoque.
- Tabelas administrativas.
- Modais, formularios e dialogs.
- Integracao frontend/backend.
- Normalizacao de payloads camelCase/snake_case.
- Debug de persistencia server-side.
- Relatorios operacionais.
- Exportacoes PDF/Excel.
- Ajustes de impressao e documentos operacionais.

Esse case deve ser escrito como sistema real de negocio, nao como projeto de estudo. Se houver informacao sensivel, anonimizar nome de empresa, dados e telas.

Sugestao de card:

```text
Inventory and Order Management Dashboard
React, TypeScript, API Integration, Business Rules, PDF/Excel

Internal business system focused on order flows, inventory control, delivery tracking, operational reports, and administrative tables. I worked on improving existing flows, debugging frontend/backend data issues, adjusting payloads, and supporting PDF/Excel exports for operational use.
```

## Planejamento dos proximos passos

### 1. Ajustar posicionamento e copy

- Reescrever o Hero para comunicar valor de negocio, nao apenas stack.
- Criar versoes PT e EN consistentes.
- Tirar textos genericos como "apaixonado por tecnologia" quando nao agregarem prova.
- Usar uma promessa simples: corrigir, melhorar e evoluir sistemas web reais com React/Next.js, APIs, dashboards e relatorios.

### 2. Organizar provas e projetos

- Escolher os projetos principais.
- Para cada projeto, documentar problema, solucao, stack, demo, repo e resultado/aprendizado.
- Substituir imagens genericas por prints reais quando possivel.
- Garantir que PT e EN mostrem a mesma qualidade de informacao.
- Criar pelo menos um case anonimizado do sistema de pedidos/estoque/relatorios.

### 3. Criar secao de servicos

Servicos prioritarios:

- Landing pages profissionais.
- Sites institucionais simples.
- Interfaces React/Next.js.
- Dashboards e paineis administrativos.
- Integracoes com APIs.
- Formularios com envio real.
- Automacoes simples com planilhas, CRM, Notion ou Airtable.
- Ajustes de responsividade, UI, performance e SEO basico.
- Bug fixes em sistemas React/Next.js existentes.
- Exportacoes PDF/Excel e relatorios operacionais.

### 4. Melhorar credibilidade

- Criar secao de certificacoes com curadoria.
- Destacar ReactJS 50h, Next.js, Integrando Frontend e Backend, DDD Node.js e Design System.
- Usar Trybe como base historica, nao como principal destaque.
- Remover placeholders de certificados e imagens genericas.

### 5. Corrigir contato

- Se o formulario nao enviar de verdade, trocar por CTAs diretos.
- Priorizar WhatsApp, email, LinkedIn e GitHub.
- Garantir que o curriculo exista em `/resume.pdf` ou atualizar o link.

### 6. Preparar LinkedIn e rotina de vagas

- Atualizar headline e sobre com palavras-chave de React, TypeScript, Front-end, Web Developer, Node.js e automacoes simples.
- Ativar preferencias de candidatura e interesse para recrutadores.
- Usar queries booleanas diariamente.
- Criar rotina da regra das 10 vagas com registro de vagas, recrutadores, status e follow-up.

### 7. Preparar internacional e Upwork

- Ter versao em ingles do portfolio com copy natural.
- Criar bio curta em ingles para Upwork/LinkedIn.
- Preparar propostas pequenas e personalizadas.
- Testar Upwork com baixo investimento depois que portfolio e perfil estiverem prontos.

## Criterio de sucesso

Uma pessoa que nunca conheceu Ageu deve entender em menos de 30 segundos:

- Quem ele e.
- O que ele faz.
- Que tipo de problema resolve.
- Que projetos provam sua capacidade.
- Como entrar em contato.
