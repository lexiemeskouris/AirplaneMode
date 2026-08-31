import { createFileRoute, Link } from "@tanstack/react-router";
import { itineraries } from "@/data/itineraries";
import { guides } from "@/data/guides";

export const Route = createFileRoute("/all")({
  head: () => ({
    meta: [
      { title: "Everywhere, A to Z - AirplaneMood" },
      {
        name: "description",
        content:
          "Every itinerary and every list of recommendations on AirplaneMood, in alphabetical order.",
      },
      { property: "og:title", content: "Everywhere, A to Z - AirplaneMood" },
      {
        property: "og:description",
        content:
          "Every itinerary and every list of recommendations on AirplaneMood, in alphabetical order.",
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
};

function AllPage() {
  const rows: Row[] = [
    ...itineraries.map((it) => ({
      kind: "itinerary" as const,
      slug: it.slug,
      destination: it.destination,
      meta: `Itinerary · ${it.duration}`,
    })),
    ...guides.map((g) => {
      const spots = g.sections.reduce((n, s) => n + (s.places?.length ?? 0), 0);
      const tips = g.sections.reduce((n, s) => n + (s.items?.length ?? 0), 0);
      return {
        kind: "recommendation" as const,
        slug: g.slug,
        destination: g.destination,
        meta:
          spots >= tips ? `Recommendations · ${spots} spots` : `Guide · ${tips} tips`,
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
      <ul className="mt-10 gap-x-8 sm:columns-2">
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
