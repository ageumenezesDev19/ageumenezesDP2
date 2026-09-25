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
    en: "3+ years on the front end. These days I also build AI features, like search that finds the text inside screenshots, and answers built on what it finds.",
    pt: "Mais de 3 anos no front-end, hoje também implementando funcionalidades com IA, como buscas que encontram o texto dentro de prints e respostas inteligentes baseadas nesses dados.",
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
