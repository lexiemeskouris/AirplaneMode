import { createFileRoute, Link } from "@tanstack/react-router";
import { itineraries, BMC_URL } from "@/data/itineraries";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About - AirplaneMood" },
      {
        name: "description",
        content:
          "Travel itineraries I build for myself and post as I used them. Real places, hour by hour. Free to read.",
      },
      { property: "og:title", content: "About - AirplaneMood" },
      {
        property: "og:description",
        content:
          "Travel itineraries I build for myself and post as I used them. Real places, hour by hour. Free to read.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const free = itineraries.filter((i) => !i.gated).length;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tight text-foreground md:text-7xl">
        American in London,
        <span className="block text-primary">ticking off every country.</span>
      </h1>

      <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/90">
        <p>
          I travel a lot and I plan far too carefully. These are the itineraries
          I build for myself, posted the way I actually used them: real places,
          hour by hour, in the order I did them.
        </p>
        <p>
          Take them, use them, change them. Every bar, beach and trailhead is
          named and linked, so you can pull up the map and decide for yourself
          what to keep.
        </p>
        <p>
          Everything I write here is free to read in full. No sign-up, no email
          gate, no paywall. If one of them helps, buy me a coffee.
        </p>
        <p>
          Eventually I would like to grow this into a proper travel agency,
          planning real trips rather than only publishing the plans. For now,
          these pages are the starting point.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 rounded-2xl border border-border bg-card px-6 py-6 text-sm font-semibold text-muted-foreground">
        <span>
          <strong className="font-extrabold text-foreground">{free}</strong> free
          {free === 1 ? " itinerary" : " itineraries"}
        </span>
        <span>Every place linked</span>
        <span>More on the way</span>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          to="/"
          className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:scale-105"
        >
          Browse the itineraries
        </Link>
        <a
          href={BMC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Buy me a coffee
        </a>
      </div>
    </div>
  );
}
