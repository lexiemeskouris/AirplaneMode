import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BackToTop, JumpLink } from "@/components/JumpLink";
import { findTarget, guideTargets, placeId, sectionId } from "@/lib/anchors";
import { RoastTable } from "@/components/RoastTable";
import { PhotoStrip, TikTokLinks } from "@/components/PhotoStrip";
import { photosFor } from "@/data/photos";
import { BMC_URL, placeName } from "@/data/itineraries";
import { ActivityList, placeHref, placeLinkClass, bullet } from "@/lib/places";
import { getGuide, guides } from "@/data/guides";
import { DealList } from "@/components/Deals";
import { SpotsMap } from "@/components/SpotsMap";
import { spotsFor } from "@/data/savedSpots";
import { dealsFor, placeDeals } from "@/data/deals";
import { ZoomableImage } from "@/components/Lightbox";

export const Route = createFileRoute("/recommendations/$slug")({
  loader: ({ params }) => {
    const guide = getGuide(params.slug);
    if (!guide) throw notFound();
    return { guide };
  },
  head: ({ loaderData }) => {
    const g = loaderData?.guide;
    if (!g) {
      return {
        meta: [
          { title: "Recommendations - AirplaneMode" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    return {
      meta: [
        { title: `${g.title} - AirplaneMode` },
        { name: "description", content: g.summary },
        { property: "og:title", content: `${g.title} - AirplaneMode` },
        { property: "og:description", content: g.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(g.cover
          ? [
              { property: "og:image", content: g.cover },
              { name: "twitter:image", content: g.cover },
            ]
          : []),
      ],
    };
  },
  component: GuidePage,
});


function GuidePage() {
  const { guide: g } = Route.useLoaderData();
  const others = guides.filter((x) => x.slug !== g.slug);
  const targets = guideTargets(g);
  const tours = placeDeals(
    dealsFor("recommendation", g.slug),
    g.sections.flatMap((s) =>
      (s.activities ?? []).map((a, ai) => ({
        key: `${sectionId(s.title)}-${ai + 1}`,
        text: `${a.description} ${(a.places ?? []).map((p) => p.name).join(" ")}`,
        context: `${s.title} ${s.note ?? ""}`,
      })),
    ),
  );

  return (
    <article className="mx-auto max-w-3xl px-6 py-8">
      <BackToTop />
      <nav className="mb-4 text-sm font-semibold text-muted-foreground">
        <Link to="/" className="transition-colors hover:text-primary">
          Feed
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{g.destination}</span>
      </nav>

      <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
        {g.title}
      </h1>
      <p className="mt-2 text-lg leading-relaxed text-muted-foreground">{g.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {g.tags.map((t) => (
          <JumpLink
            key={t}
            to={findTarget(t, targets)}
            className="rounded-xl bg-brand-pink px-3 py-1.5 text-xs font-bold text-foreground"
            linkClassName="transition-colors hover:bg-foreground hover:text-background"
          >
            {t}
          </JumpLink>
        ))}
      </div>

      {g.cover ? (
        <ZoomableImage
          src={g.cover}
          alt={g.title}
          width={1000}
          height={1000}
          className="mt-6 aspect-[5/2] w-full rounded-3xl bg-secondary object-cover"
        />
      ) : (
        <div className="mt-6 flex aspect-[5/2] w-full items-center justify-center rounded-3xl bg-brand-indigo px-8">
          <span className="text-center font-display text-3xl font-extrabold tracking-tight text-background md:text-5xl">
            {g.destination}
          </span>
        </div>
      )}

      {g.tiktok && (
        <div className="mt-6">
          <TikTokLinks value={g.tiktok} />
        </div>
      )}

      {/* The intro, and anything to know before you start, as plain text. */}
      <div className="mt-6 space-y-3 leading-relaxed text-foreground/90">
        <p className="text-lg">{g.teaser}</p>
        {(g.notes ?? []).map((n) => (
          <p key={n}>{n}</p>
        ))}
      </div>

      <ChildTiles parent={g.slug} />

      {/* A city page can run to a dozen sections, so jump straight to one. */}
      {g.sections.length > 2 && (
        <nav aria-label="Sections" className="mt-6 flex flex-wrap gap-2">
          {g.sections.map((section) => (
            <JumpLink
              key={section.title}
              to={sectionId(section.title)}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground"
              linkClassName="transition-colors hover:border-primary hover:text-primary"
            >
              {section.title}
            </JumpLink>
          ))}
        </nav>
      )}

      <div className="mt-8 space-y-4">
        {g.sections.map((section) => (
          <section
            key={section.title}
            id={sectionId(section.title)}
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="border-b border-border bg-secondary/60 px-5 py-3">
              <h2 className="font-display text-xl font-extrabold tracking-tight text-foreground">
                {section.title}
              </h2>
            </div>
            {section.note && (
              <p className="border-b border-border px-5 py-3 leading-relaxed text-foreground/90">
                {section.note}
              </p>
            )}
            {section.tiktok && (
              <div className="border-b border-border px-5 py-3">
                <TikTokLinks value={section.tiktok} />
              </div>
            )}
            {section.activities && section.activities.length > 0 && (
              <ActivityList
                activities={section.activities}
                destination={g.destination}
                idPrefix={section.title}
                anchorPrefix={sectionId(section.title)}
                dealsAt={tours.at}
              />
            )}
            {(section.places?.length || section.items?.length) && (
            <div className="px-5 py-4">
              {section.places && section.places.length > 0 && (
                <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {section.places.map((place, pi) => (
                    <li key={place.name} id={placeId(sectionId(section.title), pi)} className="scroll-mt-24 leading-snug">
                      <a
                        href={placeHref(place, g.destination)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                          section.avoid
                            ? "font-bold text-muted-foreground underline decoration-muted-foreground/30 underline-offset-4"
                            : "font-bold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
                        }
                      >
                        {place.name}
                      </a>
                      {place.note && (
                        <span className="block text-sm text-muted-foreground">{bullet(place.note)}</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              {section.items && section.items.length > 0 && (
                <ul className={section.places?.length ? "mt-4 space-y-2" : "space-y-2"}>
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-foreground/90">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {bullet(item)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            )}
            {photosFor(section.photoKey).length > 0 && (
              <div className="border-t border-border px-6 pb-6 pt-2">
                <PhotoStrip photos={photosFor(section.photoKey)} compact />
              </div>
            )}
          </section>
        ))}
      </div>

      {g.roastTable && (
        <div className="mt-10">
          <RoastTable />
        </div>
      )}

      {tours.rest.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
            Tours I'd book
          </h2>
          <DealList deals={tours.rest} />
        </section>
      )}

      <SpotsMap spots={spotsFor(g.slug)} onGuide />

      <PhotoStrip photos={photosFor(g.slug)} />

      <section className="mt-10 rounded-3xl bg-brand-rust px-6 py-8 text-center">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-background">
          Useful?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-background/80">
          These are free to read and always will be. If one of them saves you an afternoon of
          planning, buy me a coffee.
        </p>
        <a
          href={BMC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center rounded-full bg-background px-6 py-3 text-sm font-bold text-foreground transition-transform hover:scale-105"
        >
          Buy me a coffee
        </a>
      </section>

      {others.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
            More recommendations
          </h2>
          <ul className="mt-4 space-y-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  to="/recommendations/$slug"
                  params={{ slug: o.slug }}
                  className="font-bold text-primary transition-transform hover:translate-x-1"
                >
                  {placeName(o.title)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

/** The pages that sit under this one, as tiles. */
function ChildTiles({ parent }: { parent: string }) {
  const children = guides.filter((g) => g.parent === parent);
  if (children.length === 0) return null;

  return (
    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {children.map((child) => (
        <Link
          key={child.slug}
          to="/recommendations/$slug"
          params={{ slug: child.slug }}
          className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
        >
          {child.cover ? (
            <img
              src={child.cover}
              alt={child.title}
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              loading="lazy"
            />
          ) : (
            <div className="flex aspect-[4/3] w-full items-center justify-center bg-brand-indigo px-3">
              <span className="text-center font-display text-base font-extrabold leading-tight text-background">
                {child.destination}
              </span>
            </div>
          )}
          <div className="flex flex-1 flex-col px-4 py-3">
            <span className="font-display text-lg font-extrabold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary">
              {child.destination}
            </span>
            {child.label && (
              <span className="mt-1 text-[0.65rem] font-extrabold tracking-wide text-muted-foreground">
                {child.label}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
