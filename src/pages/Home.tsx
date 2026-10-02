import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Github, Sparkles } from "lucide-react";
import { ArticleCard } from "@/components/cards/article-card";
import { ProjectCard, ProjectCover } from "@/components/cards/project-card";
import { SocialPostCard } from "@/components/cards/social-post-card";
import { LinkIcon } from "@/components/link-icon";
import { MagneticButton } from "@/components/magnetic-button";
import { Reveal } from "@/components/reveal";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { ErrorState } from "@/components/error-state";
import { CardGridSkeleton, ListSkeleton } from "@/components/skeletons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useResource } from "@/hooks/use-resource";
import { getArticles, getImportantLinks, getProjects, getSocialPosts } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import type { Project } from "@/types";

export default function Home() {
  const projects = useResource(getProjects);
  const articles = useResource(getArticles);
  const posts = useResource(getSocialPosts);
  const links = useResource(getImportantLinks);

  // Shared quick-look dialog state (no prop drilling, no module globals).
  const [quickLook, setQuickLook] = useState<Project | null>(null);
  const openDetail = useCallback((p: Project) => setQuickLook(p), []);

  const featuredProjects = useMemo(
    () => (projects.data ?? []).filter((p) => p.featured).slice(0, 3),
    [projects.data]
  );
  const recentArticles = (articles.data ?? []).slice(0, 3);
  const topPosts = (posts.data ?? []).slice(0, 2);
  const topLinks = (links.data ?? []).slice(0, 4);

  return (
    <>
      <HeroSection />

      {/* ---------------------------- Featured Work ---------------------------- */}
      <section aria-labelledby="featured-work" className="container py-24 md:py-32">
        <SectionHeading
          eyebrow="Transmission 01"
          title="Featured work from the archive"
          description="Selected missions where engineering precision met creative ambition — generative systems, developer tools, and immersive products."
        />

        {projects.error ? (
          <ErrorState message={projects.error} onRetry={projects.refetch} />
        ) : projects.loading ? (
          <CardGridSkeleton count={3} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <Reveal key={project.id} delay={i * 90}>
                <ProjectCard project={project} onViewDetails={openDetail} />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal className="mt-10 flex justify-center" delay={120}>
          <MagneticButton>
            <Button variant="cyan" asChild>
              <Link to="/projects">
                Browse the full archive <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </MagneticButton>
        </Reveal>
      </section>

      {/* -------------------------------- About -------------------------------- */}
      <section aria-labelledby="about" className="relative border-y border-purple-400/10 bg-void-900/40 py-24 md:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-gradient-to-b from-transparent via-fuchsia-500/5 to-transparent blur-2xl"
        />
        <div className="container grid items-start gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading eyebrow="Pilot profile" title="The human behind the nebula" className="!mb-6" />
            <Reveal>
              <p className="text-base leading-relaxed text-zinc-300">{siteConfig.intro}</p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">{siteConfig.currentFocus}</p>
            </Reveal>
            <Reveal delay={100}>
              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Skills">
                {siteConfig.skills.map((skill) => (
                  <li key={skill}>
                    <Badge variant="outline" className="transition-colors hover:border-neon-cyan/50 hover:text-cyan-200">
                      {skill}
                    </Badge>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="space-y-6">
            <Reveal delay={80}>
              <dl className="gradient-border grid grid-cols-2 overflow-hidden rounded-2xl">
                {siteConfig.stats.map((stat) => (
                  <div key={stat.label} className="border border-purple-400/10 bg-void-900/90 p-6 text-center transition-colors hover:bg-void-800/90">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block font-display text-3xl font-bold text-gradient-neon animate-gradient-x">
                        {stat.value}
                      </span>
                      <span className="mt-1 block text-xs uppercase tracking-widest text-zinc-500">{stat.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={160}>
              <ul className="space-y-4">
                {siteConfig.values.map((value) => (
                  <li
                    key={value.title}
                    className="luminous-border group rounded-xl bg-void-900/60 p-5 transition-all duration-300 ease-celestial hover:-translate-y-0.5 hover:border-cyan-400/30"
                  >
                    <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-white">
                      <Sparkles
                        className="h-4 w-4 text-neon-magenta transition-transform duration-300 group-hover:rotate-12"
                        aria-hidden="true"
                      />
                      {value.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{value.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ----------------------------- Content feed ----------------------------- */}
      <section aria-labelledby="content" className="container py-24 md:py-32">
        <SectionHeading
          eyebrow="Live signals"
          title="Writing, transmissions & anchors"
          description="Fresh from the journal, the social relay, and the link constellation."
        />
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-white">Recent articles</h3>
              <Link to="/articles" className="group inline-flex items-center gap-1 text-sm text-cyan-400 transition-colors hover:text-cyan-300">
                All writing
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </Reveal>
            {articles.error ? (
              <ErrorState message={articles.error} onRetry={articles.refetch} />
            ) : articles.loading ? (
              <ListSkeleton count={3} />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">
                {recentArticles.map((article, i) => (
                  <Reveal key={article.id} delay={i * 80}>
                    <ArticleCard article={article} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-10">
            <div>
              <Reveal className="mb-5 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-white">Latest posts</h3>
                <Link to="/social" className="group inline-flex items-center gap-1 text-sm text-cyan-400 transition-colors hover:text-cyan-300">
                  Full relay
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </Reveal>
              {posts.loading ? (
                <ListSkeleton count={2} />
              ) : (
                <div className="space-y-4">
                  {topPosts.map((post, i) => (
                    <Reveal key={post.id} delay={i * 80}>
                      <SocialPostCard post={post} />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Reveal className="mb-5 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-white">Important links</h3>
                <Link to="/links" className="group inline-flex items-center gap-1 text-sm text-cyan-400 transition-colors hover:text-cyan-300">
                  Link hub
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </Reveal>
              {links.loading ? (
                <ListSkeleton count={3} />
              ) : (
                <ul className="space-y-3">
                  {topLinks.map((link, i) => (
                    <Reveal as="li" key={link.id} delay={i * 70}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-xl border border-purple-400/15 bg-void-900/60 px-4 py-3 transition-all duration-300 ease-celestial hover:-translate-y-0.5 hover:border-neon-cyan/40 hover:shadow-glow-cyan"
                      >
                        <LinkIcon name={link.icon} className="h-4 w-4 shrink-0 text-neon-cyan transition-colors group-hover:text-neon-magenta" />
                        <span className="flex-1 truncate text-sm text-zinc-200">{link.label}</span>
                        <ExternalLink className="h-4 w-4 text-zinc-600 transition-colors group-hover:text-cyan-300" aria-hidden="true" />
                      </a>
                    </Reveal>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------ Contact CTA ------------------------------ */}
      <section aria-labelledby="contact-cta" className="container pb-24 md:pb-32">
        <Reveal>
          <div className="gradient-border relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16 md:py-20">
            <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 animate-drift rounded-full bg-fuchsia-500/20 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 animate-drift rounded-full bg-cyan-400/15 blur-3xl [animation-delay:-8s]" />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[80%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <p className="relative font-display text-xs uppercase tracking-[0.35em] text-neon-cyan">Open channel</p>
            <h2 id="contact-cta" className="relative mx-auto mt-4 max-w-2xl font-display text-3xl font-bold text-white sm:text-5xl">
              Let&apos;s build something{" "}
              <span className="text-gradient-neon animate-gradient-x">from the void</span>
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
              Available for collaborations, speaking, and strange ambitious ideas. If it involves
              technology, design, or a little imagination — I want to hear about it.
            </p>
            <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton>
                <Button asChild size="lg">
                  <Link to="/contact">
                    Start a transmission <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </MagneticButton>
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-mono text-sm text-cyan-400 underline decoration-cyan-400/40 underline-offset-4 transition-colors hover:text-cyan-300"
              >
                {siteConfig.email}
              </a>
            </div>
            <ul className="relative mt-8 flex justify-center gap-4" aria-label="Social links">
              {siteConfig.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-400/25 text-zinc-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-neon-magenta/60 hover:text-neon-magenta hover:shadow-glow-magenta"
                  >
                    <LinkIcon name={s.icon} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* ------------------------- Quick-look project dialog ------------------------ */}
      <Dialog open={quickLook !== null} onOpenChange={(open) => !open && setQuickLook(null)}>
        <DialogContent className="max-w-2xl">
          {quickLook && (
            <>
              <ProjectCover project={quickLook} className="mx-6 h-44 shrink-0 rounded-xl" />
              <DialogHeader>
                <DialogTitle>{quickLook.title}</DialogTitle>
                <DialogDescription>{quickLook.description}</DialogDescription>
              </DialogHeader>
              <DialogBody>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{quickLook.long_description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {quickLook.technologies.map((t) => (
                    <Badge key={t} variant="cyan">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  {quickLook.live_url && (
                    <Button asChild size="sm">
                      <a href={quickLook.live_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink aria-hidden="true" /> Live demo
                      </a>
                    </Button>
                  )}
                  {quickLook.source_url && (
                    <Button asChild size="sm" variant="cyan">
                      <a href={quickLook.source_url} target="_blank" rel="noopener noreferrer">
                        <Github aria-hidden="true" /> Source
                      </a>
                    </Button>
                  )}
                  <DialogClose asChild>
                    <Button size="sm" variant="ghost">
                      Close
                    </Button>
                  </DialogClose>
                </div>
              </DialogBody>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
