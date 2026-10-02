import { useMemo, useState } from "react";
import { ExternalLink, Github, Rocket, Star } from "lucide-react";
import { ProjectCard, ProjectCover } from "@/components/cards/project-card";
import { ActiveFilters, FilterControls } from "@/components/filter-controls";
import { ErrorState } from "@/components/error-state";
import { EmptyState } from "@/components/empty-state";
import { Reveal } from "@/components/reveal";
import { SearchInput } from "@/components/search-input";
import { SectionHeading } from "@/components/sections/section-heading";
import { CardGridSkeleton } from "@/components/skeletons";
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
import { getProjects } from "@/lib/data";
import type { Project } from "@/types";

const STATUS_OPTIONS = ["Completed", "In Progress", "Archived"] as const;
const STATUS_MAP: Record<string, Project["status"]> = {
  Completed: "completed",
  "In Progress": "in_progress",
  Archived: "archived",
};

export default function ProjectsPage() {
  const { data, loading, error, refetch } = useResource(getProjects);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [tech, setTech] = useState("All");
  const [status, setStatus] = useState("All");
  const [detail, setDetail] = useState<Project | null>(null);

  const projects = data ?? [];

  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category))).sort(),
    [projects]
  );
  const technologies = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.technologies))).sort(),
    [projects]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (tech !== "All" && !p.technologies.includes(tech)) return false;
      if (status !== "All" && p.status !== STATUS_MAP[status]) return false;
      if (q) {
        const haystack = `${p.title} ${p.description} ${p.long_description} ${p.category} ${p.technologies.join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [projects, query, category, tech, status]);

  const featured = filtered.find((p) => p.featured);
  const grid = filtered.filter((p) => p !== featured);

  const activeFilters: string[] = [
    ...(category !== "All" ? [`Category: ${category}`] : []),
    ...(tech !== "All" ? [`Stack: ${tech}`] : []),
    ...(status !== "All" ? [`Status: ${status}`] : []),
    ...(query.trim() ? [`Search: "${query.trim()}"`] : []),
  ];

  const clearAll = () => {
    setQuery("");
    setCategory("All");
    setTech("All");
    setStatus("All");
  };

  return (
    <div className="container py-16 md:py-24">
      <SectionHeading
        eyebrow="The archive"
        title="Projects & missions log"
        description="Every expedition — shipped products, open-source tools, and experiments in light. Filter by discipline, stack, or status."
      />

      {/* Controls */}
      {!error && (
        <Reveal className="mb-10 space-y-5 rounded-2xl border border-purple-400/15 bg-void-900/50 p-5 backdrop-blur-sm sm:p-6">
          <SearchInput
            label="Search projects"
            placeholder="Search titles, descriptions, stacks…"
            value={query}
            onChange={setQuery}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <FilterControls label="Category" options={categories} active={category} onSelect={setCategory} />
            <FilterControls label="Technology" options={technologies} active={tech} onSelect={setTech} />
            <FilterControls label="Status" options={STATUS_OPTIONS} active={status} onSelect={setStatus} />
          </div>
          <ActiveFilters filters={activeFilters} onClear={clearAll} />
        </Reveal>
      )}

      {/* States */}
      {error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : loading ? (
        <CardGridSkeleton count={6} />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No transmissions match"
          description="Nothing in the archive fits those coordinates. Try loosening a filter or clearing the search."
          actionLabel="Reset filters"
          onAction={clearAll}
        />
      ) : (
        <>
          {/* Featured banner */}
          {featured && (
            <Reveal className="mb-10">
              <button
                type="button"
                onClick={() => setDetail(featured)}
                className="gradient-border group relative grid w-full overflow-hidden rounded-2xl text-left transition-all duration-500 ease-celestial hover:shadow-glow md:grid-cols-[1.1fr_1fr]"
              >
                <div className="p-7 sm:p-9">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-neon-cyan/40 bg-cyan-400/10 px-3 py-1 font-display text-[11px] uppercase tracking-[0.2em] text-neon-cyan">
                    <Star className="h-3 w-3 fill-current" aria-hidden="true" /> Featured mission
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-400">{featured.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {featured.technologies.map((t) => (
                      <Badge key={t} variant="outline">{t}</Badge>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 font-display text-sm text-fuchsia-400 transition-colors group-hover:text-fuchsia-300">
                    <Rocket className="h-4 w-4" aria-hidden="true" /> View dossier
                  </span>
                </div>
                <ProjectCover project={featured} className="min-h-56" />
              </button>
            </Reveal>
          )}

          {/* Grid with staggered entrance keyed on filter signature for smooth re-animation */}
          <div key={`${category}-${tech}-${status}-${query}`} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {grid.map((project, i) => (
              <Reveal key={project.id} delay={Math.min(i * 60, 300)}>
                <ProjectCard project={project} onViewDetails={setDetail} />
              </Reveal>
            ))}
          </div>

          <p className="mt-10 text-center text-xs uppercase tracking-[0.25em] text-zinc-600" role="status">
            Showing {filtered.length} of {projects.length} projects
          </p>
        </>
      )}

      {/* Detail dialog */}
      <Dialog open={detail !== null} onOpenChange={(open) => !open && setDetail(null)}>
        <DialogContent className="max-w-2xl">
          {detail && (
            <>
              <ProjectCover project={detail} className="mx-6 h-48 shrink-0 rounded-xl" />
              <DialogHeader>
                <DialogTitle>{detail.title}</DialogTitle>
                <DialogDescription>{detail.description}</DialogDescription>
              </DialogHeader>
              <DialogBody>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <Badge variant="cyan">{detail.category}</Badge>
                  <Badge variant="status">{STATUS_OPTIONS[Object.values(STATUS_MAP).indexOf(detail.status)] ?? detail.status}</Badge>
                  <span className="font-mono text-xs text-zinc-500">{detail.year}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-300">{detail.long_description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {detail.technologies.map((t) => (
                    <Badge key={t} variant="outline">{t}</Badge>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  {detail.live_url && (
                    <Button asChild size="sm">
                      <a href={detail.live_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink aria-hidden="true" /> Live demo
                      </a>
                    </Button>
                  )}
                  {detail.source_url && (
                    <Button asChild size="sm" variant="cyan">
                      <a href={detail.source_url} target="_blank" rel="noopener noreferrer">
                        <Github aria-hidden="true" /> Source code
                      </a>
                    </Button>
                  )}
                  <DialogClose asChild>
                    <Button size="sm" variant="ghost">Close</Button>
                  </DialogClose>
                </div>
              </DialogBody>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
