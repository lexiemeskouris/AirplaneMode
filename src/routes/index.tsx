import { createFileRoute, Link } from "@tanstack/react-router";
import { itineraries } from "@/data/itineraries";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wayfarer — High-Energy Travel Itineraries" },
      {
        name: "description",
        content:
          "High-energy travel itineraries for people who keep moving and love food. Free guides and supporter-funded deep dives.",
      },
      { property: "og:title", content: "Wayfarer — High-Energy Travel Itineraries" },
      {
        property: "og:description",
        content:
          "High-energy travel itineraries for people who keep moving and love food. Free guides and supporter-funded deep dives.",
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
      {/* Hero intro band */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16">
        <div className="max-w-3xl">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Live Travel Feed
          </span>
          <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-8xl">
            Less planning.
            <br />
            <span className="text-primary">More moving.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-muted-foreground md:text-xl">
            High-energy itineraries for the generation that never stops. Street
            food, fast moves, and zero filler. Read the free guides or unlock the
            deep dives with a coffee.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm font-semibold text-muted-foreground">
            <span>
              <strong className="font-extrabold text-foreground">{free.length}</strong>{" "}
              free guides
            </span>
            <span>
              <strong className="font-extrabold text-foreground">{gated.length}</strong>{" "}
              supporter deep dives
            </span>
            <span>Updated each season</span>
          </div>
        </div>
      </section>

      {/* Itinerary feed */}
      <section className="mx-auto flex max-w-7xl flex-col gap-24 px-6 pb-32">
        {itineraries.map((it, idx) => {
          const reversed = idx % 2 === 1;
          return (
            <article
              key={it.slug}
              className={`group flex flex-col gap-10 ${reversed ? "md:flex-row-reverse" : "md:flex-row"}`}
            >
              {/* Image */}
              <div className="relative flex-1">
                <Link
                  to="/itineraries/$slug"
                  params={{ slug: it.slug }}
                  className="block"
                >
                  <img
                    src={it.cover}
                    alt={it.title}
                    width={1200}
                    height={800}
                    loading="lazy"
                    className={`aspect-[16/10] w-full overflow-hidden rounded-[2.5rem] bg-secondary object-cover shadow-2xl transition-all duration-500 group-hover:scale-[1.02] ${
                      it.gated ? "grayscale group-hover:grayscale-0" : ""
                    }`}
                  />
                </Link>

                {/* Gated unlock overlay */}
                {it.gated && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-[2.5rem] bg-foreground/40 backdrop-blur-[4px]">
                    <div className="text-center">
                      <p className="mb-6 text-sm font-extrabold uppercase tracking-[0.2em] text-background">
                        Premium Access
                      </p>
                      <a
                        href={it.bmcUrl ?? "https://www.buymeacoffee.com/"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 rounded-2xl bg-accent px-8 py-4 font-bold text-accent-foreground shadow-2xl transition-transform hover:scale-105"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.25 18H3.75c-.414 0-.75.336-.75.75v1.5c0 .414.336.75.75.75h16.5c.414 0 .75-.336.75-.75v-1.5c0-.414-.336-.75-.75-.75zM5.25 15h13.5c.828 0 1.5-.672 1.5-1.5v-9c0-.828-.672-1.5-1.5-1.5H5.25c-.828 0-1.5.672-1.5 1.5v9c0 .828.672 1.5 1.5 1.5z" />
                        </svg>
                        Buy a Coffee to Unlock
                      </a>
                    </div>
                  </div>
                )}

                {/* Chips */}
                <div
                  className={`absolute top-6 flex gap-2 ${reversed ? "right-6" : "left-6"}`}
                >
                  <span className="rounded-full bg-background/95 px-4 py-2 text-xs font-extrabold tracking-tight text-foreground shadow-sm backdrop-blur-md">
                    {it.season.toUpperCase()}
                  </span>
                  <span className="rounded-full bg-accent px-4 py-2 text-xs font-extrabold tracking-tight text-accent-foreground shadow-sm">
                    {it.duration.toUpperCase()}
                  </span>
                  {it.gated && (
                    <span className="rounded-full bg-primary px-4 py-2 text-xs font-extrabold tracking-tight text-primary-foreground shadow-sm">
                      ☕ Supporter
                    </span>
                  )}
                </div>
              </div>

              {/* Text panel */}
              <div className="flex flex-col justify-center md:w-[400px]">
                <p
                  className={`mb-2 text-sm font-bold uppercase tracking-widest ${it.gated ? "text-muted-foreground/70" : "text-primary"}`}
                >
                  {it.destination}, {it.country}
                </p>
                <h2
                  className={`mb-4 font-display text-4xl font-extrabold tracking-tight text-foreground ${it.gated ? "opacity-60" : ""}`}
                >
                  {it.title}
                </h2>
                <p
                  className={`mb-8 leading-relaxed ${it.gated ? "text-muted-foreground/70" : "text-muted-foreground"}`}
                >
                  {it.summary}
                </p>
                <div
                  className={`mb-10 flex flex-wrap gap-2 ${it.gated ? "opacity-50" : ""}`}
                >
                  {it.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-xl bg-secondary px-3 py-1.5 text-xs font-bold text-accent"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  to="/itineraries/$slug"
                  params={{ slug: it.slug }}
                  className={`inline-flex w-fit items-center font-bold transition-all hover:translate-x-2 ${it.gated ? "text-muted-foreground" : "text-primary"}`}
                >
                  {it.gated ? "Read the free sample" : "View full sprint"}
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
