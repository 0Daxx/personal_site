import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, Home, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BoundaryProps {
  children: ReactNode;
}

interface BoundaryState {
  hasError: boolean;
  message: string;
}

/**
 * Top-level crash protection. Catches render-time exceptions anywhere in the
 * route tree and shows an on-brand recovery screen instead of a white void.
 */
export class ErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false, message: "" };

  static getDerivedStateFromError(error: unknown): BoundaryState {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : "An unexpected anomaly occurred.",
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // In production, forward to Sentry / Logflare here.
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  private reset = () => this.setState({ hasError: false, message: "" });

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div
          role="alert"
          className="gradient-border animate-fade-up relative w-full max-w-lg overflow-hidden rounded-3xl p-10 text-center"
        >
          {/* ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl"
          />
          <span className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-fuchsia-500/40 bg-void-800 shadow-glow-magenta">
            <AlertTriangle className="h-7 w-7 text-fuchsia-400" aria-hidden="true" />
          </span>
          <h1 className="font-display text-2xl font-semibold text-white">Warp drive failure</h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Something broke while rendering this sector of the archive. The ship is safe — try
            re-engaging, or return to the home port.
          </p>
          <p className="mt-4 rounded-lg border border-purple-400/15 bg-void-800/60 px-4 py-2 font-mono text-xs text-cyan-300/80">
            {this.state.message}
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button onClick={this.reset}>
              <RotateCw aria-hidden="true" /> Retry
            </Button>
            <Button variant="cyan" asChild onClick={this.reset}>
              <a href="/">
                <Home aria-hidden="true" /> Return home
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
