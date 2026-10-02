import { Link } from "react-router-dom";
import { siteConfig } from "@/lib/site-config";
import { LinkIcon } from "@/components/link-icon";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 border-t border-purple-400/10">
      {/* Section transition glow line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-magenta/50 to-transparent"
      />
      <div className="container flex flex-col items-center gap-8 py-12 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <p className="font-display text-sm font-semibold text-white">
            {siteConfig.name}
            <span className="ml-2 font-normal text-zinc-500">{siteConfig.role}</span>
          </p>
          <p className="mt-1 text-xs leading-relaxed text-zinc-500">
            © {year} · Crafted in the void between design &amp; code · {siteConfig.location}
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-sm text-zinc-400 transition-colors hover:text-neon-cyan"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <ul className="flex items-center gap-3">
          {siteConfig.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-400/25 text-zinc-400 transition-all duration-300 ease-celestial hover:-translate-y-0.5 hover:border-neon-cyan/50 hover:text-neon-cyan hover:shadow-glow-cyan"
              >
                <LinkIcon name={social.icon} className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
