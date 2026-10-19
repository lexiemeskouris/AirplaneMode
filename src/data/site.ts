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
 * Where bespoke trip-planning requests go. The plan page posts its form here
 * through FormSubmit, which needs no account: the first submission sends a
 * one-time activation email to this address, and every request after that
 * lands in the inbox. The address is not shown on the page.
 */
export const PLAN_EMAIL = "lexie.meskouris@gmail.com";
export const PLAN_ENDPOINT = `https://formsubmit.co/ajax/${PLAN_EMAIL}`;

export type Testimonial = {
  /** Paragraphs separated by a blank line. */
  quote: string;
  name: string;
  location?: string;
  /** Slug of the itinerary for the trip this is about, when there is one. */
  itinerary?: string;
};

/**
 * Client testimonials, shown on the plan page and the reviews page. Real quotes only, from people who
 * have actually had a trip planned; the section stays hidden while this is
 * empty rather than shipping invented ones.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Lexie was super communicative and happy to talk through all the nitty-gritty details. She made me feel really supported the whole way through, and kept checking in while I was away.",
    name: "Zoe B",
    location: "Los Angeles",
  },
  {
    quote:
      "Lexie helped stretch my budget further than I could have for a month-long vacation in Europe. Highly recommend.",
    name: "Sabrina S",
    location: "New York",
  },
  {
    quote:
      "Lexie took me off the beaten path. I was apprehensive to repeat destinations because I thought I'd done everything the city had to offer, and she showed me a whole new side to London.",
    name: "Kassidy M",
    location: "Phoenix",
  },
  {
    quote:
      "Lexie curated a vibe on our trip that no other travel agent could have executed. She just got exactly what I was looking for in terms of restaurants and cocktail bars.",
    name: "Jess H",
    location: "New York",
  },
  {
    quote:
      "Lexie planned my trip to Tunisia, and it was genuinely one of the best trips I've ever taken. She thought of absolutely everything - from restaurant reservations and transportation to telling us how much we should be paying taxi drivers and even how to bargain like a local.\n\n" +
      "She found places I never would have discovered on my own, including a restaurant by a Top Chef finalist that ended up being one of the best meals I've had in the last three years. We loved it so much that we went back the next night.\n\n" +
      "The entire itinerary felt incredibly thoughtful and local. We explored the ancient ruins, spent time in Tunis, and even managed to sneak into the Four Seasons. She also planned a day trip to Hammamet, a beach town about an hour away, and figured out exactly how we should get there. We had lunch, rode horses along the beach, went jet skiing, and finished the day at one of the best - and hardest-to-book - restaurants in Tunisia.\n\n" +
      "What made the trip so special was that Lexie didn't just give us a list of places to go. She planned all the little details that made everything seamless while still making the trip feel spontaneous and adventurous. I would absolutely have her plan another trip for me.",
    name: "Heather B",
    location: "Connecticut",
    itinerary: "tunisia",
  },
  {
    quote:
      "We have had an excellent experience with AirplaneMode! They consistently put together outstanding itineraries that are thoughtfully planned, well organized, and tailored to make the most of every trip. Their recommendations have been especially impressive in Iceland, where their knowledge and attention to detail helped us experience the very best the country has to offer. From must-see attractions to special experiences we might not have discovered on our own, every detail was carefully considered. We truly appreciate their expertise and personalized service and would highly recommend them to anyone looking for a memorable, stress-free travel experience!",
    name: "Trista M",
    location: "Connecticut",
  },
];
