import { createFileRoute, Link } from "@tanstack/react-router";
import { itineraries, BMC_URL, placeName } from "@/data/itineraries";
import { guides } from "@/data/guides";
import { SUGGESTIONS_ENABLED } from "@/data/site";
import { SpinWheel, useSpinWheel } from "@/components/SpinWheel";
import { REGIONS, regionId, regionOf, type Region } from "@/data/regions";
import { useEffect, useState } from "react";

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
  cover?: string | undefined;
  title: string;
  summary: string;
  tags: string[];
  /** Yellow chip: the season, or what kind of page this is. */
  chipA: string;
  /** Indigo chip: how long it runs, or how many places it names. */
  chipB: string;
  cta: string;
  gated?: boolean;
  comingSoon?: boolean | undefined;
  // Explicitly undefined-able: an itinerary with no link passes undefined
  // through, and exactOptionalPropertyTypes rejects a bare optional.
  bmcUrl?: string | undefined;
};

/**
 * One tile, used for both itineraries and recommendations so a mixed feed still
 * lines up: fixed 4:5 cover, clamped summary, and the link pinned to the bottom.
 */
function Tile(props: TileProps) {
  const { kind, slug, cover, title, summary, tags, chipA, chipB, cta, gated, comingSoon, bmcUrl } =
    props;

  const to = kind === "itinerary" ? "/itineraries/$slug" : "/recommendations/$slug";
  const linkProps = { to, params: { slug } } as const;

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <Link {...linkProps} className="block">
          {!cover ? (
            // No photo yet: a brand panel rather than a broken tile.
            <div className="flex aspect-[4/3] w-full items-center justify-center bg-brand-indigo px-4 sm:aspect-square">
              <span className="text-center font-display text-xl font-extrabold leading-tight tracking-tight text-background">
                {title}
              </span>
            </div>
          ) : (
          <img
            src={cover}
            alt={title}
            width={1000}
            height={1000}
            loading="lazy"
            className={`aspect-[4/3] w-full bg-secondary sm:aspect-square object-cover transition-transform duration-500 group-hover:scale-[1.04] ${
              gated || comingSoon ? "grayscale group-hover:grayscale-0" : ""
            }`}
          />
          )}
        </Link>

        <div className="pointer-events-none absolute inset-x-2 top-2 z-10 flex flex-wrap gap-1 sm:inset-x-3 sm:top-3 sm:gap-1.5">
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
          {comingSoon && (
            <span className="rounded-full bg-foreground px-2.5 py-1 text-[0.65rem] font-extrabold tracking-tight text-background shadow-sm">
              COMING SOON
            </span>
          )}
        </div>

        {gated && (
          <div className="absolute inset-0 flex items-end justify-center bg-foreground/35 p-4 backdrop-blur-[3px]">
            <a
              href={bmcUrl ?? BMC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-xl bg-accent px-2 py-2 text-center text-[0.65rem] sm:px-3 sm:py-2.5 sm:text-xs font-bold text-accent-foreground shadow-lg transition-transform hover:scale-[1.03]"
            >
              Buy a coffee to unlock
            </a>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <h2 className="hyphens-auto font-display text-base font-extrabold leading-tight tracking-tight text-foreground [overflow-wrap:anywhere] sm:text-xl sm:[overflow-wrap:normal]">
          <Link {...linkProps}>{title}</Link>
        </h2>
        {/* Clamped so a long summary cannot make one tile taller than its row. */}
        <p className="mt-2 hidden text-sm sm:line-clamp-3 leading-relaxed text-muted-foreground">{summary}</p>
        <div className="mt-2 flex flex-wrap gap-1 sm:mt-4 sm:gap-1.5">
          {tags.slice(0, 3).map((t, i) => (
            <span
              key={t}
              className={`rounded-lg bg-brand-pink px-2 py-1 text-[0.65rem] font-bold text-foreground ${
                i >= 2 ? "hidden sm:inline-block" : ""
              }`}
            >
              {t}
            </span>
          ))}
        </div>
        {/* mt-auto pins the link to the bottom so it lines up across the row. */}
        <Link
          {...linkProps}
          className={`mt-auto hidden w-fit items-center pt-5 sm:inline-flex text-sm font-bold transition-transform hover:translate-x-1 ${
            gated || comingSoon ? "text-muted-foreground" : "text-primary"
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

/**
 * The continent buttons. Pinned just under the site header so they stay
 * reachable halfway down Europe, with the section in view highlighted.
 */
function ContinentNav({ regions }: { regions: Region[] }) {
  const [top, setTop] = useState(0);
  const [active, setActive] = useState<Region | null>(null);

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const measure = () => setTop(header.getBoundingClientRect().height);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      // The last section whose heading has passed the line under the bars.
      const line = top + 120;
      let current: Region | null = null;
      for (const r of regions) {
        const el = document.getElementById(regionId(r));
        if (el && el.getBoundingClientRect().top <= line) current = r;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [regions, top]);

  return (
    <nav
      aria-label="Jump to a continent"
      style={{ top }}
      className="sticky z-40 -mx-6 mb-10 flex gap-2 overflow-x-auto bg-background/90 px-6 py-3 backdrop-blur-xl"
    >
      {regions.map((region) => (
        <a
          key={region}
          href={`#${regionId(region)}`}
          aria-current={active === region ? "true" : undefined}
          className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-bold transition-colors ${
            active === region
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-foreground hover:border-primary hover:text-primary"
          }`}
        >
          {region}
        </a>
      ))}
    </nav>
  );
}

/** A guide's card name: just the place, since the RECS chip says the rest. */
function cardTitle(title: string): string {
  return title.replace(/ Recommendations$/, "");
}

function Index() {
  const free = itineraries.filter((i) => !i.gated && !i.comingSoon);
  const gated = itineraries.filter((i) => i.gated);
  const wheel = useSpinWheel();

  const tiles: { region: (typeof REGIONS)[number]; sortKey: string; node: React.ReactNode }[] = [
    ...itineraries.map((it) => ({
      region: regionOf(it.country),
      sortKey: placeName(it.title),
      node: (
        <Tile
          key={it.slug}
          kind="itinerary"
          slug={it.slug}
          cover={it.cover}
          title={placeName(it.title)}
          summary={it.summary}
          tags={it.tags}
          chipA={it.season.toUpperCase()}
          chipB={it.duration.toUpperCase()}
          cta={
            it.comingSoon
              ? "Coming soon"
              : it.gated
                ? "Read the free sample"
                : "View full sprint"
          }
          gated={it.gated}
          comingSoon={it.comingSoon}
          bmcUrl={it.bmcUrl}
        />
      ),
    })),
    ...guides
      .filter((g) => !g.parent)
      .map((g) => {
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
        return {
          region: regionOf(g.country),
          sortKey: cardTitle(g.title),
          node: (
            <Tile
              key={g.slug}
              kind="recommendation"
              slug={g.slug}
              cover={g.cover}
              title={cardTitle(g.title)}
              summary={g.summary}
              tags={g.tags}
              chipA={g.label ?? "RECS"}
              chipB={spots >= tips ? `${spots} SPOTS` : `${tips} TIPS`}
              cta="See the list"
            />
          ),
        };
      }),
  ];
  const sections = REGIONS.map((region) => ({
    region,
    tiles: tiles
      .filter((t) => t.region === region)
      .sort((a, b) => a.sortKey.localeCompare(b.sortKey)),
  })).filter((s) => s.tiles.length > 0);

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
            Every trip I&apos;ve planned and actually taken, written up so you
            can steal it. I like my days packed with food and sightseeing, so
            take the whole plan or just the parts you like.
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

      {/* Feed, by continent. Itineraries and recommendations lists share a
          section, A to Z by place within it, so everything for one part of
          the world sits together. */}
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <ContinentNav regions={sections.map((x) => x.region)} />

        <div className="space-y-16">
          {sections.map(({ region, tiles }) => (
            <section key={region} id={regionId(region)} className="scroll-mt-40">
              <h2 className="mb-6 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                {region}
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:gap-8 lg:grid-cols-4">
                {tiles.map((t) => t.node)}
              </div>
            </section>
          ))}
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
