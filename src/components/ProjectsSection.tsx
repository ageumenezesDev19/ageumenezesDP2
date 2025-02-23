import React, { useState, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  repoUrl: string;
  demoUrl?: string;
  techStack: { name: string; color: string }[];
}

interface ProjectsSectionProps {
  projects?: Project[];
}

import { useLanguage } from "@/providers/language-provider";

const content = {
  en: {
    title: "My Projects",
    all: "all",
    projects: [
      {
        id: 1,
        title: "Design System",
        demoUrl: "https://ageumenezesdev19.github.io/05-design-system/",
        description:
          "A comprehensive design system built with React and Storybook, featuring reusable components and consistent styling guidelines.",
        imageUrl:
          "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&auto=format&fit=crop&q=60",
        category: "Frontend",
        repoUrl: "https://github.com/ageumenezesDev19/05-design-system",
        techStack: [
          { name: "React", color: "bg-blue-100 text-blue-800" },
          { name: "Storybook", color: "bg-pink-100 text-pink-800" },
          { name: "TypeScript", color: "bg-blue-100 text-blue-800" },
          { name: "Tailwind", color: "bg-teal-100 text-teal-800" },
        ],
      },
      {
        id: 2,
        title: "FitFlow",
        demoUrl: "https://fitflow-taupe.vercel.app",
        description:
          "A fitness tracking application that helps users monitor their workouts and track their progress over time.",
        imageUrl:
          "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=60",
        category: "Full Stack",
        repoUrl: "https://github.com/ageumenezesDev19/fitflow",
        techStack: [
          { name: "React", color: "bg-blue-100 text-blue-800" },
          { name: "Node.js", color: "bg-green-100 text-green-800" },
          { name: "TypeScript", color: "bg-blue-100 text-blue-800" },
          { name: "Express", color: "bg-purple-100 text-purple-800" },
        ],
      },
      {
        id: 3,
        title: "Ignite Feed",
        demoUrl: "https://ignite-feed-livid.vercel.app",
        description:
          "A modern social media feed application built with React, featuring real-time updates and interactive posts.",
        imageUrl:
          "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60",
        category: "Frontend",
        repoUrl: "https://github.com/ageumenezesDev19/ignite-feed",
        techStack: [
          { name: "React", color: "bg-blue-100 text-blue-800" },
          { name: "TypeScript", color: "bg-blue-100 text-blue-800" },
          { name: "Tailwind", color: "bg-teal-100 text-teal-800" },
        ],
      },
      {
        id: 4,
        title: "To-Do App",
        demoUrl: "https://endearing-hamster-35a11e.netlify.app/",
        description:
          "A feature-rich todo application with task management, categories, and progress tracking.",
        imageUrl:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
        category: "Frontend",
        repoUrl: "https://github.com/ageumenezesDev19/project-my-tasks-to-do",
        techStack: [
          { name: "React", color: "bg-blue-100 text-blue-800" },
          { name: "TypeScript", color: "bg-blue-100 text-blue-800" },
          { name: "Redux", color: "bg-purple-100 text-purple-800" },
        ],
      },
      {
        id: 5,
        title: "Solar System",
        demoUrl:
          "https://project-solar-system-7s8g9uo88-ageumenezesdev19.vercel.app",
        description:
          "An interactive visualization of the solar system built with React and Three.js, featuring 3D models and animations.",
        imageUrl:
          "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&auto=format&fit=crop&q=60",
        category: "Frontend",
        repoUrl: "https://github.com/ageumenezesDev19/project-solar-system",
        techStack: [
          { name: "React", color: "bg-blue-100 text-blue-800" },
          { name: "Three.js", color: "bg-yellow-100 text-yellow-800" },
          { name: "JavaScript", color: "bg-yellow-100 text-yellow-800" },
        ],
      },
      // {
      //   id: 1,
      //   title: "Trybe Futebol Clube",
      //   description:
      //     "RESTful API for a football matches and standings information website. Built with TypeScript, Node.js, Express.js, and MySQL.",
      //   imageUrl:
      //     "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=60",
      //   category: "Back-end",
      //   repoUrl: "https://github.com/ageumenezesDev19/project-trybe-futebol-clube",
      //   techStack: [
      //     { name: "TypeScript", color: "bg-blue-100 text-blue-800" },
      //     { name: "Node.js", color: "bg-green-100 text-green-800" },
      //     { name: "MySQL", color: "bg-orange-100 text-orange-800" },
      //     { name: "Docker", color: "bg-blue-100 text-blue-800" },
      //   ],
      // },
      {
        id: 2,
        title: "Delivery App",
        description:
          "Full-stack beverage delivery application. Complete system with authentication, shopping cart, and order management.",
        imageUrl:
          "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&auto=format&fit=crop&q=60",
        category: "Full Stack",
        repoUrl: "https://github.com/ageumenezesDev19/pizzashop-web",
        techStack: [
          { name: "React", color: "bg-blue-100 text-blue-800" },
          { name: "Node.js", color: "bg-green-100 text-green-800" },
          { name: "MySQL", color: "bg-orange-100 text-orange-800" },
          { name: "Express", color: "bg-purple-100 text-purple-800" },
        ],
      },
    ],
  },
  pt: {
    title: "Meus Projetos",
    all: "todos",
    projects: [
      {
        id: 4,
        title: "Store Manager",
        description:
          "RESTful API for sales management system with MSC architecture and unit testing.",
        imageUrl:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
        category: "Back-end",
        repoUrl: "https://github.com/ageumenezesDev19/store-manager-project",
        techStack: [
          { name: "Node.js", color: "bg-green-100 text-green-800" },
          { name: "Express", color: "bg-purple-100 text-purple-800" },
          { name: "MySQL", color: "bg-orange-100 text-orange-800" },
          { name: "Jest", color: "bg-red-100 text-red-800" },
        ],
      },
      {
        id: 5,
        title: "Blogs API",
        description:
          "API for blog platform with JWT authentication, CRUD operations for posts and categories using Sequelize ORM.",
        imageUrl:
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60",
        category: "Back-end",
        repoUrl: "https://github.com/ageumenezesDev19/blogs-api-project",
        techStack: [
          { name: "Node.js", color: "bg-green-100 text-green-800" },
          { name: "Sequelize", color: "bg-blue-100 text-blue-800" },
          { name: "JWT", color: "bg-yellow-100 text-yellow-800" },
          { name: "MySQL", color: "bg-orange-100 text-orange-800" },
        ],
      },
    ],
  },
};

