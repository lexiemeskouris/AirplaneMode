import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { itineraries } from "@/data/itineraries";
import { guides } from "@/data/guides";
import worldMap from "@/assets/world.svg";

export const Route = createFileRoute("/all")({
  head: () => ({
    meta: [
      { title: "Everywhere, A to Z - AirplaneMode" },
      {
        name: "description",
        content:
          "Every itinerary and every list of recommendations on AirplaneMode, in alphabetical order.",
      },
      { property: "og:title", content: "Everywhere, A to Z - AirplaneMode" },
      {
        property: "og:description",
        content:
          "Every itinerary and every list of recommendations on AirplaneMode, in alphabetical order.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AllPage,
});

type Row = {
  kind: "itinerary" | "recommendation";
  slug: string;
  destination: string;
  meta: string;
  coords: { lat: number; lon: number };
};

// The same equirectangular crop world.svg was generated with, so a pin lands on
// the coastline underneath it. Percentages, so it holds at any width.
const LAT_TOP = 85;
const LAT_BOTTOM = -60;

function pinPosition({ lat, lon }: { lat: number; lon: number }) {
  return {
    left: `${((lon + 180) / 360) * 100}%`,
    top: `${((LAT_TOP - lat) / (LAT_TOP - LAT_BOTTOM)) * 100}%`,
  };
}

const MIN_SCALE = 1;
const MAX_SCALE = 10;

type View = { scale: number; x: number; y: number };

const RESET: View = { scale: 1, x: 0, y: 0 };

/**
 * Keep the map covering its frame: at scale k the content is k times the frame,
 * so the offset can run from 0 down to size * (1 - k) and no further. Without
 * this you can drag the world off the edge and be left staring at the border.
 */
function clampView(view: View, width: number, height: number): View {
  const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, view.scale));
  if (scale === 1) return RESET;
  return {
    scale,
    x: Math.min(0, Math.max(width * (1 - scale), view.x)),
    y: Math.min(0, Math.max(height * (1 - scale), view.y)),
  };
}

/** Zoom around a point in frame coordinates, so what is under the cursor stays put. */
function zoomAt(view: View, nextScale: number, px: number, py: number): View {
  const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, nextScale));
  const ratio = scale / view.scale;
  return { scale, x: px - (px - view.x) * ratio, y: py - (py - view.y) * ratio };
}

