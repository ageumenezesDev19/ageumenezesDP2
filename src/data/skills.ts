import { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    id: "ai",
    label: { en: "AI Engineering", pt: "Engenharia de IA" },
    skills: [
      "LLMs (OpenAI, Gemini, Groq, local models)",
      "Retrieval-Augmented Generation (RAG)",
      "Embeddings",
      "Hybrid Search (BM25 + vector)",
      "Structured Output (Zod)",
      "LLM Evals",
      "Prompt Injection Protection",
    ],
  },
  {
    id: "frontend",
    label: { en: "Front-End", pt: "Front-End" },
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "shadcn/ui",
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
      "PostgreSQL",
      "MySQL",
      "Prisma",
      "JWT",
      "Role-Based Access Control",
      "Row-Level Security",
    ],
  },
  {
    id: "devops",
    label: { en: "Cloud & Delivery", pt: "Cloud e Entrega" },
    skills: [
      "Vercel",
      "Supabase",
      "GitHub Actions (CI/CD)",
      "Docker",
    ],
  },
  {
    id: "tools",
    label: { en: "Testing & Tools", pt: "Testes e Ferramentas" },
    skills: [
      "Playwright (E2E)",
      "Vitest (unit)",
      "Jest",
      "React Testing Library",
      "React Hook Form",
      "Git / GitHub",
      "Agile / Scrum",
    ],
  },
];
