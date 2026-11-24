import { createFileRoute, Link } from "@tanstack/react-router";
import { itineraries, BMC_URL, placeName } from "@/data/itineraries";
import { guides } from "@/data/guides";
import { findTarget, guideTargets, itineraryTargets } from "@/lib/anchors";
import { SUGGESTIONS_ENABLED } from "@/data/site";
import { SpinWheel, useSpinWheel } from "@/components/SpinWheel";
import { REGIONS, regionId, regionOf, type Region } from "@/data/regions";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AirplaneMode - Fast-Paced Travel Itineraries" },
      {
        name: "description",
        content:
          "Travel itineraries I build for myself and post as I used them. Real places, hour by hour. Free to read.",
      },
      { property: "og:title", content: "AirplaneMode - Fast-Paced Travel Itineraries" },
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
  /** Shown above the title, and what the cards sort by within a continent. */
  country: string;
  summary: string;
  /** Each chip links to the part of the page it is about, when one matches. */
  tags: { label: string; hash?: string | undefined }[];
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
  const { kind, slug, cover, title, country, summary, tags, chipA, chipB, cta, gated, comingSoon, bmcUrl } =
    props;
  // Tags that only repeat the title ("#Ljubljana" under "Ljubljana and Lake
  // Bled") waste the two chips a phone shows, so they are dropped.
  const squash = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
  const shownTags = tags.filter((t) => !squash(title).includes(squash(t.label)));
  // The country line is skipped when the title already says it (Iceland).
  const showCountry = !squash(title).includes(squash(country));

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
        {showCountry && (
          <p className="mb-1 text-[0.65rem] font-extrabold uppercase tracking-wider text-muted-foreground sm:text-xs">
            {country}
          </p>
        )}
        <h2 className="hyphens-auto font-display text-base font-extrabold leading-tight tracking-tight text-foreground [overflow-wrap:anywhere] sm:text-xl sm:[overflow-wrap:normal]">
          <Link {...linkProps}>{title}</Link>
        </h2>
        {/* Clamped so a long summary cannot make one tile taller than its row. */}
        <p className="mt-2 hidden text-sm sm:line-clamp-3 leading-relaxed text-muted-foreground">{summary}</p>
        <div className="mt-2 flex flex-wrap gap-1 sm:mt-4 sm:gap-1.5">
          {shownTags.slice(0, 3).map((t, i) => (
            <Link
              key={t.label}
              {...linkProps}
              {...(t.hash ? { hash: t.hash } : {})}
              className={`rounded-lg bg-brand-pink px-2 py-1 text-[0.65rem] font-bold text-foreground transition-colors hover:bg-foreground hover:text-background ${
                i >= 2 ? "hidden sm:inline-block" : ""
              }`}
            >
              {t.label}
            </Link>
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
      className="sticky z-40 -mx-6 mb-10 flex gap-2 min-[1720px]:hidden overflow-x-auto bg-background/90 px-6 py-3 backdrop-blur-xl"
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

const countryId = (c: string) => `country-${c.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

/**
 * On wide screens the feed leaves an empty gutter on the left. This fills it
 * with the continents, and the countries of the one you are in, pinned while
 * you scroll so any part of the world is one click away. Below that width
 * the row of continent buttons above the feed does the job instead.
 */
function SideRail({ sections }: { sections: { region: Region; countries: string[] }[] }) {
  const [top, setTop] = useState(0);
  const [active, setActive] = useState<{ region: Region | null; country: string | null }>({
    region: null,
    country: null,
  });

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const measure = () => setTop(header.getBoundingClientRect().height);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  // A clicked link stays lit while the page glides to it, rather than
  // flickering through every country on the way.
  const held = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      if (Date.now() < held.current) return;
      const line = top + 160;
      let region: Region | null = null;
      let country: string | null = null;
      for (const s of sections) {
        const el = document.getElementById(regionId(s.region));
        if (el && el.getBoundingClientRect().top <= line) {
          region = s.region;
          country = null;
          // The latest row to pass the line; in a row of four countries
          // that arrive together, the first of them.
          let best = -Infinity;
          for (const c of s.countries) {
            const y = document.getElementById(countryId(c))?.getBoundingClientRect().top;
            if (y !== undefined && y <= line && y > best + 1) {
              best = y;
              country = c;
            }
          }
        }
      }
      setActive({ region, country });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections, top]);

  const jump = (e: React.MouseEvent, id: string, region: Region, country: string | null) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    held.current = Date.now() + 1000;
    setActive({ region, country });
    // No hash in the address bar: the router would take that as a navigation
    // and scroll again with its own offset, stopping short of the heading.
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - top - 24, behavior: "smooth" });
  };

  // Before you reach the feed, the first continent is the one shown open.
  const open = active.region ?? sections[0]?.region;

  return (
    <aside className="absolute inset-y-0 right-full hidden w-52 min-[1720px]:block">
      <nav
        aria-label="Jump to a continent or country"
        style={{ top: top + 24, maxHeight: `calc(100vh - ${top + 48}px)` }}
        className="sticky overflow-y-auto pr-6 [scrollbar-width:thin]"
      >
        <ul className="space-y-1 border-l-2 border-border">
          {sections.map(({ region, countries }) => {
            const isOpen = region === open;
            return (
              <li key={region}>
                <a
                  href={`#${regionId(region)}`}
                  onClick={(e) => jump(e, regionId(region), region, null)}
                  aria-current={active.region === region && !active.country ? "true" : undefined}
                  className={`-ml-[2px] block border-l-2 py-1.5 pl-4 font-display text-sm font-extrabold transition-colors ${
                    isOpen
                      ? "border-primary text-primary"
                      : "border-transparent text-foreground/70 hover:text-primary"
                  }`}
                >
                  {region}
                </a>
                {isOpen && (
                  <ul className="mb-2">
                    {countries.map((c) => (
                      <li key={c}>
                        <a
                          href={`#${countryId(c)}`}
                          onClick={(e) => jump(e, countryId(c), region, c)}
                          aria-current={active.country === c ? "true" : undefined}
                          className={`block py-1 pl-7 text-[0.8rem] font-semibold transition-colors ${
                            active.country === c
                              ? "text-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {c}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

function Index() {
  const free = itineraries.filter((i) => !i.gated && !i.comingSoon);
  const gated = itineraries.filter((i) => i.gated);
  const wheel = useSpinWheel();

  const tiles: {
    region: (typeof REGIONS)[number];
    country: string;
    sortKey: string;
    node: React.ReactNode;
  }[] = [
    ...itineraries.map((it) => ({
      region: regionOf(it.country),
      country: it.country,
      sortKey: `${it.country}|${placeName(it.title)}`,
      node: (
        <Tile
          key={it.slug}
          kind="itinerary"
          slug={it.slug}
          cover={it.cover}
          title={placeName(it.title)}
          country={it.country}
          summary={it.summary}
          tags={(it.highlights?.length ? it.highlights : it.tags).map((label) => ({
            label,
            hash: findTarget(label, itineraryTargets(it)),
          }))}
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
          country: g.country,
          sortKey: `${g.country}|${placeName(g.title)}`,
          node: (
            <Tile
              key={g.slug}
              kind="recommendation"
              slug={g.slug}
              cover={g.cover}
              title={placeName(g.title)}
              country={g.country}
              summary={g.summary}
              tags={g.tags.map((label) => ({ label, hash: findTarget(label, guideTargets(g)) }))}
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
      .sort((a, b) => a.sortKey.localeCompare(b.sortKey, "en", { sensitivity: "base" })),
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
            Fast-paced itineraries for people who like quick getaways. No
            filler - just the best cities, food, and sights, hour by hour, with
            every stop linked.
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
      <section className="relative mx-auto max-w-7xl px-6 pb-32">
        <SideRail
          sections={sections.map((x) => ({
            region: x.region,
            countries: [...new Set(x.tiles.map((t) => t.country))],
          }))}
        />
        <ContinentNav regions={sections.map((x) => x.region)} />

        <div className="space-y-16">
          {sections.map(({ region, tiles }) => (
            <section key={region} id={regionId(region)} className="scroll-mt-40">
              <h2 className="mb-6 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                {region}
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:gap-8 lg:grid-cols-4">
                {tiles.map((t, i) => (
                  // The first tile of each country is what the side rail's
                  // country links land on.
                  <div
                    key={i}
                    id={
                      tiles.findIndex((x) => x.country === t.country) === i
                        ? countryId(t.country)
                        : undefined
                    }
                    className="min-w-0 scroll-mt-32"
                  >
                    {t.node}
                  </div>
                ))}
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
