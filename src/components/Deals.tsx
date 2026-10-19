import { Link } from "@tanstack/react-router";
import type { Deal } from "@/data/deals";

/** The partner tours for one trip, shown on its itinerary or guide page. */
export function DealsBlock({ deals }: { deals: Deal[] }) {
  if (deals.length === 0) return null;
  return (
    <section className="mt-10 rounded-2xl border border-brand-pink bg-brand-pink/15 px-6 py-6">
      <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
        Book it through me
      </h2>
      <p className="mt-2 leading-relaxed text-foreground/90">
        {deals.length === 1 ? "This link supports" : "These links support"} the
        site at no extra cost to you.{" "}
        <Link to="/deals" className="font-bold text-accent underline underline-offset-4">
          Every tour deal
        </Link>
      </p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {deals.map((d) => (
          <li key={d.url} className="rounded-2xl border border-border bg-card px-5 py-4 leading-snug">
            <a
              href={d.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="font-bold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
            >
              {d.operator}: {d.tour}
            </a>
            {d.discount && (
              <span className="mt-1 block text-sm font-bold text-accent">{d.discount}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
