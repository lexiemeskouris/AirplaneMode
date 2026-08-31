import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getItinerary, itineraries, BMC_URL, mapsSearch } from "@/data/itineraries";
import type { Place } from "@/data/itineraries";

const placeLinkClass =
  "font-bold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent";

function placeHref(place: Place, destination: string) {
  return place.url ?? mapsSearch(place.name, place.near ?? destination);
}

/**
 * Links places inside the sentence that names them, rather than listing them
 * underneath it. "Land at Bilbao Airport." links the words "Bilbao Airport"
 * in place.
 *
 * Places whose name is not written into the description are returned in
 * `trailing` and listed below instead, which is what a pintxos crawl needs:
 * "Pintxos hopping, in this order." names none of its five bars.
 */
function linkifyDescription(description: string, places: Place[] | undefined, destination: string) {
  const trailing: Place[] = [];
  if (!places || places.length === 0) {
    return { nodes: [description] as React.ReactNode[], trailing };
  }

  // Longest name first so "Din Tai Fung Taipei 101" wins over "Din Tai Fung".
  const byLength = [...places].sort((a, b) => b.name.length - a.name.length);
  const matches: { start: number; end: number; place: Place }[] = [];

  for (const place of byLength) {
    // Take the first occurrence that does not overlap an earlier match.
    let start = -1;
    for (let from = 0; from <= description.length; ) {
      const at = description.indexOf(place.name, from);
      if (at === -1) break;
      const stop = at + place.name.length;
      if (!matches.some((m) => at < m.end && m.start < stop)) {
        start = at;
        break;
      }
      from = at + 1;
    }
    if (start === -1) trailing.push(place);
    else matches.push({ start, end: start + place.name.length, place });
  }

  matches.sort((a, b) => a.start - b.start);

  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  for (const { start, end, place } of matches) {
    if (start > cursor) nodes.push(description.slice(cursor, start));
    nodes.push(
      <a
        key={`${place.name}-${start}`}
        href={placeHref(place, destination)}
        target="_blank"
        rel="noopener noreferrer"
        className={placeLinkClass}
      >
        {place.name}
      </a>,
    );
    cursor = end;
  }
  if (cursor < description.length) nodes.push(description.slice(cursor));

  // Keep the author's order for anything left over.
  const order = new Map(places.map((pl, i) => [pl.name, i]));
  trailing.sort((a, b) => (order.get(a.name) ?? 0) - (order.get(b.name) ?? 0));

  return { nodes, trailing };
}

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
          { title: "Itinerary - AirplaneMood" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    return {
      meta: [
        { title: `${it.title} - AirplaneMood` },
        {
          name: "description",
          content: it.summary,
        },
        { property: "og:title", content: `${it.title} - AirplaneMood` },
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
  const { itinerary: it } = Route.useLoaderData();
  const more = itineraries.filter((i) => i.slug !== it.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-5xl px-6 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm font-bold text-muted-foreground">
        <Link to="/" className="transition-colors hover:text-accent">
          Feed
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{it.destination}</span>
      </nav>

      {/* Header */}
      <header className="max-w-3xl">
        <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl">
          {it.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {it.summary}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {it.tags.map((t) => (
            <span
              key={t}
              className="rounded-xl bg-secondary px-3 py-1.5 text-xs font-bold text-accent"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      {/* Cover */}
      <div className="mt-8 overflow-hidden rounded-[2rem] shadow-2xl">
        <img
          src={it.cover}
          alt={it.title}
          width={1200}
          height={750}
          className="aspect-[16/10] w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Highlights */}
      <section className="mt-12">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
          Highlights
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {it.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-foreground/90"
            >
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <span className="leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Teaser */}
      <section className="mt-10 rounded-2xl border-l-4 border-accent bg-secondary p-6">
        <p className="text-lg font-medium leading-relaxed text-foreground/90">
          {it.teaser}
        </p>
      </section>

      {/* Days - free shows all, gated shows only the sample day */}
      {it.notes && it.notes.length > 0 && (
        <ul className="mt-8 space-y-2">
          {it.notes.map((n) => (
            <li
              key={n}
              className="rounded-2xl border border-brand-yellow bg-brand-yellow/25 px-5 py-4 font-bold text-foreground"
            >
              {n}
            </li>
          ))}
        </ul>
      )}

      {it.days && it.days.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
            {it.gated ? "A free sample day" : "The plan, day by day"}
          </h2>
          <div className="mt-6 space-y-6">
            {it.days.map((d) => (
              <div
                key={d.day}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="flex items-baseline justify-between border-b border-border bg-secondary/60 px-6 py-4">
                  <h3 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
                    {d.title}
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">
                    {d.day}
                  </span>
                </div>
                <ol className="divide-y divide-border">
                  {d.activities.map((a, i) => {
                    const { nodes, trailing } = linkifyDescription(
                      a.description,
                      a.places,
                      it.destination,
                    );
                    return (
                      <li key={`${d.day}-${i}`} className="flex gap-4 px-6 py-4">
                        {/* Untimed steps keep the time column's width so every
                            description still lines up, and take a dash. */}
                        <span className="w-16 shrink-0 pt-0.5 font-mono text-sm font-bold text-primary">
                          {a.time ?? <span className="text-muted-foreground/50">-</span>}
                        </span>
                        <div className="min-w-0">
                          <span className="leading-relaxed text-foreground/90">{nodes}</span>
                          {/* Only places the sentence does not already name. */}
                          {trailing.length > 0 && (
                            <ul className="mt-3 space-y-2">
                              {trailing.map((place) => (
                                <li key={place.name} className="leading-snug">
                                  <a
                                    href={placeHref(place, it.destination)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={placeLinkClass}
                                  >
                                    {place.name}
                                  </a>
                                  {place.note && (
                                    <span className="text-sm text-muted-foreground">
                                      {" "}
                                      {place.note}
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        </section>
      )}

      {it.extras && it.extras.places.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
            {it.extras.title}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {it.extras.places.map((place) => (
              <li
                key={place.name}
                className="rounded-2xl border border-border bg-card px-5 py-4 leading-snug"
              >
                <a
                  href={place.url ?? mapsSearch(place.name, place.near ?? it.destination)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {place.name}
                </a>
                {place.note && (
                  <span className="block text-sm text-muted-foreground">{place.note}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Gated CTA */}
      {it.gated && (
        <section className="mt-12 overflow-hidden rounded-[2rem] bg-foreground p-8 text-center text-background md:p-12">
          <h2 className="font-display text-4xl font-extrabold tracking-tight">
            The rest of this journey
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-background/70">
            The complete {it.duration.toLowerCase()} plan - every day, timed
            stops, and the detours most travellers miss - is available to
            supporters. Buy me a coffee and the full notes are yours.
          </p>
          <a
            href={it.bmcUrl ?? BMC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-accent-foreground transition-transform hover:scale-105"
          >
            ☕ Buy me a coffee to unlock
          </a>
          <p className="mt-3 text-xs text-background/50">
            After your coffee, you'll get the full itinerary delivered to you.
          </p>
        </section>
      )}

      {/* More journeys */}
      <section className="mt-16 border-t border-border pt-10">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
          Keep moving
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {more.map((i) => (
            <Link
              key={i.slug}
              to="/itineraries/$slug"
              params={{ slug: i.slug }}
              className="group overflow-hidden rounded-2xl border border-border bg-card"
            >
              <img
                src={i.cover}
                alt={i.title}
                width={800}
                height={500}
                loading="lazy"
                className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-3">
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
                  {i.country}
                </p>
                <p className="mt-1 font-display text-lg font-extrabold tracking-tight text-foreground transition-colors group-hover:text-primary">
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
