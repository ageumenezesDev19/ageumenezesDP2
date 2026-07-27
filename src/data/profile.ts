import { Profile } from "./types";

export const profile: Profile = {
  name: "Ageu Menezes",
  location: {
    en: "Ceará, Brazil (UTC-3)",
    pt: "Ceará, Brasil (UTC-3)",
  },
  headline: {
    en: "Front-End Developer who ships full products",
    pt: "Desenvolvedor Front-End que entrega produtos completos",
  },
  tagline: {
    en: "React · Next.js · TypeScript — with the backend and DevOps skills to take an idea from design to production.",
    pt: "React · Next.js · TypeScript — com backend e DevOps suficientes para levar uma ideia do design à produção.",
  },
  bio: {
    en: "I'm a front-end developer from Brazil, currently building and maintaining a production inventory management system for a retail client as a freelancer. I started out in web development at Trybe and keep specializing through Rocketseat — React, Next.js, Node.js and DevOps fundamentals. I care about the whole product: clean UI, tested code, real deploys.",
    pt: "Sou desenvolvedor front-end brasileiro e atualmente construo e mantenho, como freelancer, um sistema de gestão de estoque em produção para um cliente do varejo. Comecei no desenvolvimento web pela Trybe e sigo me especializando pela Rocketseat — React, Next.js, Node.js e fundamentos de DevOps. Me importo com o produto inteiro: UI limpa, código testado, deploys reais.",
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
      url: "https://www.linkedin.com/in/ageu-menezes-silva-dev/",
    },
    {
      id: "email",
      label: "Email",
      url: "mailto:ageumenezes23@gmail.com",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      url: "https://wa.me/5588981774397",
    },
  ],
  resume: {
    en: { url: "/resume.pdf", fileName: "Ageu-Menezes-Resume.pdf" },
    pt: { url: "/resume-pt.pdf", fileName: "Ageu-Menezes-Curriculo.pdf" },
  },
};
