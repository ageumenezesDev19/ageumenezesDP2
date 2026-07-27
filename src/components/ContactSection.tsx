import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, MessageCircle, Send, Loader2, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useLanguage } from "@/providers/language-provider";
import { profile } from "@/data/profile";

const content = {
  en: {
    eyebrow: "get in touch",
    title: "Let's build something",
    subtitle:
      "Have a project in mind, or want to talk through an idea? Send a message — I usually reply within one business day.",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "you@company.com",
    messageLabel: "Message",
    messagePlaceholder: "Tell me about your project…",
    send: "Send message",
    sending: "Sending…",
    success: "Message sent. I'll get back to you soon.",
    error: "Something went wrong sending your message. Email me directly at",
    directTitle: "Direct channels",
    downloadResume: "Download resume",
    validation: {
      name: "Enter your name.",
      email: "Enter a valid email so I can reply.",
      message: "Write a short message (at least 10 characters).",
    },
  },
  pt: {
    eyebrow: "contato",
    title: "Vamos construir algo",
    subtitle:
      "Tem um projeto em mente ou quer discutir uma ideia? Mande uma mensagem — normalmente respondo em um dia útil.",
    nameLabel: "Nome",
    namePlaceholder: "Seu nome",
    emailLabel: "Email",
    emailPlaceholder: "voce@empresa.com",
    messageLabel: "Mensagem",
    messagePlaceholder: "Me conte sobre seu projeto…",
    send: "Enviar mensagem",
    sending: "Enviando…",
    success: "Mensagem enviada. Retorno em breve.",
    error: "Algo deu errado no envio. Me escreva direto em",
    directTitle: "Canais diretos",
    downloadResume: "Baixar currículo",
    validation: {
      name: "Informe seu nome.",
      email: "Informe um email válido para eu responder.",
      message: "Escreva uma mensagem curta (mínimo 10 caracteres).",
    },
  },
};

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  whatsapp: MessageCircle,
};

const ContactSection = () => {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const t = content[language];
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const schema = z.object({
    name: z.string().min(2, t.validation.name),
    email: z.string().email(t.validation.email),
    message: z.string().min(10, t.validation.message),
    // Honeypot: humans never fill this
    company: z.string().max(0).optional().or(z.literal("")),
  });
  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const reveal = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.5 },
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div {...reveal} className="mb-8 md:mb-12">
          <p className="eyebrow mb-3">{t.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            {t.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12">
          {/* Direct channels */}
          <motion.div {...reveal}>
            <h3 className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-6">
              {t.directTitle}
            </h3>
            <ul className="space-y-4 mb-8">
              {profile.socials.map((social) => {
                const Icon = socialIcons[social.id];
                return (
                  <li key={social.id}>
                    <a
                      href={social.url}
                      target={social.id === "email" ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card group-hover:border-primary/50 transition-colors">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-sm">
                        {social.id === "email" ? profile.email : social.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <Button variant="outline" className="min-h-11 w-full sm:w-auto" asChild>
              <a href={profile.resumeUrl} download="Ageu-Menezes-Resume.pdf">
                <FileText className="mr-2 h-4 w-4" />
                {t.downloadResume}
              </a>
            </Button>
          </motion.div>

          {/* Form */}
          <motion.div {...reveal}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-xl border border-border bg-card p-6 sm:p-8 space-y-5"
              noValidate
            >
              <div className="space-y-2">
                <Label htmlFor="contact-name">{t.nameLabel}</Label>
                <Input
                  id="contact-name"
                  placeholder={t.namePlaceholder}
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">{t.emailLabel}</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder={t.emailPlaceholder}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message">{t.messageLabel}</Label>
                <Textarea
                  id="contact-message"
                  placeholder={t.messagePlaceholder}
                  className="min-h-[140px]"
                  aria-invalid={!!errors.message}
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-sm text-destructive">{errors.message.message}</p>
                )}
              </div>

              {/* Honeypot field, hidden from humans */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-company">Company</label>
                <input
                  id="contact-company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("company")}
                />
              </div>

              <Button
                type="submit"
                className="w-full min-h-11 font-semibold"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t.sending}
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> {t.send}
                  </>
                )}
              </Button>

              <p aria-live="polite" className="text-sm min-h-5">
                {status === "success" && (
                  <span className="text-emerald-500">{t.success}</span>
                )}
                {status === "error" && (
                  <span className="text-destructive">
                    {t.error}{" "}
                    <a href={`mailto:${profile.email}`} className="underline underline-offset-4">
                      {profile.email}
                    </a>
                  </span>
                )}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
