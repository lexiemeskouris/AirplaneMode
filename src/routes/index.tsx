import { createFileRoute, Link } from "@tanstack/react-router";
import { itineraries, BMC_URL } from "@/data/itineraries";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AirplaneMood - High-Energy Travel Itineraries" },
      {
        name: "description",
        content:
          "High-energy travel itineraries for people who keep moving and love food. Free guides and supporter-funded deep dives.",
      },
      { property: "og:title", content: "AirplaneMood - High-Energy Travel Itineraries" },
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
          <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-8xl">
            Less planning.
            <br />
            <span className="text-primary">More moving.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-muted-foreground md:text-xl">
            High-energy itineraries for the generation that never stops. Street
            food, fast moves, and zero filler. Real places, hour by hour, with
            every stop linked.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm font-semibold text-muted-foreground">
            <span>
              <strong className="font-extrabold text-foreground">{free.length}</strong>{" "}
              {free.length === 1 ? "free itinerary" : "free itineraries"}
            </span>
            {/* Only worth saying when there is something gated to say it about. */}
            {gated.length > 0 && (
              <span>
                <strong className="font-extrabold text-foreground">{gated.length}</strong>{" "}
                {gated.length === 1 ? "supporter deep dive" : "supporter deep dives"}
              </span>
            )}
            <span>More on the way</span>
          </div>
        </div>
      </section>

      {/* Itinerary feed - uniform tiles, four to a row on desktop. */}
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {itineraries.map((it) => (
            <article
              key={it.slug}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="relative overflow-hidden">
                <Link to="/itineraries/$slug" params={{ slug: it.slug }} className="block">
                  <img
                    src={it.cover}
                    alt={it.title}
                    width={1000}
                    height={1250}
                    loading="lazy"
                    className={`aspect-[4/5] w-full bg-secondary object-cover transition-transform duration-500 group-hover:scale-[1.04] ${
                      it.gated ? "grayscale group-hover:grayscale-0" : ""
                    }`}
                  />
                </Link>

                <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-brand-yellow px-2.5 py-1 text-[0.65rem] font-extrabold tracking-tight text-foreground shadow-sm">
                    {it.season.toUpperCase()}
                  </span>
                  <span className="rounded-full bg-accent px-2.5 py-1 text-[0.65rem] font-extrabold tracking-tight text-accent-foreground shadow-sm">
                    {it.duration.toUpperCase()}
                  </span>
                  {it.gated && (
                    <span className="rounded-full bg-primary px-2.5 py-1 text-[0.65rem] font-extrabold tracking-tight text-primary-foreground shadow-sm">
                      SUPPORTER
                    </span>
                  )}
                </div>

                {it.gated && (
                  <div className="absolute inset-0 flex items-end justify-center bg-foreground/35 p-4 backdrop-blur-[3px]">
                    <a
                      href={it.bmcUrl ?? BMC_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full rounded-xl bg-accent px-3 py-2.5 text-center text-xs font-bold text-accent-foreground shadow-lg transition-transform hover:scale-[1.03]"
                    >
                      Buy a coffee to unlock
                    </a>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-display text-xl font-extrabold leading-tight tracking-tight text-foreground">
                  <Link to="/itineraries/$slug" params={{ slug: it.slug }}>
                    {it.title}
                  </Link>
                </h2>
                {/* Clamped so a long summary cannot make one tile taller than its row. */}
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {it.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {it.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-lg bg-brand-pink px-2 py-1 text-[0.65rem] font-bold text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {/* mt-auto pins the link to the bottom so it lines up across the row. */}
                <Link
                  to="/itineraries/$slug"
                  params={{ slug: it.slug }}
                  className={`mt-auto inline-flex w-fit items-center pt-5 text-sm font-bold transition-transform hover:translate-x-1 ${
                    it.gated ? "text-muted-foreground" : "text-primary"
                  }`}
                >
                  {it.gated ? "Read the free sample" : "View full sprint"}
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          ))}
        </div>
      </section>
    </div>
  );
}
