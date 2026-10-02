import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "@/components/error-boundary";
import { AmbientBackground } from "@/components/layout/ambient-background";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PageTransition } from "@/components/layout/page-transition";
import { ListSkeleton } from "@/components/skeletons";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";

// Route-level code splitting — heavy pages load lazily with an on-brand fallback.
const Home = lazy(() => import("@/pages/Home"));
const ProjectsPage = lazy(() => import("@/pages/ProjectsPage"));
const ArticlesPage = lazy(() => import("@/pages/ArticlesPage"));
const ArticleDetailPage = lazy(() => import("@/pages/ArticleDetailPage"));
const SocialPage = lazy(() => import("@/pages/SocialPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const LinksPage = lazy(() => import("@/pages/LinksPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function RouteFallback() {
  return (
    <div className="container grid gap-6 py-24" aria-busy="true" aria-label="Loading page">
      <div className="h-10 w-64 animate-pulse rounded-lg bg-void-700/60" />
      <ListSkeleton count={3} />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider duration={5000}>
      <div className="relative flex min-h-screen flex-col">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <AmbientBackground />
        <Navbar />
        <div className="relative z-10 flex flex-1 flex-col pt-16 md:pt-20">
          <ErrorBoundary>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
                <Route path="/articles" element={<PageTransition><ArticlesPage /></PageTransition>} />
                <Route path="/articles/:slug" element={<PageTransition><ArticleDetailPage /></PageTransition>} />
                <Route path="/social" element={<PageTransition><SocialPage /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
                <Route path="/links" element={<PageTransition><LinksPage /></PageTransition>} />
                <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
          <Footer />
        </div>
      </div>
      <ToastViewport />
    </ToastProvider>
  );
}
