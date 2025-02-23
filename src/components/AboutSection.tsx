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
  Award,
  BookOpen,
} from "lucide-react";
import { useLanguage } from "@/providers/language-provider";

// Função para calcular a idade dinamicamente
const calcAge = (birthDate: Date) => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const ageValue = calcAge(new Date(2002, 10, 1)); // Novembro = 10 (0-indexed)

const content = {
  en: {
    title: "About Me",
    overview: "Overview",
    experience: "Experience",
    education: "Education",
    certificates: "Certificates",
    interests: "Interests",
    personalInfo: "Personal Info",
    name: "Name",
    location: "Location",
    email: "Email",
    bio: "Greetings! I'm a Front-end Web Developer who embarked on my coding journey at Trybe, a distinguished Computer Science school, dedicating 8 months to refining my skills. With the knowledge gained, I launched my career as a Software Engineer, crafting not only this portfolio but also various other projects. My learning journey extends to platforms such as Rocketseat, Cataline and Udemy.",
    age: `Age: ${ageValue}`,
    currentStatus:
      "I am currently working as a freelancer and studying at Rocketseat, Cataline and Udemy.",
    from: "From Ceará, Brazil",
    experienceItems: [
      {
        title: "Freelance Software Engineer",
        period: "2023 - Present",
        description:
          "Developing web applications and solutions for various clients using React, TypeScript, and modern web technologies.",
      },
      {
        title: "Trybe Student Developer",
        period: "2022 - 2023",
        description:
          "Completed intensive full-stack development program, working on real-world projects and learning modern web technologies.",
      },
    ],
    educationItems: [
      {
        title: "Trybe - School of Programming",
        period: "2022 - 2023",
        description: "Full Stack Web Development Program",
      },
      {
        title: "Rocketseat",
        period: "2023 - Present",
        description: "Advanced Web Development Specialization",
      },
      {
        title: "Cataline",
        period: "2023 - Present",
        description: "Frontend Development Program",
      },
    ],
    certificateItems: [
      {
        title: "Web Development Fundamentals",
        issuer: "Trybe",
        date: "2023",
        imageUrl:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97", // Replace with your actual certificate image
      },
      {
        title: "React Specialization",
        issuer: "Rocketseat",
        date: "2023",
        imageUrl:
          "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2", // Replace with your actual certificate image
      },
      {
        title: "Modern JavaScript",
        issuer: "Udemy",
        date: "2023",
        imageUrl:
          "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a", // Replace with your actual certificate image
      },
    ],
  },
  pt: {
    title: "Sobre Mim",
    overview: "Visão Geral",
    experience: "Experiência",
    education: "Educação",
    certificates: "Certificados",
    interests: "Interesses",
    personalInfo: "Informações Pessoais",
    name: "Nome",
    location: "Localização",
    age: `Idade: ${ageValue}`,
    bio: "Olá! Sou um Desenvolvedor Web Front-end que iniciou sua jornada na programação na Trybe, uma escola de Ciência da Computação reconhecida, dedicando 8 meses ao aperfeiçoamento de minhas habilidades. Com o conhecimento adquirido, iniciei minha carreira como Engenheiro de Software, desenvolvendo não apenas este portfólio, mas também vários outros projetos. Minha jornada de aprendizado se estende a plataformas como Rocketseat, Cataline e Udemy.",
    currentStatus:
      "Atualmente estou trabalhando como freelancer e estudando na Rocketseat, Cataline e Udemy.",
    from: "De Ceará, Brasil",
    experienceItems: [
      {
        title: "Engenheiro de Software Freelancer",
        period: "2023 - Presente",
        description:
          "Desenvolvimento de aplicações web e soluções para diversos clientes usando React, TypeScript e tecnologias web modernas.",
      },
      {
        title: "Desenvolvedor Estudante na Trybe",
        period: "2022 - 2023",
        description:
          "Completei programa intensivo de desenvolvimento full-stack, trabalhando em projetos reais e aprendendo tecnologias web modernas.",
      },
    ],
    educationItems: [
      {
        title: "Trybe - Escola de Programação",
        period: "2022 - 2023",
        description: "Programa de Desenvolvimento Web Full Stack",
      },
      {
        title: "Rocketseat",
        period: "2023 - Presente",
        description: "Especialização em Desenvolvimento Web Avançado",
      },
      {
        title: "Cataline",
        period: "2023 - Presente",
        description: "Programa de Desenvolvimento Frontend",
      },
    ],
    certificateItems: [
      {
        title: "Fundamentos do Desenvolvimento Web",
        issuer: "Trybe",
        date: "2023",
        imageUrl:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97", // Replace with your actual certificate image
      },
      {
        title: "Especialização em React",
        issuer: "Rocketseat",
        date: "2023",
        imageUrl:
          "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2", // Replace with your actual certificate image
      },
      {
        title: "JavaScript Moderno",
        issuer: "Udemy",
        date: "2023",
        imageUrl:
          "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a", // Replace with your actual certificate image
      },
    ],
  },
};

const AboutSection = () => {
  const { language } = useLanguage();
  const t = content[language];

  // Função para calcular a idade dinamicamente
  const calcAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const ageValue = calcAge(new Date(2002, 10, 1)); // Novembro = 10 (0-indexed)

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

        <Tabs defaultValue="overview" className="w-full mb-8">
          <TabsList className="flex justify-center flex-wrap gap-2 mb-8">
            <TabsTrigger value="overview">{t.overview}</TabsTrigger>
            <TabsTrigger value="experience">{t.experience}</TabsTrigger>
            <TabsTrigger value="education">{t.education}</TabsTrigger>
            <TabsTrigger value="certificates">{t.certificates}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="mb-8">
              <CardContent className="pt-6">
                <p className="text-lg leading-relaxed mb-4">{t.bio}</p>
                <p className="text-muted-foreground">{t.currentStatus}</p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-semibold mb-4">
                    {t.personalInfo}
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">{t.name}:</span> Ageu
                      Menezes
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
          </TabsContent>

          <TabsContent value="experience">
            <div className="space-y-6">
              {t.experienceItems.map((item, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Briefcase className="h-5 w-5 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.period}
                        </p>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="education">
            <div className="space-y-6">
              {t.educationItems.map((item, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <BookOpen className="h-5 w-5 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.period}
                        </p>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="certificates">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.certificateItems.map((item, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-2">
                      <Award className="h-5 w-5 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.issuer} - {item.date}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </section>
  );
};

export default AboutSection;
