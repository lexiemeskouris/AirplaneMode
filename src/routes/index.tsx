import { createFileRoute, Link } from "@tanstack/react-router";
import { itineraries } from "@/data/itineraries";
import heroImg from "@/assets/hero-journal.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
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
  }),
  component: Index,
});

function Index() {
  const free = itineraries.filter((i) => !i.gated);
  const gated = itineraries.filter((i) => i.gated);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="stamp text-xs text-primary">Field Notes · Est. 2026</p>
            <h1 className="mt-4 font-serif text-5xl font-semibold leading-[1.05] text-foreground md:text-7xl">
              Itineraries for the
              <span className="block italic text-primary">slow traveller.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              Hand-drawn route notes from the road — pacing, timing, and the
              small detours that make a place stay with you. Read the free guides,
              or unlock the deeper dives with a coffee.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#journeys"
                className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Browse journeys
              </a>
              <a
                href="https://www.buymeacoffee.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                ☕ Buy me a coffee
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
              <span><strong className="font-semibold text-foreground">{free.length}</strong> free guides</span>
              <span><strong className="font-semibold text-foreground">{gated.length}</strong> supporter deep dives</span>
              <span>Updated each season</span>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-sm border border-border shadow-[0_20px_60px_-30px_oklch(0.3_0.05_60)]">
              <img
                src={heroImg}
                alt="An open travel journal with maps, stamps, and photographs on a warm wooden desk"
                width={1600}
                height={1008}
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rotate-[-3deg] rounded-sm border border-border bg-card px-4 py-3 shadow-md md:block">
              <p className="font-serif text-lg italic text-primary">"the road writes the best plans"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey grid */}
      <section id="journeys" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="stamp text-xs text-primary">The Collection</p>
            <h2 className="mt-2 font-serif text-4xl font-semibold text-foreground">
              Recent journeys
            </h2>
          </div>
          <p className="hidden text-sm text-muted-foreground sm:block">
            {itineraries.length} itineraries
          </p>
        </div>

        <div className="masonry">
          {itineraries.map((it) => (
            <Link
              key={it.slug}
              to="/itineraries/$slug"
              params={{ slug: it.slug }}
              className="group block overflow-hidden rounded-sm border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_oklch(0.3_0.05_60)]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={it.cover}
                  alt={it.title}
                  width={800}
                  height={1100}
                  loading="lazy"
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {it.gated ? (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                    ☕ Supporter
                  </span>
                ) : (
                  <span className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                    Free
                  </span>
                )}
              </div>
              <div className="p-5">
                <p className="stamp text-[0.7rem] text-muted-foreground">
                  {it.country} · {it.duration} · {it.season}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-foreground transition-colors group-hover:text-primary">
                  {it.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {it.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
