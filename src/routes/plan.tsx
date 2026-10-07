import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PLAN_EMAIL, PLAN_ENDPOINT, TESTIMONIALS } from "@/data/site";

const TITLE = "Plan My Trip - AirplaneMode";
const DESCRIPTION =
  "Tell me where you are going, who is coming and roughly what you want to spend, and I will plan the trip for you, day by day.";

export const Route = createFileRoute("/plan")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlanPage,
});

type Budget = "$" | "$$" | "$$$" | "$$$$";

/** Per person, in US dollars. $$ is how the itineraries on this site are pitched. */
const BUDGETS: {
  tier: Budget;
  name: string;
  lines: string[];
  /** A London restaurant and hotel at this price, so the tier means something concrete. */
  eat: string;
  stay: string;
  /** An optional step up within the tier. */
  beyond?: string;
  mine?: boolean;
}[] = [
  {
    tier: "$",
    name: "Shoestring",
    lines: [
      "Around $50 a night per person to stay",
      "Meals under $50 per person, most well under",
      "Free sights, walking and public transport",
    ],
    eat: "Slayer Pizza",
    stay: "An Airbnb or a hostel, depending on the size of the group",
  },
  {
    tier: "$$",
    name: "Mid-range",
    mine: true,
    lines: [
      "Under $100 a night per person to stay",
      "Most meals under $50 per person",
      "One or two nice dinners at $100 or more per person",
      "A few paid tours, and maybe one splurge day",
    ],
    eat: "Briciole or Canteen",
    stay: "An aparthotel",
  },
  {
    tier: "$$$",
    name: "Comfortable",
    lines: [
      "$100 to $250 a night per person to stay",
      "A nice sit-down dinner every night, including but not limited to tasting menus and Michelin stars",
      "Private or small-group tours, and taxis over buses",
    ],
    eat: "Bottarga",
    stay: "A Hilton, or a hotel of that standard",
  },
  {
    tier: "$$$$",
    name: "Splurge",
    lines: [
      "$250 or more a night per person to stay",
      "High-end menus and luxury experiences, like private chefs and private rooms at restaurants",
      "Private guides and drivers, and the experiences worth flying for",
    ],
    eat: "Lita",
    stay: "The Londoner, or the JW Marriott",
    beyond: "Ultra-luxury: Claridge's or The Connaught",
  },
];

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary";

function PlanPage() {
  const [destination, setDestination] = useState("");
  const [people, setPeople] = useState("");
  const [dates, setDates] = useState("");
  const [budget, setBudget] = useState<Budget | "">("");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const ready = destination.trim() && people.trim() && budget && email.trim();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready || status === "sending") return;

    // Bots fill every field they find. A real person never sees this one.
    if (new FormData(event.currentTarget).get("_honey")) return;

    setStatus("sending");
    try {
      const response = await fetch(PLAN_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `Trip request: ${destination.trim()}`,
          _template: "table",
          _captcha: "false",
          Destination: destination.trim(),
          "How many people": people.trim(),
          When: dates.trim(),
          Budget: `${budget} (${BUDGETS.find((b) => b.tier === budget)?.name ?? ""})`,
          Notes: notes.trim(),
          Name: name.trim(),
          // FormSubmit uses this as the reply-to address.
          email: email.trim(),
        }),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl">
        Let me plan
        <span className="text-primary"> your trip.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Tell me where you are going, who is coming and roughly what you want to
        spend. I will build the trip around you, day by day, in the same style
        as everything on this site: timed, linked, and with no filler.
      </p>

      {/* Budget guide */}
      <section className="mt-12">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
          Pick a budget
        </h2>
        <p className="mt-2 text-muted-foreground">Per person, in US dollars.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BUDGETS.map((b) => (
            <div
              key={b.tier}
              className={`rounded-2xl border p-5 ${
                b.mine ? "border-primary bg-primary/5" : "border-border bg-card"
              }`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-display text-2xl font-extrabold text-primary">{b.tier}</span>
                {b.mine && (
                  <span className="rounded-full bg-brand-yellow px-2.5 py-1 text-[0.65rem] font-extrabold tracking-tight text-foreground">
                    HOW I TRAVEL
                  </span>
                )}
              </div>
              <p className="mt-1 font-bold text-foreground">{b.name}</p>
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                {b.lines.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <div className="mt-4 space-y-1.5 border-t border-border pt-3 text-sm text-foreground">
                <p className="font-bold">For example, in London:</p>
                <p>
                  <span className="font-bold">Eat:</span> {b.eat}
                </p>
                <p>
                  <span className="font-bold">Stay:</span> {b.stay}
                </p>
                {b.beyond && <p className="text-muted-foreground">{b.beyond}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {TESTIMONIALS.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
            From people I have planned for
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <figure key={t.quote} className="rounded-2xl border border-border bg-card p-6">
                <blockquote className="text-lg leading-relaxed text-foreground/90">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-4 text-sm font-bold text-foreground">
                  {t.name}
                  {t.location && (
                    <span className="font-normal text-muted-foreground">, {t.location}</span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Request form */}
      <section className="mt-16 max-w-2xl">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
          Tell me about the trip
        </h2>
        <p className="mt-2 text-muted-foreground">
          Or just email me at{" "}
          <a href={`mailto:${PLAN_EMAIL}`} className="font-bold text-primary hover:underline">
            {PLAN_EMAIL}
          </a>
          .
        </p>

        {status === "sent" ? (
          <div className="mt-8 rounded-3xl border border-border bg-card p-8">
            <p className="font-display text-2xl font-extrabold tracking-tight text-foreground">
              Got it.
            </p>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Thanks. I will be in touch by email to talk through the trip.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
            >
              Back to the feed
            </Link>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="destination" className="text-sm font-bold text-foreground">
                Where are you going?
              </label>
              <input
                id="destination"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Portugal, ten days"
                className={fieldClass}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="people" className="text-sm font-bold text-foreground">
                  How many people?
                </label>
                <input
                  id="people"
                  required
                  inputMode="numeric"
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  placeholder="2"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="dates" className="text-sm font-bold text-foreground">
                  When?
                </label>
                <input
                  id="dates"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  placeholder="Late May, flexible"
                  className={fieldClass}
                />
              </div>
            </div>

            <fieldset>
              <legend className="text-sm font-bold text-foreground">Budget</legend>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {BUDGETS.map((b) => (
                  <button
                    key={b.tier}
                    type="button"
                    aria-pressed={budget === b.tier}
                    onClick={() => setBudget(b.tier)}
                    className={`rounded-2xl border px-3 py-3 font-display text-lg font-extrabold transition-colors ${
                      budget === b.tier
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary"
                    }`}
                  >
                    {b.tier}
                  </button>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="notes" className="text-sm font-bold text-foreground">
                Anything else?
              </label>
              <textarea
                id="notes"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What you are into, what you want to avoid, the one thing you have to do"
                className={`${fieldClass} resize-y`}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-bold text-foreground">
                  Your name
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-bold text-foreground">
                  Your email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={fieldClass}
                />
              </div>
            </div>

            {/* Spam trap. Hidden from people, irresistible to bots. */}
            <input
              type="text"
              name="_honey"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="hidden"
            />

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={!ready || status === "sending"}
                className="inline-flex items-center rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-50"
              >
                {status === "sending" ? "Sending" : "Send it"}
              </button>
              {status === "error" && (
                <p className="text-sm font-semibold text-primary">
                  That did not go through. Email me instead at {PLAN_EMAIL}.
                </p>
              )}
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
