import { Profile } from "./types";

export const profile: Profile = {
  name: "Ageu Menezes",
  location: {
    en: "Ceará, Brazil (UTC-3)",
    pt: "Ceará, Brasil (UTC-3)",
  },
  headline: {
    en: "AI & Front-End Engineer",
    pt: "AI & Front-End Engineer",
  },
  tagline: {
    en: "3+ years on the front end, integrating AI into web systems, like search that answers from documents and structured data extraction from free text.",
    pt: "Mais de 3 anos no front-end, integrando IA em sistemas web, como buscas que respondem com base em documentos e extração de dados estruturados de textos longos.",
  },
  bio: {
    en:
      "I work mostly as a freelancer, and I'm the only front-end developer on a system 15 employees at a retail company use every day to supply more than 30 stores a week.\n\n" +
      "I also build tools to solve problems I've had myself: a note-taking app for studying, an assistant for freelance proposals, and the app that sped up the tax workflow at the stores of another company I work for.\n\n" +
      "I started in web development at Trybe and keep specializing through Rocketseat: React, Next.js, Node.js and DevOps fundamentals.",
    pt:
      "Trabalho principalmente como freelancer e sou o único dev front-end de um sistema que 15 funcionários de uma empresa de varejo usam todo dia para abastecer mais de 30 lojas por semana.\n\n" +
      "Também construo ferramentas para resolver problemas que eu mesmo tive: um app de notas para estudar, um assistente de propostas de freelance e o app que acelerou o fluxo do fiscal nas lojas de outra empresa onde trabalho.\n\n" +
      "Comecei no desenvolvimento web pela Trybe e sigo me especializando pela Rocketseat: React, Next.js, Node.js e fundamentos de DevOps.",
  },
  email: "ageumenezes23@gmail.com",
  socials: [
    {
      id: "github",
      label: "GitHub",
      url: "https://github.com/ageumenezesDev19",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/ageu-m-costa-307852197/",
    },
    {
      id: "email",
      label: "Email",
      url: "mailto:ageumenezes23@gmail.com",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      url: "https://wa.me/5588981524177",
    },
  ],
  resume: {
    en: { url: "/resume.pdf", fileName: "Ageu-Menezes-Resume.pdf" },
    pt: { url: "/resume-pt.pdf", fileName: "Ageu-Menezes-Curriculo.pdf" },
  },
};
