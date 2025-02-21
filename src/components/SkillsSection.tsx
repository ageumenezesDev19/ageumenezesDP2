import React from "react";
import { motion } from "framer-motion";
import { Progress } from "./ui/progress";
import { Card, CardContent } from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  Code2,
  Database,
  GitBranch,
  Globe,
  Layout,
  Server,
} from "lucide-react";

interface Skill {
  name: string;
  proficiency: number;
  icon?: React.ReactNode;
  category: "frontend" | "backend" | "other";
}

interface SkillsSectionProps {
  skills?: Skill[];
}

const defaultSkills: Skill[] = [
  {
    name: "React.js",
    proficiency: 95,
    icon: <Layout className="w-5 h-5" />,
    category: "frontend",
  },
  {
    name: "TypeScript",
    proficiency: 90,
    icon: <Code2 className="w-5 h-5" />,
    category: "frontend",
  },
  {
    name: "JavaScript",
    proficiency: 95,
    icon: <Code2 className="w-5 h-5" />,
    category: "frontend",
  },
  {
    name: "HTML5/CSS3",
    proficiency: 95,
    icon: <Layout className="w-5 h-5" />,
    category: "frontend",
  },
  {
    name: "Node.js",
    proficiency: 85,
    icon: <Server className="w-5 h-5" />,
    category: "backend",
  },
  {
    name: "MySQL",
    proficiency: 85,
    icon: <Database className="w-5 h-5" />,
    category: "backend",
  },
  {
    name: "Docker",
    proficiency: 80,
    icon: <Database className="w-5 h-5" />,
    category: "backend",
  },
  {
    name: "Express.js",
    proficiency: 85,
    icon: <Server className="w-5 h-5" />,
    category: "backend",
  },
  {
    name: "Git/GitHub",
    proficiency: 90,
    icon: <GitBranch className="w-5 h-5" />,
    category: "other",
  },
  {
    name: "Agile Methods",
    proficiency: 85,
    icon: <Globe className="w-5 h-5" />,
    category: "other",
  },
  {
    name: "POO & SOLID",
    proficiency: 85,
    icon: <Code2 className="w-5 h-5" />,
    category: "other",
  },
];

const SkillsSection = ({ skills = defaultSkills }: SkillsSectionProps) => {
  const categories = ["frontend", "backend", "other"];

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Technical Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency
            levels across different technologies and tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card key={category}>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold capitalize mb-6">
                  {category}
                </h3>
                <div className="space-y-6">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="mb-2">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    {skill.icon}
                                    <span className="font-medium">
                                      {skill.name}
                                    </span>
                                  </div>
                                  <span className="text-sm text-muted-foreground">
                                    {skill.proficiency}%
                                  </span>
                                </div>
                                <Progress
                                  value={skill.proficiency}
                                  className="h-2"
                                />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Proficiency: {skill.proficiency}%</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </motion.div>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
