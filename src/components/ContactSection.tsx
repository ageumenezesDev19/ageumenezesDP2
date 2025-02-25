import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Github, Linkedin, Mail, FileText, Send } from "lucide-react";
import { motion } from "framer-motion";

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface ContactSectionProps {
  socialLinks?: SocialLink[];
  resumeUrl?: string;
  onSubmit?: (data: { name: string; email: string; message: string }) => void;
}

import { useLanguage } from "@/providers/language-provider";

const content = {
  en: {
    title: "Get In Touch",
    subtitle:
      "I'm always looking for new challenges and opportunities to grow professionally. If you're seeking a developer who's passionate about technology and committed to excellence, let's connect!",
    contactForm: "Contact Form",
    namePlaceholder: "Your Name",
    emailPlaceholder: "Your Email",
    messagePlaceholder: "Your Message",
    sendButton: "Send Message",
    connectWithMe: "Connect With Me",
    downloadResume: "Download Resume",
  },
  pt: {
    title: "Entre em Contato",
    subtitle:
      "Estou sempre em busca de novos desafios e oportunidades para crescer profissionalmente. Se você procura um desenvolvedor apaixonado por tecnologia e comprometido com a excelência, vamos nos conectar!",
    contactForm: "Formulário de Contato",
    namePlaceholder: "Seu Nome",
    emailPlaceholder: "Seu Email",
    messagePlaceholder: "Sua Mensagem",
    sendButton: "Enviar Mensagem",
    connectWithMe: "Conecte-se Comigo",
    downloadResume: "Baixar Currículo",
  },
};

const ContactSection = ({
  socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com/ageumenezesDev19",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/in/ageu-menezes-silva-dev/",
      label: "LinkedIn",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      href: "mailto:ageumenezes.dev19@gmail.com",
      label: "Email",
    },
  ],
  resumeUrl = "/resume.pdf",
  onSubmit = () => {},
}: ContactSectionProps) => {
  const { language } = useLanguage();
  const t = content[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    onSubmit({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    });
  };

  return (
    <section className="py-16 px-4 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{t.contactForm}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder={t.namePlaceholder}
                      name="name"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder={t.emailPlaceholder}
                      name="email"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder={t.messagePlaceholder}
                      name="message"
                      required
                      className="w-full min-h-[150px]"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" /> {t.sendButton}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>{t.connectWithMe}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(resumeUrl, "_blank")}
                >
                  <FileText className="mr-2 h-4 w-4" /> {t.downloadResume}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
