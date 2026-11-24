import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Search, X } from "lucide-react";
import { search, type SearchHit } from "@/lib/search";

/**
 * The header's search. A box on wide screens and an icon on phones, both
 * opening the same panel; "/" or Cmd-K opens it from anywhere.
 */
export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const hits = useMemo(() => search(query), [query]);
  const navigate = useNavigate();
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement | null)?.closest("input, textarea, [contenteditable]");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (hit: SearchHit, id?: string) => {
    setOpen(false);
    if (hit.kind === "deal") void navigate({ to: "/deals" });
    else
      void navigate({
        to: hit.kind === "itinerary" ? "/itineraries/$slug" : "/recommendations/$slug",
        params: { slug: hit.slug },
        ...(id ? { hash: id } : {}),
      });
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          aria-label="Search"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-foreground lg:w-56 lg:px-4"
        >
          <Search className="h-4 w-4 shrink-0" />
          <span className="hidden lg:inline">Search anywhere</span>
          <kbd className="ml-auto hidden rounded border border-border px-1.5 text-[0.65rem] font-bold lg:inline">
            /
          </kbd>
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[200] bg-foreground/40 backdrop-blur-sm" />
        <DialogPrimitive.Content
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            input.current?.focus();
            input.current?.select();
          }}
          className="fixed inset-x-4 top-4 z-[200] mx-auto flex max-h-[calc(100dvh-2rem)] max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:top-[10vh] sm:max-h-[75vh]"
        >
          <DialogPrimitive.Title className="sr-only">Search AirplaneMode</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Search every city, country, place and tip on the site.
          </DialogPrimitive.Description>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (hits[0]) go(hits[0], hits[0].inside[0]?.id);
            }}
            className="flex items-center gap-3 border-b border-border px-4"
          >
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              ref={input}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="A city, a country, a restaurant, an opera..."
              enterKeyHint="search"
              className="h-14 w-full bg-transparent text-base font-medium text-foreground outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
            />
            <DialogPrimitive.Close
              aria-label="Close search"
              className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </DialogPrimitive.Close>
          </form>

          <div className="overflow-y-auto">
            {query.trim() && !hits.length && (
              <div className="px-6 py-10 text-center">
                <p className="font-display text-lg font-extrabold text-foreground">
                  Nothing for "{query.trim()}" yet
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  I have not been, or not written it up.{" "}
                  <Link
                    to="/plan"
                    onClick={() => setOpen(false)}
                    className="font-bold text-primary hover:underline"
                  >
                    I can plan it for you
                  </Link>
                  .
                </p>
              </div>
            )}
            {hits.length > 0 && (
              <ul className="divide-y divide-border">
                {hits.map((hit) => (
                  <li key={`${hit.kind}-${hit.slug}`} className="px-2 py-2">
                    <button
                      type="button"
                      onClick={() => go(hit)}
                      className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-secondary"
                    >
                      {hit.cover ? (
                        <img
                          src={hit.cover}
                          alt=""
                          className="h-12 w-12 shrink-0 rounded-lg object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <span className="h-12 w-12 shrink-0 rounded-lg bg-brand-indigo" />
                      )}
                      <span className="min-w-0">
                        <span className="block truncate font-display font-extrabold text-foreground">
                          {hit.title}
                        </span>
                        <span className="block truncate text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {hit.meta}
                        </span>
                      </span>
                    </button>
                    {hit.inside.length > 0 && (
                      <ul className="mb-1 ml-[4.25rem] mt-0.5 flex flex-wrap gap-1.5">
                        {hit.inside.map((x) => (
                          <li key={x.id}>
                            <button
                              type="button"
                              onClick={() => go(hit, x.id)}
                              className="rounded-lg bg-brand-pink px-2 py-1 text-left text-xs font-bold text-foreground transition-colors hover:bg-foreground hover:text-background"
                            >
                              {x.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
