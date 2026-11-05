import { useEffect, useRef } from "react";
import { bullet } from "@/lib/places";
import "leaflet/dist/leaflet.css";
import { spotHref, type SavedSpot, type SpotKind } from "@/data/savedSpots";

export const KINDS: Record<SpotKind, { emoji: string; label: string }> = {
  food: { emoji: "🍽️", label: "Food" },
  coffee: { emoji: "☕", label: "Coffee" },
  sweet: { emoji: "🍰", label: "Sweet things" },
  drink: { emoji: "🍸", label: "Drinks" },
  sight: { emoji: "📍", label: "Things to see" },
  shop: { emoji: "🛍️", label: "Shops" },
  photo: { emoji: "📸", label: "Photo booths" },
  wellness: { emoji: "💆", label: "Massage" },
};

const ORDER: SpotKind[] = ["food", "coffee", "sweet", "drink", "sight", "shop", "photo", "wellness"];

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

/**
 * Pins from my Google Maps saved lists that are not already in the page above.
 * Leaflet touches `window` on import, so it is loaded only in the browser.
 */
export function SpotsMap({ spots, onGuide = false }: { spots: SavedSpot[]; onGuide?: boolean }) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!el.current || spots.length === 0) return;
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    import("leaflet").then((mod) => {
      const L = mod.default ?? mod;
      if (cancelled || !el.current) return;
      map = L.map(el.current, { scrollWheelZoom: false });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const bounds = L.latLngBounds([]);
      for (const s of spots) {
        const icon = L.divIcon({
          className: "spot-pin",
          html: `<span>${KINDS[s.kind].emoji}</span>`,
          iconSize: [34, 34],
          iconAnchor: [17, 17],
          popupAnchor: [0, -14],
        });
        const popup =
          `<a href="${spotHref(s)}" target="_blank" rel="noopener noreferrer" class="spot-popup-link">${escapeHtml(s.name)}</a>` +
          (s.note ? `<div class="spot-popup-note">${escapeHtml(bullet(s.note))}</div>` : "") +
          (s.tried ? "" : `<div class="spot-popup-note">Still on my list</div>`) +
          `<a href="${spotHref(s)}" target="_blank" rel="noopener noreferrer" class="spot-popup-open">Open in Google Maps &rarr;</a>`;
        L.marker([s.lat, s.lon], { icon, title: s.name }).bindPopup(popup).addTo(map);
        bounds.extend([s.lat, s.lon]);
      }
      if (spots.length === 1) map.setView(bounds.getCenter(), 15);
      else map.fitBounds(bounds, { padding: [30, 30], maxZoom: 15 });
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [spots]);

  if (spots.length === 0) return null;
  const kinds = ORDER.filter((k) => spots.some((s) => s.kind === k));

  return (
    <section className="mt-10">
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
        More from my map
      </h2>
      <p className="mt-1.5 leading-relaxed text-foreground/90">
        Places I've saved that aren't {onGuide ? "on this page" : "in the plan above"}. Tap a pin to open it in Google Maps.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {kinds.map((k) => (
          <span
            key={k}
            className="rounded-xl bg-secondary px-3 py-1.5 text-xs font-bold text-foreground"
          >
            <span className="emoji">{KINDS[k].emoji}</span> {KINDS[k].label}
          </span>
        ))}
      </div>
      <div
        ref={el}
        className="relative z-0 mt-4 h-[360px] w-full overflow-hidden rounded-2xl border border-border bg-secondary"
        aria-label="Map of saved places"
      />
      <details className="mt-4 rounded-2xl border border-border bg-card px-5 py-4">
        <summary className="cursor-pointer font-bold text-foreground">
          All {spots.length} as a list
        </summary>
        <div className="mt-4 space-y-5">
          {kinds.map((k) => (
            <div key={k}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-accent">
                <span className="emoji">{KINDS[k].emoji}</span> {KINDS[k].label}
              </h3>
              <ul className="mt-2 grid gap-x-4 gap-y-1.5 sm:grid-cols-2">
                {spots
                  .filter((s) => s.kind === k)
                  .map((s) => (
                    <li key={s.cid} className="leading-snug">
                      <a
                        href={spotHref(s)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
                      >
                        {s.name}
                      </a>
                      {(s.note || !s.tried) && (
                        <span className="block text-sm text-muted-foreground">
                          {[s.note && bullet(s.note), s.tried ? "" : "Still on my list"].filter(Boolean).join(". ")}
                        </span>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </details>
    </section>
  );
}
