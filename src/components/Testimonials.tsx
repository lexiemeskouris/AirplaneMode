import { Link } from "@tanstack/react-router";
import type { Testimonial } from "@/data/site";
import { getItinerary } from "@/data/itineraries";

export function TestimonialCard({ t }: { t: Testimonial }) {
  const trip = t.itinerary ? getItinerary(t.itinerary) : undefined;
  return (
    <figure className="rounded-2xl border border-border bg-card p-6">
      <blockquote className="space-y-4 text-lg leading-relaxed text-foreground/90">
        {t.quote.split("\n\n").map((p, i, all) => (
          <p key={i}>
            {i === 0 && "“"}
            {p}
            {i === all.length - 1 && "”"}
          </p>
        ))}
      </blockquote>
      <figcaption className="mt-4 text-sm font-bold text-foreground">
        {t.name}
        {t.location && <span className="font-normal text-muted-foreground">, {t.location}</span>}
        {trip && (
          <Link
            to="/itineraries/$slug"
            params={{ slug: trip.slug }}
            className="ml-3 font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
          >
            {trip.destination} trip
          </Link>
        )}
      </figcaption>
    </figure>
  );
}
