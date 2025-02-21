import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

interface TechStack {
  name: string;
  color?: string;
}

interface ProjectCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  techStack?: TechStack[];
  repoUrl?: string;
  demoUrl?: string;
}

const ProjectCard = ({
  title = "Project Title",
  description = "A brief description of the project and its key features. This showcases the main functionality and purpose of the project.",
  imageUrl = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
  techStack = [
    { name: "React", color: "bg-blue-100 text-blue-800" },
    { name: "TypeScript", color: "bg-blue-100 text-blue-800" },
    { name: "Tailwind", color: "bg-teal-100 text-teal-800" },
  ],
  repoUrl,
  demoUrl,
}: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="w-full"
    >
      <Card className="overflow-hidden h-full bg-card hover:bg-card/80 transition-colors">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <Badge key={index} variant="secondary" className={tech.color}>
                {tech.name}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center gap-2">
          {repoUrl && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(repoUrl, "_blank")}
              className="flex-1"
            >
              <Github className="h-4 w-4 mr-2" />
              Source
            </Button>
          )}
          {demoUrl && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(demoUrl, "_blank")}
              className="flex-1"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Demo
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