const ProjectsSection = ({
  projects = content.en.projects,
}: ProjectsSectionProps) => {
  const { language } = useLanguage();
  const t = content[language];
  // Use "all" como chave padrão independentemente do idioma
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isAnimating, setIsAnimating] = useState(false);

  // Pre-filtra os projetos por categoria para melhor performance
  const projectsByCategory = useMemo(() => {
    const categories = {} as Record<string, typeof projects>;
    categories["all"] = projects;

    projects.forEach((project) => {
      if (!categories[project.category]) {
        categories[project.category] = [];
      }
      categories[project.category].push(project);
    });

    return categories;
  }, [projects]);

  // Inclui "all" (sempre em inglês na lógica) e as demais categorias dos projetos
  const categories = [
    "all",
    ...new Set(projects.map((project) => project.category)),
  ];

  const filteredProjects = projectsByCategory[selectedCategory] || [];

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-muted/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          {t.title}
        </h2>

        <Tabs defaultValue="all" className="w-full mb-12">
          <TabsList className="flex justify-center flex-wrap gap-2">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => {
                  if (!isAnimating && category !== selectedCategory) {
                    setIsAnimating(true);
                    setSelectedCategory(category);
                  }
                }}
                className="capitalize transition-all duration-200 hover:scale-105"
                disabled={isAnimating}
              >
                {category === "all" ? t.all : category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onAnimationComplete={() => setIsAnimating(false)}
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    imageUrl={project.imageUrl}
                    techStack={project.techStack}
                    repoUrl={project.repoUrl}
                    demoUrl={project.demoUrl}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
