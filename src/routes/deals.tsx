import { createFileRoute, Link } from "@tanstack/react-router";
import { deals, type Deal } from "@/data/deals";

const DESCRIPTION =
  "Tours I have booked and would book again, with my partner links and any discount they come with, sorted by country.";

export const Route = createFileRoute("/deals")({
  head: () => ({
    meta: [
      { title: "Tour Deals - AirplaneMode" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Tour Deals - AirplaneMode" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DealsPage,
});

function byCountry(list: Deal[]): [string, Deal[]][] {
  const groups = new Map<string, Deal[]>();
  for (const d of list) groups.set(d.country, [...(groups.get(d.country) ?? []), d]);
  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([country, ds]) => [country, ds.sort((a, b) => a.city.localeCompare(b.city))]);
}

function TripLink({ deal }: { deal: Deal }) {
  const className =
    "text-sm font-semibold text-muted-foreground underline decoration-muted-foreground/30 underline-offset-4 transition-colors hover:text-accent";
  return deal.page.kind === "itinerary" ? (
    <Link to="/itineraries/$slug" params={{ slug: deal.page.slug }} className={className}>
      My itinerary
    </Link>
  ) : (
    <Link to="/recommendations/$slug" params={{ slug: deal.page.slug }} className={className}>
      My recommendations
    </Link>
  );
}

function DealsPage() {
  const groups = byCountry(deals);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tight text-foreground md:text-7xl">
        Tour deals,
        <span className="block text-primary">from trips I have taken.</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/90">
        These are partner links for tours in places I have been. Booking through
        them supports the site at no extra cost to you, and where a link comes
        with a discount, it is listed next to the tour.
      </p>

      <div className="mt-12 space-y-10">
        {groups.map(([country, ds]) => (
          <section key={country}>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
              {country}
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {ds.map((d) => (
                <li
                  key={d.url}
                  className="flex flex-col gap-1 rounded-2xl border border-border bg-card px-5 py-4 leading-snug"
                >
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
                    {d.city}
                  </span>
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="font-bold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
                  >
                    {d.operator}: {d.tour}
                  </a>
                  {d.discount && (
                    <span className="text-sm font-bold text-accent">{d.discount}</span>
                  )}
                  <TripLink deal={d} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
