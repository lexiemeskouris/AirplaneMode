import type { Photo } from "@/data/photos";

/**
 * The camera roll for a page. CSS columns rather than a grid, so portrait and
 * landscape shots sit together without being cropped square or leaving gaps.
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
  if (photos.length === 0) return null;

  return (
    <section className={compact ? "mt-4" : "mt-16"}>
      <h2
        className={
          compact
            ? "text-sm font-bold uppercase tracking-wide text-muted-foreground"
            : "font-display text-3xl font-extrabold tracking-tight text-foreground"
        }
      >
        {title}
      </h2>
      <div className={`gap-4 sm:columns-2 ${compact ? "mt-4" : "mt-6 lg:columns-3"}`}>
        {photos.map((photo) => (
          <figure
            key={photo.src}
            className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="block w-full"
            />
            {photo.caption && (
              <figcaption className="px-4 py-3 text-sm leading-snug text-muted-foreground">
                {photo.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
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
