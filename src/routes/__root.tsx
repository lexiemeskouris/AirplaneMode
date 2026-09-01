import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { BMC_URL } from "@/data/itineraries";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-extrabold tracking-tighter text-primary">404</h1>
        <h2 className="mt-4 text-xl font-bold text-foreground">Off the map</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page wandered off the route. Let's get you back on track.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-extrabold tracking-tighter text-primary">
            AIRPLANEMODE
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-bold md:flex">
          <Link
            to="/"
            activeProps={{ className: "text-accent" }}
            className="text-foreground/80 transition-colors hover:text-accent"
          >
            Feed
          </Link>
          <Link
            to="/all"
            activeProps={{ className: "text-accent" }}
            className="text-foreground/80 transition-colors hover:text-accent"
          >
            A-Z
          </Link>
          <Link
            to="/about"
            activeProps={{ className: "text-accent" }}
            className="text-foreground/80 transition-colors hover:text-accent"
          >
            About
          </Link>
        </nav>
        <a
          href={BMC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
        >
          ☕ Support
        </a>
      </div>
      {/* The reference image's four bands, as the header's bottom edge. */}
      <div aria-hidden className="flex h-1 w-full">
        <div className="flex-1 bg-brand-red" />
        <div className="flex-1 bg-brand-indigo" />
        <div className="flex-1 bg-brand-pink" />
        <div className="flex-1 bg-brand-yellow" />
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-primary/10 bg-background/60">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-2xl font-extrabold tracking-tighter text-primary">
              AIRPLANEMODE
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              High-energy itineraries for the restless traveler.
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm font-semibold text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-accent">
              Feed
            </Link>
            <Link to="/all" className="transition-colors hover:text-accent">
              A-Z
            </Link>
            <Link to="/about" className="transition-colors hover:text-accent">
              About
            </Link>
            <a
              href={BMC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              Buy me a coffee
            </a>
          </div>
        </div>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground/70">
          © {new Date().getFullYear()} AirplaneMode · Made on the move
        </p>
      </div>
    </footer>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AirplaneMode - High-Energy Travel Itineraries" },
      {
        name: "description",
        content:
          "High-energy travel itineraries for people who keep moving and love food. Free guides and supporter-funded deep dives.",
      },
      { property: "og:title", content: "AirplaneMode - High-Energy Travel Itineraries" },
      {
        property: "og:description",
        content:
          "High-energy travel itineraries for people who keep moving and love food. Free guides and supporter-funded deep dives.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      // BASE_URL is "/" in Lovable and "/AirplaneMode/" in the GitHub Pages build,
      // so this resolves correctly in both.
      { rel: "icon", href: `${import.meta.env.BASE_URL}favicon.png`, type: "image/png" },
      { rel: "apple-touch-icon", href: `${import.meta.env.BASE_URL}apple-touch-icon.png` },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
