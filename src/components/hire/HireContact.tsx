import { Mail, Linkedin } from "lucide-react";
import { Button } from "../ui/button";
import { profile } from "@/data/profile";

export type HireContactMode = "upwork" | "direct";

/**
 * Defaults to "upwork" because that is where this page is sent from, and the
 * safe answer has to be the default one.
 *
 * Linking a portfolio inside a proposal is fine. Offering email or WhatsApp
 * before a contract exists is what the platform reads as taking the client off
 * it, and the penalty falls on the account. "direct" exists for the other
 * places this page gets used — LinkedIn, outreach — where none of that applies.
 */
const HireContact = ({ mode = "upwork" }: { mode?: HireContactMode }) => {
  const email = profile.socials.find((social) => social.id === "email");
  const linkedin = profile.socials.find((social) => social.id === "linkedin");

  return (
    <section className="bg-background px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
          Tell me what's costing you time.
        </h2>

        {mode === "upwork" ? (
          <p className="text-lg text-muted-foreground">
            Reply to my proposal and describe the process as it runs today — what happens, who
            does it, how often. I'll tell you what I'd change and what it would take, before
            either of us commits to anything.
          </p>
        ) : (
          <>
            <p className="text-lg text-muted-foreground mb-8">
              Describe the process as it runs today — what happens, who does it, how often.
              I'll tell you what I'd change and what it would take.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              {email && (
                <Button size="lg" className="w-full sm:w-auto min-h-11" asChild>
                  <a href={email.url}>
                    <Mail className="mr-2 h-4 w-4" />
                    {profile.email}
                  </a>
                </Button>
              )}
              {linkedin && (
                <Button size="lg" variant="outline" className="w-full sm:w-auto min-h-11" asChild>
                  <a href={linkedin.url} target="_blank" rel="noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
              )}
            </div>
          </>
        )}

        {/* Deliberately not a link. Nothing here leads to the recruiter-facing
            portfolio — that separation is the reason these pages exist. */}
        <p className="mt-12 border-t border-border pt-6 font-mono text-xs text-muted-foreground">
          {profile.name} · {profile.location.en}
        </p>
      </div>
    </section>
  );
};

export default HireContact;
