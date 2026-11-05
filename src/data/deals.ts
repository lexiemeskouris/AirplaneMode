/**
 * Tours booked through my partner links. Each one shows on the deals page,
 * and on the itinerary or guide it belongs to, so the link sits next to the
 * trip that used it.
 */
export type DealPage = { kind: "itinerary" | "recommendation"; slug: string };

export type Deal = {
  /** Where the tour runs, as the reader would search for it. */
  city: string;
  country: string;
  operator: string;
  /** What the tour is. */
  tour: string;
  url: string;
  /**
   * What the reader gets off. Left out when the link carries no reader
   * discount, rather than claiming one that is not there.
   */
  discount?: string;
  /**
   * What to quote when enquiring, for partners that attribute bookings by
   * code rather than by link.
   */
  mention?: string;
  /**
   * The itinerary (or guide) page this deal is shown on. Left out for a
   * partner in a place with no trip page yet; it then shows on the deals page
   * only.
   */
  page?: DealPage;
  /**
   * What a step in the plan says when it is this tour, so the deal can sit
   * on that step. A deal with no matching step goes in the page's lists.
   */
  match?: RegExp;
};

/**
 * A Secret Food Tours city page, tagged with my Tapfiliate referral code.
 * Same shape the partner portal's deeplink generator produces.
 */
function secretFoodTours(citySlug: string): string {
  return (
    `https://www.secretfoodtours.com/${citySlug}/` +
    "?ref=mmzhztk&utm_source=tapfiliate&utm_medium=affiliate&utm_campaign=lexiemeskouris"
  );
}

type SftCity = [city: string, country: string, citySlug: string, page: DealPage];

const it = (slug: string): DealPage => ({ kind: "itinerary", slug });
const rec = (slug: string): DealPage => ({ kind: "recommendation", slug });

/** Every city I have been to that Secret Food Tours runs a tour in. */
const SFT_CITIES: SftCity[] = [
  ["Amsterdam", "Netherlands", "amsterdam", it("amsterdam")],
  ["Bangkok", "Thailand", "bangkok", it("thailand")],
  ["Barcelona", "Spain", "barcelona", rec("barcelona")],
  ["Berlin", "Germany", "berlin", it("berlin")],
  ["Brussels", "Belgium", "brussels", it("brussels")],
  ["Budapest", "Hungary", "budapest", it("budapest")],
  ["Cape Town", "South Africa", "cape-town", it("south-africa")],
  ["Charleston", "United States", "charleston", rec("charleston")],
  ["Chiang Mai", "Thailand", "chiang-mai", it("thailand")],
  ["Copenhagen", "Denmark", "copenhagen", it("copenhagen")],
  ["Cork", "Ireland", "cork", it("ireland")],
  ["Cusco", "Peru", "cusco", it("peru")],
  ["Dublin", "Ireland", "dublin", it("ireland")],
  ["Edinburgh", "Scotland", "edinburgh", it("edinburgh")],
  ["Glasgow", "Scotland", "glasgow", it("edinburgh")],
  ["Hanoi", "Vietnam", "hanoi", it("vietnam")],
  ["Helsinki", "Finland", "helsinki", it("helsinki")],
  ["Ho Chi Minh City", "Vietnam", "ho-chi-minh-city", it("vietnam")],
  ["Istanbul", "Turkey", "istanbul", it("istanbul")],
  ["Kraków", "Poland", "krakow", it("krakow")],
  ["Kyoto", "Japan", "kyoto", it("japan")],
  ["Lima", "Peru", "lima", it("peru")],
  ["Lisbon", "Portugal", "lisbon", it("lisbon")],
  ["Ljubljana", "Slovenia", "ljubljana", it("slovenia")],
  ["London", "England", "london", rec("london")],
  ["Mallorca", "Spain", "mallorca", it("mallorca")],
  ["Mexico City", "Mexico", "mexico-city", it("mexico-city")],
  ["Miami", "United States", "miami", rec("miami")],
  ["Milan", "Italy", "milan", it("milan")],
  ["Nashville", "United States", "nashville", it("nashville")],
  ["New York", "United States", "new-york", rec("new-york")],
  ["Nice", "France", "nice", rec("nice")],
  ["Osaka", "Japan", "osaka", it("japan")],
  ["Paris", "France", "paris", it("paris")],
  ["Phuket", "Thailand", "phuket", it("thailand")],
  ["Reykjavík", "Iceland", "reykjavik", rec("reykjavik")],
  ["San Sebastián", "Spain", "san-sebastian", it("san-sebastian")],
  ["Seoul", "South Korea", "seoul", it("seoul")],
  ["Singapore", "Singapore", "singapore", it("singapore")],
  ["Stockholm", "Sweden", "stockholm", it("stockholm")],
  ["Taipei", "Taiwan", "taipei", it("taipei")],
  ["Tokyo", "Japan", "tokyo", it("japan")],
  ["Vienna", "Austria", "vienna", it("vienna")],
  ["Zurich", "Switzerland", "zurich", it("switzerland")],
];

