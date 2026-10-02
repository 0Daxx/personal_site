import { Clock, Mail, MapPin, MessageSquareQuote } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { LinkIcon } from "@/components/link-icon";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { siteConfig } from "@/lib/site-config";

export default function ContactPage() {
  return (
    <div className="container py-16 md:py-24">
      <SectionHeading
        eyebrow="Open channel"
        title="Start a transmission"
        description="Collaborations, speaking, consulting, or a strange ambitious idea that kept you up at night — all welcome. Messages land directly in a private Supabase table."
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
        {/* Form panel */}
        <Reveal>
          <div className="gradient-border relative overflow-hidden rounded-2xl p-6 sm:p-9">
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 animate-drift rounded-full bg-fuchsia-500/15 blur-3xl" />
            <ContactForm />
          </div>
        </Reveal>

        {/* Alt contact rail */}
        <Reveal delay={120} className="space-y-6">
          <div className="luminous-border rounded-2xl bg-void-900/60 p-6">
            <h2 className="font-display text-lg font-semibold text-white">Direct routes</h2>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-400/25 bg-void-800 text-neon-cyan">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <a href={`mailto:${siteConfig.email}`} className="text-zinc-200 underline decoration-purple-400/30 underline-offset-4 transition-colors hover:text-cyan-300">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-400/25 bg-void-800 text-neon-cyan">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-zinc-300">{siteConfig.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-400/25 bg-void-800 text-neon-cyan">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-zinc-300">Replies within ~48 hours</span>
              </li>
            </ul>
          </div>

          <div className="luminous-border rounded-2xl bg-void-900/60 p-6">
            <h2 className="font-display text-lg font-semibold text-white">Elsewhere in orbit</h2>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {siteConfig.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 rounded-xl border border-purple-400/15 px-3.5 py-3 text-sm text-zinc-300 transition-all duration-300 ease-celestial hover:-translate-y-0.5 hover:border-neon-magenta/50 hover:text-white hover:shadow-glow-magenta"
                  >
                    <LinkIcon name={s.icon} className="h-4 w-4 text-neon-cyan transition-colors group-hover:text-neon-magenta" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-fuchsia-500/25 bg-gradient-to-br from-void-800 to-void-900 p-6">
            <MessageSquareQuote className="mb-3 h-6 w-6 text-neon-magenta" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-zinc-300">
              <span className="font-semibold text-white">Good first message:</span> tell me what
              you&apos;re building, your timeline, and one thing about it that excites you. I
              reply faster to specific questions.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
