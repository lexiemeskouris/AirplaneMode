import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { itineraries } from "@/data/itineraries";

/** Remembered per browser, so the wheel greets you once rather than every visit. */
const SEEN_KEY = "airplanemode.wheel.seen";

/** Eight is the most a wheel can hold and still be readable at phone size. */
const SEGMENTS = 8;

const SPIN_MS = 4200;
const TURNS = 5;

// The four reference bands, as hex, because SVG fills do not take Tailwind
// classes. Two of each so no two neighbouring segments share a colour.
const SEGMENT_COLOURS = ["#E1552B", "#3B356E", "#E489AF", "#E5B441"];
const LIGHT_TEXT = "#FDF9F5";
const DARK_TEXT = "#3A2A22";
/** Red and indigo are dark enough to need light type on them. */
const NEEDS_LIGHT_TEXT = [true, true, false, false];

type Pick = { slug: string; destination: string };

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function sample(list: Pick[], count: number): Pick[] {
  const pool = [...list];
  const out: Pick[] = [];
  while (out.length < count && pool.length > 0) {
    out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]!);
  }
  return out;
}

/** One pie slice, starting at twelve o'clock and running clockwise. */
function segmentPath(index: number, total: number) {
  const cx = 100;
  const cy = 100;
  const r = 96;
  const a0 = (index / total) * 2 * Math.PI - Math.PI / 2;
  const a1 = ((index + 1) / total) * 2 * Math.PI - Math.PI / 2;
  const x0 = cx + r * Math.cos(a0);
  const y0 = cy + r * Math.sin(a0);
  const x1 = cx + r * Math.cos(a1);
  const y1 = cy + r * Math.sin(a1);
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M ${cx} ${cy} L ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
}

export function SpinWheel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pool = useMemo<Pick[]>(
    () =>
      itineraries
        .filter((it) => !it.gated)
        .map((it) => ({ slug: it.slug, destination: it.destination })),
    [],
  );

  const [picks, setPicks] = useState<Pick[]>([]);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Pick | null>(null);
  const timer = useRef<number | null>(null);
  const panel = useRef<HTMLDivElement>(null);

  // A fresh set of destinations each time it opens, so the wheel is not the
  // same eight places for the rest of your life.
  useEffect(() => {
    if (!open) return;
    const next = sample(pool, Math.min(SEGMENTS, pool.length));
    setPicks(next);
    setResult(null);
    // Half a slice, so the pointer rests on a destination rather than on the
    // seam between two of them.
    setRotation(next.length > 0 ? 360 / (2 * next.length) : 0);
    setSpinning(false);
    panel.current?.focus();
  }, [open, pool]);

  // Esc closes, and the page behind should not scroll while it is up.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const spin = useCallback(() => {
    if (spinning || picks.length === 0) return;
    setResult(null);
    setSpinning(true);

    const index = Math.floor(Math.random() * picks.length);
    const segment = 360 / picks.length;
    // Bring the middle of the winning segment up under the pointer.
    const target = (360 - (index + 0.5) * segment) % 360;
    const current = ((rotation % 360) + 360) % 360;
    const delta = ((target - current + 360) % 360) + TURNS * 360;

    const instant = prefersReducedMotion();
    setRotation((r) => r + delta);
    timer.current = window.setTimeout(
      () => {
        setResult(picks[index]!);
        setSpinning(false);
      },
      instant ? 0 : SPIN_MS,
    );
  }, [picks, rotation, spinning]);

  if (!open) return null;

  const segment = picks.length > 0 ? 360 / picks.length : 45;
  const reduced = prefersReducedMotion();

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-foreground/60 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Spin the wheel for an itinerary"
        tabIndex={-1}
        className="relative my-auto w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card shadow-2xl outline-none"
      >
        {/* The header's four bands, so the pop-up belongs to the site. */}
        <div aria-hidden className="flex h-1.5 w-full">
          <div className="flex-1 bg-brand-red" />
          <div className="flex-1 bg-brand-indigo" />
          <div className="flex-1 bg-brand-pink" />
          <div className="flex-1 bg-brand-yellow" />
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full text-xl font-bold leading-none text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          &times;
        </button>

        <div className="px-6 pb-6 pt-7 text-center sm:px-8">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Spin the wheel.
          </h2>
          <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Every itinerary here is free, so there is nothing to win except a
            decision. Let the wheel make it.
          </p>

          <div className="relative mx-auto mt-6 w-56 sm:w-64">
            {/* Pointer, sitting on the rim at twelve o'clock. */}
            <div
              aria-hidden
              className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1"
              style={{
                width: 0,
                height: 0,
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderTop: "18px solid var(--foreground)",
              }}
            />
            <svg
              viewBox="0 0 200 200"
              className="w-full drop-shadow-lg"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: reduced
                  ? "none"
                  : `transform ${SPIN_MS}ms cubic-bezier(0.16, 0.84, 0.24, 1)`,
              }}
            >
              {picks.map((pick, i) => {
                const colour = SEGMENT_COLOURS[i % SEGMENT_COLOURS.length]!;
                const light = NEEDS_LIGHT_TEXT[i % SEGMENT_COLOURS.length]!;
                // Read outwards along the slice, flipped on the left half so
                // no label ends up upside down.
                const bisector = (i + 0.5) * segment - 90;
                const flipped = bisector > 90 && bisector < 270;
                const name = pick.destination;
                const size = name.length > 13 ? 8 : name.length > 10 ? 9 : 10;
                return (
                  <g key={pick.slug}>
                    <path d={segmentPath(i, picks.length)} fill={colour} />
                    <text
                      transform={`rotate(${bisector + (flipped ? 180 : 0)} 100 100)`}
                      x={flipped ? 100 - 58 : 100 + 58}
                      y={100}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={size}
                      fontWeight="700"
                      fill={light ? LIGHT_TEXT : DARK_TEXT}
                    >
                      {name}
                    </text>
                  </g>
                );
              })}
              <circle cx="100" cy="100" r="96" fill="none" stroke="#FDF9F5" strokeWidth="3" />
              <circle cx="100" cy="100" r="14" fill="#FDF9F5" />
            </svg>
          </div>

          <div className="mt-6 min-h-[104px]">
            {result ? (
              <div>
                <p className="text-sm font-semibold text-muted-foreground">
                  The wheel says
                </p>
                <p className="font-display text-2xl font-extrabold tracking-tight text-primary">
                  {result.destination}
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    to="/itineraries/$slug"
                    params={{ slug: result.slug }}
                    onClick={onClose}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
                  >
                    Open the {result.destination} itinerary
                  </Link>
                  <button
                    type="button"
                    onClick={spin}
                    className="text-sm font-bold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
                  >
                    Spin again
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={spin}
                disabled={spinning}
                className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-3.5 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-60"
              >
                {spinning ? "Spinning" : "Spin"}
              </button>
            )}
          </div>
        </div>

        <div className="border-t border-border bg-secondary/40 px-6 py-4 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
          >
            Skip to itineraries
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Opens the wheel on a visitor's first arrival and remembers that it did.
 * There is deliberately no second way in: it greets you when the site opens
 * and then leaves you alone.
 */
export function useSpinWheel() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(SEEN_KEY);
    } catch {
      // Private browsing, or storage blocked. Show it and move on.
    }
    if (stored) return;
    // A beat, so the feed paints behind it rather than the pop-up arriving
    // on a blank page.
    const t = window.setTimeout(() => setOpen(true), 700);
    return () => window.clearTimeout(t);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    try {
      window.localStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Nothing to do: it will simply greet them again next time.
    }
  }, []);

  return { open, close };
}
