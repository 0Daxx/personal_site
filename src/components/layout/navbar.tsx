import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Sparkles, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  // Elevate bar on scroll + track reading progress
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [location.pathname]);

  // Lock body scroll while drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Animated sliding indicator behind the active desktop link
  useEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!nav || !indicator) return;
    const active = nav.querySelector<HTMLAnchorElement>('a[aria-current="page"]');
    if (active) {
      indicator.style.opacity = "1";
      indicator.style.transform = `translateX(${active.offsetLeft}px)`;
      indicator.style.width = `${active.offsetWidth}px`;
    } else {
      indicator.style.opacity = "0";
    }
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-celestial",
        scrolled && "border-b border-purple-400/10 bg-void-950/70 backdrop-blur-xl"
      )}
    >
      <nav
        aria-label="Primary"
        className="container flex h-16 items-center justify-between md:h-20"
      >
        <Link
          to="/"
          className="group flex items-center gap-2.5 font-display text-base font-semibold tracking-tight text-white"
        >
          <span className="glow-pulse relative flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/40 bg-void-800 transition-shadow group-hover:shadow-glow">
            <Sparkles className="h-4 w-4 text-neon-cyan" aria-hidden="true" />
          </span>
          <span>
            nova<span className="text-gradient-neon animate-gradient-x">kane</span>
            <span className="ml-1 hidden text-xs font-normal uppercase tracking-[0.28em] text-zinc-500 sm:inline">
              celestial
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <div ref={navRef} className="relative hidden items-center gap-1 md:flex">
          <span
            ref={indicatorRef}
            aria-hidden="true"
            className="absolute -bottom-px left-0 h-full rounded-lg bg-gradient-to-r from-cyan-400/15 to-fuchsia-500/15 opacity-0 ring-1 ring-inset ring-cyan-400/30 transition-all duration-500 ease-celestial"
          />
          {siteConfig.nav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "relative z-10 rounded-lg px-4 py-2 font-display text-sm transition-colors duration-300",
                  isActive ? "text-white" : "text-zinc-400 hover:text-white"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-lg border border-purple-400/25 p-2 text-zinc-300 transition-colors hover:border-neon-cyan/50 hover:text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </nav>

      {/* Scroll progress — a luminous thread across the top */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-transparent">
        <div
          className="h-full origin-left bg-gradient-to-r from-neon-cyan via-purple-400 to-neon-magenta shadow-glow-cyan transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 top-16 z-30 origin-top bg-void-950/95 backdrop-blur-xl transition-all duration-300 ease-celestial md:hidden",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <ul className="flex flex-col gap-1 p-6">
          {siteConfig.nav.map((item, i) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "block rounded-xl border border-transparent px-4 py-3 font-display text-lg transition-all duration-300 ease-celestial",
                    isActive
                      ? "border-cyan-400/30 bg-gradient-to-r from-cyan-400/10 to-fuchsia-500/10 text-white"
                      : "text-zinc-300 hover:border-purple-400/20 hover:text-white"
                  )
                }
                style={{
                  transitionDelay: open ? `${i * 40}ms` : "0ms",
                  transform: open ? "translateY(0)" : "translateY(8px)",
                  opacity: open ? 1 : 0,
                }}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li className="mt-4 border-t border-purple-400/15 pt-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="block rounded-xl bg-gradient-to-r from-fuchsia-600 to-neon-magenta px-4 py-3 text-center font-display font-medium text-white shadow-glow-magenta"
            >
              Hire me
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
