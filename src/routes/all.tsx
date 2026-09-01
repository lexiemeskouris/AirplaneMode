import { createFileRoute, Link } from "@tanstack/react-router";
import { itineraries } from "@/data/itineraries";
import { guides } from "@/data/guides";
import worldMap from "@/assets/world.svg";

export const Route = createFileRoute("/all")({
  head: () => ({
    meta: [
      { title: "Everywhere, A to Z - AirplaneMode" },
      {
        name: "description",
        content:
          "Every itinerary and every list of recommendations on AirplaneMode, in alphabetical order.",
      },
      { property: "og:title", content: "Everywhere, A to Z - AirplaneMode" },
      {
        property: "og:description",
        content:
          "Every itinerary and every list of recommendations on AirplaneMode, in alphabetical order.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AllPage,
});

type Row = {
  kind: "itinerary" | "recommendation";
  slug: string;
  destination: string;
  meta: string;
  coords: { lat: number; lon: number };
};

// The same equirectangular crop world.svg was generated with, so a pin lands on
// the coastline underneath it. Percentages, so it holds at any width.
const LAT_TOP = 85;
const LAT_BOTTOM = -60;

function pinPosition({ lat, lon }: { lat: number; lon: number }) {
  return {
    left: `${((lon + 180) / 360) * 100}%`,
    top: `${((LAT_TOP - lat) / (LAT_TOP - LAT_BOTTOM)) * 100}%`,
  };
}

function AllPage() {
  const rows: Row[] = [
    ...itineraries.map((it) => ({
      kind: "itinerary" as const,
      slug: it.slug,
      destination: it.destination,
      meta: `Itinerary · ${it.duration}`,
      coords: it.coords,
    })),
    ...guides.map((g) => {
      const spots = g.sections.reduce(
        (n, s) =>
          n +
          (s.places?.length ?? 0) +
          (s.activities?.reduce((m, a) => m + (a.places?.length ?? 0), 0) ?? 0),
        0,
      );
      const tips = g.sections.reduce((n, s) => n + (s.items?.length ?? 0), 0);
      return {
        kind: "recommendation" as const,
        slug: g.slug,
        destination: g.destination,
        // Match the tile's own label, so a day trip does not describe itself as
        // "Recommendations" here and "DAY TRIP" on the feed.
        meta: `${
          g.label ? g.label[0] + g.label.slice(1).toLowerCase() : "Recommendations"
        } · ${spots >= tips ? `${spots} spots` : `${tips} tips`}`,
        coords: g.coords,
      };
    }),
    // localeCompare so Reykjavík and San Sebastián sort by their base letters
    // rather than being thrown to the end by their accents.
  ].sort((a, b) =>
    a.destination.localeCompare(b.destination, "en", { sensitivity: "base" }),
  );

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl">
        Everywhere,
        <span className="text-primary"> A to Z.</span>
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
        Every itinerary and every list, in one place. {rows.length} in total.
      </p>

      {/* CSS columns rather than a grid: an alphabetical index should read
          down the first column and continue in the second, the way an index
          does, not left-to-right across each row. */}
      {/* The map is the visual index; the list below is the same thing in
          alphabetical order. Everything on it is also reachable from the list,
          so nothing here is the only route to a page. */}
      <div className="relative mt-10 overflow-hidden rounded-3xl border border-border bg-secondary/40">
        <img
          src={worldMap}
          alt=""
          aria-hidden
          className="block w-full"
          width={360}
          height={145}
        />
        <div className="absolute inset-0">
          {rows.map((row) => {
            const pos = pinPosition(row.coords);
            const dot = (
              <>
                <span className="absolute inset-0 rounded-full bg-primary/30 transition-transform duration-300 group-hover:scale-[2.2]" />
                <span className="absolute inset-[3px] rounded-full bg-primary ring-2 ring-background" />
                <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[0.7rem] font-bold text-background opacity-0 transition-opacity group-hover:opacity-100">
                  {row.destination}
                </span>
              </>
            );
            const className =
              "group absolute z-10 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 sm:h-4 sm:w-4";
            return row.kind === "itinerary" ? (
              <Link
                key={`pin-${row.slug}`}
                to="/itineraries/$slug"
                params={{ slug: row.slug }}
                style={pos}
                className={className}
                aria-label={row.destination}
              >
                {dot}
              </Link>
            ) : (
              <Link
                key={`pin-${row.slug}`}
                to="/recommendations/$slug"
                params={{ slug: row.slug }}
                style={pos}
                className={className}
                aria-label={row.destination}
              >
                {dot}
              </Link>
            );
          })}
        </div>
      </div>

      <ul className="mt-12 gap-x-8 sm:columns-2">
        {rows.map((row) => (
          <li
            key={`${row.kind}-${row.slug}`}
            className="break-inside-avoid border-b border-border"
          >
            {row.kind === "itinerary" ? (
              <Link
                to="/itineraries/$slug"
                params={{ slug: row.slug }}
                className="group flex items-baseline justify-between gap-4 py-3 transition-colors"
              >
                <span className="font-display text-lg font-extrabold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {row.destination}
                </span>
                <span className="shrink-0 text-xs font-semibold text-muted-foreground">
                  {row.meta}
                </span>
              </Link>
            ) : (
              <Link
                to="/recommendations/$slug"
                params={{ slug: row.slug }}
                className="group flex items-baseline justify-between gap-4 py-3 transition-colors"
              >
                <span className="font-display text-lg font-extrabold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {row.destination}
                </span>
                <span className="shrink-0 text-xs font-semibold text-muted-foreground">
                  {row.meta}
                </span>
              </Link>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <Link
          to="/"
          className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:scale-105"
        >
          Back to the feed
        </Link>
      </div>
    </div>
  );
}
