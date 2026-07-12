import { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: { en: "Front-End", pt: "Front-End" },
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "styled-components",
      "HTML5 / CSS3",
      "Framer Motion",
      "React Native",
    ],
  },
  {
    id: "backend",
    label: { en: "Back-End", pt: "Back-End" },
    skills: [
      "Node.js",
      "Express",
      "REST APIs",
      "MySQL",
      "Prisma / Sequelize",
      "JWT Auth",
    ],
  },
  {
    id: "devops",
    label: { en: "DevOps", pt: "DevOps" },
    skills: [
      "Docker",
      "CI/CD (GitHub Actions)",
      "Vercel",
      "Conventional Commits + release automation",
    ],
  },
  {
    id: "tools",
    label: { en: "Testing & Tools", pt: "Testes & Ferramentas" },
    skills: [
      "Playwright (e2e)",
      "Jest",
      "Zod",
      "React Hook Form",
      "Git / GitHub",
      "Agile / Scrum",
    ],
  },
];
