import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import {
  Code2,
  GraduationCap,
  Briefcase,
  Heart,
  Film,
  Music,
} from "lucide-react";
import { useLanguage } from "@/providers/language-provider";

const content = {
  en: {
    title: "About Me",
    overview: "Overview",
    experience: "Experience",
    education: "Education",
    interests: "Interests",
    personalInfo: "Personal Info",
    name: "Name",
    location: "Location",
    email: "Email",
    bio: "Greetings! I'm a Front-end Web Developer who embarked on my coding journey at Trybe, a distinguished Computer Science school, dedicating 8 months to refining my skills. With the knowledge gained, I launched my career as a Software Engineer, crafting not only this portfolio but also various other projects. My learning journey extends to platforms such as Rocketseat, Cataline and Udemy.",
    currentStatus:
      "I am currently working as a freelancer and studying at Rocketseat, Cataline and Udemy.",
    age: "21 years old",
    from: "From Ceará, Brazil",
  },
  pt: {
    title: "Sobre Mim",
    overview: "Visão Geral",
    experience: "Experiência",
    education: "Educação",
    interests: "Interesses",
    personalInfo: "Informações Pessoais",
    name: "Nome",
    location: "Localização",
    email: "Email",
    bio: "Olá! Sou um Desenvolvedor Web Front-end que iniciou sua jornada na programação na Trybe, uma escola de Ciência da Computação reconhecida, dedicando 8 meses ao aperfeiçoamento de minhas habilidades. Com o conhecimento adquirido, iniciei minha carreira como Engenheiro de Software, desenvolvendo não apenas este portfólio, mas também vários outros projetos. Minha jornada de aprendizado se estende a plataformas como Rocketseat, Cataline e Udemy.",
    currentStatus:
      "Atualmente estou trabalhando como freelancer e estudando na Rocketseat, Cataline e Udemy.",
    age: "21 anos",
    from: "De Ceará, Brasil",
  },
};

const AboutSection = () => {
  const { language } = useLanguage();
  const t = content[language];

  const interests = [
    { name: "Web Development", icon: <Code2 className="h-4 w-4" /> },
    { name: "Design", icon: <Heart className="h-4 w-4" /> },
    { name: "Video Editing", icon: <Film className="h-4 w-4" /> },
    { name: "Soft Skills", icon: <GraduationCap className="h-4 w-4" /> },
    { name: "Science Fiction", icon: <Film className="h-4 w-4" /> },
    { name: "Electronic Music", icon: <Music className="h-4 w-4" /> },
  ];

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          {t.title}
        </h2>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed mb-4">{t.bio}</p>
            <p className="text-muted-foreground">{t.currentStatus}</p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-2xl font-semibold mb-4">{t.personalInfo}</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">{t.name}:</span> Ageu Menezes
                </p>
                <p>
                  <span className="font-medium">{t.age}</span>
                </p>
                <p>
                  <span className="font-medium">{t.from}</span>
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  ageumenezes.dev19@gmail.com
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-2xl font-semibold mb-4">
                <Heart className="h-5 w-5 inline-block mr-2" />
                {t.interests}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {interests.map((interest, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-lg bg-primary/10"
                  >
                    {interest.icon}
                    <span>{interest.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
