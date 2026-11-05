import { useState } from "react";
import type { Photo } from "@/data/photos";
import { Lightbox } from "@/components/Lightbox";
import { bullet } from "@/lib/places";

/**
 * The camera roll for a page. A grid rather than CSS columns: columns read top
 * to bottom, which quietly reorders the shots, and these are in the order they
 * happened. Uniform 3:4 tiles, which is what a phone shoots anyway.
 */
export function PhotoStrip({
  photos,
  title = "From the camera roll",
  /** Inside a section card, where a full-size heading would shout. */
  compact = false,
}: {
  photos: Photo[];
  title?: string;
  compact?: boolean;
}) {
  const [opened, setOpened] = useState<number | null>(null);
  if (photos.length === 0) return null;

  return (
    <section className={compact ? "mt-4" : "mt-10"}>
      <h2
        className={
          compact
            ? "text-sm font-bold uppercase tracking-wide text-muted-foreground"
            : "font-display text-2xl font-extrabold tracking-tight text-foreground"
        }
      >
        {title}
      </h2>
      <div
        className={`grid grid-cols-2 gap-3 ${
          compact ? "mt-3 sm:grid-cols-3" : "mt-3 sm:grid-cols-4 lg:grid-cols-5"
        }`}
      >
        {photos.map((photo, i) => (
          <figure
            key={photo.src}
            className={`flex flex-col overflow-hidden rounded-2xl border border-border bg-card ${
              photo.wide ? "col-span-2" : ""
            }`}
          >
            <button type="button" onClick={() => setOpened(i)} className="cursor-zoom-in">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className={`w-full object-cover ${photo.wide ? "aspect-[8/5]" : "aspect-[4/5]"}`}
              />
            </button>
            {photo.caption && (
              <figcaption className="px-3 py-2 text-xs leading-snug text-muted-foreground">
                {bullet(photo.caption)}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
      <Lightbox photos={photos} index={opened} onClose={() => setOpened(null)} />
    </section>
  );
}

/**
 * A link out to the TikTok for this trip. A link rather than an embed: the
 * embed script is heavy, and it breaks whenever TikTok changes it.
 */
export function TikTokLink({ url, label }: { url: string; label?: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background transition-transform hover:scale-105 active:scale-95"
    >
      {label ?? "Watch it on TikTok"}
      <span aria-hidden>&rarr;</span>
    </a>
  );
}