function AllPage() {
  const rows: Row[] = [
    ...itineraries.map((it) => ({
      kind: "itinerary" as const,
      slug: it.slug,
      destination: it.destination,
      meta: `Itinerary · ${it.duration}`,
      coords: it.coords,
    })),
    ...guides.map((g) => {
      const spots = g.sections.reduce(
        (n, s) =>
          n +
          (s.places?.length ?? 0) +
          (s.activities?.reduce((m, a) => m + (a.places?.length ?? 0), 0) ?? 0),
        0,
      );
      const tips = g.sections.reduce((n, s) => n + (s.items?.length ?? 0), 0);
      return {
        kind: "recommendation" as const,
        slug: g.slug,
        destination: g.destination,
        // Match the tile's own label, so a day trip does not describe itself as
        // "Recommendations" here and "DAY TRIP" on the feed.
        meta: `${
          g.label ? g.label[0] + g.label.slice(1).toLowerCase() : "Recommendations"
        } · ${spots >= tips ? `${spots} spots` : `${tips} tips`}`,
        coords: g.coords,
      };
    }),
    // localeCompare so Reykjavík and San Sebastián sort by their base letters
    // rather than being thrown to the end by their accents.
  ].sort((a, b) =>
    a.destination.localeCompare(b.destination, "en", { sensitivity: "base" }),
  );

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl">
        Everywhere,
        <span className="text-primary"> A to Z.</span>
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
        Every itinerary and every list, in one place. {rows.length} in total.
      </p>

      {/* CSS columns rather than a grid: an alphabetical index should read
          down the first column and continue in the second, the way an index
          does, not left-to-right across each row. */}
      {/* The map is the visual index; the list below is the same thing in
          alphabetical order. Everything on it is also reachable from the list,
          so nothing here is the only route to a page. */}
      <WorldMap rows={rows} />

      <ul className="mt-12 gap-x-8 sm:columns-2">
        {rows.map((row) => (
          <li
            key={`${row.kind}-${row.slug}`}
            className="break-inside-avoid border-b border-border"
          >
            {row.kind === "itinerary" ? (
              <Link
                to="/itineraries/$slug"
                params={{ slug: row.slug }}
                className="group flex items-baseline justify-between gap-4 py-3 transition-colors"
              >
                <span className="font-display text-lg font-extrabold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {row.destination}
                </span>
                <span className="shrink-0 text-xs font-semibold text-muted-foreground">
                  {row.meta}
                </span>
              </Link>
            ) : (
              <Link
                to="/recommendations/$slug"
                params={{ slug: row.slug }}
                className="group flex items-baseline justify-between gap-4 py-3 transition-colors"
              >
                <span className="font-display text-lg font-extrabold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {row.destination}
                </span>
                <span className="shrink-0 text-xs font-semibold text-muted-foreground">
                  {row.meta}
                </span>
              </Link>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <Link
          to="/"
          className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:scale-105"
        >
          Back to the feed
        </Link>
      </div>
    </div>
  );
}

function WorldMap({ rows }: { rows: Row[] }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>(RESET);
  // Pointers currently down on the map, so one finger pans and two pinch.
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const panStart = useRef<{ x: number; y: number; view: View } | null>(null);
  const pinchStart = useRef<{ distance: number; scale: number } | null>(null);
  // A drag that ends on top of a pin should move the map, not open the page.
  const dragged = useRef(false);

  const frameSize = () => {
    const rect = frameRef.current?.getBoundingClientRect();
    return { width: rect?.width ?? 0, height: rect?.height ?? 0 };
  };

  const apply = useCallback((next: View) => {
    const { width, height } = frameSize();
    setView(clampView(next, width, height));
  }, []);

  /** Zoom by a step from the centre of the frame, for the buttons. */
  const step = (factor: number) => {
    const { width, height } = frameSize();
    setView((current) =>
      clampView(zoomAt(current, current.scale * factor, width / 2, height / 2), width, height),
    );
  };

  // A native listener, because React's onWheel is passive and cannot
  // preventDefault. Only ctrl/meta wheel zooms, which is what a trackpad pinch
  // sends, so an ordinary two-finger scroll still scrolls the page past the map.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      const rect = frame.getBoundingClientRect();
      setView((current) =>
        clampView(
          zoomAt(
            current,
            current.scale * Math.exp(-event.deltaY / 180),
            event.clientX - rect.left,
            event.clientY - rect.top,
          ),
          rect.width,
          rect.height,
        ),
      );
    };
    frame.addEventListener("wheel", onWheel, { passive: false });
    return () => frame.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    // The zoom controls sit inside the frame. Pressing one is a button press,
    // not the start of a pan, so leave the event alone.
    if ((event.target as Element).closest("button")) return;
    (event.target as Element).setPointerCapture?.(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    dragged.current = false;
    if (pointers.current.size === 1) {
      panStart.current = { x: event.clientX, y: event.clientY, view };
      pinchStart.current = null;
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinchStart.current = { distance: Math.hypot(a!.x - b!.x, a!.y - b!.y), scale: view.scale };
      panStart.current = null;
    }
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.current.size >= 2 && pinchStart.current) {
      const [a, b] = [...pointers.current.values()];
      const distance = Math.hypot(a!.x - b!.x, a!.y - b!.y);
      const rect = frameRef.current?.getBoundingClientRect();
      if (!rect || pinchStart.current.distance === 0) return;
      dragged.current = true;
      const midX = (a!.x + b!.x) / 2 - rect.left;
      const midY = (a!.y + b!.y) / 2 - rect.top;
      const scale = pinchStart.current.scale * (distance / pinchStart.current.distance);
      setView((current) => clampView(zoomAt(current, scale, midX, midY), rect.width, rect.height));
      return;
    }

    const start = panStart.current;
    if (!start || view.scale === 1) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) dragged.current = true;
    apply({ scale: start.view.scale, x: start.view.x + dx, y: start.view.y + dy });
  };

  const endPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(event.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    if (pointers.current.size === 0) panStart.current = null;
  };

  const zoomed = view.scale > 1;

  return (
    <>
      <div
        ref={frameRef}
        className="relative mt-10 overflow-hidden rounded-3xl border border-border bg-secondary/40"
        // At rest the page scrolls normally through the map. Once it is zoomed
        // the map takes the gesture, because by then you want to pan it.
        style={{ touchAction: zoomed ? "none" : "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onDoubleClick={(event) => {
          // A pin is a link and has already navigated on the first click, so
          // only open map counts as a zoom gesture.
          if ((event.target as Element).closest("a")) return;
          const rect = frameRef.current?.getBoundingClientRect();
          if (!rect) return;
          setView((current) =>
            clampView(
              zoomAt(current, current.scale * 2, event.clientX - rect.left, event.clientY - rect.top),
              rect.width,
              rect.height,
            ),
          );
        }}
        // Capture, so a pin never opens its page at the end of a drag.
        onClickCapture={(event) => {
          if (!dragged.current) return;
          event.preventDefault();
          event.stopPropagation();
          dragged.current = false;
        }}
      >
        <div
          className={zoomed ? "cursor-grab active:cursor-grabbing" : ""}
          style={{
            transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
            transformOrigin: "0 0",
          }}
        >
          <img
            src={worldMap}
            alt=""
            aria-hidden
            className="block w-full select-none"
            draggable={false}
            width={360}
            height={145}
          />
          <div className="absolute inset-0">
            {rows.map((row) => {
              const pos = pinPosition(row.coords);
              // Counter-scale the dot so it stays the same size on screen while
              // the distance between two dots grows. That separation is the
              // whole point of zooming in.
              const dotStyle = {
                ...pos,
                transform: `translate(-50%, -50%) scale(${1 / view.scale})`,
              };
              const dot = (
                <>
                  <span className="absolute inset-0 rounded-full bg-primary/30 transition-transform duration-300 group-hover:scale-[2.2]" />
                  <span className="absolute inset-[3px] rounded-full bg-primary ring-2 ring-background" />
                  <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[0.7rem] font-bold text-background opacity-0 transition-opacity group-hover:opacity-100">
                    {row.destination}
                  </span>
                </>
              );
              const className = "group absolute z-10 h-3.5 w-3.5 sm:h-4 sm:w-4";
              return row.kind === "itinerary" ? (
                <Link
                  key={`pin-${row.slug}`}
                  to="/itineraries/$slug"
                  params={{ slug: row.slug }}
                  style={dotStyle}
                  className={className}
                  aria-label={row.destination}
                  draggable={false}
                >
                  {dot}
                </Link>
              ) : (
                <Link
                  key={`pin-${row.slug}`}
                  to="/recommendations/$slug"
                  params={{ slug: row.slug }}
                  style={dotStyle}
                  className={className}
                  aria-label={row.destination}
                  draggable={false}
                >
                  {dot}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="absolute right-3 top-3 z-30 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => step(1.6)}
            disabled={view.scale >= MAX_SCALE}
            aria-label="Zoom in"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-lg font-bold leading-none text-foreground shadow-sm transition-colors hover:bg-secondary disabled:opacity-40"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => step(1 / 1.6)}
            disabled={!zoomed}
            aria-label="Zoom out"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-lg font-bold leading-none text-foreground shadow-sm transition-colors hover:bg-secondary disabled:opacity-40"
          >
            &minus;
          </button>
          {zoomed && (
            <button
              type="button"
              onClick={() => setView(RESET)}
              aria-label="Reset the map"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-[0.6rem] font-bold uppercase tracking-wide text-foreground shadow-sm transition-colors hover:bg-secondary"
            >
              All
            </button>
          )}
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Dots sitting on top of each other? Zoom in with the buttons or a trackpad pinch,
        then drag the map around.
      </p>
    </>
  );
}