export const deals: Deal[] = [
  ...SFT_CITIES.map(([city, country, citySlug, page]) => ({
    city,
    country,
    operator: "Secret Food Tours",
    tour: `${city} food tour`,
    url: secretFoodTours(citySlug),
    page,
    match: /(?<!self-guided [a-z]+ )food tour/i,
  })),
  {
    city: "Berlin",
    country: "Germany",
    operator: "Insider Tour",
    tour: "Third Reich, Cold War, Potsdam and Sachsenhausen walking tours",
    url: "https://www.insidertour.com/",
    discount: "10% off with code LEXIE10, on any public or private tour except shore excursions",
    page: it("berlin"),
    match: /Third Reich|Cold War|walking tour/i,
  },
  {
    city: "Cape Town",
    country: "South Africa",
    operator: "Hotspots2c",
    tour: "Cape day tours, Winelands, Garden Route trips and safaris",
    url: "https://t.ly/airplanemode",
    page: it("south-africa"),
    match: /Winelands|Cape Point|Garden Route|safari|day tour/i,
  },
  {
    city: "Cusco",
    country: "Peru",
    operator: "Alpaca Expeditions",
    tour: "Inca Trail and Machu Picchu treks",
    url: "https://www.alpacaexpeditions.com/",
    discount:
      "Free equipment rentals: write Lexie - Free rentals in Special Requests or Additional Comments when you book",
    page: it("peru"),
    match: /Alpaca Expeditions|Inca Trail/i,
  },
  {
    city: "Kilimanjaro",
    country: "Tanzania",
    operator: "Monkey Adventures",
    tour: "Kilimanjaro treks",
    url: "https://monkey.travel/en/usd/",
    mention: "Quote referral code 21731580 when you enquire or book",
  },
  {
    city: "Marrakech",
    country: "Morocco",
    operator: "Marrakech City Tours by Jamal",
    tour: "Guided Marrakech city tours with Jamal",
    url: "https://wa.me/212654080957",
    discount: "Use Lexie when reaching out for bookings to get a discounted price.",
    mention: "WhatsApp Jamal on +212 654-080957",
    page: it("morocco"),
    match: /Jamal|guided|city tour/i,
  },
  {
    city: "Phuket",
    country: "Thailand",
    operator: "The Guide Thailand",
    tour: "Thai cooking class and market tour with Wooddy",
    url: "https://wa.me/66952742719",
    discount: "Use Lexie when reaching out for bookings to get a discounted price.",
    mention: "WhatsApp Wooddy on +66 95 274 2719",
    page: it("thailand"),
    match: /cooking class/i,
  },
  {
    city: "Tromsø",
    country: "Norway",
    operator: "Panion",
    tour: "Northern Lights safari",
    url: "https://www.panion.travel/p/lexiemesko",
    page: it("tromso"),
    match: /northern lights/i,
  },
];

/**
 * Sits each of a page's deals on the step of the plan it belongs to: first a
 * step that names the operator, then one that matches and sits in the deal's
 * city, then any that matches. One deal per operator per step; the rest go
 * in the page's list. `steps` are in page order, keyed by anchor id, with
 * `context` the whole day or section the step is in.
 */
export function placeDeals(
  pageDeals: Deal[],
  steps: { key: string; text: string; context?: string }[],
): { at: Map<string, Deal[]>; rest: Deal[] } {
  const at = new Map<string, Deal[]>();
  const fold = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const free = (d: Deal) => steps.filter((s) => !(at.get(s.key) ?? []).some((x) => x.operator === d.operator));
  // Most certain first, so a Hanoi tour cannot take the step that belongs
  // to the Ho Chi Minh City one just because it was listed first.
  const passes: ((d: Deal, s: (typeof steps)[number]) => boolean)[] = [
    (d, s) => fold(s.text).includes(fold(d.operator)),
    (d, s) => !!d.match?.test(s.text) && fold(s.context ?? s.text).includes(fold(d.city)),
    (d, s) => !!d.match?.test(s.text),
  ];
  let left = [...pageDeals];
  for (const pass of passes) {
    left = left.filter((d) => {
      const step = free(d).find((s) => pass(d, s));
      if (step) at.set(step.key, [...(at.get(step.key) ?? []), d]);
      return !step;
    });
  }
  const rest = left;
  return { at, rest };
}

/** Deals to show on one itinerary or guide page. */
export function dealsFor(kind: DealPage["kind"], slug: string): Deal[] {
  return deals.filter((d) => d.page?.kind === kind && d.page.slug === slug);
}
