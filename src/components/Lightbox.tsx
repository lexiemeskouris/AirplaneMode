import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

export type LightboxPhoto = { src: string; alt: string; caption?: string | undefined };

/**
 * Full-screen viewer for a set of photos. Tap or click to open; swipe on a
 * phone, arrows or the keyboard on a laptop. One gesture that works the same
 * everywhere, which hover-to-zoom never could on a touch screen.
 */
export function Lightbox({
  photos,
  index,
  onClose,
}: {
  photos: LightboxPhoto[];
  /** The photo to open on, or null when closed. */
  index: number | null;
  onClose: () => void;
}) {
  const open = index !== null;
  const [emblaRef, embla] = useEmblaCarousel({ startIndex: index ?? 0, loop: photos.length > 1 });
  const [current, setCurrent] = React.useState(index ?? 0);

  React.useEffect(() => {
    if (!embla) return;
    const sync = () => setCurrent(embla.selectedScrollSnap());
    sync();
    embla.on("select", sync);
    return () => {
      embla.off("select", sync);
    };
  }, [embla]);

  const prev = React.useCallback(() => embla?.scrollPrev(), [embla]);
  const next = React.useCallback(() => embla?.scrollNext(), [embla]);
  const many = photos.length > 1;
  const caption = photos[current]?.caption;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/90 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex flex-col outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
          }}
          aria-describedby={undefined}
        >
          <DialogPrimitive.Title className="sr-only">
            {photos[current]?.alt ?? "Photo"}
          </DialogPrimitive.Title>

          <div className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-white/80">
            <span>{many ? `${current + 1} / ${photos.length}` : ""}</span>
            <DialogPrimitive.Close className="rounded-full p-2 transition-colors hover:bg-white/10 hover:text-white">
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>

          {/* Mounted only while open, so Embla starts on the tapped photo. */}
          {open && (
            <div className="relative min-h-0 flex-1">
              <div ref={emblaRef} className="h-full overflow-hidden">
                <div className="flex h-full">
                  {photos.map((photo) => (
                    <div
                      key={photo.src}
                      className="flex h-full min-w-0 flex-[0_0_100%] items-center justify-center px-2 sm:px-16"
                      // A tap on the dark space around the photo closes it.
                      onClick={(e) => e.target === e.currentTarget && onClose()}
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="max-h-full max-w-full select-none object-contain"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {many && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:block"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Previous photo</span>
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:block"
                  >
                    <ArrowRight className="h-5 w-5" />
                    <span className="sr-only">Next photo</span>
                  </button>
                </>
              )}
            </div>
          )}

          <p className="min-h-12 px-6 py-4 text-center text-sm leading-snug text-white/80">
            {caption}
          </p>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

/** A single photo that opens full screen when tapped. */
export function ZoomableImage({
  caption,
  ...img
}: React.ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string; caption?: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="block w-full cursor-zoom-in">
        <img {...img} />
      </button>
      <Lightbox
        photos={[{ src: img.src, alt: img.alt, caption }]}
        index={open ? 0 : null}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
