import { useState } from "react";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { itineraries } from "@/data/itineraries";
import { guides } from "@/data/guides";
import { SUGGEST_ENDPOINT, SUGGESTIONS_ENABLED } from "@/data/site";

const TITLE = "Tell Me Where to Go - AirplaneMode";
const DESCRIPTION =
  "Suggest a city or a country and I will plan it properly. The ones that keep coming up get written first.";

export const Route = createFileRoute("/suggest")({
  // Nothing to post to yet means no page: better a visitor lands on the feed
  // than on a form that silently fails.
  beforeLoad: () => {
    if (!SUGGESTIONS_ENABLED) throw redirect({ to: "/" });
  },
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
  component: SuggestPage,
});

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary";

function SuggestPage() {
  const [place, setPlace] = useState("");
  const [notes, setNotes] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const covered = itineraries.length + guides.length;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!place.trim() || status === "sending") return;

    // Bots fill every field they find. A real person never sees this one.
    const honeypot = new FormData(event.currentTarget).get("_gotcha");
    if (honeypot) return;

    setStatus("sending");
    try {
      const response = await fetch(SUGGEST_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          place: place.trim(),
          notes: notes.trim(),
          // Named "email" so Formspree uses it as the reply-to address.
          email: email.trim(),
          _subject: `AirplaneMode suggestion: ${place.trim()}`,
        }),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl">
        Tell me
        <span className="text-primary"> where to go.</span>
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        There are {covered} places on this site and a much longer list I have not
        got to yet. If there is somewhere you want planned properly, put it in
        the box. I read all of them, and the ones that keep coming up get
        written first.
      </p>

      {status === "sent" ? (
        <div className="mt-10 rounded-3xl border border-border bg-card p-8">
          <p className="font-display text-2xl font-extrabold tracking-tight text-foreground">
            Got it.
          </p>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Thanks for the suggestion. If you left an email I will let you know
            when it goes up.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setPlace("");
                setNotes("");
                setStatus("idle");
              }}
              className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-105"
            >
              Suggest another
            </button>
            <Link
              to="/"
              className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
            >
              Back to the feed
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-10">
          <div>
            <label htmlFor="place" className="text-sm font-bold text-foreground">
              Where should I go?
            </label>
            <input
              id="place"
              name="place"
              required
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="Lisbon"
              className={fieldClass}
            />
          </div>

          <div className="mt-6">
            <label htmlFor="notes" className="text-sm font-bold text-foreground">
              Anything I should know?
            </label>
            <p className="mt-1 text-sm text-muted-foreground">
              How long you have, when you are going, what you are into. Optional.
            </p>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Four days in May, mostly there to eat"
              className={`${fieldClass} resize-y`}
            />
          </div>

          <div className="mt-6">
            <label htmlFor="email" className="text-sm font-bold text-foreground">
              Your email
            </label>
            <p className="mt-1 text-sm text-muted-foreground">
              Only if you want a message when it is written. Nothing else, ever.
            </p>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={fieldClass}
            />
          </div>

          {/* Spam trap. Hidden from people, irresistible to bots. */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="hidden"
          />

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={!place.trim() || status === "sending"}
              className="inline-flex items-center rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-50"
            >
              {status === "sending" ? "Sending" : "Send it"}
            </button>
            {status === "error" && (
              <p className="text-sm font-semibold text-primary">
                That did not go through. Try again in a moment.
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
