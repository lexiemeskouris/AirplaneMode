import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PhotoStrip, TikTokLinks } from "@/components/PhotoStrip";
import { photosFor } from "@/data/photos";
import { getItinerary, itineraries, BMC_URL } from "@/data/itineraries";
import { ActivityList, bullet, placeHref, placeLinkClass } from "@/lib/places";
import { DealList } from "@/components/Deals";
import { SpotsMap } from "@/components/SpotsMap";
import { spotsFor } from "@/data/savedSpots";
import { dealsFor, placeDeals } from "@/data/deals";
import { ZoomableImage } from "@/components/Lightbox";
import { BackToTop, JumpLink } from "@/components/JumpLink";
import { dayId, findTarget, groupId, itineraryTargets, placeId } from "@/lib/anchors";

export const Route = createFileRoute("/itineraries/$slug")({
  loader: ({ params }) => {
    const itinerary = getItinerary(params.slug);
    if (!itinerary) throw notFound();
    return { itinerary };
  },
  head: ({ loaderData }) => {
    const it = loaderData?.itinerary;
    if (!it) {
      return {
        meta: [
          { title: "Itinerary - AirplaneMode" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    return {
      meta: [
        { title: `${it.title} - AirplaneMode` },
        {
          name: "description",
          content: it.summary,
        },
        { property: "og:title", content: `${it.title} - AirplaneMode` },
        { property: "og:description", content: it.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        // Only claim a share image when there is one to share.
        ...(it.cover
          ? [
              { property: "og:image", content: it.cover },
              { name: "twitter:image", content: it.cover },
            ]
          : []),
      ],
    };
  },
  component: ItineraryDetail,
});

function ItineraryDetail() {
  const { itinerary: it } = Route.useLoaderData();
  const more = itineraries.filter((i) => i.slug !== it.slug).slice(0, 3);
  const targets = itineraryTargets(it);
  const showDays = !it.comingSoon && (it.days?.length ?? 0) > 0;
  const tours = placeDeals(
    dealsFor("itinerary", it.slug),
    showDays
      ? it.days!.flatMap((d, di) =>
          d.activities.map((a, ai) => ({
            key: `${dayId(di)}-${ai + 1}`,
            text: `${a.description} ${(a.places ?? []).map((p) => p.name).join(" ")}`,
            // Where the day is: its title and the places in it, not every
            // sentence (a day that starts "Flight from Hanoi" is not in Hanoi).
            context: `${d.title} ${d.activities.flatMap((x) => (x.places ?? []).map((p) => `${p.name} ${p.near ?? ""}`)).join(" ")}`,
          })),
        )
      : [],
  );

  return (
    <article className="mx-auto max-w-5xl px-6 py-8">
      <BackToTop />
      {/* Breadcrumb */}
      <nav className="mb-4 text-sm font-bold text-muted-foreground">
        <Link to="/" className="transition-colors hover:text-accent">
          Feed
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{it.destination}</span>
      </nav>

      {/* Header */}
      <header className="max-w-3xl">
        <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
          {it.title}
        </h1>
        <p className="mt-2 text-lg leading-relaxed text-muted-foreground">
          {it.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {/* The highlights, as short labels that jump to their part of the plan. */}
          {(it.highlights?.length ? it.highlights : it.tags).map((t) => (
            <JumpLink
              key={t}
              to={findTarget(t, targets)}
              className="rounded-xl bg-secondary px-3 py-1.5 text-xs font-bold text-accent"
              linkClassName="transition-colors hover:bg-accent hover:text-background"
            >
              {t}
            </JumpLink>
          ))}
        </div>
      </header>

      {/* Cover, when there is one. An itinerary can go up before its photos do. */}
      <div className="mt-6 overflow-hidden rounded-3xl shadow-xl">
        {it.cover ? (
          <ZoomableImage
            src={it.cover}
            alt={it.title}
            width={1200}
            height={750}
            className="aspect-[5/2] w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex aspect-[5/2] w-full items-center justify-center bg-brand-indigo px-8">
            <span className="text-center font-display text-3xl font-extrabold tracking-tight text-background md:text-5xl">
              {it.destination}
            </span>
          </div>
        )}
      </div>

      {it.tiktok && (
        <div className="mt-6">
          <TikTokLinks value={it.tiktok} />
        </div>
      )}

      {/* The intro, and anything to know before you start, as plain text. */}
      <div className="mt-6 max-w-3xl space-y-3 leading-relaxed text-foreground/90">
        {it.teaser && <p>{it.teaser}</p>}
        {(it.notes ?? []).map((n) => (
          <p key={n}>{n}</p>
        ))}
      </div>



      {/* Straight to a day, or to one of the lists under the plan. */}
      {(showDays ? it.days!.length : 0) + (it.extras?.length ?? 0) > 1 && (
        <nav aria-label="Jump to" className="mt-6 flex flex-wrap gap-2">
          {showDays &&
            it.days!.map((d, di) => (
              <JumpLink
                key={d.day}
                to={dayId(di)}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground"
                linkClassName="transition-colors hover:border-primary hover:text-primary"
              >
                {d.day}
              </JumpLink>
            ))}
          {(it.extras ?? []).map((g) => (
            <JumpLink
              key={g.title}
              to={groupId(g.title)}
              className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-bold text-foreground"
              linkClassName="transition-colors hover:border-primary hover:text-primary"
            >
              {g.title}
            </JumpLink>
          ))}
        </nav>
      )}

      {it.comingSoon && (
        <section className="mt-12 rounded-[2rem] bg-foreground p-8 text-center text-background md:p-12">
          <h2 className="font-display text-4xl font-extrabold tracking-tight">Coming soon</h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-background/70">
            The full plan is still being written up. Check back soon.
          </p>
        </section>
      )}

      {!it.comingSoon && it.days && it.days.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
            {it.gated ? "A free sample day" : "The plan, day by day"}
          </h2>
          <div className="mt-4 space-y-4">
            {it.days.map((d, di) => (
              <div
                key={d.day}
                id={dayId(di)}
                className="scroll-mt-24 overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="flex items-baseline justify-between gap-4 border-b border-border bg-secondary/60 px-5 py-3">
                  <h3 className="font-display text-xl font-extrabold tracking-tight text-foreground">
                    {d.title}
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">
                    {d.day}
                  </span>
                </div>
                <ActivityList
                  activities={d.activities}
                  destination={it.destination}
                  idPrefix={d.day}
                  anchorPrefix={dayId(di)}
                  dealsAt={tours.at}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <PhotoStrip photos={photosFor(it.slug)} />

      {it.extras && it.extras.length > 0 && (
        <div className="mt-10 space-y-6">
          {it.extras.map((group) => (
            <section key={group.title} id={groupId(group.title)} className="scroll-mt-24">
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
                {group.title}
              </h2>
              {group.note && (
                <p className="mt-1.5 leading-relaxed text-foreground/90">{group.note}</p>
              )}
              {group.items && group.items.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-foreground/90">
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      />
                      {bullet(item)}
                    </li>
                  ))}
                </ul>
              )}
              <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {(group.places ?? []).map((place, pi) => (
                  <li
                    key={place.name}
                    id={placeId(groupId(group.title), pi)}
                    className="scroll-mt-24 leading-snug"
                  >
                    <a
                      href={placeHref(place, it.destination)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        group.avoid
                          ? "font-bold text-muted-foreground underline decoration-muted-foreground/30 underline-offset-4"
                          : placeLinkClass
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
            </section>
          ))}
        </div>
      )}

      {/* Partner tours that do not belong to any one step of the plan. */}
      {tours.rest.length > 0 && (
        <section className="mt-6">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
            Tours I'd book
          </h2>
          <DealList deals={tours.rest} />
        </section>
      )}

      {!it.comingSoon && <SpotsMap spots={spotsFor(it.slug)} />}

      {it.seeAlso && (
        <section className="mt-10">
          <p className="leading-relaxed text-foreground/90">{it.seeAlso.note}</p>
          {it.seeAlso.kind === "itinerary" ? (
            <Link
              to="/itineraries/$slug"
              params={{ slug: it.seeAlso.slug }}
              className="mt-3 inline-flex items-center font-bold text-primary transition-transform hover:translate-x-1"
            >
              {it.seeAlso.title}
              <span aria-hidden className="ml-2">
                &rarr;
              </span>
            </Link>
          ) : (
            <Link
              to="/recommendations/$slug"
              params={{ slug: it.seeAlso.slug }}
              className="mt-3 inline-flex items-center font-bold text-primary transition-transform hover:translate-x-1"
            >
              {it.seeAlso.title}
              <span aria-hidden className="ml-2">
                &rarr;
              </span>
            </Link>
          )}
        </section>
      )}

      {/* Gated CTA */}
      {it.gated && (
        <section className="mt-12 overflow-hidden rounded-[2rem] bg-foreground p-8 text-center text-background md:p-12">
          <h2 className="font-display text-4xl font-extrabold tracking-tight">
            The rest of this trip
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-background/70">
            The full {it.duration.toLowerCase()} plan, with every day, every
            timed stop and the detours, is for supporters. Buy me a coffee to
            get the full notes.
          </p>
          <a
            href={it.bmcUrl ?? BMC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-accent-foreground transition-transform hover:scale-105"
          >
            ☕ Buy me a coffee to unlock
          </a>
          <p className="mt-3 text-xs text-background/50">
            After your coffee, you'll get the full itinerary delivered to you.
          </p>
        </section>
      )}

      {/* More journeys */}
      <section className="mt-10 border-t border-border pt-8">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
          Keep moving
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {more.map((i) => (
            <Link
              key={i.slug}
              to="/itineraries/$slug"
              params={{ slug: i.slug }}
              className="group overflow-hidden rounded-2xl border border-border bg-card"
            >
              <img
                src={i.cover}
                alt={i.title}
                width={800}
                height={500}
                loading="lazy"
                className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-3">
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
                  {i.country}
                </p>
                <p className="mt-1 font-display text-lg font-extrabold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {i.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
