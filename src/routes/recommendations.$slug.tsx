import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BMC_URL, mapsSearch } from "@/data/itineraries";
import type { Place } from "@/data/itineraries";
import { getGuide, guides } from "@/data/guides";

export const Route = createFileRoute("/recommendations/$slug")({
  loader: ({ params }) => {
    const guide = getGuide(params.slug);
    if (!guide) throw notFound();
    return { guide };
  },
  head: ({ loaderData }) => {
    const g = loaderData?.guide;
    if (!g) {
      return {
        meta: [
          { title: "Recommendations - AirplaneMood" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    return {
      meta: [
        { title: `${g.title} - AirplaneMood` },
        { name: "description", content: g.summary },
        { property: "og:title", content: `${g.title} - AirplaneMood` },
        { property: "og:description", content: g.summary },
        { property: "og:image", content: g.cover },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: g.cover },
      ],
    };
  },
  component: GuidePage,
});

function placeHref(place: Place, destination: string) {
  return place.url ?? mapsSearch(place.name, place.near ?? destination);
}

function GuidePage() {
  const { guide: g } = Route.useLoaderData();
  const others = guides.filter((x) => x.slug !== g.slug);

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <nav className="mb-6 text-sm font-semibold text-muted-foreground">
        <Link to="/" className="transition-colors hover:text-primary">
          Feed
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{g.destination}</span>
      </nav>

      <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl">
        {g.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{g.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {g.tags.map((t) => (
          <span
            key={t}
            className="rounded-xl bg-brand-pink px-3 py-1.5 text-xs font-bold text-foreground"
          >
            {t}
          </span>
        ))}
      </div>

      <img
        src={g.cover}
        alt={g.title}
        width={1000}
        height={1000}
        className="mt-8 aspect-[16/10] w-full rounded-3xl bg-secondary object-cover"
      />

      <p className="mt-8 rounded-2xl border-l-4 border-accent bg-secondary/70 px-6 py-5 text-lg leading-relaxed text-foreground/90">
        {g.teaser}
      </p>

      {g.notes && g.notes.length > 0 && (
        <ul className="mt-6 space-y-2">
          {g.notes.map((n) => (
            <li
              key={n}
              className="rounded-2xl border border-brand-yellow bg-brand-yellow/25 px-5 py-4 font-bold text-foreground"
            >
              {n}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-12 space-y-6">
        {g.sections.map((section) => (
          <section
            key={section.title}
            className="overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="border-b border-border bg-secondary/60 px-6 py-4">
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
                {section.title}
              </h2>
            </div>
            <div className="px-6 py-5">
              {section.note && (
                <p className="mb-4 leading-relaxed text-foreground/90">{section.note}</p>
              )}
              {section.places && section.places.length > 0 && (
                <ul className="space-y-3">
                  {section.places.map((place) => (
                    <li key={place.name} className="leading-snug">
                      <a
                        href={placeHref(place, g.destination)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                          section.avoid
                            ? "font-bold text-muted-foreground underline decoration-muted-foreground/30 underline-offset-4"
                            : "font-bold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
                        }
                      >
                        {place.name}
                      </a>
                      {place.note && (
                        <span className="block text-sm text-muted-foreground">{place.note}</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              {section.items && section.items.length > 0 && (
                <ul className={section.places?.length ? "mt-4 space-y-2" : "space-y-2"}>
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-foreground/90">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-16 rounded-3xl bg-brand-rust px-8 py-10 text-center">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-background">
          Useful?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-background/80">
          These are free to read and always will be. If one of them saves you an afternoon of
          planning, buy me a coffee.
        </p>
        <a
          href={BMC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center rounded-full bg-background px-6 py-3 text-sm font-bold text-foreground transition-transform hover:scale-105"
        >
          Buy me a coffee
        </a>
      </section>

      {others.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
            More recommendations
          </h2>
          <ul className="mt-4 space-y-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  to="/recommendations/$slug"
                  params={{ slug: o.slug }}
                  className="font-bold text-primary transition-transform hover:translate-x-1"
                >
                  {o.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
