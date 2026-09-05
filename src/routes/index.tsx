import { createFileRoute, Link } from "@tanstack/react-router";
import { itineraries, BMC_URL } from "@/data/itineraries";
import { guides } from "@/data/guides";
import { SUGGESTIONS_ENABLED } from "@/data/site";
import { SpinWheel, useSpinWheel } from "@/components/SpinWheel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AirplaneMode - High-Energy Travel Itineraries" },
      {
        name: "description",
        content:
          "Travel itineraries I build for myself and post as I used them. Real places, hour by hour. Free to read.",
      },
      { property: "og:title", content: "AirplaneMode - High-Energy Travel Itineraries" },
      {
        property: "og:description",
        content:
          "Travel itineraries I build for myself and post as I used them. Real places, hour by hour. Free to read.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type TileProps = {
  kind: "itinerary" | "recommendation";
  slug: string;
  cover: string;
  title: string;
  summary: string;
  tags: string[];
  /** Yellow chip: the season, or what kind of page this is. */
  chipA: string;
  /** Indigo chip: how long it runs, or how many places it names. */
  chipB: string;
  cta: string;
  gated?: boolean;
  // Explicitly undefined-able: an itinerary with no link passes undefined
  // through, and exactOptionalPropertyTypes rejects a bare optional.
  bmcUrl?: string | undefined;
};

/**
 * One tile, used for both itineraries and recommendations so a mixed feed still
 * lines up: fixed 4:5 cover, clamped summary, and the link pinned to the bottom.
 */
function Tile(props: TileProps) {
  const { kind, slug, cover, title, summary, tags, chipA, chipB, cta, gated, bmcUrl } = props;

  const to = kind === "itinerary" ? "/itineraries/$slug" : "/recommendations/$slug";
  const linkProps = { to, params: { slug } } as const;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <Link {...linkProps} className="block">
          <img
            src={cover}
            alt={title}
            width={1000}
            height={1000}
            loading="lazy"
            className={`aspect-square w-full bg-secondary object-cover transition-transform duration-500 group-hover:scale-[1.04] ${
              gated ? "grayscale group-hover:grayscale-0" : ""
            }`}
          />
        </Link>

        <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-brand-yellow px-2.5 py-1 text-[0.65rem] font-extrabold tracking-tight text-foreground shadow-sm">
            {chipA}
          </span>
          <span className="rounded-full bg-accent px-2.5 py-1 text-[0.65rem] font-extrabold tracking-tight text-accent-foreground shadow-sm">
            {chipB}
          </span>
          {gated && (
            <span className="rounded-full bg-primary px-2.5 py-1 text-[0.65rem] font-extrabold tracking-tight text-primary-foreground shadow-sm">
              SUPPORTER
            </span>
          )}
        </div>

        {gated && (
          <div className="absolute inset-0 flex items-end justify-center bg-foreground/35 p-4 backdrop-blur-[3px]">
            <a
              href={bmcUrl ?? BMC_URL}
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
          <Link {...linkProps}>{title}</Link>
        </h2>
        {/* Clamped so a long summary cannot make one tile taller than its row. */}
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((t) => (
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
          {...linkProps}
          className={`mt-auto inline-flex w-fit items-center pt-5 text-sm font-bold transition-transform hover:translate-x-1 ${
            gated ? "text-muted-foreground" : "text-primary"
          }`}
        >
          {cta}
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
  );
}

function Index() {
  const free = itineraries.filter((i) => !i.gated);
  const gated = itineraries.filter((i) => i.gated);
  const wheel = useSpinWheel();

  return (
    <div>
      <SpinWheel open={wheel.open} onClose={wheel.close} />
      {/* Hero intro band. Kept short on purpose: the feed should start above the
          fold rather than after a full screen of headline. */}
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-10">
        <div>
          <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Less planning. <span className="text-primary">More moving.</span>
          </h1>
          <p className="mt-4 text-lg font-medium leading-relaxed text-muted-foreground">
            High-energy itineraries for people who like city breaks and quick
            getaways. Non-stop, just like our generation. No filler, just the
            best food and the best sights, hour by hour, with every stop linked.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm font-semibold text-muted-foreground">
            <span>
              <strong className="font-extrabold text-foreground">{free.length}</strong>{" "}
              {free.length === 1 ? "free itinerary" : "free itineraries"}
            </span>
            {guides.length > 0 && (
              <span>
                <strong className="font-extrabold text-foreground">{guides.length}</strong>{" "}
                {guides.length === 1 ? "recommendations list" : "recommendations lists"}
              </span>
            )}
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

      {/* Feed - uniform tiles, four to a row on desktop. Itineraries first, then
          the cities that only have a list of recommendations. */}
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {itineraries.map((it) => (
            <Tile
              key={it.slug}
              kind="itinerary"
              slug={it.slug}
              cover={it.cover}
              title={it.title}
              summary={it.summary}
              tags={it.tags}
              chipA={it.season.toUpperCase()}
              chipB={it.duration.toUpperCase()}
              cta={it.gated ? "Read the free sample" : "View full sprint"}
              gated={it.gated}
              bmcUrl={it.bmcUrl}
            />
          ))}
          {guides.map((g) => {
            const spots = g.sections.reduce(
              (n, s) =>
                n +
                (s.places?.length ?? 0) +
                (s.activities?.reduce((m, a) => m + (a.places?.length ?? 0), 0) ?? 0),
              0,
            );
            const tips = g.sections.reduce((n, s) => n + (s.items?.length ?? 0), 0);
            // Count whichever the page is actually made of: "2 SPOTS" would
            // undersell a guide that is sixty pieces of advice.
            return (
              <Tile
                key={g.slug}
                kind="recommendation"
                slug={g.slug}
                cover={g.cover}
                title={g.title}
                summary={g.summary}
                tags={g.tags}
                chipA={g.label ?? "RECS"}
                chipB={spots >= tips ? `${spots} SPOTS` : `${tips} TIPS`}
                cta="See the list"
              />
            );
          })}
        </div>

        {SUGGESTIONS_ENABLED && (
          <div className="mt-16 overflow-hidden rounded-3xl border border-border bg-card">
            <div aria-hidden className="flex h-1.5 w-full">
              <div className="flex-1 bg-brand-red" />
              <div className="flex-1 bg-brand-indigo" />
              <div className="flex-1 bg-brand-pink" />
              <div className="flex-1 bg-brand-yellow" />
            </div>
            <div className="px-8 py-10 text-center">
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                Somewhere missing?
              </h2>
              <p className="mx-auto mt-3 max-w-lg leading-relaxed text-muted-foreground">
                Tell me where you want to go and I will plan it properly. The
                places that keep coming up get written first.
              </p>
              <Link
                to="/suggest"
                className="mt-6 inline-flex items-center rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95"
              >
                Suggest a destination
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
