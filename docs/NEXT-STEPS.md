# Próximos passos (pendências que dependem de você)

## Antes do merge do PR #10

1. **Aprovar o case study NDA** — revise o texto e o mockup do projeto do cliente em
   `src/data/projects.ts` (id `komerben`) e `src/assets/projects/komerben.webp`.
   Nenhum nome, dado ou tela real do cliente é exposto — só stack, escala e seu papel.
2. **Criar conta no Resend** (https://resend.com, grátis) com o email ageumenezes23@gmail.com,
   gerar uma API key e adicioná-la na Vercel:
   *Project Settings → Environment Variables → `RESEND_API_KEY`*.

## Depois do merge (deploy automático na Vercel)

3. Testar o formulário de contato em produção (enviar mensagem e conferir se chega no Gmail).
4. Conferir o site em EN/PT, dark/light e no celular.

## GitHub (5 minutos, manual)

5. **Fixar (pin) os repos** no seu perfil, nesta ordem:
   `DesPensa-`, `habits-web`, `fitflow`, `chrono-track`, `04-ignite-shop`, `ageumenezesDP2`
   (Perfil → Customize your pins).
6. Sugestão de bio do perfil: *"Front-End Developer | React · Next.js · TypeScript | Freelancer"*.

## Deploys que faltam (precisam do seu login na Vercel)

7. `npm i -g vercel && vercel login`, depois:
   - **chrono-track**: `git clone`, `vercel --prod` (é Vite puro, zero config).
   - **habits-web**: precisa da API no ar. Opções: hospedar `habits-server` no Render/Railway
     (free tier) e apontar a URL, ou deixar como "open source" no portfólio (estado atual, já ok).
8. Depois dos deploys, adicionar os links `live` em `src/data/projects.ts` e trocar o
   painel "stack manifest" por screenshot real em `src/assets/projects/`.

## Extras (quando quiser)

- Domínio próprio (ex: `ageumenezes.dev`) — comprar e adicionar na Vercel; atualizar
  `index.html` (canonical/OG), `public/robots.txt`, `public/sitemap.xml` e o CV.
- Renomear o projeto na Vercel para uma URL mais limpa (ex: `ageumenezes.vercel.app`, se livre).
- LinkedIn: alinhar headline/about com o portfólio (material em `docs/PLANNING.md`).
