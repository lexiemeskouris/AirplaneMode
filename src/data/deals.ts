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
  })),
  {
    city: "Berlin",
    country: "Germany",
    operator: "Insider Tour",
    tour: "Third Reich, Cold War, Potsdam and Sachsenhausen walking tours",
    url: "https://www.insidertour.com/",
    discount: "10% off with code LEXIE10, on any public or private tour except shore excursions",
    page: it("berlin"),
  },
  {
    city: "Cape Town",
    country: "South Africa",
    operator: "Hotspots2c",
    tour: "Cape day tours, Winelands, Garden Route trips and safaris",
    url: "https://t.ly/airplanemode",
    page: it("south-africa"),
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
    city: "Tromsø",
    country: "Norway",
    operator: "Panion",
    tour: "Northern Lights safari",
    url: "https://www.panion.travel/p/lexiemesko",
    page: it("tromso"),
  },
];

/** Deals to show on one itinerary or guide page. */
export function dealsFor(kind: DealPage["kind"], slug: string): Deal[] {
  return deals.filter((d) => d.page?.kind === kind && d.page.slug === slug);
}
