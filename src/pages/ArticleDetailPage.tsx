import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpenText, CalendarDays, Clock, Tag } from "lucide-react";
import { ArticleCard, ArticleCover } from "@/components/cards/article-card";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { Reveal } from "@/components/reveal";
import { ListSkeleton } from "@/components/skeletons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useResource } from "@/hooks/use-resource";
import { getArticles } from "@/lib/data";
import { renderMarkdown } from "@/lib/markdown";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, loading, error, refetch } = useResource(getArticles);

  const article = useMemo(
    () => (data ?? []).find((a) => a.slug === slug) ?? null,
    [data, slug]
  );

  // Related: same category first, then tags overlap, fill with recent.
  const related = useMemo(() => {
    if (!article || !data) return [];
    const others = data.filter((a) => a.id !== article.id);
    const scored = others.map((a) => {
      let score = 0;
      if (a.category === article.category) score += 2;
      score += a.tags.filter((t) => article.tags.includes(t)).length;
      return { a, score };
    });
    return scored
      .sort((x, y) => y.score - x.score || +new Date(y.a.published_at) - +new Date(x.a.published_at))
      .slice(0, 3)
      .map((s) => s.a);
  }, [article, data]);

  if (error) {
    return (
      <div className="container py-24">
        <ErrorState message={error} onRetry={refetch} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container max-w-3xl py-24">
        <ListSkeleton count={5} />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container py-24">
        <EmptyState
          title="Entry not found"
          description="This journal entry has drifted beyond the event horizon, or never existed."
          actionLabel="Back to the journal"
          onAction={() => window.location.assign("/articles")}
        />
      </div>
    );
  }

  return (
    <article className="pb-24">
      {/* Hero band */}
      <header className="relative overflow-hidden border-b border-purple-400/10">
        <ArticleCover article={article} className="absolute inset-0 opacity-60" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-void-950/70 via-void-950/80 to-void-950" />
        <div className="container relative max-w-3xl pb-12 pt-20 md:pt-28">
          <Reveal>
            <Link
              to="/articles"
              className="group inline-flex items-center gap-2 font-display text-sm text-cyan-400 transition-colors hover:text-cyan-300"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
              All entries
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-400">
              <Badge variant="cyan">{article.category}</Badge>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {article.reading_time_minutes} min read
              </span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300">{article.excerpt}</p>
            {article.tags.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
                {article.tags.map((t) => (
                  <li key={t}>
                    <Badge variant="outline" className="gap-1">
                      <Tag className="h-3 w-3" aria-hidden="true" />
                      {t}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </div>
      </header>

      {/* Body */}
      <div className="container mx-auto mt-12 grid max-w-6xl gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="prose-celestial max-w-3xl">{renderMarkdown(article.content_markdown)}</div>

        {/* Aside rail */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-6">
            <div className="luminous-border rounded-xl bg-void-900/60 p-5">
              <p className="font-display text-xs uppercase tracking-[0.25em] text-neon-cyan">Author</p>
              <div className="mt-3 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-celestial-gradient font-display text-sm font-bold text-white shadow-glow-cyan">
                  {siteConfig.avatarInitials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{siteConfig.name}</p>
                  <p className="text-xs text-zinc-500">{siteConfig.role}</p>
                </div>
              </div>
              <Button variant="cyan" size="sm" className="mt-4 w-full" asChild>
                <Link to="/contact">Say hello</Link>
              </Button>
            </div>
            <div className="luminous-border rounded-xl bg-void-900/60 p-5">
              <p className="flex items-center gap-2 font-display text-xs uppercase tracking-[0.25em] text-fuchsia-400">
                <BookOpenText className="h-4 w-4" aria-hidden="true" /> Keep reading
              </p>
              <ul className="mt-3 space-y-3">
                {related.slice(0, 2).map((r) => (
                  <li key={r.id}>
                    <Link to={`/articles/${r.slug}`} className="group block text-sm leading-snug text-zinc-300 transition-colors hover:text-cyan-300">
                      {r.title}
                      <span className="mt-1 block text-xs text-zinc-600">{r.reading_time_minutes} min · {r.category}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section aria-labelledby="related" className="container mt-20">
          <Reveal className="mb-8 flex items-end justify-between">
            <h2 id="related" className="font-display text-2xl font-semibold text-white">Related transmissions</h2>
            <Link to="/articles" className="group inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300">
              Journal index
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.id} delay={i * 80}>
                <ArticleCard article={r} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
