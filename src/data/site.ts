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
