import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate } from "@/lib/utils";
import type { Article } from "@/types";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured" | "compact";
}

export function ArticleCover({ article, className }: { article: Article; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("relative overflow-hidden bg-gradient-to-br", article.cover_gradient, className)}>
      <div className="absolute inset-0 opacity-50">
        <svg viewBox="0 0 400 200" className="h-full w-full" fill="none" preserveAspectRatio="xMidYMid slice">
          <path d="M0 150 Q 100 90 200 130 T 400 110" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          <path d="M0 170 Q 120 110 220 150 T 400 130" stroke="rgba(0,229,255,0.3)" strokeWidth="0.8" />
          <path d="M0 130 Q 90 70 190 110 T 400 90" stroke="rgba(255,0,153,0.3)" strokeWidth="0.8" />
          <circle cx="330" cy="52" r="18" stroke="rgba(255,255,255,0.3)" />
          <circle cx="330" cy="52" r="6" fill="rgba(255,255,255,0.5)" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-void-950/80 to-transparent" />
    </div>
  );
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const meta = (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
        <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
        {article.reading_time_minutes} min read
      </span>
      <Badge variant="cyan">{article.category}</Badge>
    </div>
  );

  if (variant === "compact") {
    return (
      <article>
        <Link
          to={`/articles/${article.slug}`}
          className="group block rounded-xl px-3 py-3 transition-colors hover:bg-void-700/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
        >
          <p className="mb-1 font-display text-[11px] uppercase tracking-[0.2em] text-neon-cyan">
            {article.category}
          </p>
          <h3 className="font-display text-sm font-semibold leading-snug text-white group-hover:text-neon-cyan">
            {article.title}
          </h3>
          <p className="mt-1 text-xs text-zinc-500">{formatDate(article.published_at)} · {article.reading_time_minutes} min</p>
        </Link>
      </article>
    );
  }

  if (variant === "featured") {
    return (
      <article className="card-hover luminous-border group relative overflow-hidden rounded-2xl bg-void-900/80 md:grid md:grid-cols-2">
        <ArticleCover article={article} className="min-h-[220px]" />
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <p className="mb-3 font-display text-xs uppercase tracking-[0.25em] text-fuchsia-400">Featured Essay</p>
          <h3 className="font-display text-2xl font-semibold leading-tight text-white">
            <Link to={`/articles/${article.slug}`} className="transition-colors after:absolute after:inset-0 after:content-[''] hover:text-neon-cyan focus-visible:outline-none focus-visible:underline">
              {article.title}
            </Link>
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">{article.excerpt}</p>
          <div className="mt-5">{meta}</div>
          <span className="relative z-10 mt-5 inline-flex items-center gap-1 font-display text-sm text-neon-cyan">
            Read essay <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </article>
    );
  }

  return (
    <article className="card-hover luminous-border group relative flex h-full flex-col overflow-hidden rounded-2xl bg-void-900/80">
      <ArticleCover article={article} className="aspect-[16/8]" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-lg font-semibold leading-snug text-white">
          <Link to={`/articles/${article.slug}`} className="transition-colors after:absolute after:inset-0 after:content-[''] hover:text-neon-cyan focus-visible:outline-none focus-visible:underline">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-zinc-400">{article.excerpt}</p>
        <div className="mt-4 border-t border-purple-400/10 pt-4">{meta}</div>
      </div>
    </article>
  );
}
