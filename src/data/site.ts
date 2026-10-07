/**
 * Where the "suggest a destination" form posts.
 *
 * GitHub Pages has no server, so the form needs a third party to turn a
 * submission into an email. Formspree does that: create a form at
 * formspree.io, point it at lexie@aloudable.com, and paste the endpoint it
 * gives you (it looks like https://formspree.io/f/abcdwxyz) between the quotes
 * below.
 *
 * While this is empty the suggestion page and its links stay off the site
 * entirely, rather than shipping a form that goes nowhere. Filling it in is
 * the only change needed to switch the whole feature on.
 */
export const SUGGEST_ENDPOINT: string = "";

export const SUGGESTIONS_ENABLED = SUGGEST_ENDPOINT.length > 0;

/**
 * Where bespoke trip-planning requests go. The plan page shows this address
 * and posts its form to it through FormSubmit, which needs no account: the
 * first submission sends a one-time activation email to this address, and
 * every request after that lands in the inbox.
 */
export const PLAN_EMAIL = "lexie.meskouris@gmail.com";
export const PLAN_ENDPOINT = `https://formsubmit.co/ajax/${PLAN_EMAIL}`;

export type Testimonial = { quote: string; name: string; location?: string };

/**
 * Client testimonials for the plan page. Real quotes only, from people who
 * have actually had a trip planned; the section stays hidden while this is
 * empty rather than shipping invented ones.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Lexie was super communicative and happy to talk through all the nitty-gritty details. She made me feel really supported the whole way through, and kept checking in while I was away.",
    name: "Zoe B",
    location: "New York",
  },
];
