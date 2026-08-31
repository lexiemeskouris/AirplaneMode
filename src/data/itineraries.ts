import sanSebastian from "@/assets/san-sebastian.jpg";

/** A named venue, with the map link and address if we have them. */
export type Place = {
  name: string;
  /** Map link. Rendered as the place's link when present. */
  url?: string;
  address?: string;
  /** Short aside, e.g. why it is worth going or where it sits in the night. */
  note?: string;
  /**
   * City to search near, when it is not the itinerary's own destination.
   * Bilbao Airport belongs to a San Sebastian trip but is not in San Sebastian.
   */
  near?: string;
};

export type Activity = {
  /** 24-hour, e.g. "20:00". Omitted when the plan is deliberately loose. */
  time?: string;
  description: string;
  /** Venues for this activity, e.g. the stops on a pintxos crawl. */
  places?: Place[];
};

export type ItineraryDay = {
  day: string;
  title: string;
  activities: Activity[];
};

export type Itinerary = {
  slug: string;
  title: string;
  destination: string;
  country: string;
  duration: string;
  season: string;
  summary: string;
  cover: string;
  gated: boolean;
  /** A short intro shown for both free and gated itineraries. */
  teaser: string;
  /** Short food/activity hashtags shown as chips on feed cards. */
  tags: string[];
  highlights: string[];
  /** Full day-by-day plan. Omitted/abbreviated for gated itineraries. */
  days?: ItineraryDay[];
  /** Buy Me a Coffee link for gated itineraries. */
  bmcUrl?: string;
};

export const BMC_URL = "https://buymeacoffee.com/lexiemeskouris";

/**
 * Google Maps search for a place name near its destination.
 *
 * Deliberately a *search*, not a pinned location: we only ever hardcode a
 * `url` on a Place when we have a real link for it. Guessing a specific map
 * pin would send people to a confidently wrong address, whereas a search for
 * the name in the right city either finds it or visibly finds nothing.
 */
