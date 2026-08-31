import { createFileRoute, Link } from "@tanstack/react-router";
import { itineraries, BMC_URL } from "@/data/itineraries";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Wayfarer" },
      {
        name: "description",
        content:
          "Wayfarer is a growing collection of high-energy travel itineraries — free guides and supporter-funded deep dives for people who keep moving and love food.",
      },
      { property: "og:title", content: "About — Wayfarer" },
      {
        property: "og:description",
        content:
          "Wayfarer is a growing collection of high-energy travel itineraries — free guides and supporter-funded deep dives for people who keep moving and love food.",
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
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tight text-foreground md:text-7xl">
        Plans for people who
        <span className="block text-primary">never stop moving.</span>
      </h1>

      <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/90">
        <p>
          Wayfarer is my collection of travel itineraries — the kind I wish I'd
          had before I arrived. Each one is built for the restless traveler:
          early starts to beat the crowds, jampacked days, and a serious
          obsession with where to eat next.
        </p>
        <p>
          Most guides here are free to read in full. A few of the deeper dives —
          the ones that took weeks of scouting and refining — are
          supporter-funded. If one speaks to you, buy me a coffee and the
          complete plan is yours.
        </p>
        <p>
          This is the beginning of something bigger. Over time I'd love to grow
          Wayfarer into a small travel agency, planning real trips from these
          notes. For now, consider these pages your starting map.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 rounded-2xl border border-border bg-card px-6 py-6 text-sm font-semibold text-muted-foreground">
        <span>
          <strong className="font-extrabold text-foreground">{free}</strong> free
          guides
        </span>
        <span>
          <strong className="font-extrabold text-foreground">{gated}</strong>{" "}
          supporter deep dives
        </span>
        <span>Updated each season</span>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
          How access works
        </h2>
        <ol className="mt-5 space-y-4">
          <li className="flex gap-4 rounded-2xl border border-border bg-card p-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-extrabold text-primary-foreground">
              1
            </span>
            <p className="leading-relaxed text-foreground/90">
              Browse the feed and read the free guides in full — no sign-up, no
              paywall.
            </p>
          </li>
          <li className="flex gap-4 rounded-2xl border border-border bg-card p-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-extrabold text-primary-foreground">
              2
            </span>
            <p className="leading-relaxed text-foreground/90">
              For supporter deep dives, read the free sample day. If you want the
              complete plan, tap "Buy a coffee."
            </p>
          </li>
          <li className="flex gap-4 rounded-2xl border border-border bg-card p-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-extrabold text-primary-foreground">
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
          className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:scale-105"
        >
          Browse the feed
        </Link>
        <a
          href={BMC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          ☕ Buy me a coffee
        </a>
      </div>
    </div>
  );
}
