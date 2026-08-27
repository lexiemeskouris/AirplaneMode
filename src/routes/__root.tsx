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

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Off the map
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page wandered off the route. Let's get you back on track.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
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
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
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
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
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
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl font-semibold text-primary">
            Wayfarer
          </span>
          <span className="hidden text-sm uppercase tracking-[0.2em] text-muted-foreground sm:inline">
            Itineraries
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            to="/"
            activeProps={{ className: "text-primary" }}
            className="text-foreground/80 transition-colors hover:text-primary"
          >
            Journeys
          </Link>
          <Link
            to="/about"
            activeProps={{ className: "text-primary" }}
            className="text-foreground/80 transition-colors hover:text-primary"
          >
            About
          </Link>
          <a
            href="https://www.buymeacoffee.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-primary px-3.5 py-1.5 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            ☕ Support
          </a>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-background/60">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-serif text-2xl font-semibold text-primary">
              Wayfarer
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Hand-drawn itineraries for the slow traveller.
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-primary">
              All journeys
            </Link>
            <Link to="/about" className="transition-colors hover:text-primary">
              About
            </Link>
            <a
              href="https://www.buymeacoffee.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary"
            >
              Buy me a coffee
            </a>
          </div>
        </div>
        <p className="mt-8 text-xs uppercase tracking-[0.15em] text-muted-foreground/70">
          © {new Date().getFullYear()} Wayfarer Itineraries · Made on the road
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
      { title: "Wayfarer — Hand-drawn Travel Itineraries" },
      {
        name: "description",
        content:
          "Slow, hand-drawn travel itineraries for the curious traveller. Free guides and supporter-funded deep dives.",
      },
      { property: "og:title", content: "Wayfarer — Hand-drawn Travel Itineraries" },
      {
        property: "og:description",
        content:
          "Slow, hand-drawn travel itineraries for the curious traveller. Free guides and supporter-funded deep dives.",
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
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500&family=Karla:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
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
