import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/types";

const STATUS_LABEL: Record<ProjectStatus, string> = {
  completed: "Completed",
  in_progress: "In Progress",
  archived: "Archived",
};

const STATUS_STYLE: Record<ProjectStatus, string> = {
  completed: "text-cyan-300 border-cyan-400/40 bg-cyan-400/10",
  in_progress: "text-fuchsia-300 border-fuchsia-500/40 bg-fuchsia-500/10",
  archived: "text-zinc-400 border-zinc-500/30 bg-zinc-500/10",
};

interface ProjectCardProps {
  project: Project;
  /** Compact variant used on the home page. */
  onViewDetails?: (project: Project) => void;
}

/** Generated cover art — a celestial scene composed of gradients + rings. */
export function ProjectCover({ project, className }: { project: Project; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden bg-gradient-to-br",
        project.cover_gradient,
        className
      )}
    >
      <div className="absolute inset-0 opacity-60 transition-transform duration-700 ease-celestial group-hover:scale-110">
        <svg viewBox="0 0 400 220" className="h-full w-full" fill="none" preserveAspectRatio="xMidYMid slice">
          <circle cx="200" cy="110" r="86" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
          <ellipse cx="200" cy="110" rx="150" ry="52" stroke="rgba(0,229,255,0.35)" strokeWidth="0.8" transform="rotate(-18 200 110)" />
          <ellipse cx="200" cy="110" rx="130" ry="70" stroke="rgba(255,0,153,0.35)" strokeWidth="0.8" transform="rotate(14 200 110)" />
          <circle cx="316" cy="70" r="4" fill="#00E5FF" />
          <circle cx="84" cy="150" r="3" fill="#FF0099" />
          <circle cx="200" cy="110" r="26" fill="rgba(255,255,255,0.10)" />
          <circle cx="200" cy="110" r="26" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-void-950/85 via-transparent to-transparent" />
      <span className="absolute left-4 top-4 font-display text-[11px] uppercase tracking-[0.25em] text-white/70">
        {project.category} · {project.year}
      </span>
    </div>
  );
}

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  return (
    <article className="card-hover luminous-border group relative flex h-full flex-col overflow-hidden rounded-2xl bg-void-900/80">
      <button
        type="button"
        onClick={() => onViewDetails?.(project)}
        className="relative block w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neon-cyan"
        aria-label={`View details for ${project.title}`}
      >
        <ProjectCover project={project} className="aspect-[16/9] w-full" />
      </button>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-white transition-colors group-hover:text-neon-cyan">
            {project.title}
          </h3>
          <Badge variant="status" className={cn("shrink-0 border", STATUS_STYLE[project.status])}>
            {STATUS_LABEL[project.status]}
          </Badge>
        </div>

        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-zinc-400">{project.description}</p>

        <ul className="mb-5 flex flex-wrap gap-1.5" aria-label={`Technologies used in ${project.title}`}>
          {project.technologies.map((tech) => (
            <li key={tech}>
              <Badge variant="outline" className="text-[11px]">
                {tech}
              </Badge>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center gap-2 border-t border-purple-400/10 pt-4">
          <button
            type="button"
            onClick={() => onViewDetails?.(project)}
            className="inline-flex items-center gap-1 font-display text-sm text-zinc-300 transition-colors hover:text-white"
          >
            Details <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="flex-1" />
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-neon-cyan transition-colors hover:bg-cyan-400/10"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Live
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          {project.source_url && (
            <a
              href={project.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-zinc-400 transition-colors hover:bg-void-700 hover:text-white"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              Code
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
