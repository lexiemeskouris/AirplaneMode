import { createFileRoute, Link } from "@tanstack/react-router";
import { itineraries, BMC_URL } from "@/data/itineraries";
import lexie from "@/assets/lexie.jpg";
import { ZoomableImage } from "@/components/Lightbox";

const TIKTOK_URL = "https://www.tiktok.com/@lexiemesko";

/** Countries visited. Counted by me, not derivable from the pages here. */
const COUNTRIES = 50;

const DESCRIPTION =
  "An ex-consultant turned MBA candidate in London, 50 countries in and aiming for all of them. Most of the itineraries are free to read.";

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
  const free = itineraries.filter((i) => !i.gated && !i.comingSoon).length;

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
            Hi, and welcome to my site! I’m Lexie, an ex-consultant turned MBA
            candidate, and I’ve been living in London for almost two years. I
            have always loved to travel, and since I started working, I have
            spent every PTO day out of town.
          </p>
          <p>
            In 2020, I studied abroad in London and fell in love with the city,
            but two months in, COVID hit and I was sent home. The itch to live
            abroad and travel every weekend never went away, so I came back and
            started my degree here instead.
          </p>
          <p>
            I just hit {COUNTRIES} countries and have quite a few more in the
            works. My ultimate goal is to travel to every country in the world
            and share my experiences with others who love travel as much as I
            do.
          </p>
          <p>
            I built every itinerary on my site for my own travel. I like to keep
            my days jam-packed with activities, food, sightseeing and so on, so
            feel free to slice and dice them however you please. I’m also more
            than happy to connect and offer tailored support as you plan your
            own travels (or to drive the bus and plan for you, taking into
            account who you’re traveling with, when you’re going, and what you
            like to do most).
          </p>
          <p>
            If you like an itinerary, please consider supporting me through the
            button in the top-right corner, so I can keep offering these for
            free.
          </p>
          <p>
            The plans are here; the rest is on TikTok,{" "}
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
            >
              @lexiemesko
            </a>
            .
          </p>
        </div>

        <figure className="order-first md:order-last md:sticky md:top-28">
          <ZoomableImage
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
