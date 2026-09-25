import { profile } from "@/data/profile";

/**
 * What the two heroes share. The desktop and the mobile deck lay themselves out
 * nothing alike, so they share the words and the images and not a line of markup.
 */

/**
 * The same portrait shot on two grounds, one per theme. A photograph carries
 * its own background, so on the wrong theme it lands as a block: the navy one
 * against the light page is a step of 221 out of 255, and the light one against
 * the dark page is 218. Served this way each is within ~15 of its page and
 * neither needs a frame to mediate. Only one ever loads.
 */
export const heroPhotos = {
  dark: "/photos/ageu-hero.webp",
  light: "/photos/ageu-hero-light.webp",
};

/** The stack, read by both heroes: chips on desktop, one line on the mobile card. */
export const heroStack = ["React", "Next.js", "TypeScript", "Node.js", "RAG", "LLMs"];

// The role line comes from profile.headline, so it cannot drift from the
// title the resumes and LinkedIn use; it once said "front-end" alone here.
export const heroText = {
  en: {
    status: "available for freelance work",
    headline1: profile.headline.en,
    headline2: "who ships full products.",
    viewWork: "View work",
    downloadResume: "Download resume",
    contact: "Contact",
    photoCaption: `${profile.name} — ${profile.headline.en}`,
    swipeHint: "Swipe to explore",
  },
  pt: {
    status: "disponível para freelas",
    headline1: profile.headline.pt,
    headline2: "que entrega produtos completos.",
    viewWork: "Ver projetos",
    downloadResume: "Baixar currículo",
    contact: "Contato",
    photoCaption: `${profile.name} — ${profile.headline.pt}`,
    swipeHint: "Deslize para explorar",
  },
};