export function mapsSearch(name: string, near: string): string {
  const query = encodeURIComponent(`${name}, ${near}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export const itineraries: Itinerary[] = [
  {
    slug: "san-sebastian",
    title: "Three Days in San Sebastián",
    destination: "San Sebastián",
    country: "Spain",
    duration: "3 days",
    season: "Summer",
    summary:
      "Two beaches, two hills, and as many pintxos bars as three nights allow. Basque country at full tilt.",
    cover: sanSebastian,
    gated: false,
    teaser:
      "San Sebastián is small enough to walk and dense enough that you never stop eating. This route climbs both headlands, swims both beaches, and spends every evening standing at a bar with a plate in one hand.",
    tags: ["#Pintxos", "#LaConcha", "#BasqueCheesecake"],
    highlights: [
      "Pintxos hopping through the Old Town, two nights running",
      "Monte Urgull at golden hour with a drink at the top",
      "Monte Igueldo's funicular, tower and clifftop amusement park",
      "Swimming at La Concha, Zurriola and Ondarreta",
      "Tortilla at Bar Antonio, first thing",
    ],
    days: [
      {
        day: "Arrival",
        title: "Land Late, Sleep in the Old Town",
        activities: [
          {
            time: "21:00",
            description: "Land in Bilbao.",
            places: [{ name: "Bilbao Airport", near: "Bilbao, Spain" }],
          },
          { description: "Bus from Bilbao to San Sebastián." },
          {
            description: "Check in and stay in the Old Town - everything below is walkable from there.",
            places: [{ name: "Parte Vieja (Old Town)" }],
          },
        ],
      },
      {
        day: "Day One",
        title: "La Concha, Monte Urgull, and the First Crawl",
        activities: [
          { description: "Wake up at leisure." },
          {
            description: "Coffee at Simona, then walk the length of the La Concha promenade.",
            places: [{ name: "Simona Cafe" }, { name: "Paseo de La Concha" }],
          },
          { description: "Beach time at La Concha.", places: [{ name: "La Concha Beach" }] },
          {
            description: "Pintxos lunch at La Cuchara de San Telmo.",
            places: [{ name: "La Cuchara de San Telmo" }],
          },
          {
            time: "14:00",
            description:
              "Hike up Monte Urgull, about a 1.5 hour round trip, with a drink at the top at Urgulleko Polboriña.",
            places: [{ name: "Monte Urgull" }, { name: "Urgulleko Polboriña" }],
          },
          { description: "Shower and reset at the hotel." },
          {
            time: "19:00",
            description: "Pintxos hopping, in this order.",
            places: [
              {
                name: "Casa Valles",
                url: "https://goo.gl/maps/b8UnGGnGeJEm4aUEA",
                address: "Calle Los Reyes Católicos, 10, 20006 Donostia-San Sebastian, Gipuzkoa, Spain",
              },
              {
                name: "KATA4",
                url: "https://goo.gl/maps/Wa4azttoVbzpSD5A6",
                address: "Santa Catalina Plazatxoa, 4, 20004 Donostia, Gipuzkoa, Spain",
              },
              {
                name: "Bar El Pícaro",
                url: "https://share.google/7wJXv0hk0OUaNb865",
              },
              {
                name: "Curdelón",
                url: "https://goo.gl/maps/HSHsKqeE9XkfqY2a6",
                address: "Kolon Pasealekua, 35, 20002 Donostia, Gipuzkoa",
              },
              {
                name: "Casa Senra Donostia",
                url: "https://goo.gl/maps/gryTHyA7TUjrxJJ29",
                address: "San Francisco Kalea, 20002 Donostia, Gipuzkoa, Spain",
                note: "Ending spot.",
              },
            ],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Tortilla, Monte Igueldo, and Zurriola",
        activities: [
          {
            time: "08:00",
            description: "Get to Bar Antonio.",
            places: [{ name: "Bar Antonio" }],
          },
          { time: "09:00", description: "Eat tortilla at Bar Antonio." },
          {
            description: "Hike to the top of Monte Igueldo.",
            places: [{ name: "Monte Igueldo" }],
          },
          {
            description: "Visit the tower and the amusement park.",
            places: [
              { name: "Torreón de Monte Igueldo" },
              { name: "Parque de Atracciones Monte Igueldo" },
            ],
          },
          {
            description: "Lunch at Ganbara.",
            places: [{ name: "Ganbara", note: "Anthony Bourdain's favourite spot." }],
          },
          { description: "Beach time at Zurriola.", places: [{ name: "Zurriola Beach" }] },
          { description: "Shower and change." },
          {
            time: "20:00",
            description: "Pintxos hopping, round two.",
            places: [
              { name: "Bar Sport" },
              { name: "Lanperna" },
              { name: "La Viña", note: "For the Basque cheesecake." },
              { name: "Gandarias" },
            ],
          },
        ],
      },
      {
        day: "Day Three",
        title: "One Last Swim, Then the Airport",
        activities: [
          { description: "Check out and leave your bags at the hotel." },
          {
            description: "Coffee and a walk along the La Concha promenade.",
            places: [{ name: "Paseo de La Concha" }],
          },
          { description: "Lunch at Casa Urola.", places: [{ name: "Casa Urola" }] },
          { description: "Beach time at Ondarreta.", places: [{ name: "Ondarreta Beach" }] },
          {
            description: "Shopping.",
            places: [{ name: "Zara" }, { name: "Calzedonia" }, { name: "El Ganso" }],
          },
          {
            time: "18:45",
            description: "Leave San Sebastián for Bilbao Airport.",
            places: [{ name: "Bilbao Airport", near: "Bilbao, Spain" }],
          },
          { time: "20:00", description: "Arrive at Bilbao Airport." },
          { time: "21:40", description: "Flight departs." },
        ],
      },
    ],
  },
];

export function getItinerary(slug: string): Itinerary | undefined {
  return itineraries.find((i) => i.slug === slug);
}
