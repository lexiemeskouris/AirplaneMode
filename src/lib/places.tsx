import type { ReactNode } from "react";
import { mapsSearch } from "@/data/itineraries";
import type { Activity, Place } from "@/data/itineraries";

export const placeLinkClass =
  "font-bold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent";

export function placeHref(place: Place, destination: string) {
  return place.url ?? mapsSearch(place.name, place.near ?? destination);
}

/**
 * Links places inside the sentence that names them, rather than listing them
 * underneath it. "Land at Bilbao Airport." links the words "Bilbao Airport"
 * in place.
 *
 * Places whose name is not written into the description are returned in
 * `trailing` and listed below instead, which is what a pintxos crawl needs:
 * "Pintxos hopping, in this order." names none of its five bars.
 */
export function linkifyDescription(
  description: string,
  places: Place[] | undefined,
  destination: string,
) {
  const trailing: Place[] = [];
  if (!places || places.length === 0) {
    return { nodes: [description] as ReactNode[], trailing };
  }

  // Longest name first so "Din Tai Fung Taipei 101" wins over "Din Tai Fung".
  const byLength = [...places].sort((a, b) => b.name.length - a.name.length);
  const matches: { start: number; end: number; place: Place }[] = [];

  for (const place of byLength) {
    // Take the first occurrence that does not overlap an earlier match.
    let start = -1;
    for (let from = 0; from <= description.length; ) {
      const at = description.indexOf(place.name, from);
      if (at === -1) break;
      const stop = at + place.name.length;
      if (!matches.some((m) => at < m.end && m.start < stop)) {
        start = at;
        break;
      }
      from = at + 1;
    }
    if (start === -1) trailing.push(place);
    else matches.push({ start, end: start + place.name.length, place });
  }

  matches.sort((a, b) => a.start - b.start);

  const nodes: ReactNode[] = [];
  let cursor = 0;
  for (const { start, end, place } of matches) {
    if (start > cursor) nodes.push(description.slice(cursor, start));
    nodes.push(
      <a
        key={`${place.name}-${start}`}
        href={placeHref(place, destination)}
        target="_blank"
        rel="noopener noreferrer"
        className={placeLinkClass}
      >
        {place.name}
      </a>,
    );
    cursor = end;
  }
  if (cursor < description.length) nodes.push(description.slice(cursor));

  // Keep the author's order for anything left over.
  const order = new Map(places.map((pl, i) => [pl.name, i]));
  trailing.sort((a, b) => (order.get(a.name) ?? 0) - (order.get(b.name) ?? 0));

  return { nodes, trailing };
}

/**
 * A timed route. Used for an itinerary's days and, on a city page, for the
 * standalone day routes that are not part of any single trip.
 */
export function ActivityList({
  activities,
  destination,
  idPrefix,
}: {
  activities: Activity[];
  destination: string;
  idPrefix: string;
}) {
  return (
    <ol className="divide-y divide-border">
      {activities.map((a, i) => {
        const { nodes, trailing } = linkifyDescription(a.description, a.places, destination);
        return (
          <li key={`${idPrefix}-${i}`} className="flex gap-4 px-6 py-4">
            {/* Untimed steps keep the time column's width so every
                description still lines up, and take a dash. */}
            <span className="w-16 shrink-0 pt-0.5 font-mono text-sm font-bold text-primary">
              {a.time ?? <span className="text-muted-foreground/50">-</span>}
            </span>
            <div className="min-w-0">
              <span className="leading-relaxed text-foreground/90">{nodes}</span>
              {/* Only places the sentence does not already name. */}
              {trailing.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {trailing.map((place) => (
                    <li key={place.name} className="leading-snug">
                      <a
                        href={placeHref(place, destination)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={placeLinkClass}
                      >
                        {place.name}
                      </a>
                      {place.note && (
                        <span className="text-sm text-muted-foreground"> {place.note}</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
