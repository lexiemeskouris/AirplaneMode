import type { Deal } from "@/data/deals";

/**
 * A partner tour, starred and sitting inside the plan on the step it belongs
 * to, with one line on what booking through the link gets you.
 */
export function DealLine({ deal }: { deal: Deal }) {
  const blurb = [deal.discount ?? "Booking through this link supports the site at no extra cost to you", deal.mention]
    .filter(Boolean)
    .map((s) => s!.replace(/\.$/, ""))
    .join(". ");
  return (
    <div className="mt-1.5 text-sm leading-snug">
      <span aria-hidden className="mr-1 text-accent">
        &#9733;
      </span>
      <a
        href={deal.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="font-bold text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
      >
        Book it through me: {deal.operator}, {deal.tour}
      </a>
      <span className="block pl-4 text-muted-foreground">{blurb}</span>
    </div>
  );
}

/** Deals with no matching step, listed like any other recommendation. */
export function DealList({ deals }: { deals: Deal[] }) {
  if (deals.length === 0) return null;
  return (
    <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
      {deals.map((d) => (
        <li key={d.url}>
          <DealLine deal={d} />
        </li>
      ))}
    </ul>
  );
}
