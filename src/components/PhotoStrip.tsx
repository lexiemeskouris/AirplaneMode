import type { Photo } from "@/data/photos";

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
      <div
        className={`grid grid-cols-2 gap-4 ${
          compact ? "mt-4 sm:grid-cols-3" : "mt-6 sm:grid-cols-3 lg:grid-cols-4"
        }`}
      >
        {photos.map((photo) => (
          <figure
            key={photo.src}
            className={`flex flex-col overflow-hidden rounded-2xl border border-border bg-card ${
              photo.wide ? "col-span-2" : ""
            }`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className={`w-full object-cover ${
                photo.wide ? "aspect-[3/2]" : "aspect-[3/4]"
              }`}
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
