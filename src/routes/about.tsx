import { createFileRoute, Link } from "@tanstack/react-router";
import { itineraries, BMC_URL } from "@/data/itineraries";
import lexie from "@/assets/lexie.jpg";

const TIKTOK_URL = "https://www.tiktok.com/@lexiemesko";

/** Countries visited. Counted by me, not derivable from the pages here. */
const COUNTRIES = 47;

const DESCRIPTION =
  "An American in London doing an MBA at London Business School, 47 countries in and aiming for all of them. The itineraries are free to read.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About - AirplaneMode" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "About - AirplaneMode" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const free = itineraries.filter((i) => !i.gated).length;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tight text-foreground md:text-7xl">
        American in London,
        <span className="block text-primary">ticking off every country.</span>
      </h1>

      {/* Photo first on a phone, alongside the story on a wide screen. */}
      <div className="mt-10 grid gap-10 md:grid-cols-[1.35fr_1fr] md:items-start">
        <div className="order-last space-y-5 text-lg leading-relaxed text-foreground/90 md:order-first">
          <p>
            I am an American living in London, here for my MBA at London
            Business School. I have always loved to travel, and since I started
            working I have spent pretty much every day off going somewhere.
          </p>
          <p>
            It started properly in 2020. I studied abroad in London, fell in
            love with the city, and two months in COVID hit and I was sent home.
            I never got to finish it, and the itch never went away, so I came
            back and did my degree here instead.
          </p>
          <p>
            That puts me at {COUNTRIES} countries, with a few more trips already
            booked. The goal is every country in the world. Business school has
            given me a schedule flexible enough to actually go after it.
          </p>
          <p>
            The itineraries here are the ones I build for myself, posted the way
            I used them. Real places, hour by hour, in the order I did them.
            Take them and change them. Every bar, beach and trailhead is named
            and linked, so you can pull the map up and decide for yourself what
            is worth keeping.
          </p>
          <p>
            All of it is free to read in full. There is no paywall, nothing to
            sign up to, and I will never ask for your email. If one of them
            helps, buy me a coffee.
          </p>
          <p>
            Eventually I want this to be a proper travel agency, planning real
            trips instead of only publishing the plans. This site is where that
            starts.
          </p>
          <p>
            The rest of it is on TikTok,{" "}
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
            >
              @lexiemesko
            </a>
            . The plans are here.
          </p>
        </div>

        <figure className="order-first md:order-last md:sticky md:top-28">
          <img
            src={lexie}
            alt="Lexie, in a yellow dress and a straw hat, on a porch in the hills"
            width={768}
            height={1024}
            className="w-full rounded-3xl border border-border object-cover shadow-lg"
          />
        </figure>
      </div>

      <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 rounded-2xl border border-border bg-card px-6 py-6 text-sm font-semibold text-muted-foreground">
        <span>
          <strong className="font-extrabold text-foreground">{COUNTRIES}</strong>{" "}
          countries and counting
        </span>
        <span>
          <strong className="font-extrabold text-foreground">{free}</strong> free
          {free === 1 ? " itinerary" : " itineraries"}
        </span>
        <span>Every place linked</span>
        <span>Goal: all of them</span>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          to="/"
          className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:scale-105"
        >
          Browse the itineraries
        </Link>
        <a
          href={TIKTOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-accent px-6 py-3 text-sm font-bold text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Follow on TikTok
        </a>
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
