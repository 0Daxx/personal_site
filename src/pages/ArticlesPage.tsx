import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpenText, Star } from "lucide-react";
import { ArticleCard, ArticleCover } from "@/components/cards/article-card";
import { ActiveFilters, FilterControls } from "@/components/filter-controls";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { Reveal } from "@/components/reveal";
import { SearchInput } from "@/components/search-input";
import { SectionHeading } from "@/components/sections/section-heading";
import { ListSkeleton } from "@/components/skeletons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useResource } from "@/hooks/use-resource";
import { getArticles } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default function ArticlesPage() {
  const { data, loading, error, refetch } = useResource(getArticles);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const articles = data ?? [];
  const categories = useMemo(
    () => Array.from(new Set(articles.map((a) => a.category))).sort(),
    [articles]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (category !== "All" && a.category !== category) return false;
      if (q) {
        const hay = `${a.title} ${a.excerpt} ${a.tags.join(" ")} ${a.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [articles, query, category]);

  const featured = filtered.find((a) => a.featured);
  const rest = filtered.filter((a) => a !== featured);
  const clearAll = () => {
    setQuery("");
    setCategory("All");
  };

  return (
    <div className="container py-16 md:py-24">
      <SectionHeading
        eyebrow="The journal"
        title="Notes from the observation deck"
        description="Essays on creative engineering, interface craft, and the space between code and cosmos. A premium log, archived in public."
      />

      {!error && (
        <Reveal className="mb-10 space-y-5 rounded-2xl border border-purple-400/15 bg-void-900/50 p-5 backdrop-blur-sm sm:p-6">
          <SearchInput
            label="Search articles"
            placeholder="Search titles, topics, tags…"
            value={query}
            onChange={setQuery}
          />
          <FilterControls label="Category" options={categories} active={category} onSelect={setCategory} />
          <ActiveFilters
            filters={[
              ...(category !== "All" ? [`Category: ${category}`] : []),
              ...(query.trim() ? [`Search: "${query.trim()}"`] : []),
            ]}
            onClear={clearAll}
          />
        </Reveal>
      )}

      {error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : loading ? (
        <ListSkeleton count={4} />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No articles found"
          description="The journal has no entries matching those coordinates yet."
          actionLabel="Clear filters"
          onAction={clearAll}
        />
      ) : (
        <>
          {/* Featured article — editorial hero */}
          {featured && (
            <Reveal className="mb-12">
              <Link
                to={`/articles/${featured.slug}`}
                className="group grid overflow-hidden rounded-2xl border border-cyan-400/15 bg-void-900/70 transition-all duration-500 ease-celestial hover:-translate-y-1 hover:border-neon-cyan/40 hover:shadow-glow-cyan md:grid-cols-2"
              >
                <ArticleCover article={featured} className="min-h-56 md:min-h-full" />
                <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-neon-magenta/40 bg-fuchsia-500/10 px-3 py-1 font-display text-[11px] uppercase tracking-[0.2em] text-fuchsia-300">
                    <Star className="h-3 w-3 fill-current" aria-hidden="true" /> Featured reading
                  </span>
                  <h3 className="font-display text-2xl font-bold leading-tight text-white transition-colors group-hover:text-cyan-100 sm:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{featured.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                    <Badge variant="cyan">{featured.category}</Badge>
                    <span>{formatDate(featured.published_at)}</span>
                    <span className="inline-flex items-center gap-1">
                      <BookOpenText className="h-3.5 w-3.5" aria-hidden="true" />
                      {featured.reading_time_minutes} min read
                    </span>
                  </div>
                  <span className="mt-2 inline-flex items-center gap-2 font-display text-sm text-neon-cyan">
                    Read the entry
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          <div key={`${category}-${query}`} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((article, i) => (
              <Reveal key={article.id} delay={Math.min(i * 70, 280)}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>

          <p className="mt-10 text-center text-xs uppercase tracking-[0.25em] text-zinc-600" role="status">
            {filtered.length} entr{filtered.length === 1 ? "y" : "ies"} in view
          </p>

          <Reveal className="mt-14 flex justify-center">
            <Button variant="cyan" asChild>
              <Link to="/social">
                Shorter signals — browse social posts <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </>
      )}
    </div>
  );
}
