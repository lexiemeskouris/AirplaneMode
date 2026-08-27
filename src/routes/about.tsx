import { createFileRoute, Link } from "@tanstack/react-router";
import { itineraries } from "@/data/itineraries";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Wayfarer Itineraries" },
      {
        name: "description",
        content:
          "Wayfarer is a growing collection of hand-drawn travel itineraries — free guides and supporter-funded deep dives.",
      },
      { property: "og:title", content: "About — Wayfarer Itineraries" },
      {
        property: "og:description",
        content:
          "Wayfarer is a growing collection of hand-drawn travel itineraries — free guides and supporter-funded deep dives.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const free = itineraries.filter((i) => !i.gated).length;
  const gated = itineraries.filter((i) => i.gated).length;

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="stamp text-xs text-primary">About</p>
      <h1 className="mt-3 font-serif text-5xl font-semibold leading-tight text-foreground">
        Notes from the road,
        <span className="block italic text-primary">written by hand.</span>
      </h1>

      <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/90">
        <p>
          Wayfarer is my collection of travel itineraries — the kind I wish I'd
          had before I arrived. Each one is paced for the slow traveller: early
          starts to beat the crowds, long detours that turn out to be the point,
          and quiet hours for the place to sink in.
        </p>
        <p>
          Most guides here are free to read in full. A few of the deeper dives —
          the ones that took weeks of scouting and refining — are supporter-funded.
          If one speaks to you, buy me a coffee and the complete plan is yours.
        </p>
        <p>
          This is the beginning of something bigger. Over time I'd love to grow
          Wayfarer into a small travel agency, planning real trips from these
          notes. For now, consider these pages your starting map.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-y border-border py-6 text-sm text-muted-foreground">
        <span><strong className="font-semibold text-foreground">{free}</strong> free guides</span>
        <span><strong className="font-semibold text-foreground">{gated}</strong> supporter deep dives</span>
        <span>Updated each season</span>
      </div>

      <div className="mt-10">
        <h2 className="font-serif text-3xl font-semibold text-foreground">
          How access works
        </h2>
        <ol className="mt-4 space-y-4">
          <li className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary font-serif text-primary">
              1
            </span>
            <p className="leading-relaxed text-foreground/90">
              Browse the journeys and read the free guides in full — no sign-up,
              no paywall.
            </p>
          </li>
          <li className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary font-serif text-primary">
              2
            </span>
            <p className="leading-relaxed text-foreground/90">
              For supporter deep dives, read the free sample day. If you want the
              complete plan, tap "Buy me a coffee."
            </p>
          </li>
          <li className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary font-serif text-primary">
              3
            </span>
            <p className="leading-relaxed text-foreground/90">
              After your coffee, the full itinerary is delivered to you — every
              day, timed stops, and the detours in between.
            </p>
          </li>
        </ol>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          to="/"
          className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Browse journeys
        </Link>
        <a
          href="https://www.buymeacoffee.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          ☕ Buy me a coffee
        </a>
      </div>
    </div>
  );
}
