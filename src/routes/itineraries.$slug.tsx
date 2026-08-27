import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getItinerary, itineraries, BMC_URL } from "@/data/itineraries";

export const Route = createFileRoute("/itineraries/$slug")({
  loader: ({ params }) => {
    const itinerary = getItinerary(params.slug);
    if (!itinerary) throw notFound();
    return { itinerary };
  },
  head: ({ loaderData }) => {
    const it = loaderData?.itinerary;
    if (!it) {
      return {
        meta: [
          { title: "Itinerary — Wayfarer" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    return {
      meta: [
        { title: `${it.title} — Wayfarer Itineraries` },
        {
          name: "description",
          content: it.summary,
        },
        { property: "og:title", content: `${it.title} — Wayfarer Itineraries` },
        { property: "og:description", content: it.summary },
        { property: "og:type", content: "article" },
        { property: "og:image", content: it.cover },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: it.cover },
      ],
    };
  },
  component: ItineraryDetail,
});

function ItineraryDetail() {
  const { itinerary } = Route.useLoaderData();
  const more = itineraries.filter((i) => i.slug !== itinerary.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link to="/" className="transition-colors hover:text-primary">
          Journeys
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{itinerary.destination}</span>
      </nav>

      {/* Header */}
      <header>
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.15em] text-muted-foreground">
          <span>{itinerary.country}</span>
          <span className="text-border">•</span>
          <span>{itinerary.duration}</span>
          <span className="text-border">•</span>
          <span>{itinerary.season}</span>
          {itinerary.gated && (
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-primary">
              ☕ Supporter
            </span>
          )}
        </div>
        <h1 className="mt-3 font-serif text-5xl font-semibold leading-tight text-foreground">
          {itinerary.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {itinerary.summary}
        </p>
      </header>

      {/* Cover */}
      <div className="mt-8 overflow-hidden rounded-sm border border-border">
        <img
          src={itinerary.cover}
          alt={itinerary.title}
          width={800}
          height={1100}
          className="w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Highlights */}
      <section className="mt-10">
        <h2 className="font-serif text-3xl font-semibold text-foreground">
          Highlights
        </h2>
        <ul className="mt-4 space-y-2.5">
          {itinerary.highlights.map((h) => (
            <li key={h} className="flex items-start gap-3 text-foreground/90">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-primary" />
              <span className="leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Teaser */}
      <section className="mt-10 border-l-2 border-primary/40 pl-5">
        <p className="font-serif text-xl italic leading-relaxed text-foreground/90">
          {itinerary.teaser}
        </p>
      </section>

      {/* Days — free shows all, gated shows only the sample day */}
      {itinerary.days && itinerary.days.length > 0 && (
        <section className="mt-12">
          <h2 className="font-serif text-3xl font-semibold text-foreground">
            {itinerary.gated ? "A free sample day" : "The plan, day by day"}
          </h2>
          <div className="mt-6 space-y-8">
            {itinerary.days.map((d) => (
              <div key={d.day} className="rounded-sm border border-border bg-card p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-2xl font-semibold text-foreground">
                    {d.title}
                  </h3>
                  <span className="stamp text-xs text-primary">{d.day}</span>
                </div>
                <ol className="mt-4 space-y-3">
                  {d.activities.map((a) => (
                    <li key={a.time} className="flex gap-4">
                      <span className="w-16 shrink-0 pt-0.5 font-mono text-sm text-primary">
                        {a.time}
                      </span>
                      <span className="leading-relaxed text-foreground/90">
                        {a.description}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gated CTA */}
      {itinerary.gated && (
        <section className="mt-12 overflow-hidden rounded-sm border-2 border-dashed border-primary/50 bg-card p-8 text-center">
          <p className="stamp text-xs text-primary">Unlock the full itinerary</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground">
            The rest of this journey
          </h2>
          <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted-foreground">
            The complete {itinerary.duration.toLowerCase()} plan — every day,
            timed stops, and the detours most travellers miss — is available to
            supporters. Buy me a coffee and the full notes are yours.
          </p>
          <a
            href={itinerary.bmcUrl ?? BMC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            ☕ Buy me a coffee to unlock
          </a>
          <p className="mt-3 text-xs text-muted-foreground">
            After your coffee, you'll get the full itinerary delivered to you.
          </p>
        </section>
      )}

      {/* More journeys */}
      <section className="mt-16 border-t border-border pt-10">
        <h2 className="font-serif text-2xl font-semibold text-foreground">
          Keep wandering
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {more.map((i) => (
            <Link
              key={i.slug}
              to="/itineraries/$slug"
              params={{ slug: i.slug }}
              className="group block overflow-hidden rounded-sm border border-border"
            >
              <img
                src={i.cover}
                alt={i.title}
                width={800}
                height={1100}
                loading="lazy"
                className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-3">
                <p className="stamp text-[0.65rem] text-muted-foreground">
                  {i.country}
                </p>
                <p className="mt-1 font-serif text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                  {i.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
